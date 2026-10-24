// ============================================================
// HEALTHBRIDGE — SYMPTOM ANALYSIS ENGINE
// Maps symptoms → specialties with confidence, follow-up Qs,
// doctor recommendations with ratings & fees
// ============================================================

import { doctors, specialties } from '@/lib/mockData';

export interface SymptomMatch {
  specialty: string;
  confidence: number;          // 0–100
  icon: string;
  description: string;
  matchedKeywords: string[];
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  options: string[];
  specialtyHint?: string;      // Answering narrows to this specialty
}

export interface DoctorRecommendation {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  rating: number;
  reviewCount: number;
  fee: number;
  distance: number;
  area: string;
  availableToday: boolean;
  nextAvailable: string;
  experience: number;
  verified: boolean;
  clinicName: string;
  matchScore: number;          // How well this doctor matches the symptoms
}

export interface AnalysisResult {
  specialtyMatches: SymptomMatch[];
  followUpQuestions: FollowUpQuestion[];
  doctorRecommendations: DoctorRecommendation[];
  urgency: 'emergency' | 'urgent' | 'routine' | 'self-care';
  summary: string;
  safetyNote?: string;
}

// ────────────────────────────────────────────────────────
// KEYWORD → SPECIALTY MAPPING with weights
// ────────────────────────────────────────────────────────

interface SpecialtyRule {
  specialty: string;
  icon: string;
  description: string;
  keywords: { word: string; weight: number }[];
  followUps: FollowUpQuestion[];
}

