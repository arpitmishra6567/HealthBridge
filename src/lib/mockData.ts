// ============================================
// HEALTHBRIDGE — MOCK DATA
// All data is fictional demonstration data.
// No real doctors, patients, or medical records.
// ============================================

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  registrationNumber: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  fee: number;
  distance: number;
  location: string;
  area: string;
  availableToday: boolean;
  nextAvailable: string;
  experience: number;
  gender: 'Male' | 'Female';
  about: string;
  tags: string[];
  avatar: string;
  languages: string[];
  clinicName: string;
  timings: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  doctorCount: number;
  description: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'in-person' | 'online';
}

export interface MedicalRecord {
  id: string;
  title: string;
  category: 'prescription' | 'lab-report' | 'consultation' | 'document' | 'allergy' | 'medication' | 'surgery';
  date: string;
  doctor: string;
  summary: string;
  tags: string[];
}

export interface TriageResult {
  urgency: 'emergency' | 'urgent' | 'routine' | 'self-care';
  title: string;
  description: string;
  specialties: string[];
  actions: string[];
}

// ============================================
// SPECIALTIES
// ============================================

export const specialties: Specialty[] = [
  { id: '1', name: 'General Physician', icon: '🩺', doctorCount: 340, description: 'Primary care and general health' },
  { id: '2', name: 'Cardiologist', icon: '❤️', doctorCount: 185, description: 'Heart and cardiovascular system' },
  { id: '3', name: 'Dermatologist', icon: '🧴', doctorCount: 210, description: 'Skin, hair, and nail conditions' },
  { id: '4', name: 'Orthopedic', icon: '🦴', doctorCount: 165, description: 'Bones, joints, and muscles' },
  { id: '5', name: 'Neurologist', icon: '🧠', doctorCount: 120, description: 'Brain and nervous system' },
  { id: '6', name: 'Pediatrician', icon: '👶', doctorCount: 245, description: 'Children and infant care' },
  { id: '7', name: 'Gynecologist', icon: '🌸', doctorCount: 190, description: "Women's health and reproductive care" },
  { id: '8', name: 'ENT Specialist', icon: '👂', doctorCount: 135, description: 'Ear, nose, and throat' },
  { id: '9', name: 'Ophthalmologist', icon: '👁️', doctorCount: 150, description: 'Eye care and vision' },
  { id: '10', name: 'Psychiatrist', icon: '🧘', doctorCount: 95, description: 'Mental health and wellness' },
  { id: '11', name: 'Dentist', icon: '🦷', doctorCount: 280, description: 'Dental and oral health' },
  { id: '12', name: 'Pulmonologist', icon: '🫁', doctorCount: 85, description: 'Lungs and respiratory system' },
];

