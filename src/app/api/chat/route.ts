import { NextRequest, NextResponse } from 'next/server';
import { doctors } from '@/lib/mockData';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const SYSTEM_INSTRUCTION = `You are the HealthBridge AI Health Navigator, an empathetic, highly specialized clinical triage and healthcare navigation assistant for patients across India.

MANDATORY DIRECTIVE — STRICT HEALTH SCOPE ONLY:
You are strictly and exclusively restricted to healthcare, medicine, human symptoms, wellness, specialist navigation, appointment booking guidance, mental health, and medical record literacy.
If the user asks ANY question or topic NOT related to human health, medicine, psychology, or healthcare (for instance: programming, coding, software engineering, finance, mathematics, history, politics, sports, entertainment, homework, general chat):
You MUST politely decline and firmly redirect:
"I am HealthBridge's specialized AI Health Navigator, exclusively trained to assist with healthcare navigation, medical symptoms, and wellness. I cannot assist with non-health topics. How can I help you with your health or symptoms today?"

PERSONALIZED & EMPATHETIC CONVERSATION:
- Greet the user with warmth, dignity, and empathy.
- Address their exact symptoms, duration, feelings, and context personally.
- Ask clarifying, personalized follow-up questions to understand their condition (e.g. exact location of pain, intensity 1-10, triggers, associated signs like nausea or fever).
- Provide practical, safe supportive measures (e.g. hydration, rest, posture) while explicitly noting they do not replace a doctor's examination.

EMERGENCY PROTOCOL (CRITICAL SAFETY):
- If the user reports potentially life-threatening red-flag symptoms (severe chest pain radiating to arm or jaw, severe shortness of breath, FAST stroke signs like facial droop or slurred speech, sudden loss of consciousness, uncontrolled bleeding, severe anaphylactic allergy):
  1. Start immediately with an urgent red-flag emergency alert.
  2. Urge the user to dial 112 (National Emergency) or 108 (Ambulance) immediately without delay.
  3. Strongly advise against driving themselves and advise going to the nearest emergency trauma casualty department.

SPECIALIST MATCHMAKING & PLATFORM CONTEXT:
- Recommend the specific specialist category best suited for their complaint (e.g. Cardiologist, Neurologist, Dermatologist, Orthopedic, Gastroenterologist, Pulmonologist, Pediatrician, Gynecologist, ENT Specialist, Dentist, Psychiatrist, General Physician).
- Mention verified doctors available on the HealthBridge platform in Mumbai (e.g. Dr. Priya Sharma for Cardiology, Dr. Rajesh Kumar for Neurology, Dr. Ananya Patel for Dermatology, Dr. Vikram Singh for Orthopedics, Dr. Meera Reddy for Pediatrics, Dr. Arjun Mehta for General Medicine).
- For mental health distress, recommend the 24/7 National Tele-MANAS helpline at 14416.
- Emphasize that your assessment is for educational guidance and care navigation, and not a replacement for an in-person clinical diagnosis or prescription.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userQuery } = await req.json();

    if (!userQuery && (!messages || messages.length === 0)) {
      return NextResponse.json({ error: 'No input provided' }, { status: 400 });
    }

    // Build Gemini history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages)) {
      for (const m of messages) {
        if (m.type === 'system') continue;
        const role = m.type === 'user' ? 'user' : 'model';
        if (m.content && m.content.trim()) {
          contents.push({
            role,
            parts: [{ text: m.content.trim() }],
          });
        }
      }
    }

    // If latest user query not in contents, append it
    const lastMsg = contents[contents.length - 1];
    if (!lastMsg || lastMsg.role !== 'user' || lastMsg.parts[0].text !== userQuery) {
      if (userQuery && userQuery.trim()) {
        contents.push({
          role: 'user',
          parts: [{ text: userQuery.trim() }],
        });
      }
    }

    // Ensure contents format alternates properly for Gemini API
    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    for (const c of contents) {
      if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === c.role) {
        // Merge consecutive parts of same role
        formattedContents[formattedContents.length - 1].parts[0].text += `\n\n${c.parts[0].text}`;
      } else {
        formattedContents.push(c);
      }
    }

    // Ensure first turn is from user
    if (formattedContents.length > 0 && formattedContents[0].role === 'model') {
      formattedContents.shift();
    }

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: formattedContents.length > 0 ? formattedContents : [{ role: 'user', parts: [{ text: userQuery || 'Hello' }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1000,
      },
    };

    if (!GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set in environment variables.');
      return NextResponse.json(
        {
          error: 'GEMINI_API_KEY is missing. Please set GEMINI_API_KEY in your environment.',
          fallback: true,
        },
        { status: 503 }
      );
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Gemini API Error:', res.status, errorText);
      throw new Error(`Gemini API returned status ${res.status}`);
    }

    const data = await res.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Analyze reply for structured UI tags
    const lowerQuery = (userQuery || '').toLowerCase();
    const lowerReply = replyText.toLowerCase();

    // Check urgency
    let urgency: 'emergency' | 'urgent' | 'routine' | 'self-care' | undefined = undefined;
    if (
      lowerQuery.includes('chest pain') ||
      lowerQuery.includes('can\'t breathe') ||
      lowerQuery.includes('stroke') ||
      lowerQuery.includes('unconscious') ||
      lowerQuery.includes('severe bleeding') ||
      lowerReply.includes('emergency attention required') ||
      lowerReply.includes('dial 112') ||
      lowerReply.includes('call 112') ||
      lowerReply.includes('immediate medical attention') ||
      lowerReply.includes('red flag')
    ) {
      urgency = 'emergency';
    } else if (
      lowerQuery.includes('severe') ||
      lowerQuery.includes('unbearable') ||
      lowerQuery.includes('vomit') ||
      lowerReply.includes('urgent medical') ||
      lowerReply.includes('urgently')
    ) {
      urgency = 'urgent';
    } else if (
      lowerReply.includes('specialist') ||
      lowerReply.includes('consult') ||
      lowerReply.includes('doctor') ||
      lowerReply.includes('physician')
    ) {
      urgency = 'routine';
    }

    // Comprehensive medical keyword to specialty mapping
    const matchedSpecialties: string[] = [];
    const specialtyMap: Record<string, string[]> = {
      'Cardiologist': ['cardio', 'heart', 'chest pain', 'bp', 'blood pressure', 'palpitation', 'pulse'],
      'Neurologist': ['neuro', 'headache', 'migraine', 'dizzy', 'vertigo', 'seizure', 'numbness', 'photophobia'],
      'Gastroenterologist': ['gastro', 'stomach', 'abdomen', 'acidity', 'reflux', 'vomit', 'nausea', 'diarrhea', 'digestion', 'constipation', 'gut'],
      'Dermatologist': ['derma', 'skin', 'rash', 'acne', 'itch', 'allergy', 'eczema', 'hair'],
      'Orthopedic': ['ortho', 'bone', 'joint', 'knee', 'back pain', 'spine', 'fracture', 'sprain'],
      'Pulmonologist': ['pulmo', 'lung', 'cough', 'wheez', 'asthma', 'breath'],
      'Pediatrician': ['pediatric', 'child', 'baby', 'infant', 'toddler', 'kid'],
      'Gynecologist': ['gynec', 'period', 'menstrual', 'pregnancy', 'pcos'],
      'ENT Specialist': ['ent', 'ear', 'nose', 'throat', 'sinus', 'tonsil'],
      'Dentist': ['dent', 'tooth', 'teeth', 'gum'],
      'Psychiatrist': ['psych', 'anxiety', 'depress', 'panic', 'mental health', 'sleep', 'insomnia', 'stress'],
      'General Physician': ['fever', 'cold', 'infection', 'fatigue', 'weakness', 'physician', 'checkup'],
    };

    for (const [spec, keywords] of Object.entries(specialtyMap)) {
      if (
        lowerReply.includes(spec.toLowerCase()) ||
        keywords.some(k => lowerQuery.includes(k) || lowerReply.includes(k))
      ) {
        matchedSpecialties.push(spec);
      }
    }

    // Match doctor card recommendation if relevant
    let recommendedDoctor: { id: string; name: string; specialty: string; fee: number; rating: number } | undefined = undefined;
    if (matchedSpecialties.length > 0) {
      const doc = doctors.find(d => matchedSpecialties.includes(d.specialty));
      if (doc) {
        recommendedDoctor = {
          id: doc.id,
          name: doc.name,
          specialty: doc.specialty,
          fee: doc.fee,
          rating: doc.rating,
        };
      }
    }

    // Suggest 3-4 natural conversational follow-up chips
    const options: string[] = [];
    if (urgency === 'emergency') {
      options.push('Find nearby 24/7 Trauma Centers', 'Call 112 National Emergency', 'My symptoms are mild/different');
    } else if (matchedSpecialties.includes('Cardiologist')) {
      options.push('Book Dr. Priya Sharma (Cardiologist)', 'It happens after physical exertion', 'What tests will be required?');
    } else if (matchedSpecialties.includes('Gastroenterologist')) {
      options.push('Upper stomach burning after food', 'Lower abdominal cramps with diarrhea', 'Can I take antacids safely?');
    } else if (matchedSpecialties.includes('Neurologist')) {
      options.push('Book Dr. Rajesh Kumar (Neurologist)', 'Throbbing one-sided headache', 'How long should I wait before seeing a doctor?');
    } else if (matchedSpecialties.includes('Dermatologist')) {
      options.push('Book Dr. Ananya Patel (Dermatologist)', 'Itching red rash on skin', 'Could this be a medicine allergy?');
    } else if (matchedSpecialties.includes('Orthopedic')) {
      options.push('Book Dr. Vikram Singh (Orthopedic)', 'Started after lifting or injury', 'Stiffness in knee joints');
    } else if (matchedSpecialties.includes('Pediatrician')) {
      options.push('Book Dr. Meera Reddy (Pediatrician)', 'Child has high fever', 'Child has stomach upset');
    } else if (matchedSpecialties.includes('Psychiatrist')) {
      options.push('Call 14416 Tele-MANAS Helpline', 'Trouble sleeping & racing thoughts', 'Find a licensed Psychiatrist');
    } else {
      options.push('Book a General Physician consultation', 'Started 1-2 days ago', 'What home care measures can I take?');
    }

    return NextResponse.json({
      reply: replyText,
      urgency,
      specialties: matchedSpecialties.length > 0 ? matchedSpecialties : undefined,
      recommendedDoctor,
      options,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Chat API Handler Error:', message);

    return NextResponse.json(
      {
        error: 'Failed to process chat with AI service',
        fallback: true,
      },
      { status: 500 }
    );
  }
}