const SPECIALTY_RULES: SpecialtyRule[] = [
  {
    specialty: 'Cardiologist',
    icon: '❤️',
    description: 'Heart and cardiovascular system specialist',
    keywords: [
      { word: 'chest pain', weight: 95 },
      { word: 'chest', weight: 65 },
      { word: 'heart', weight: 90 },
      { word: 'palpitation', weight: 85 },
      { word: 'blood pressure', weight: 80 },
      { word: 'bp', weight: 70 },
      { word: 'pulse', weight: 60 },
      { word: 'chest tightness', weight: 90 },
      { word: 'racing heart', weight: 88 },
      { word: 'irregular heartbeat', weight: 92 },
      { word: 'swollen ankles', weight: 55 },
      { word: 'shortness of breath', weight: 70 },
    ],
    followUps: [
      {
        id: 'cardio-1',
        question: 'How would you describe the chest sensation?',
        options: ['Sharp stabbing pain', 'Dull pressure/heaviness', 'Burning sensation', 'Squeezing/tightness'],
        specialtyHint: 'Cardiologist',
      },
      {
        id: 'cardio-2',
        question: 'When does it occur?',
        options: ['During physical exertion', 'At rest', 'After eating', 'During stress/anxiety'],
      },
      {
        id: 'cardio-3',
        question: 'Do you have any of these risk factors?',
        options: ['High blood pressure', 'Diabetes', 'Family history of heart disease', 'Smoking', 'None of these'],
      },
    ],
  },
  {
    specialty: 'Neurologist',
    icon: '🧠',
    description: 'Brain and nervous system specialist',
    keywords: [
      { word: 'headache', weight: 80 },
      { word: 'migraine', weight: 95 },
      { word: 'dizzy', weight: 70 },
      { word: 'dizziness', weight: 75 },
      { word: 'vertigo', weight: 90 },
      { word: 'seizure', weight: 95 },
      { word: 'numbness', weight: 65 },
      { word: 'tingling', weight: 60 },
      { word: 'head pain', weight: 80 },
      { word: 'memory loss', weight: 75 },
      { word: 'blurred vision', weight: 50 },
      { word: 'photophobia', weight: 70 },
      { word: 'throbbing', weight: 55 },
    ],
    followUps: [
      {
        id: 'neuro-1',
        question: 'What type of headache are you experiencing?',
        options: ['Throbbing one-sided pain', 'Dull band-like pressure', 'Sharp stabbing', 'Behind the eyes'],
        specialtyHint: 'Neurologist',
      },
      {
        id: 'neuro-2',
        question: 'How long has the headache lasted?',
        options: ['A few hours', '1-2 days', '3-7 days', 'More than a week'],
      },
      {
        id: 'neuro-3',
        question: 'Are there accompanying symptoms?',
        options: ['Nausea/vomiting', 'Light sensitivity', 'Numbness/tingling', 'Vision changes', 'None'],
      },
    ],
  },
  {
    specialty: 'Gastroenterologist',
    icon: '🫃',
    description: 'Digestive system and stomach specialist',
    keywords: [
      { word: 'stomach', weight: 80 },
      { word: 'stomach pain', weight: 90 },
      { word: 'abdomen', weight: 75 },
      { word: 'abdominal', weight: 75 },
      { word: 'belly', weight: 60 },
      { word: 'acidity', weight: 85 },
      { word: 'acid reflux', weight: 90 },
      { word: 'gas', weight: 55 },
      { word: 'bloating', weight: 65 },
      { word: 'indigestion', weight: 80 },
      { word: 'vomiting', weight: 70 },
      { word: 'nausea', weight: 65 },
      { word: 'diarrhea', weight: 75 },
      { word: 'constipation', weight: 70 },
      { word: 'heartburn', weight: 85 },
    ],
    followUps: [
      {
        id: 'gastro-1',
        question: 'Where exactly is the pain located?',
        options: ['Upper stomach (above navel)', 'Lower abdomen (below navel)', 'Right side', 'Left side', 'All over'],
        specialtyHint: 'Gastroenterologist',
      },
      {
        id: 'gastro-2',
        question: 'When does the pain worsen?',
        options: ['After eating', 'On an empty stomach', 'At night', 'Constantly'],
      },
      {
        id: 'gastro-3',
        question: 'Are you experiencing any of these?',
        options: ['Blood in stool', 'Severe vomiting', 'Weight loss', 'Difficulty swallowing', 'None of these'],
      },
    ],
  },
  {
    specialty: 'Dermatologist',
    icon: '🧴',
    description: 'Skin, hair, and nail specialist',
    keywords: [
      { word: 'skin', weight: 75 },
      { word: 'rash', weight: 90 },
      { word: 'itch', weight: 70 },
      { word: 'itching', weight: 75 },
      { word: 'acne', weight: 85 },
      { word: 'pimple', weight: 80 },
      { word: 'allergy', weight: 60 },
      { word: 'eczema', weight: 90 },
      { word: 'psoriasis', weight: 95 },
      { word: 'hives', weight: 80 },
      { word: 'redness', weight: 50 },
      { word: 'hair loss', weight: 70 },
      { word: 'dandruff', weight: 65 },
      { word: 'dark spots', weight: 60 },
      { word: 'fungal', weight: 75 },
    ],
    followUps: [
      {
        id: 'derm-1',
        question: 'What does the skin condition look like?',
        options: ['Red patches/rash', 'Bumps/pimples', 'Dry/flaky skin', 'Blisters', 'Discoloration'],
        specialtyHint: 'Dermatologist',
      },
      {
        id: 'derm-2',
        question: 'How long have you had this condition?',
        options: ['Just started (hours)', 'A few days', '1-2 weeks', 'More than a month'],
      },
      {
        id: 'derm-3',
        question: 'Is it spreading or confined to one area?',
        options: ['Spreading to other areas', 'Stayed in one spot', 'Comes and goes', 'Getting worse'],
      },
    ],
  },
  {
    specialty: 'Orthopedic',
    icon: '🦴',
    description: 'Bones, joints, and muscles specialist',
    keywords: [
      { word: 'bone', weight: 80 },
      { word: 'joint', weight: 85 },
      { word: 'knee', weight: 80 },
      { word: 'knee pain', weight: 90 },
      { word: 'back pain', weight: 90 },
      { word: 'sprain', weight: 85 },
      { word: 'fracture', weight: 95 },
      { word: 'arthritis', weight: 90 },
      { word: 'stiffness', weight: 65 },
      { word: 'shoulder pain', weight: 80 },
      { word: 'neck pain', weight: 70 },
      { word: 'hip pain', weight: 80 },
      { word: 'swelling joint', weight: 75 },
      { word: 'sports injury', weight: 85 },
    ],
    followUps: [
      {
        id: 'ortho-1',
        question: 'Which area is affected?',
        options: ['Knee', 'Lower back', 'Shoulder', 'Neck', 'Hip', 'Wrist/Hand', 'Ankle/Foot'],
        specialtyHint: 'Orthopedic',
      },
      {
        id: 'ortho-2',
        question: 'How did it start?',
        options: ['After an injury/fall', 'Gradual onset', 'After exercise/sports', 'Woke up with it', 'Heavy lifting'],
      },
      {
        id: 'ortho-3',
        question: 'Rate the pain severity:',
        options: ['Mild (1-3/10)', 'Moderate (4-6/10)', 'Severe (7-9/10)', 'Unbearable (10/10)'],
      },
    ],
  },
  {
    specialty: 'General Physician',
    icon: '🩺',
    description: 'Primary care and general health',
    keywords: [
      { word: 'fever', weight: 80 },
      { word: 'cold', weight: 65 },
      { word: 'cough', weight: 65 },
      { word: 'flu', weight: 70 },
      { word: 'throat', weight: 60 },
      { word: 'sore throat', weight: 75 },
      { word: 'body ache', weight: 70 },
      { word: 'fatigue', weight: 60 },
      { word: 'weakness', weight: 55 },
      { word: 'tired', weight: 50 },
      { word: 'infection', weight: 65 },
      { word: 'chills', weight: 70 },
      { word: 'runny nose', weight: 60 },
      { word: 'sneezing', weight: 55 },
      { word: 'general checkup', weight: 90 },
      { word: 'not feeling well', weight: 60 },
      { word: 'unwell', weight: 55 },
    ],
    followUps: [
      {
        id: 'gp-1',
        question: 'What is your current body temperature?',
        options: ['Normal (below 99°F)', 'Low grade (99-101°F)', 'High (101-103°F)', 'Very high (above 103°F)', 'Haven\'t measured'],
      },
      {
        id: 'gp-2',
        question: 'How long have you had these symptoms?',
        options: ['Just started today', '1-2 days', '3-5 days', 'More than a week'],
      },
      {
        id: 'gp-3',
        question: 'Which best describes your symptoms?',
        options: ['Fever with body ache', 'Cough and cold', 'Sore throat', 'General weakness', 'Multiple symptoms'],
      },
    ],
  },
  {
    specialty: 'Pediatrician',
    icon: '👶',
    description: 'Child and infant specialist',
    keywords: [
      { word: 'baby', weight: 90 },
      { word: 'child', weight: 85 },
      { word: 'infant', weight: 90 },
      { word: 'toddler', weight: 85 },
      { word: 'kid', weight: 70 },
      { word: 'newborn', weight: 95 },
      { word: 'vaccination', weight: 75 },
      { word: 'my son', weight: 70 },
      { word: 'my daughter', weight: 70 },
    ],
    followUps: [
      {
        id: 'pedi-1',
        question: 'How old is the child?',
        options: ['0-6 months', '6 months - 2 years', '2-5 years', '5-12 years', '12+ years'],
        specialtyHint: 'Pediatrician',
      },
      {
        id: 'pedi-2',
        question: 'What is the primary concern?',
        options: ['Fever', 'Cough/cold', 'Diarrhea/vomiting', 'Skin rash', 'Not eating', 'Vaccination'],
      },
    ],
  },
  {
    specialty: 'Psychiatrist',
    icon: '🧘',
    description: 'Mental health and wellness specialist',
    keywords: [
      { word: 'anxiety', weight: 90 },
      { word: 'depression', weight: 90 },
      { word: 'depressed', weight: 85 },
      { word: 'stress', weight: 70 },
      { word: 'panic', weight: 85 },
      { word: 'panic attack', weight: 95 },
      { word: 'insomnia', weight: 80 },
      { word: 'sleep', weight: 55 },
      { word: 'can\'t sleep', weight: 80 },
      { word: 'mental health', weight: 95 },
      { word: 'mood swings', weight: 75 },
      { word: 'overthinking', weight: 65 },
      { word: 'sad', weight: 50 },
      { word: 'lonely', weight: 45 },
      { word: 'suicidal', weight: 100 },
    ],
    followUps: [
      {
        id: 'psych-1',
        question: 'How long have you been experiencing these feelings?',
        options: ['A few days', '1-2 weeks', 'Over a month', 'Several months'],
        specialtyHint: 'Psychiatrist',
      },
      {
        id: 'psych-2',
        question: 'How is it affecting your daily life?',
        options: ['Mildly — can manage', 'Moderately — affects work/study', 'Severely — unable to function', 'Having harmful thoughts'],
      },
    ],
  },
  {
    specialty: 'Pulmonologist',
    icon: '🫁',
    description: 'Lungs and respiratory system specialist',
    keywords: [
      { word: 'breathing difficulty', weight: 90 },
      { word: 'breathlessness', weight: 88 },
      { word: 'asthma', weight: 95 },
      { word: 'wheezing', weight: 85 },
      { word: 'persistent cough', weight: 75 },
      { word: 'chest congestion', weight: 70 },
      { word: 'lung', weight: 80 },
      { word: 'respiratory', weight: 80 },
    ],
    followUps: [
      {
        id: 'pulmo-1',
        question: 'When does the breathing difficulty occur?',
        options: ['During physical activity', 'At rest', 'While lying down', 'At night', 'All the time'],
        specialtyHint: 'Pulmonologist',
      },
      {
        id: 'pulmo-2',
        question: 'Do you have a history of respiratory issues?',
        options: ['Asthma', 'Chronic bronchitis', 'COVID-19 recovery', 'Allergies', 'No history'],
      },
    ],
  },
  {
    specialty: 'ENT Specialist',
    icon: '👂',
    description: 'Ear, nose, and throat specialist',
    keywords: [
      { word: 'ear pain', weight: 90 },
      { word: 'ear', weight: 60 },
      { word: 'hearing', weight: 75 },
      { word: 'nose', weight: 50 },
      { word: 'sinus', weight: 85 },
      { word: 'sinusitis', weight: 90 },
      { word: 'tonsil', weight: 85 },
      { word: 'nasal', weight: 70 },
      { word: 'nose bleed', weight: 80 },
      { word: 'blocked nose', weight: 75 },
      { word: 'snoring', weight: 65 },
    ],
    followUps: [
      {
        id: 'ent-1',
        question: 'Which area is primarily affected?',
        options: ['Ear (pain/discharge/hearing)', 'Nose (congestion/bleeding)', 'Throat (pain/difficulty swallowing)', 'Sinus (pressure/headache)'],
        specialtyHint: 'ENT Specialist',
      },
    ],
  },
  {
    specialty: 'Gynecologist',
    icon: '🌸',
    description: "Women's health and reproductive specialist",
    keywords: [
      { word: 'period', weight: 80 },
      { word: 'menstrual', weight: 85 },
      { word: 'pregnancy', weight: 90 },
      { word: 'pcos', weight: 95 },
      { word: 'irregular periods', weight: 90 },
      { word: 'cramps', weight: 55 },
      { word: 'menopause', weight: 80 },
    ],
    followUps: [
      {
        id: 'gyn-1',
        question: 'What is your primary concern?',
        options: ['Irregular periods', 'Severe cramps', 'Pregnancy related', 'PCOS symptoms', 'Other reproductive health'],
        specialtyHint: 'Gynecologist',
      },
    ],
  },
  {
    specialty: 'Ophthalmologist',
    icon: '👁️',
    description: 'Eye care and vision specialist',
    keywords: [
      { word: 'eye', weight: 75 },
      { word: 'vision', weight: 80 },
      { word: 'eye pain', weight: 85 },
      { word: 'blurry vision', weight: 85 },
      { word: 'red eye', weight: 80 },
      { word: 'watery eyes', weight: 70 },
      { word: 'dry eyes', weight: 70 },
    ],
    followUps: [
      {
        id: 'eye-1',
        question: 'What eye symptom are you experiencing?',
        options: ['Blurry/reduced vision', 'Eye pain/discomfort', 'Redness/swelling', 'Watery/dry eyes', 'Floaters or flashes'],
        specialtyHint: 'Ophthalmologist',
      },
    ],
  },
  {
    specialty: 'Dentist',
    icon: '🦷',
    description: 'Dental and oral health specialist',
    keywords: [
      { word: 'tooth', weight: 90 },
      { word: 'toothache', weight: 95 },
      { word: 'teeth', weight: 80 },
      { word: 'gum', weight: 75 },
      { word: 'dental', weight: 85 },
      { word: 'jaw pain', weight: 70 },
      { word: 'cavity', weight: 85 },
      { word: 'bleeding gums', weight: 80 },
    ],
    followUps: [
      {
        id: 'dent-1',
        question: 'What dental issue are you facing?',
        options: ['Toothache', 'Bleeding gums', 'Sensitivity', 'Broken/chipped tooth', 'Cavity/decay', 'Routine checkup'],
        specialtyHint: 'Dentist',
      },
    ],
  },
];