// ============================================
// DOCTORS (Demo Data)
// ============================================

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    qualifications: 'MBBS, MD (Cardiology), DM',
    registrationNumber: 'NMC-DEMO-001',
    verified: true,
    rating: 4.9,
    reviewCount: 234,
    fee: 800,
    distance: 2.3,
    location: 'Mumbai',
    area: 'Andheri West',
    availableToday: true,
    nextAvailable: 'Today, 4:00 PM',
    experience: 15,
    gender: 'Female',
    about: 'Experienced cardiologist specializing in preventive cardiology and heart failure management. [Demo profile]',
    tags: ['Heart Specialist', 'Preventive Care'],
    avatar: '',
    languages: ['English', 'Hindi', 'Marathi'],
    clinicName: 'HeartCare Clinic [Demo]',
    timings: 'Mon-Sat, 10:00 AM - 6:00 PM',
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Neurologist',
    qualifications: 'MBBS, DM (Neurology)',
    registrationNumber: 'NMC-DEMO-002',
    verified: true,
    rating: 4.8,
    reviewCount: 189,
    fee: 1000,
    distance: 3.1,
    location: 'Mumbai',
    area: 'Bandra East',
    availableToday: true,
    nextAvailable: 'Today, 5:30 PM',
    experience: 12,
    gender: 'Male',
    about: 'Neurologist with expertise in headache disorders, epilepsy, and stroke management. [Demo profile]',
    tags: ['Headache Expert', 'Stroke Care'],
    avatar: '',
    languages: ['English', 'Hindi'],
    clinicName: 'NeuroWell Center [Demo]',
    timings: 'Mon-Fri, 9:00 AM - 5:00 PM',
  },
  {
    id: '3',
    name: 'Dr. Ananya Patel',
    specialty: 'Dermatologist',
    qualifications: 'MBBS, MD (Dermatology)',
    registrationNumber: 'NMC-DEMO-003',
    verified: true,
    rating: 4.7,
    reviewCount: 312,
    fee: 600,
    distance: 1.8,
    location: 'Mumbai',
    area: 'Juhu',
    availableToday: false,
    nextAvailable: 'Tomorrow, 11:00 AM',
    experience: 8,
    gender: 'Female',
    about: 'Dermatologist specializing in cosmetic dermatology and skin allergy management. [Demo profile]',
    tags: ['Skin Care', 'Cosmetic'],
    avatar: '',
    languages: ['English', 'Hindi', 'Gujarati'],
    clinicName: 'SkinGlow Clinic [Demo]',
    timings: 'Mon-Sat, 11:00 AM - 7:00 PM',
  },
  {
    id: '4',
    name: 'Dr. Vikram Singh',
    specialty: 'Orthopedic',
    qualifications: 'MBBS, MS (Ortho), DNB',
    registrationNumber: 'NMC-DEMO-004',
    verified: true,
    rating: 4.6,
    reviewCount: 156,
    fee: 700,
    distance: 4.5,
    location: 'Mumbai',
    area: 'Powai',
    availableToday: true,
    nextAvailable: 'Today, 3:00 PM',
    experience: 20,
    gender: 'Male',
    about: 'Senior orthopedic surgeon with extensive experience in joint replacement and sports injuries. [Demo profile]',
    tags: ['Joint Replacement', 'Sports Medicine'],
    avatar: '',
    languages: ['English', 'Hindi', 'Punjabi'],
    clinicName: 'OrthoPlus Hospital [Demo]',
    timings: 'Mon-Sat, 9:00 AM - 4:00 PM',
  },
  {
    id: '5',
    name: 'Dr. Meera Reddy',
    specialty: 'Pediatrician',
    qualifications: 'MBBS, MD (Pediatrics)',
    registrationNumber: 'NMC-DEMO-005',
    verified: true,
    rating: 4.9,
    reviewCount: 420,
    fee: 500,
    distance: 2.0,
    location: 'Mumbai',
    area: 'Malad West',
    availableToday: true,
    nextAvailable: 'Today, 2:00 PM',
    experience: 10,
    gender: 'Female',
    about: 'Caring pediatrician specializing in newborn care, vaccinations, and childhood development. [Demo profile]',
    tags: ['Newborn Care', 'Vaccinations'],
    avatar: '',
    languages: ['English', 'Hindi', 'Telugu'],
    clinicName: 'Little Stars Clinic [Demo]',
    timings: 'Mon-Sat, 10:00 AM - 6:00 PM',
  },
  {
    id: '6',
    name: 'Dr. Arjun Mehta',
    specialty: 'General Physician',
    qualifications: 'MBBS, DNB (General Medicine)',
    registrationNumber: 'NMC-DEMO-006',
    verified: true,
    rating: 4.5,
    reviewCount: 278,
    fee: 400,
    distance: 0.8,
    location: 'Mumbai',
    area: 'Goregaon East',
    availableToday: true,
    nextAvailable: 'Today, 1:00 PM',
    experience: 7,
    gender: 'Male',
    about: 'General physician providing comprehensive primary care, preventive health checkups, and chronic disease management. [Demo profile]',
    tags: ['Primary Care', 'Health Checkup'],
    avatar: '',
    languages: ['English', 'Hindi'],
    clinicName: 'Wellness First Clinic [Demo]',
    timings: 'Mon-Sun, 8:00 AM - 8:00 PM',
  },
  {
    id: '7',
    name: 'Dr. Sunita Agarwal',
    specialty: 'Gynecologist',
    qualifications: 'MBBS, MS (OBG), DNB',
    registrationNumber: 'NMC-DEMO-007',
    verified: true,
    rating: 4.8,
    reviewCount: 345,
    fee: 900,
    distance: 3.7,
    location: 'Mumbai',
    area: 'Dadar West',
    availableToday: false,
    nextAvailable: 'Tomorrow, 10:00 AM',
    experience: 18,
    gender: 'Female',
    about: 'Experienced gynecologist and obstetrician specializing in high-risk pregnancies and minimally invasive surgeries. [Demo profile]',
    tags: ['High-Risk Pregnancy', 'Laparoscopic Surgery'],
    avatar: '',
    languages: ['English', 'Hindi', 'Marathi'],
    clinicName: 'Women\'s Health Center [Demo]',
    timings: 'Mon-Fri, 10:00 AM - 5:00 PM',
  },
  {
    id: '8',
    name: 'Dr. Karthik Nair',
    specialty: 'ENT Specialist',
    qualifications: 'MBBS, MS (ENT)',
    registrationNumber: 'NMC-DEMO-008',
    verified: false,
    rating: 4.4,
    reviewCount: 98,
    fee: 550,
    distance: 5.2,
    location: 'Mumbai',
    area: 'Thane West',
    availableToday: true,
    nextAvailable: 'Today, 6:00 PM',
    experience: 5,
    gender: 'Male',
    about: 'ENT specialist focusing on hearing disorders, sinus conditions, and throat problems. [Demo profile]',
    tags: ['Hearing', 'Sinus Treatment'],
    avatar: '',
    languages: ['English', 'Hindi', 'Malayalam'],
    clinicName: 'Clear ENT Clinic [Demo]',
    timings: 'Mon-Sat, 11:00 AM - 7:00 PM',
  },
];

