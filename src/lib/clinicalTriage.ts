// ========================================================
// HEALTHBRIDGE — CLINICAL TRIAGE & INTENT ENGINE (FALLBACK)
// Provides resilient offline symptom parsing & rule matching
// ========================================================

import { doctors } from '@/lib/mockData';

export interface TriageAnalysis {
  reply: string;
  urgency?: 'emergency' | 'urgent' | 'routine' | 'self-care';
  specialties?: string[];
  actions?: string[];
  recommendedDoctor?: {
    id: string;
    name: string;
    specialty: string;
    fee: number;
    rating: number;
  };
  options?: string[];
}

/**
 * Analyzes patient input to provide empathetic guidance,
 * urgency assessment, and matching specialists.
 */
export function analyzeUserInput(input: string): TriageAnalysis {
  const text = input.toLowerCase().trim();

  // 1. GREETINGS & HELP INQUIRIES
  const isHelpRequest = /^(help|help me|pls help|please help|i need help|can you help|help please|support)$/i.test(text);
  const isGreeting = /^(hi|hello|hey|namaste|good morning|good afternoon|good evening|who are you|what can you do)$/i.test(text);

  if (isHelpRequest || isGreeting) {
    return {
      reply: "I am right here with you! Tell me what symptoms or health questions you have.\n\nFor example:\n• What part of your body is bothering you?\n• Are you feeling pain, fever, nausea, or dizziness?\n• Or are you looking for a specific specialist or emergency hospital?\n\nPlease tell me what you are feeling, or pick one of the options below.",
      options: [
        'I have fever and body ache',
        'Severe stomach / abdominal pain',
        'Skin rash or allergy',
        'Joint or back pain',
        'Find nearest emergency center',
      ],
    };
  }

  // 2. IMMEDIATE RED FLAG EMERGENCY KEYWORDS
  const emergencyPatterns = [
    'chest pain', 'chest pressure', 'heart attack', 'can\'t breathe', 'cannot breathe',
    'shortness of breath', 'breathlessness', 'choking', 'stroke', 'face drooping',
    'unconscious', 'fainted', 'seizure', 'severe bleeding', 'vomiting blood',
    'paralysis', 'sudden weakness', 'anaphylaxis', 'poisoning'
  ];

  if (emergencyPatterns.some(k => text.includes(k))) {
    return {
      urgency: 'emergency',
      reply: "🚨 **CRITICAL MEDICAL ALERT: Immediate Emergency Attention Required**\n\nThe symptoms you described can indicate an acute medical emergency such as an acute coronary event, respiratory crisis, or neurological emergency.\n\n**Do not wait for an appointment or drive yourself.** Please dial **112** (National Emergency) or **108** (Ambulance) right now, or proceed immediately to the nearest Emergency Casualty / Trauma department.",
      specialties: ['Emergency Medicine', 'Cardiologist'],
      actions: [
        'Call 112 or 108 immediately for an ambulance',
        'Have someone stay with you; sit upright and loosen tight clothing',
        'If prescribed emergency cardiac medication by your doctor, take as advised',
        'Do not eat, drink, or drive yourself to the hospital',
      ],
      options: [
        'Find nearby 24/7 Emergency Trauma Centers',
        'Call 112 National Helpline',
        'My symptoms are mild/different',
      ],
    };
  }

  // 3. CARDIAC / HEART
  if (text.includes('heart') || text.includes('palpitation') || text.includes('bp') || text.includes('blood pressure') || text.includes('cardio') || text.includes('pulse')) {
    const dr = doctors.find(d => d.specialty === 'Cardiologist') || doctors[0];
    return {
      urgency: 'urgent',
      reply: "Cardiovascular symptoms require careful, qualified evaluation. Palpitations, blood pressure fluctuations, or chest discomfort should be investigated with an ECG and clinical exam by a verified Cardiologist.\n\nHow long have you noticed these sensations? Are they triggered by stress, exertion, or occurring at rest?",
      specialties: ['Cardiologist', 'General Physician'],
      actions: [
        'Avoid strenuous physical exertion and caffeine until evaluated',
        'Record blood pressure readings morning and evening if you have a monitor',
        'Seek immediate ER care if accompanied by radiating pain, nausea, or sweating',
      ],
      recommendedDoctor: { id: dr.id, name: dr.name, specialty: dr.specialty, fee: dr.fee, rating: dr.rating },
      options: [
        'It happens after exertion',
        'Book Dr. Priya Sharma (Cardiologist)',
        'Check my blood pressure vitals',
        'Are there emergency warning signs?',
      ],
    };
  }

  // 4. STOMACH / ABDOMINAL / DIGESTION / ACIDITY
  if (text.includes('stomach') || text.includes('abdomen') || text.includes('belly') || text.includes('acidity') || text.includes('gas') || text.includes('indigestion') || text.includes('vomit') || text.includes('nausea') || text.includes('diarrhea') || text.includes('constipation')) {
    return {
      urgency: text.includes('severe') || text.includes('vomit') ? 'urgent' : 'routine',
      reply: "Abdominal and digestive discomfort is very common, but the appropriate specialist depends on the location and nature of the pain.\n\n• **Upper stomach / burning:** Often related to gastritis, acid reflux, or peptic ulcers.\n• **Lower right abdomen:** Requires prompt medical rule-out of appendicitis if severe.\n• **Cramps with diarrhea / vomiting:** Frequently acute gastroenteritis.\n\nWhere exactly is the pain located, and have you been able to keep fluids down?",
      specialties: ['Gastroenterologist', 'General Physician'],
      actions: [
        'Sip oral rehydration salts (ORS) or electrolyte water to prevent dehydration',
        'Eat a bland, non-spicy diet (khichdi, curd, bananas, toast)',
        'Seek urgent care if you observe high fever, persistent vomiting, or black/bloody stools',
      ],
      options: [
        'Upper stomach burning sensation',
        'Lower abdominal cramps with diarrhea',
        'Find a Gastroenterologist',
        'Can I take antacids?',
      ],
    };
  }

  // 5. HEADACHE / MIGRAINE / DIZZINESS
  if (text.includes('headache') || text.includes('migraine') || text.includes('dizzy') || text.includes('dizziness') || text.includes('vertigo') || text.includes('head pain')) {
    const dr = doctors.find(d => d.specialty === 'Neurologist') || doctors[1];
    return {
      urgency: text.includes('severe') || text.includes('unbearable') ? 'urgent' : 'routine',
      reply: "Headaches can range from tension headaches and migraines to sinus inflammation or neurological causes.\n\n• **Throbbing one-sided pain:** Typical of migraine.\n• **Sudden explosive thunderclap headache:** Requires immediate ER care.\n• **Dull forehead band pressure:** Often tension or eye strain.\n\nHow many days has this headache persisted?",
      specialties: ['Neurologist', 'General Physician'],
      actions: [
        'Rest in a quiet, dimly lit room and maintain steady hydration',
        'Avoid prolonged screen time or bright flashing lights',
        'Track headache frequency and triggers',
      ],
      recommendedDoctor: { id: dr.id, name: dr.name, specialty: dr.specialty, fee: dr.fee, rating: dr.rating },
      options: [
        'Throbbing pain on one side (Migraine)',
        'Dull ache all over forehead',
        'Book Dr. Rajesh Kumar (Neurologist)',
        'How long is too long for a headache?',
      ],
    };
  }

  // 6. FEVER / COLD / COUGH / INFECTIONS
  if (text.includes('fever') || text.includes('temperature') || text.includes('chills') || text.includes('cough') || text.includes('cold') || text.includes('flu') || text.includes('throat')) {
    const dr = doctors.find(d => d.specialty === 'General Physician') || doctors[5];
    return {
      urgency: 'routine',
      reply: "Fever and respiratory symptoms typically suggest a viral or bacterial infection (such as seasonal influenza, viral pharyngitis, or seasonal vector fevers in India like Dengue or Malaria if accompanied by severe body aches).\n\nWhat is your current body temperature, and has it lasted more than 3 days?",
      specialties: ['General Physician', 'Pulmonologist', 'ENT Specialist'],
      actions: [
        'Rest adequately and drink plenty of fluids (warm water, soups, coconut water)',
        'Monitor temperature every 4–6 hours with a digital thermometer',
        'Consult a General Physician if fever exceeds 102°F (38.9°C) or lasts over 72 hours',
      ],
      recommendedDoctor: { id: dr.id, name: dr.name, specialty: dr.specialty, fee: dr.fee, rating: dr.rating },
      options: [
        'Fever is between 99°F - 101°F',
        'Fever is above 102°F with severe chills',
        'Book Dr. Arjun Mehta (General Physician)',
        'What blood tests are recommended?',
      ],
    };
  }

  // 7. SKIN / RASH / ALLERGY
  if (text.includes('skin') || text.includes('rash') || text.includes('itch') || text.includes('acne') || text.includes('allergy')) {
    const dr = doctors.find(d => d.specialty === 'Dermatologist') || doctors[2];
    return {
      urgency: 'routine',
      reply: "Dermatological symptoms like rashes, redness, itching, and hives can be caused by contact dermatitis, fungal infections, allergic reactions, or eczema.\n\n*Note: If your rash is accompanied by lip/eye swelling or breathing difficulty, seek emergency care.* Otherwise, a consultation with a Dermatologist is ideal.",
      specialties: ['Dermatologist'],
      actions: [
        'Avoid scratching to prevent secondary bacterial infection',
        'Do not apply unverified steroid creams without a prescription',
        'Take a clear photograph in natural daylight to show the doctor',
      ],
      recommendedDoctor: { id: dr.id, name: dr.name, specialty: dr.specialty, fee: dr.fee, rating: dr.rating },
      options: [
        'Itching red patches on skin',
        'Acne and facial breakouts',
        'Book Dr. Ananya Patel (Dermatologist)',
      ],
    };
  }

  // 8. BONES / JOINTS / BACK / KNEE
  if (text.includes('bone') || text.includes('joint') || text.includes('knee') || text.includes('back pain') || text.includes('sprain')) {
    const dr = doctors.find(d => d.specialty === 'Orthopedic') || doctors[3];
    return {
      urgency: 'routine',
      reply: "Joint stiffness, knee pain, or lower back strain should be assessed by an Orthopedic specialist to determine whether ligaments, cartilage, or spinal discs are involved.\n\nDid this start after an injury or lifting something heavy, or has it developed gradually?",
      specialties: ['Orthopedic', 'Physiotherapist'],
      actions: [
        'Apply cold packs for acute swelling or warm compress for chronic muscle stiffness',
        'Avoid heavy lifting or deep squatting while pain persists',
      ],
      recommendedDoctor: { id: dr.id, name: dr.name, specialty: dr.specialty, fee: dr.fee, rating: dr.rating },
      options: [
        'Started after lifting or sports injury',
        'Gradual stiffness in knees/joints',
        'Book Dr. Vikram Singh (Orthopedic)',
      ],
    };
  }

  // 9. CHILD / PEDIATRIC
  if (text.includes('baby') || text.includes('child') || text.includes('kid') || text.includes('infant') || text.includes('toddler')) {
    const dr = doctors.find(d => d.specialty === 'Pediatrician') || doctors[4];
    return {
      urgency: 'urgent',
      reply: "For infants and young children, symptoms should always be evaluated with extra care by a verified Pediatrician.\n\nIs the child active and accepting fluids, or are they unusually lethargic or refusing feeds?",
      specialties: ['Pediatrician'],
      actions: [
        'Monitor hydration closely (wet diapers and urination frequency)',
        'Never give adult medications or aspirin to children',
        'Consult a Pediatrician promptly for accurate age-appropriate dosage',
      ],
      recommendedDoctor: { id: dr.id, name: dr.name, specialty: dr.specialty, fee: dr.fee, rating: dr.rating },
      options: [
        'Child has fever and cough',
        'Child has stomach upset',
        'Book Dr. Meera Reddy (Pediatrician)',
      ],
    };
  }

  // 10. MENTAL HEALTH
  if (text.includes('stress') || text.includes('anxiety') || text.includes('depress') || text.includes('panic') || text.includes('sleep') || text.includes('insomnia')) {
    return {
      urgency: 'routine',
      reply: "Mental health is just as critical as physical health. Chronic anxiety, panic attacks, or severe sleep disturbances are medical concerns that qualified Psychiatrists and Psychologists treat with evidence-based care.\n\nNational Tele-MANAS helpline is available 24/7 across India for free, confidential mental health counseling at **14416**.",
      specialties: ['Psychiatrist', 'Clinical Psychologist'],
      actions: [
        'Call Tele-MANAS toll-free at 14416 for immediate confidential support',
        'Maintain a consistent sleep routine and reduce caffeine intake',
        'Consult a certified Psychiatrist for personalized guidance',
      ],
      options: [
        'Anxiety and racing thoughts',
        'Trouble sleeping (Insomnia)',
        'Call 14416 Helpline',
      ],
    };
  }

  // 11. GENERAL FALLBACK RESPONSE
  return {
    urgency: 'routine',
    reply: `I understand: "${input}".\n\nTo give you the most accurate navigation guidance:\n1. Could you specify what part of your body feels affected?\n2. How long have you noticed this (hours, days, or weeks)?\n3. Would you say the severity is mild, moderate, or severe?\n\nYou can answer freely, or tell me if you want to book an appointment with a General Physician for a baseline checkup.`,
    specialties: ['General Physician'],
    actions: [
      'Describe any accompanying symptoms like fever, pain, or nausea',
      'Keep note of when the sensation started and what makes it better or worse',
      'If you feel sudden acute pain or breathlessness, call 112 immediately',
    ],
    options: [
      'It started 1-2 days ago',
      'The symptoms are mild',
      'The symptoms are moderate to severe',
      'I want to see a General Physician',
    ],
  };
}