// ────────────────────────────────────────────────────────
// EMERGENCY DETECTION
// ────────────────────────────────────────────────────────

const EMERGENCY_KEYWORDS = [
  'chest pain', 'heart attack', 'can\'t breathe', 'cannot breathe', 'stroke',
  'unconscious', 'fainted', 'seizure', 'severe bleeding', 'vomiting blood',
  'paralysis', 'anaphylaxis', 'poisoning', 'suicidal', 'overdose',
];

// ────────────────────────────────────────────────────────
// MAIN ANALYSIS FUNCTION
// ────────────────────────────────────────────────────────

export function analyzeSymptoms(symptomText: string, answers?: Record<string, string>): AnalysisResult {
  const text = symptomText.toLowerCase().trim();

  // 1. Check for emergency
  const isEmergency = EMERGENCY_KEYWORDS.some(k => text.includes(k));

  if (isEmergency) {
    const emergencyDoctors = doctors
      .filter(d => d.specialty === 'Cardiologist' || d.specialty === 'General Physician')
      .map(d => ({
        ...d,
        matchScore: 100,
      }));

    return {
      specialtyMatches: [{
        specialty: 'Emergency Medicine',
        confidence: 100,
        icon: '🚨',
        description: 'Immediate emergency medical attention required',
        matchedKeywords: EMERGENCY_KEYWORDS.filter(k => text.includes(k)),
      }],
      followUpQuestions: [],
      doctorRecommendations: emergencyDoctors,
      urgency: 'emergency',
      summary: 'Your symptoms indicate a potential medical emergency. Please call 112 or 108 immediately.',
      safetyNote: '🚨 CRITICAL: Call 112 (National Emergency) or 108 (Ambulance) immediately. Do not delay seeking care.',
    };
  }

  // 2. Score each specialty based on keyword matching
  const scoredSpecialties: (SymptomMatch & { rule: SpecialtyRule })[] = [];

  for (const rule of SPECIALTY_RULES) {
    const matched: string[] = [];
    let totalWeight = 0;

    for (const kw of rule.keywords) {
      if (text.includes(kw.word)) {
        matched.push(kw.word);
        totalWeight += kw.weight;
      }
    }

    if (matched.length > 0) {
      // Normalize confidence: max from matched weights, capped at 98
      const avgWeight = totalWeight / matched.length;
      const confidence = Math.min(98, Math.round(avgWeight + (matched.length - 1) * 5));

      scoredSpecialties.push({
        specialty: rule.specialty,
        confidence,
        icon: rule.icon,
        description: rule.description,
        matchedKeywords: matched,
        rule,
      });
    }
  }

  // Sort by confidence descending
  scoredSpecialties.sort((a, b) => b.confidence - a.confidence);

  // If no match, default to General Physician
  if (scoredSpecialties.length === 0) {
    const gpRule = SPECIALTY_RULES.find(r => r.specialty === 'General Physician')!;
    scoredSpecialties.push({
      specialty: 'General Physician',
      confidence: 45,
      icon: '🩺',
      description: 'Primary care and general health',
      matchedKeywords: [],
      rule: gpRule,
    });
  }

  // 3. Gather follow-up questions from top 2 matches
  const followUpQuestions: FollowUpQuestion[] = [];
  const topMatches = scoredSpecialties.slice(0, 2);
  for (const match of topMatches) {
    for (const q of match.rule.followUps) {
      if (!followUpQuestions.find(fq => fq.id === q.id)) {
        followUpQuestions.push(q);
      }
    }
  }

  // 4. Find matching doctors
  const matchedSpecNames = scoredSpecialties.map(s => s.specialty);
  const doctorRecommendations: DoctorRecommendation[] = doctors
    .filter(d => matchedSpecNames.includes(d.specialty))
    .map(d => {
      const specMatch = scoredSpecialties.find(s => s.specialty === d.specialty);
      const matchScore = specMatch ? specMatch.confidence : 30;
      // Boost score for verified, high-rated, available today
      let boost = 0;
      if (d.verified) boost += 5;
      if (d.rating >= 4.7) boost += 5;
      if (d.availableToday) boost += 3;
      return {
        id: d.id,
        name: d.name,
        specialty: d.specialty,
        qualifications: d.qualifications,
        rating: d.rating,
        reviewCount: d.reviewCount,
        fee: d.fee,
        distance: d.distance,
        area: d.area,
        availableToday: d.availableToday,
        nextAvailable: d.nextAvailable,
        experience: d.experience,
        verified: d.verified,
        clinicName: d.clinicName,
        matchScore: Math.min(99, matchScore + boost),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  // 5. Determine urgency
  let urgency: AnalysisResult['urgency'] = 'routine';
  if (text.includes('severe') || text.includes('unbearable') || text.includes('excruciating')) {
    urgency = 'urgent';
  } else if (
    text.includes('mild') ||
    text.includes('slight') ||
    text.includes('minor')
  ) {
    urgency = 'self-care';
  }

  // 6. Build summary
  const topSpec = scoredSpecialties[0];
  const summary = scoredSpecialties.length === 1
    ? `Based on your symptoms, we recommend consulting a **${topSpec.specialty}** (${topSpec.confidence}% match). We found ${doctorRecommendations.length} specialist(s) for you.`
    : `Your symptoms suggest multiple possibilities. Top match: **${topSpec.specialty}** (${topSpec.confidence}% confidence). Answer the follow-up questions below for a more precise recommendation.`;

  return {
    specialtyMatches: scoredSpecialties.map(({ rule, ...rest }) => rest),
    followUpQuestions: followUpQuestions.slice(0, 4), // Max 4 follow-ups
    doctorRecommendations,
    urgency,
    summary,
    safetyNote: urgency === 'urgent'
      ? '⚠️ Your symptoms sound severe. If they worsen, seek immediate medical care or call 112.'
      : undefined,
  };
}

// ────────────────────────────────────────────────────────
// SYMPTOM SEARCH — returns matching specialties for search
// ────────────────────────────────────────────────────────

export function searchBySymptom(query: string): { specialty: string; icon: string; confidence: number }[] {
  const text = query.toLowerCase().trim();
  if (!text || text.length < 2) return [];

  const results: { specialty: string; icon: string; confidence: number }[] = [];

  for (const rule of SPECIALTY_RULES) {
    for (const kw of rule.keywords) {
      if (text.includes(kw.word) || kw.word.includes(text)) {
        const existing = results.find(r => r.specialty === rule.specialty);
        if (!existing) {
          results.push({
            specialty: rule.specialty,
            icon: rule.icon,
            confidence: kw.weight,
          });
        } else if (kw.weight > existing.confidence) {
          existing.confidence = kw.weight;
        }
      }
    }
  }

  return results.sort((a, b) => b.confidence - a.confidence);
}