// ============================================
// APPOINTMENTS (Demo Data)
// ============================================

export const sampleAppointments: Appointment[] = [
  { id: '1', doctorName: 'Dr. Priya Sharma', doctorSpecialty: 'Cardiologist', date: '2026-10-25', time: '4:00 PM', status: 'upcoming', type: 'in-person' },
  { id: '2', doctorName: 'Dr. Meera Reddy', doctorSpecialty: 'Pediatrician', date: '2026-10-28', time: '11:00 AM', status: 'upcoming', type: 'online' },
  { id: '3', doctorName: 'Dr. Arjun Mehta', doctorSpecialty: 'General Physician', date: '2026-10-15', time: '2:00 PM', status: 'completed', type: 'in-person' },
  { id: '4', doctorName: 'Dr. Ananya Patel', doctorSpecialty: 'Dermatologist', date: '2026-10-10', time: '3:30 PM', status: 'completed', type: 'in-person' },
];

// ============================================
// MEDICAL RECORDS (Demo Data)
// ============================================

export const sampleRecords: MedicalRecord[] = [
  { id: '1', title: 'Annual Health Checkup Report', category: 'lab-report', date: '2026-10-15', doctor: 'Dr. Arjun Mehta', summary: 'Complete blood count, lipid profile, liver function — all within normal ranges. [Demo record]', tags: ['Routine', 'Blood Test'] },
  { id: '2', title: 'Skin Allergy Consultation', category: 'consultation', date: '2026-10-10', doctor: 'Dr. Ananya Patel', summary: 'Contact dermatitis diagnosed. Antihistamine and topical cream prescribed. [Demo record]', tags: ['Allergy', 'Skin'] },
  { id: '3', title: 'Blood Pressure Medication', category: 'medication', date: '2026-09-20', doctor: 'Dr. Priya Sharma', summary: 'Amlodipine 5mg — once daily, ongoing. [Demo record]', tags: ['BP', 'Ongoing'] },
  { id: '4', title: 'Penicillin Allergy', category: 'allergy', date: '2026-01-15', doctor: 'Dr. Arjun Mehta', summary: 'Known allergy to Penicillin group antibiotics. Causes rash and swelling. [Demo record]', tags: ['Drug Allergy', 'Critical'] },
  { id: '5', title: 'Chest X-Ray Report', category: 'lab-report', date: '2026-09-05', doctor: 'Dr. Priya Sharma', summary: 'Chest X-ray PA view — normal study, no abnormalities detected. [Demo record]', tags: ['Radiology', 'Normal'] },
  { id: '6', title: 'Knee Pain Prescription', category: 'prescription', date: '2026-08-12', doctor: 'Dr. Vikram Singh', summary: 'Prescribed physiotherapy and anti-inflammatory medication for mild knee strain. [Demo record]', tags: ['Orthopedic', 'Physiotherapy'] },
];

// ============================================
// TRIAGE RESPONSES (Demo Simulation)
// ============================================

export const triageResponses: Record<string, TriageResult> = {
  'chest-pain': {
    urgency: 'emergency',
    title: '🚨 Seek Emergency Care Immediately',
    description: 'Chest pain can be a sign of a serious cardiac event. Please call emergency services (112) or go to the nearest emergency room immediately. Do not delay seeking care.',
    specialties: ['Emergency Medicine', 'Cardiologist'],
    actions: ['Call 112 immediately', 'Go to nearest emergency room', 'Do not drive yourself'],
  },
  'headache': {
    urgency: 'routine',
    title: 'Routine Medical Consultation Recommended',
    description: 'Based on the information provided, a routine consultation with a specialist may be appropriate. This is a prototype assessment — please consult a qualified doctor for proper evaluation.',
    specialties: ['General Physician', 'Neurologist'],
    actions: ['Schedule an appointment within a few days', 'Monitor symptoms', 'Stay hydrated and rest'],
  },
  'breathing': {
    urgency: 'urgent',
    title: '⚠️ Urgent Medical Evaluation Needed',
    description: 'Breathing difficulties should be evaluated promptly by a medical professional. If symptoms are severe or worsening, seek emergency care immediately.',
    specialties: ['Pulmonologist', 'General Physician', 'Emergency Medicine'],
    actions: ['See a doctor today if possible', 'Go to emergency if symptoms worsen', 'Sit upright and try to stay calm'],
  },
  'fever': {
    urgency: 'routine',
    title: 'Routine Consultation Suggested',
    description: 'Mild to moderate fever often resolves on its own. However, if fever persists beyond 3 days or is very high, consult a doctor. This is a prototype assessment.',
    specialties: ['General Physician'],
    actions: ['Rest and stay hydrated', 'Take temperature regularly', 'Consult if fever persists beyond 3 days'],
  },
  'default': {
    urgency: 'routine',
    title: 'Professional Assessment Recommended',
    description: 'Based on the symptoms described, we recommend consulting a qualified healthcare professional for proper evaluation. This is a demonstration triage and should not be used for real medical decisions.',
    specialties: ['General Physician'],
    actions: ['Schedule an appointment with a doctor', 'Keep a note of your symptoms', 'Seek emergency care if symptoms worsen suddenly'],
  },
};

// ============================================
// PATIENT PROFILE & DASHBOARD DATA
// ============================================

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  uhid: string;
  contact: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: Array<{ name: string; severity: 'High' | 'Moderate' | 'Low'; diagnosed: string }>;
  medications: Array<{ name: string; dosage: string; frequency: string; prescribedBy: string; timing: string }>;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    bloodSugar: string;
    spO2: string;
    lastUpdated: string;
  };
}

export const samplePatientProfile: PatientProfile = {
  id: 'PAT-2026-908',
  name: 'Rahul Sharma',
  age: 32,
  gender: 'Male',
  bloodGroup: 'B+ (Positive)',
  uhid: 'HB-8849-2026',
  contact: '+91 98765 43210',
  emergencyContact: {
    name: 'Sunita Sharma (Spouse)',
    relation: 'Spouse',
    phone: '+91 98765 43211',
  },
  allergies: [
    { name: 'Penicillin / Amoxicillin', severity: 'High', diagnosed: 'Jan 2024' },
    { name: 'Dust Mites & Pollen', severity: 'Moderate', diagnosed: 'Mar 2023' },
    { name: 'Sulfa Drugs', severity: 'High', diagnosed: 'Oct 2021' },
  ],
  medications: [
    { name: 'Amlodipine 5mg', dosage: '1 Tablet', frequency: 'Once Daily', prescribedBy: 'Dr. Priya Sharma', timing: 'Morning after food' },
    { name: 'Vitamin D3 60K', dosage: '1 Capsule', frequency: 'Weekly', prescribedBy: 'Dr. Arjun Mehta', timing: 'Sunday Morning' },
    { name: 'Cetirizine 10mg', dosage: '1 Tablet', frequency: 'As Needed (PRN)', prescribedBy: 'Dr. Ananya Patel', timing: 'Bedtime for allergies' },
  ],
  vitals: {
    bloodPressure: '122/80 mmHg',
    heartRate: '72 bpm',
    bloodSugar: '98 mg/dL (Fasting)',
    spO2: '99%',
    lastUpdated: 'Today, 8:30 AM',
  },
};

// ============================================
// DOCTOR DASHBOARD DATA
// ============================================

export interface DoctorAppointmentQueue {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  uhid: string;
  timeSlot: string;
  type: 'In-Clinic' | 'Video Call';
  chiefComplaint: string;
  status: 'Waiting' | 'In-Progress' | 'Completed' | 'Upcoming';
  vaultAccessGranted: boolean;
  triageSummary?: string;
}

export const sampleDoctorAppointments: DoctorAppointmentQueue[] = [
  {
    id: 'APT-101',
    patientName: 'Rahul Sharma',
    patientAge: 32,
    patientGender: 'M',
    uhid: 'HB-8849-2026',
    timeSlot: '04:00 PM',
    type: 'In-Clinic',
    chiefComplaint: 'Chest tightness after light exertion, BP checkup',
    status: 'Upcoming',
    vaultAccessGranted: true,
    triageSummary: 'AI Triage: Mild cardiac risk inquiry; recommended in-person ECG and lipid evaluation.',
  },
  {
    id: 'APT-102',
    patientName: 'Anita Deshmukh',
    patientAge: 48,
    patientGender: 'F',
    uhid: 'HB-7721-2025',
    timeSlot: '04:30 PM',
    type: 'In-Clinic',
    chiefComplaint: 'Post-CABG 6-month routine review & echocardiogram follow-up',
    status: 'Waiting',
    vaultAccessGranted: true,
  },
  {
    id: 'APT-103',
    patientName: 'Vikram Joshi',
    patientAge: 61,
    patientGender: 'M',
    uhid: 'HB-3304-2024',
    timeSlot: '05:00 PM',
    type: 'Video Call',
    chiefComplaint: 'Heart rate irregularities at night; Holter report review',
    status: 'Upcoming',
    vaultAccessGranted: false,
  },
  {
    id: 'APT-104',
    patientName: 'Kavita Iyer',
    patientAge: 29,
    patientGender: 'F',
    uhid: 'HB-9912-2026',
    timeSlot: '03:15 PM',
    type: 'In-Clinic',
    chiefComplaint: 'Palpitations during stressful periods; normal baseline ECG',
    status: 'Completed',
    vaultAccessGranted: true,
  },
];

// ============================================
// ADMIN DASHBOARD DATA
// ============================================

export interface DoctorApplication {
  id: string;
  doctorName: string;
  specialty: string;
  smcRegistrationNumber: string;
  stateMedicalCouncil: string;
  qualification: string;
  medicalCollege: string;
  experienceYears: number;
  submittedAt: string;
  status: 'Pending Review' | 'Verified' | 'Flagged' | 'Rejected';
  documents: Array<{ type: string; filename: string; verified: boolean }>;
}

export const sampleDoctorApplications: DoctorApplication[] = [
  {
    id: 'APP-NMC-801',
    doctorName: 'Dr. Rajeshwari Sen',
    specialty: 'Endocrinologist',
    smcRegistrationNumber: 'MMC-2014-04981',
    stateMedicalCouncil: 'Maharashtra Medical Council',
    qualification: 'MBBS, MD (Medicine), DM (Endocrinology)',
    medicalCollege: 'Grant Medical College & Sir JJ Group of Hospitals, Mumbai',
    experienceYears: 11,
    submittedAt: 'Today, 11:20 AM',
    status: 'Pending Review',
    documents: [
      { type: 'NMC / State Registration Certificate', filename: 'MMC_Reg_Sen_2014.pdf', verified: true },
      { type: 'MD Degree Certificate', filename: 'MD_Degree_GMC_Mumbai.pdf', verified: true },
      { type: 'Government Photo ID', filename: 'Aadhaar_Redacted_RS.pdf', verified: true },
    ],
  },
  {
    id: 'APP-NMC-802',
    doctorName: 'Dr. Vivek Saxena',
    specialty: 'Oncologist',
    smcRegistrationNumber: 'DMC-2011-88120',
    stateMedicalCouncil: 'Delhi Medical Council',
    qualification: 'MBBS, MS (General Surgery), MCh (Surgical Oncology)',
    medicalCollege: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
    experienceYears: 14,
    submittedAt: 'Yesterday, 04:45 PM',
    status: 'Pending Review',
    documents: [
      { type: 'State Medical Council Certificate', filename: 'DMC_Registration_2011.pdf', verified: true },
      { type: 'MCh Surgical Oncology Certificate', filename: 'AIIMS_MCh_Cert.pdf', verified: true },
    ],
  },
  {
    id: 'APP-NMC-803',
    doctorName: 'Dr. Karthik Nair',
    specialty: 'ENT Specialist',
    smcRegistrationNumber: 'NMC-DEMO-008',
    stateMedicalCouncil: 'Maharashtra Medical Council',
    qualification: 'MBBS, MS (ENT)',
    medicalCollege: 'Topiwala National Medical College (Nair Hospital), Mumbai',
    experienceYears: 5,
    submittedAt: '3 days ago',
    status: 'Pending Review',
    documents: [
      { type: 'State Medical Registration', filename: 'Reg_Certificate_KN.pdf', verified: false },
      { type: 'Post-Graduate MS Degree', filename: 'MS_ENT_Degree.pdf', verified: true },
    ],
  },
];

export interface ConsentAuditLog {
  id: string;
  patientUhid: string;
  doctorName: string;
  recordCategory: string;
  action: 'Access Granted' | 'Access Revoked' | 'Access Expired' | 'Consent Requested';
  timestamp: string;
  ipAddress: string;
  validity: string;
}

export const sampleConsentAuditLogs: ConsentAuditLog[] = [
  { id: 'LOG-9921', patientUhid: 'HB-8849-2026', doctorName: 'Dr. Priya Sharma (Cardiology)', recordCategory: 'Cardiac Lab & Prescription Records', action: 'Access Granted', timestamp: '2026-10-22 14:10:00', ipAddress: '103.21.144.12', validity: '24 Hours (Expires Tomorrow)' },
  { id: 'LOG-9920', patientUhid: 'HB-8849-2026', doctorName: 'Dr. Arjun Mehta (General Physician)', recordCategory: 'Routine Blood Panel & Allergies', action: 'Access Granted', timestamp: '2026-10-15 09:30:15', ipAddress: '103.21.144.18', validity: '72 Hours (Expired)' },
  { id: 'LOG-9919', patientUhid: 'HB-8849-2026', doctorName: 'Dr. Vikram Singh (Orthopedic)', recordCategory: 'All Records', action: 'Access Revoked', timestamp: '2026-08-15 16:45:00', ipAddress: '103.21.144.12', validity: 'Manual Revoke by Patient' },
];

// ============================================
// EMERGENCY CENTERS & HELPLINES
// ============================================

export interface EmergencyCenter {
  id: string;
  name: string;
  address: string;
  area: string;
  distance: string;
  phone: string;
  emergencyNumber: string;
  traumaLevel: 'Level 1 Trauma Center' | 'Level 2 Trauma Center' | '24/7 Emergency Care';
  icuBedsAvailable: number;
  cardiacCareUnit: boolean;
  ambulanceAvailable: boolean;
  estTime: string;
}

export const emergencyCenters: EmergencyCenter[] = [
  {
    id: 'EM-1',
    name: 'KEM Hospital & Seth GS Medical College',
    address: 'Acharya Donde Marg, Parel, Mumbai, Maharashtra 400012',
    area: 'Parel (Central Mumbai)',
    distance: '3.4 km',
    phone: '022 2410 7000',
    emergencyNumber: '022 2413 6051',
    traumaLevel: 'Level 1 Trauma Center',
    icuBedsAvailable: 8,
    cardiacCareUnit: true,
    ambulanceAvailable: true,
    estTime: '8-12 mins',
  },
  {
    id: 'EM-2',
    name: 'Lilavati Hospital & Research Centre',
    address: 'A-791, Bandra Reclamation, Bandra West, Mumbai 400050',
    area: 'Bandra West (Western Suburbs)',
    distance: '2.1 km',
    phone: '022 2675 1000',
    emergencyNumber: '022 2656 8000',
    traumaLevel: 'Level 1 Trauma Center',
    icuBedsAvailable: 12,
    cardiacCareUnit: true,
    ambulanceAvailable: true,
    estTime: '6-10 mins',
  },
  {
    id: 'EM-3',
    name: 'P. D. Hinduja National Hospital',
    address: 'Veer Savarkar Marg, Mahim, Mumbai 400016',
    area: 'Mahim',
    distance: '4.2 km',
    phone: '022 2445 1515',
    emergencyNumber: '022 2445 2222',
    traumaLevel: 'Level 1 Trauma Center',
    icuBedsAvailable: 6,
    cardiacCareUnit: true,
    ambulanceAvailable: true,
    estTime: '12-15 mins',
  },
  {
    id: 'EM-4',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    address: 'Rao Saheb, Achutrao Patwardhan Marg, 4 Bungalows, Andheri West, Mumbai 400053',
    area: 'Andheri West',
    distance: '5.8 km',
    phone: '022 4269 6969',
    emergencyNumber: '022 4269 9999',
    traumaLevel: 'Level 1 Trauma Center',
    icuBedsAvailable: 14,
    cardiacCareUnit: true,
    ambulanceAvailable: true,
    estTime: '15-20 mins',
  },
];

