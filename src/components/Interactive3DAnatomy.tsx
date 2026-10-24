'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Heart,
  Activity,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  CalendarCheck,
  Stethoscope,
  ChevronRight,
  Rotate3d,
  Layers,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  AlertTriangle,
  Flame,
  Zap,
  Eye,
  Info,
  PhoneCall,
  Sliders,
  Check,
  Search,
  ExternalLink,
} from 'lucide-react';
import { doctors } from '@/lib/mockData';

// ── Anatomical System Layer Types ──
type AnatomyLayer = 'all' | 'skeletal' | 'visceral' | 'neural' | 'muscular';

// ── Illustrative Symptom Data Structure ──
export interface IllustrativeSymptom {
  name: string;
  clinicalName: string;
  character: 'Burning Acidic' | 'Pulsatile Throbbing' | 'Sharp Stabbing' | 'Dull Deep Ache' | 'Squeezing Vice' | 'Electric Shooting' | 'Constriction Wheeze' | 'Itchy Erythema';
  radiation: string;
  trigger: string;
  relief: string;
  severity: number; // 1 - 10
  urgency: 'emergency' | 'urgent' | 'routine' | 'self-care';
  icon: string;
  diagramDescription: string;
}

export interface DetailedBodyZone {
  id: string;
  name: string;
  subTitle: string;
  icon: string;
  badge: string;
  system: 'visceral' | 'skeletal' | 'neural' | 'muscular';
  specialty: string;
  pin: { x: number; y: number }; // percentage on 200x420 body grid
  color: string;
  doctorId: string;
  description: string;
  clinicalAnatomy: string[];
  illustrativeSymptoms: IllustrativeSymptom[];
}

export const DETAILED_BODY_ZONES: DetailedBodyZone[] = [
  {
    id: 'cranial',
    name: 'Cranial & Cerebrum',
    subTitle: 'Brain, Meninges & Cranial Nerves',
    icon: '🧠',
    badge: 'Neurology',
    system: 'visceral',
    specialty: 'Neurologist',
    pin: { x: 50, y: 11 },
    color: '#8B5CF6',
    doctorId: '2', // Dr. Rajesh Kumar
    description: 'Central nervous system command center. Manages migraines, vascular throbbing, vestibular vertigo, sleep disturbances, and cognitive clarity.',
    clinicalAnatomy: ['Frontal & Parietal Cortex', 'Meningeal Vasculature', 'Trigeminal Nerve (CN V)', 'Vestibular System'],
    illustrativeSymptoms: [
      {
        name: 'Hemicranial Migraine',
        clinicalName: 'Migraine with/without Aura',
        character: 'Pulsatile Throbbing',
        radiation: 'Frontotemporal to occipital and behind one eye',
        trigger: 'Screen glare, hormonal shifts, sleep deprivation, aged cheese',
        relief: 'Dark quiet room, triptans, cold compress, hydration',
        severity: 8,
        urgency: 'urgent',
        icon: '⚡',
        diagramDescription: 'Unilateral cortical spreading depression with temporal arterial pulsating waves.',
      },
      {
        name: 'Tension-Type Band Headache',
        clinicalName: 'Cephalea Tensionalis',
        character: 'Dull Deep Ache',
        radiation: 'Bilateral vice-like constricting band circling forehead',
        trigger: 'Cervical muscle contraction, screen strain, chronic stress',
        relief: 'Neck stretches, ergonomic correction, mild analgesics',
        severity: 4,
        urgency: 'routine',
        icon: '🤕',
        diagramDescription: 'Bilateral pericranial myofascial hyper-tenderness around scalp & forehead.',
      },
      {
        name: 'Labyrinthine Vertigo',
        clinicalName: 'Benign Paroxysmal Positional Vertigo (BPPV)',
        character: 'Electric Shooting',
        radiation: 'Sensation of room violently spinning on head tilt',
        trigger: 'Rapid roll in bed, looking up, sudden cervical flexion',
        relief: 'Epley maneuver, vestibulo-ocular repositioning',
        severity: 6,
        urgency: 'routine',
        icon: '🌀',
        diagramDescription: 'Displaced canalith particles in posterior semicircular ear canals.',
      },
      {
        name: 'Thunderclap Headache',
        clinicalName: 'Subarachnoid Hemorrhage Suspect',
        character: 'Sharp Stabbing',
        radiation: 'Instantaneous peak intensity throughout cranium (<60s)',
        trigger: 'Sudden onset during exertion or spontaneous rupture',
        relief: 'IMMEDIATE EMERGENCY ROOM EVALUATION REQUIRED',
        severity: 10,
        urgency: 'emergency',
        icon: '🚨',
        diagramDescription: 'Aneurysmal bleed warning — red flag for urgent neuroimaging.',
      },
    ],
  },
  {
    id: 'eyes',
    name: 'Ocular & Visual Orbit',
    subTitle: 'Eyes, Cornea, Retina & Optic Nerve',
    icon: '👁️',
    badge: 'Ophthalmology',
    system: 'visceral',
    specialty: 'Ophthalmologist',
    pin: { x: 50, y: 16 },
    color: '#06B6D4',
    doctorId: '9', // Dr. Shalini Verma
    description: 'Optical refractive lens and neural retina. Specialized in computer vision syndrome, glaucoma intraocular pressure, and retinal health.',
    clinicalAnatomy: ['Cornea & Lens', 'Retinal Photoreceptors', 'Optic Nerve Disc', 'Ciliary Eye Muscles'],
    illustrativeSymptoms: [
      {
        name: 'Digital Eye Fatigue',
        clinicalName: 'Asthenopia / Computer Vision Syndrome',
        character: 'Dull Deep Ache',
        radiation: 'Retro-orbital burning spreading to brow arch',
        trigger: 'Prolonged blue light, lack of blinking, dry ambient AC',
        relief: '20-20-20 rule, lubricating artificial tears, screen dimming',
        severity: 3,
        urgency: 'self-care',
        icon: '💻',
        diagramDescription: 'Ciliary muscle spasm with tear film hyper-evaporation.',
      },
      {
        name: 'Acute Angle-Closure Glaucoma',
        clinicalName: 'Ocular Hypertension Crisis',
        character: 'Sharp Stabbing',
        radiation: 'Severe orbital pain with rainbow halos around lights & nausea',
        trigger: 'Pupillary dilation in dark room, predisposed shallow angle',
        relief: 'EMERGENCY OPHTHALMIC CARE — IV Mannitol / Iridotomy',
        severity: 10,
        urgency: 'emergency',
        icon: '🚨',
        diagramDescription: 'Trabecular meshwork blockage causing explosive intraocular pressure rise.',
      },
      {
        name: 'Allergic Conjunctivitis',
        clinicalName: 'Vernal / Seasonal Conjunctivitis',
        character: 'Itchy Erythema',
        radiation: 'Bilateral watery hyperemic conjunctiva with gritty feel',
        trigger: 'Pollen, dust mites, pet dander, aerosolized chemicals',
        relief: 'Antihistamine eye drops, cold compress, avoiding eye rub',
        severity: 4,
        urgency: 'routine',
        icon: '🧴',
        diagramDescription: 'Mast cell degranulation across tarsal & bulbar conjunctival membranes.',
      },
    ],
  },
  {
    id: 'ent',
    name: 'ENT, Sinuses & Pharynx',
    subTitle: 'Paranasal Sinuses, Inner Ear & Throat',
    icon: '👂',
    badge: 'ENT Specialist',
    system: 'visceral',
    specialty: 'ENT Specialist',
    pin: { x: 50, y: 20 },
    color: '#EC4899',
    doctorId: '8', // Dr. Karthik Nair
    description: 'Aerodigestive gateway. Diagnostic relief for maxillary sinusitis, Eustachian tube block, tonsillar hypertrophy, and chronic hoarseness.',
    clinicalAnatomy: ['Frontal & Maxillary Sinuses', 'Eustachian Tube', 'Palatine Tonsils', 'Vocal Cords & Larynx'],
    illustrativeSymptoms: [
      {
        name: 'Maxillary Sinusitis',
        clinicalName: 'Acute Rhinosinusitis',
        character: 'Dull Deep Ache',
        radiation: 'Facial fullness over cheekbones, worsened upon bending forward',
        trigger: 'Viral upper respiratory cold, deviated nasal septum, mold spores',
        relief: 'Steam inhalation, hypertonic saline rinse, nasal steroid spray',
        severity: 5,
        urgency: 'routine',
        icon: '👃',
        diagramDescription: 'Mucosal edema obstructing the osteomeatal complex drainage.',
      },
      {
        name: 'Streptococcal Tonsillitis',
        clinicalName: 'Acute Exudative Pharyngitis',
        character: 'Sharp Stabbing',
        radiation: 'Severe odynophagia (swallowing pain) radiating to ipsilateral ear',
        trigger: 'Group A Streptococcus bacteria or viral Epstein-Barr contagion',
        relief: 'Antibiotic therapy (if culture +), warm salt gargles, hydration',
        severity: 7,
        urgency: 'urgent',
        icon: '🔥',
        diagramDescription: 'Erythematous tonsils studded with cryptal purulent exudate.',
      },
    ],
  },
  {
    id: 'heart',
    name: 'Cardiac & Thoracic Aorta',
    subTitle: 'Myocardium, Coronary Arteries & Pericardium',
    icon: '❤️',
    badge: 'Cardiology',
    system: 'visceral',
    specialty: 'Cardiologist',
    pin: { x: 52, y: 31 },
    color: '#EF4444',
    doctorId: '1', // Dr. Priya Sharma
    description: 'Cardiovascular circulatory pump. Comprehensive screening for coronary ischemia, hypertensive remodeling, tachyarrhythmias, and valvular health.',
    clinicalAnatomy: ['Left Ventricle Myocardium', 'LAD & Circumflex Arteries', 'Ascending Aorta', 'Sinoatrial (SA) Node'],
    illustrativeSymptoms: [
      {
        name: 'Angina Pectoris / Coronary Ischemia',
        clinicalName: 'Myocardial Ischemia / Acute Coronary Syndrome',
        character: 'Squeezing Vice',
        radiation: 'Retrosternal heaviness radiating to left shoulder, inner arm & jaw',
        trigger: 'Physical exertion, intense emotional stress, cold wind',
        relief: 'Rest within 5 minutes, sublingual nitroglycerin, ER 112 if >15 min',
        severity: 9,
        urgency: 'emergency',
        icon: '🚨',
        diagramDescription: 'Coronary artery atherosclerotic narrowing restricting oxygenated myocardial flow.',
      },
      {
        name: 'Supraventricular Palpitations',
        clinicalName: 'Paroxysmal Tachycardia',
        character: 'Pulsatile Throbbing',
        radiation: 'Sudden rapid flutter in neck vessels, lightheadedness',
        trigger: 'Excessive caffeine, dehydration, nicotine, anxiety, electrolyte drop',
        relief: 'Vagal maneuvers (Valsalva, cold water splash), beta-blockers',
        severity: 6,
        urgency: 'urgent',
        icon: '💓',
        diagramDescription: 'Ectopic re-entrant electrical circuit bypassing normal AV nodal delay.',
      },
      {
        name: 'Acute Pericarditis',
        clinicalName: 'Pericardial Sac Inflammation',
        character: 'Sharp Stabbing',
        radiation: 'Precordial chest catch radiating to left trapezius ridge',
        trigger: 'Viral infection, autoimmune flare, deep inspiration',
        relief: 'Leaning forward / sitting up relieves pain; lying supine worsens',
        severity: 7,
        urgency: 'urgent',
        icon: '🛡️',
        diagramDescription: 'Friction rub between parietal and visceral pericardial layers.',
      },
    ],
  },
  {
    id: 'lungs',
    name: 'Pulmonary & Bronchial Tree',
    subTitle: 'Bronchi, Alveoli & Pleural Membrane',
    icon: '🫁',
    badge: 'Pulmonology',
    system: 'visceral',
    specialty: 'Pulmonologist',
    pin: { x: 43, y: 33 },
    color: '#0D9488',
    doctorId: '10', // Dr. Rohan Joshi
    description: 'Gas exchange respiratory matrix. Clinical expertise in bronchial asthma hyper-reactivity, COPD airway clearance, chronic cough, and allergy asthma.',
    clinicalAnatomy: ['Tracheobronchial Tree', 'Alveolar Capillary Unit', 'Visceral & Parietal Pleura', 'Diaphragmatic Muscle'],
    illustrativeSymptoms: [
      {
        name: 'Bronchial Asthma Flare',
        clinicalName: 'Reversible Airway Hyper-reactivity',
        character: 'Constriction Wheeze',
        radiation: 'Bilateral chest tightness with high-pitched expiratory musical sound',
        trigger: 'Cold night air, dust mites, post-viral airway hyper-reactivity, pollen',
        relief: 'Short-acting beta-2 bronchodilator (Salbutamol inhaler)',
        severity: 8,
        urgency: 'urgent',
        icon: '🌬️',
        diagramDescription: 'Smooth muscle bronchospasm combined with thick mucus plugging.',
      },
      {
        name: 'Pleuritic Chest Catch',
        clinicalName: 'Pleural Inflammation / Consolidation',
        character: 'Sharp Stabbing',
        radiation: 'Sharp localized knife-like stitch worsening on each deep breath',
        trigger: 'Pneumonia consolidation, viral pleurodynia, pulmonary embolism',
        relief: 'Splinting affected side, antibiotics (if bacterial), anti-inflammatory',
        severity: 7,
        urgency: 'urgent',
        icon: '🔪',
        diagramDescription: 'Inflamed rough pleural membranes rubbing together on lung expansion.',
      },
    ],
  },
  {
    id: 'stomach',
    name: 'Gastric & Gastroesophageal',
    subTitle: 'Esophagus, Stomach Curvature & Duodenum',
    icon: '🥑',
    badge: 'Gastroenterology',
    system: 'visceral',
    specialty: 'General Physician',
    pin: { x: 51, y: 44 },
    color: '#F59E0B',
    doctorId: '6', // Dr. Arjun Mehta
    description: 'Digestive acid breakdown hub. Relief for GERD acid regurgitation, H. pylori peptic ulcers, functional dyspepsia, and chronic gastritis.',
    clinicalAnatomy: ['Lower Esophageal Sphincter', 'Gastric Fundus & Antrum', 'Pyloric Sphincter', 'Duodenal Bulb'],
    illustrativeSymptoms: [
      {
        name: 'Gastroesophageal Reflux (GERD)',
        clinicalName: 'Acid Peptic Esophagitis',
        character: 'Burning Acidic',
        radiation: 'Rising fiery retrosternal burn climbing to throat with sour taste',
        trigger: 'Late-night heavy meals, spicy oily dishes, caffeine, recumbency',
        relief: 'Proton pump inhibitors (PPI), upright posture, antacid gel',
        severity: 5,
        urgency: 'routine',
        icon: '🔥',
        diagramDescription: 'Incompetent LES valve permitting caustic gastric HCl backflow into esophagus.',
      },
      {
        name: 'Peptic Ulcer Disease',
        clinicalName: 'Gastric / Duodenal Erosion',
        character: 'Dull Deep Ache',
        radiation: 'Gnawing epigastric hollow hunger ache 2 hours after eating',
        trigger: 'H. pylori bacterial colonization, chronic NSAID painkillers, fasting',
        relief: 'Food intake (duodenal) or PPI therapy; avoid NSAIDs',
        severity: 6,
        urgency: 'routine',
        icon: '🕳️',
        diagramDescription: 'Disruption of protective mucosal bicarbonate barrier by acid-pepsin.',
      },
    ],
  },
  {
    id: 'liver',
    name: 'Hepatic & Biliary System',
    subTitle: 'Liver Lobes, Gallbladder & Bile Duct',
    icon: '🫒',
    badge: 'Hepatology',
    system: 'visceral',
    specialty: 'General Physician',
    pin: { x: 42, y: 44 },
    color: '#EAB308',
    doctorId: '6', // Dr. Arjun Mehta
    description: 'Metabolic detox and fat emulsification center. Evaluation for biliary cholelithiasis, non-alcoholic fatty liver, and hepatic enzyme balance.',
    clinicalAnatomy: ['Right & Left Hepatic Lobes', 'Gallbladder Fundus', 'Common Bile Duct', 'Portal Venous System'],
    illustrativeSymptoms: [
      {
        name: 'Biliary Colic / Gallstones',
        clinicalName: 'Symptomatic Cholelithiasis',
        character: 'Squeezing Vice',
        radiation: 'Right Upper Quadrant (RUQ) crescendo pain radiating to right scapula',
        trigger: 'High-fat meal (fried foods, cheese) stimulating cholecystokinin release',
        relief: 'Spasmolytics, low-fat diet, laparoscopic elective cholecystectomy',
        severity: 8,
        urgency: 'urgent',
        icon: '💎',
        diagramDescription: 'Gallstone intermittently impaction in the cystic duct neck during contraction.',
      },
      {
        name: 'Hepatic Distension / Fatty Liver',
        clinicalName: 'Hepatic Steatosis Glisson Capsule Tension',
        character: 'Dull Deep Ache',
        radiation: 'Right hypochondriac heaviness and chronic lethargy',
        trigger: 'Metabolic syndrome, high-fructose syrup diet, insulin resistance',
        relief: 'Cardiovascular exercise, Mediterranean diet, antioxidant support',
        severity: 3,
        urgency: 'routine',
        icon: '🌿',
        diagramDescription: 'Triglyceride accumulation expanding hepatocytes and stretching Glisson capsule.',
      },
    ],
  },
  {
    id: 'kidneys',
    name: 'Renal & Flank System',
    subTitle: 'Kidneys, Nephrons, Ureters & Adrenals',
    icon: '🫘',
    badge: 'Nephrology',
    system: 'visceral',
    specialty: 'General Physician',
    pin: { x: 57, y: 50 },
    color: '#D97706',
    doctorId: '6', // Dr. Arjun Mehta
    description: 'Fluid, electrolyte, and waste filtration. Critical evaluation for nephrolithiasis kidney stones, pyelonephritis, and hypertension filtration.',
    clinicalAnatomy: ['Renal Pelvis & Calyces', '1 Million Nephron Filters', 'Muscular Ureter Tubes', 'Adrenal Cortex'],
    illustrativeSymptoms: [
      {
        name: 'Acute Renal Colic (Kidney Stone)',
        clinicalName: 'Ureterolithiasis Spasm',
        character: 'Sharp Stabbing',
        radiation: 'Agonizing flank pain radiating down along loin to groin & inner thigh',
        trigger: 'Dehydration, high oxalate foods, calcium precipitation, uric acid spike',
        relief: 'Copious IV hydration, alpha-blocker ureteral relaxants, lithotripsy',
        severity: 9,
        urgency: 'urgent',
        icon: '⚡',
        diagramDescription: 'Jagged crystalline stone causing proximal hydronephrosis and ureteral hyper-peristalsis.',
      },
      {
        name: 'Ascending Pyelonephritis',
        clinicalName: 'Upper Urinary Tract Bacterial Infection',
        character: 'Dull Deep Ache',
        radiation: 'High fever, shaking chills, and sharp tenderness at costovertebral angle',
        trigger: 'Untreated lower bladder cystitis ascending via ureters',
        relief: 'Targeted antibiotic therapy, urine culture sensitivity, antipyretics',
        severity: 8,
        urgency: 'urgent',
        icon: '🔥',
        diagramDescription: 'Bacterial colonization causing renal parenchymal inflammation and edema.',
      },
    ],
  },
  {
    id: 'colon',
    name: 'Intestines, Colon & Appendix',
    subTitle: 'Small Intestine, Colon Loops & Appendix',
    icon: '🥣',
    badge: 'Colorectal & GI',
    system: 'visceral',
    specialty: 'General Physician',
    pin: { x: 50, y: 54 },
    color: '#10B981',
    doctorId: '6', // Dr. Arjun Mehta
    description: 'Nutrient absorption and microbiome ecosystem. Care for acute appendicitis warning, irritable bowel syndrome (IBS), and food intolerances.',
    clinicalAnatomy: ['Cecum & Appendix (McBurney)', 'Ascending & Descending Colon', 'Small Bowel Mesentery', 'Rectosigmoid Junction'],
    illustrativeSymptoms: [
      {
        name: 'Acute Appendicitis',
        clinicalName: 'Appendiceal Luminal Obstruction',
        character: 'Sharp Stabbing',
        radiation: 'Began periumbilical, migrated to sharp Right Lower Quadrant (McBurney)',
        trigger: 'Fecalith obstruction causing closed-loop bacterial overgrowth',
        relief: 'EMERGENCY SURGICAL APPENDECTOMY — DO NOT TAKE LAXATIVES',
        severity: 9,
        urgency: 'emergency',
        icon: '🚨',
        diagramDescription: 'Progressive appendiceal distension risking gangrenous perforation and peritonitis.',
      },
      {
        name: 'Irritable Bowel Syndrome (IBS)',
        clinicalName: 'Functional Gut-Brain Dysmotility',
        character: 'Dull Deep Ache',
        radiation: 'Lower abdominal cramping relieved completely after bowel evacuation',
        trigger: 'FODMAP sugars, psychological anxiety, gut dysbiosis after antibiotics',
        relief: 'Soluble psyllium fiber, gut-directed relaxation, antispasmodics',
        severity: 5,
        urgency: 'routine',
        icon: '🥑',
        diagramDescription: 'Visceral hypersensitivity with erratic peristaltic intestinal spasms.',
      },
    ],
  },
  {
    id: 'cervical_spine',
    name: 'Cervical Spine & Neck',
    subTitle: 'C1-C7 Vertebrae, Discs & Brachial Plexus',
    icon: '🦴',
    badge: 'Spine & Orthopedics',
    system: 'skeletal',
    specialty: 'Orthopedic',
    pin: { x: 50, y: 24 },
    color: '#3B82F6',
    doctorId: '4', // Dr. Vikram Singh
    description: 'Cephalic weight-bearing vertebral column. Management of tech neck forward head posture, disc herniation, and nerve root compression.',
    clinicalAnatomy: ['C1-C7 Cervical Vertebrae', 'Intervertebral Discs', 'Brachial Nerve Roots C5-T1', 'Trapezius & Levator Scapulae'],
    illustrativeSymptoms: [
      {
        name: 'Cervical Radiculopathy',
        clinicalName: 'Nerve Root Foraminal Stenosis',
        character: 'Electric Shooting',
        radiation: 'Electric shock sensation traveling down shoulder to thumb or pinky',
        trigger: 'Herniated nucleus pulposus disc or osteophytic bone spurs',
        relief: 'Cervical traction, physical posture physiotherapy, anti-inflammatory',
        severity: 7,
        urgency: 'routine',
        icon: '⚡',
        diagramDescription: 'C6/C7 disc protrusion impinging on exiting cervical nerve root.',
      },
      {
        name: 'Postural Tech Neck Strain',
        clinicalName: 'Cervical Myofascial Overuse Syndrome',
        character: 'Dull Deep Ache',
        radiation: 'Persistent burning knot at the base of neck spreading to shoulder blades',
        trigger: 'Hours of forward head tilt looking down at mobile screens or laptops',
        relief: 'Ergonomic screen elevation, chin tucks, heat therapy, active breaks',
        severity: 4,
        urgency: 'self-care',
        icon: '📱',
        diagramDescription: 'Excessive 60-degree head tilt multiplying cervical load from 5kg to 27kg.',
      },
    ],
  },
  {
    id: 'lumbar_spine',
    name: 'Lumbar Spine & Sciatic Axis',
    subTitle: 'L1-L5 Vertebrae, Sacroiliac & Sciatic Nerve',
    icon: '⚡',
    badge: 'Orthopedic Spine',
    system: 'skeletal',
    specialty: 'Orthopedic',
    pin: { x: 50, y: 60 },
    color: '#6366F1',
    doctorId: '4', // Dr. Vikram Singh
    description: 'Core kinetic pivot. Specializing in acute lumbago, herniated lumbar disc (L4-S1), sciatica shooting nerve pain, and spondylolisthesis.',
    clinicalAnatomy: ['L4-L5 & L5-S1 Motion Segments', 'Thecal Sac & Cauda Equina', 'Sciatic Nerve Trunk (L4-S3)', 'Erector Spinae Muscles'],
    illustrativeSymptoms: [
      {
        name: 'Sciatica Nerve Radiation',
        clinicalName: 'L5-S1 Lumbar Disc Herniation',
        character: 'Electric Shooting',
        radiation: 'Searing electric wire radiating from buttock down hamstring to calf and big toe',
        trigger: 'Heavy bending lifting with rounded back, prolonged slouch sitting',
        relief: 'McKenzie extension stretches, walking, NSAIDs, epidural steroid block',
        severity: 8,
        urgency: 'urgent',
        icon: '⚡',
        diagramDescription: 'Extruded gel-like disc nucleus compressing the L5 or S1 nerve root.',
      },
      {
        name: 'Cauda Equina Emergency',
        clinicalName: 'Massive Thecal Sac Compression',
        character: 'Sharp Stabbing',
        radiation: 'Saddle anesthesia (numbness around groin/buttocks) with loss of bladder control',
        trigger: 'Massive central disc sequestration or spinal canal tumor/abscess',
        relief: 'EMERGENCY SURGICAL DECOMPRESSION WITHIN 24 HOURS (Red Flag)',
        severity: 10,
        urgency: 'emergency',
        icon: '🚨',
        diagramDescription: 'Catastrophic compression of entire lower spinal nerve bundle.',
      },
    ],
  },
  {
    id: 'knees',
    name: 'Knee Joint & Menisci',
    subTitle: 'Femur, Patella, Meniscus & ACL/PCL Ligaments',
    icon: '🦵',
    badge: 'Joints & Sports',
    system: 'skeletal',
    specialty: 'Orthopedic',
    pin: { x: 44, y: 77 },
    color: '#2563EB',
    doctorId: '4', // Dr. Vikram Singh
    description: 'Major lower extremity shock absorber. Diagnostic expertise in osteoarthritis joint space narrowing, sports meniscus tears, and runner’s knee.',
    clinicalAnatomy: ['Medial & Lateral Menisci', 'ACL & PCL Cruciate Ligaments', 'Patellar Tendon', 'Articular Hyaline Cartilage'],
    illustrativeSymptoms: [
      {
        name: 'Meniscus Cartilage Tear',
        clinicalName: 'Torn Meniscal Fibrocartilage',
        character: 'Sharp Stabbing',
        radiation: 'Joint-line sharp catch with sensation of knee giving way or locking',
        trigger: 'Twisting pivoting movement with foot firmly planted during sports',
        relief: 'RICE protocol (Rest, Ice, Compression, Elevation), arthroscopic repair',
        severity: 7,
        urgency: 'routine',
        icon: '⚽',
        diagramDescription: 'Bucket-handle or radial tear preventing smooth femoral condyle glide.',
      },
      {
        name: 'Patellofemoral Knee Syndrome',
        clinicalName: 'Runner’s Knee Chondromalacia',
        character: 'Dull Deep Ache',
        radiation: 'Ache around anterior kneecap worsened when descending stairs or kneeling',
        trigger: 'Quadriceps muscle imbalance, tight IT band, repetitive running impact',
        relief: 'VMO quad strengthening, foam rolling IT band, supportive footwear',
        severity: 5,
        urgency: 'self-care',
        icon: '🏃',
        diagramDescription: 'Abnormal patellar lateral tracking grinding against femoral trochlea.',
      },
    ],
  },
  {
    id: 'feet',
    name: 'Ankle, Heel & Plantar Fascia',
    subTitle: 'Calcaneus, Talus, Achilles & Plantar Ligament',
    icon: '🦶',
    badge: 'Podiatry & Ortho',
    system: 'skeletal',
    specialty: 'Orthopedic',
    pin: { x: 43, y: 92 },
    color: '#0284C7',
    doctorId: '4', // Dr. Vikram Singh
    description: 'Bipedal foundation. Relief for first-step morning heel stabbing (plantar fasciitis), lateral ankle ligament inversion sprains, and Achilles tendonitis.',
    clinicalAnatomy: ['Plantar Fascia Aponeurosis', 'Calcaneus Heel Bone', 'Achilles Tendon Insertion', 'ATFL Ankle Ligaments'],
    illustrativeSymptoms: [
      {
        name: 'Plantar Fasciitis',
        clinicalName: 'Plantar Aponeurosis Enthesopathy',
        character: 'Sharp Stabbing',
        radiation: 'Excruciating knife-like pain in heel on very first steps out of bed',
        trigger: 'Prolonged standing on hard floors, unsupportive flat shoes, high arches',
        relief: 'Calf & plantar stretches with frozen water bottle roll, orthotic insoles',
        severity: 6,
        urgency: 'routine',
        icon: '👟',
        diagramDescription: 'Micro-tears and chronic thickening at calcaneal insertion of plantar fascia.',
      },
    ],
  },
  {
    id: 'skin',
    name: 'Integumentary & Dermal Matrix',
    subTitle: 'Epidermis, Dermis, Sebaceous & Mast Cells',
    icon: '🧴',
    badge: 'Dermatology',
    system: 'muscular',
    specialty: 'Dermatologist',
    pin: { x: 74, y: 38 },
    color: '#10B981',
    doctorId: '3', // Dr. Ananya Patel
    description: 'Immune barrier and largest sensory organ. Clinical management for allergic urticaria hives, atopic eczema dermatitis, cystic acne, and psoriasis.',
    clinicalAnatomy: ['Stratum Corneum Barrier', 'Dermal Capillaries', 'Sebaceous Follicular Units', 'Cutaneous Nerve Fibers'],
    illustrativeSymptoms: [
      {
        name: 'Allergic Urticaria (Hives)',
        clinicalName: 'Acute Cutaneous Mastocytosis',
        character: 'Itchy Erythema',
        radiation: 'Raised erythematous pruritic wheals with pale centers appearing all over',
        trigger: 'Food allergy (nuts, shellfish), NSAIDs, viral illness, insect bite',
        relief: 'Second-generation oral antihistamines (Cetirizine), cool soothing lotion',
        severity: 6,
        urgency: 'urgent',
        icon: '⚠️',
        diagramDescription: 'Sudden histamine release causing microvascular leakage into papillary dermis.',
      },
      {
        name: 'Atopic Eczema Flaring',
        clinicalName: 'Atopic Dermatitis Barrier Dysfunction',
        character: 'Itchy Erythema',
        radiation: 'Dry, lichenified, cracked patches in flexural folds (inner elbows/knees)',
        trigger: 'Harsh soaps, low humidity dry winter air, wool fabrics, emotional stress',
        relief: 'Ceramide-rich emollient barrier creams, topical calcineurin inhibitors',
        severity: 5,
        urgency: 'routine',
        icon: '💧',
        diagramDescription: 'Filaggrin gene mutation leading to transepidermal water loss and allergen entry.',
      },
    ],
  },
];

export default function Interactive3DAnatomy() {
  const [selectedZone, setSelectedZone] = useState<DetailedBodyZone>(DETAILED_BODY_ZONES[3]); // Default to Heart
  const [activeLayer, setActiveLayer] = useState<AnatomyLayer>('all');
  const [rotation, setRotation] = useState<'front' | 'iso_l' | 'iso_r' | 'back'>('front');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeViewMode, setActiveViewMode] = useState<'3d_body' | 'symptom_atlas'>('3d_body');

  // Match doctor from mockData
  const matchedDoctor = doctors.find((d) => d.id === selectedZone.doctorId) || doctors[0];

  // Helper for urgency badge styling
  const getUrgencyBadge = (urgency: IllustrativeSymptom['urgency']) => {
    switch (urgency) {
      case 'emergency':
        return { label: 'EMERGENCY 🚨', bg: 'bg-red-500 text-white animate-pulse', border: 'border-red-600' };
      case 'urgent':
        return { label: 'URGENT ⚠️', bg: 'bg-amber-500 text-white', border: 'border-amber-600' };
      case 'routine':
        return { label: 'ROUTINE 📅', bg: 'bg-teal-600 text-white', border: 'border-teal-700' };
      default:
        return { label: 'SELF CARE 🍵', bg: 'bg-emerald-600 text-white', border: 'border-emerald-700' };
    }
  };

  return (
    <div
      className="card-3d bg-white dark:bg-slate-900 border rounded-3xl p-5 sm:p-7 lg:p-9 shadow-2xl overflow-hidden relative"
      style={{ borderColor: 'var(--border-color)' }}
    >
      {/* Background ambient medical glow */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: selectedZone.color }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: '#0D9488' }}
      />

      {/* ── Top Header & Mode Toggle ── */}
      <div
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              <Rotate3d className="w-3.5 h-3.5 text-teal-600 animate-spin" style={{ animationDuration: '8s' }} />
              High-Precision 3D Anatomical Atlas
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <Layers className="w-3 h-3" /> 16 Anatomical Zones • Illustrative Differentials
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Interactive 3D Body & Symptom Visualizer
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Explore biological systems in 3D perspective. Click any organ or joint to inspect clinical symptoms, pain radiation maps, and instant doctor booking.
          </p>
        </div>

        {/* View Switcher: 3D Body vs Illustrative Symptom Atlas */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border self-start lg:self-auto shrink-0"
          style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => setActiveViewMode('3d_body')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === '3d_body'
                ? 'bg-white dark:bg-slate-700 shadow-sm text-teal-600 dark:text-teal-300 font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" /> 3D Body Hologram
          </button>
          <button
            onClick={() => setActiveViewMode('symptom_atlas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'symptom_atlas'
                ? 'bg-white dark:bg-slate-700 shadow-sm text-teal-600 dark:text-teal-300 font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Illustrative Symptom Atlas
          </button>
        </div>
      </div>

      {/* ── Mode 1: 3D Full Body Explorer ── */}
      {activeViewMode === '3d_body' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── LEFT: 3D Anatomy Hologram Stage (5 Cols) ── */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* System Layer Selector Bar */}
            <div className="flex flex-wrap items-center justify-center gap-1 mb-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border w-full max-w-sm"
              style={{ borderColor: 'var(--border-color)' }}>
              {[
                { id: 'all', label: 'All Systems', icon: '🩺' },
                { id: 'visceral', label: 'Visceral Organs', icon: '🫀' },
                { id: 'skeletal', label: 'Skeletal Bones', icon: '🦴' },
                { id: 'neural', label: 'Neural & Vascular', icon: '⚡' },
                { id: 'muscular', label: 'Skin & Muscles', icon: '🧴' },
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id as AnatomyLayer)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    activeLayer === layer.id
                      ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span>{layer.icon}</span>
                  <span>{layer.label}</span>
                </button>
              ))}
            </div>

            {/* 3D Perspective Controls & Zoom HUD */}
            <div className="flex items-center justify-between w-full max-w-sm px-2 mb-2">
              {/* Rotation buttons */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border text-[11px] font-bold"
                style={{ borderColor: 'var(--border-color)' }}>
                <button
                  onClick={() => setRotation('front')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${rotation === 'front' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
                  title="Frontal Anterior View"
                >
                  0° Front
                </button>
                <button
                  onClick={() => setRotation('iso_l')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${rotation === 'iso_l' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
                  title="30° Left Isometric"
                >
                  30° L
                </button>
                <button
                  onClick={() => setRotation('iso_r')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${rotation === 'iso_r' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
                  title="30° Right Isometric"
                >
                  30° R
                </button>
                <button
                  onClick={() => setRotation('back')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${rotation === 'back' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
                  title="Posterior Spine View"
                >
                  180° Dorsal
                </button>
              </div>

              {/* Zoom buttons */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border text-slate-500"
                style={{ borderColor: 'var(--border-color)' }}>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                  className="p-1 hover:text-teal-600 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono font-bold px-1">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                  className="p-1 hover:text-teal-600 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(100)}
                  className="p-1 hover:text-teal-600 cursor-pointer"
                  title="Reset Zoom"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── 3D Anatomy Hologram Canvas Stage ── */}
            <div
              className="perspective-1000 relative w-72 sm:w-80 h-[440px] sm:h-[480px] rounded-3xl flex items-center justify-center p-3 transition-all duration-500 border bg-gradient-to-b from-slate-50/50 to-teal-50/30 dark:from-slate-900/60 dark:to-slate-800/40 shadow-inner"
              style={{
                borderColor: 'var(--border-color)',
                transform:
                  rotation === 'iso_l'
                    ? 'rotateY(-18deg) rotateX(6deg)'
                    : rotation === 'iso_r'
                    ? 'rotateY(18deg) rotateX(6deg)'
                    : rotation === 'back'
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 3D Grid Hologram Floor Rings */}
              <div
                className="absolute bottom-3 w-64 h-32 rounded-full border border-teal-500/30 pointer-events-none opacity-70"
                style={{
                  transform: 'rotateX(75deg) translateZ(-50px)',
                  background: 'radial-gradient(ellipse at center, rgba(13,148,136,0.25) 0%, rgba(13,148,136,0.05) 50%, transparent 75%)',
                  boxShadow: '0 0 35px rgba(13,148,136,0.4)',
                }}
              />
              <div
                className="absolute bottom-5 w-44 h-20 rounded-full border border-teal-400/40 border-dashed pointer-events-none"
                style={{
                  transform: 'rotateX(75deg) translateZ(-50px)',
                }}
              />

              {/* Anatomical Target Scanner Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 bg-[linear-gradient(to_right,#0d9488_1px,transparent_1px),linear-gradient(to_bottom,#0d9488_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl" />

              {/* ── High-Precision Anatomical Full Body SVG ── */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <svg
                  viewBox="0 0 200 420"
                  className="w-full h-full select-none drop-shadow-lg"
                  style={{ filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.12))' }}
                >
                  <defs>
                    <linearGradient id="skeletalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#CBD5E1" />
                      <stop offset="100%" stopColor="#94A3B8" />
                    </linearGradient>
                    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="100%" stopColor="#B91C1C" />
                    </linearGradient>
                    <linearGradient id="lungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14B8A6" />
                      <stop offset="100%" stopColor="#0F766E" />
                    </linearGradient>
                    <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#B45309" />
                    </linearGradient>
                    <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>

                  {/* 1. Universal Body Silhouette Outline */}
                  <g fill="none" stroke="currentColor" strokeWidth="1.8" className="text-slate-300 dark:text-slate-700">
                    {/* Head Contour */}
                    <path
                      d="M100 24 C82 24 74 38 74 54 C74 70 82 82 93 86 L93 96 M100 24 C118 24 126 38 126 54 C126 70 118 82 107 86 L107 96"
                      fill="rgba(13,148,136,0.04)"
                    />
                    {/* Shoulders & Arms */}
                    <path
                      d="M93 96 C74 98 56 106 48 116 C40 126 34 165 30 205 C27 235 24 250 22 258 C21 262 25 264 28 261 C32 255 36 230 40 200 C43 175 48 140 54 128"
                      strokeLinecap="round"
                    />
                    <path
                      d="M107 96 C126 98 144 106 152 116 C160 126 166 165 170 205 C173 235 176 250 178 258 C179 262 175 264 172 261 C168 255 164 230 160 200 C157 175 152 140 146 128"
                      strokeLinecap="round"
                    />
                    {/* Torso & Flank Profile */}
                    <path
                      d="M54 128 C56 165 62 210 68 238 C72 255 74 262 76 266 M146 128 C144 165 138 210 132 238 C128 255 126 262 124 266"
                    />
                    {/* Pelvis & Lower Extremities (Legs) */}
                    <path
                      d="M76 266 C72 300 68 350 66 385 C65 400 63 410 60 414 M124 266 C128 300 132 350 134 385 C135 400 137 410 140 414"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                    {/* Inner Leg Gap */}
                    <path
                      d="M90 274 C88 310 86 350 84 395 C83 408 81 414 78 414 M110 274 C112 310 114 350 116 395 C117 408 119 414 122 414"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* 2. Skeletal Architecture Layer (Bones & Joints) */}
                  {(activeLayer === 'all' || activeLayer === 'skeletal') && (
                    <g stroke="#94A3B8" strokeWidth="1.2" fill="none" opacity="0.85">
                      {/* Cranium & Eye Orbits */}
                      <ellipse cx="100" cy="50" rx="18" ry="21" stroke="#94A3B8" strokeWidth="1.5" />
                      <circle cx="93" cy="48" r="4" fill="rgba(148,163,184,0.2)" />
                      <circle cx="107" cy="48" r="4" fill="rgba(148,163,184,0.2)" />
                      <path d="M98 54 L100 58 L102 54 Z" fill="#94A3B8" />
                      <path d="M92 68 Q100 72 108 68" stroke="#94A3B8" />

                      {/* Cervical & Thoracic Spine Column (C1-L5) */}
                      <line x1="100" y1="72" x2="100" y2="255" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="3 2" />

                      {/* Clavicles */}
                      <path d="M64 104 Q100 108 136 104" stroke="#94A3B8" strokeWidth="2" />

                      {/* Sternum (Breastbone) */}
                      <rect x="97" y="110" width="6" height="35" rx="3" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />

                      {/* Rib Cage (12 paired rib contours) */}
                      <path d="M97 116 Q72 120 72 135 Q72 148 97 148" />
                      <path d="M103 116 Q128 120 128 135 Q128 148 103 148" />
                      <path d="M97 126 Q68 132 68 148 Q68 162 97 162" />
                      <path d="M103 126 Q132 132 132 148 Q132 162 103 162" />
                      <path d="M97 136 Q66 145 66 162 Q66 175 97 175" />
                      <path d="M103 136 Q134 145 134 162 Q134 175 103 175" />
                      <path d="M97 146 Q70 156 70 174 Q70 188 97 186" />
                      <path d="M103 146 Q130 156 130 174 Q130 188 103 186" />

                      {/* Pelvic Girdle & Iliac Crest */}
                      <path
                        d="M72 236 C72 220 86 218 100 230 C114 218 128 220 128 236 C128 252 115 264 100 264 C85 264 72 252 72 236 Z"
                        fill="rgba(148,163,184,0.15)"
                        stroke="#64748B"
                        strokeWidth="1.5"
                      />

                      {/* Femur (Thigh Bones) */}
                      <line x1="84" y1="262" x2="74" y2="340" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
                      <line x1="116" y1="262" x2="126" y2="340" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />

                      {/* Patellae (Kneecaps) */}
                      <circle cx="74" cy="342" r="5" fill="#3B82F6" fillOpacity="0.4" stroke="#2563EB" strokeWidth="1.5" />
                      <circle cx="126" cy="342" r="5" fill="#3B82F6" fillOpacity="0.4" stroke="#2563EB" strokeWidth="1.5" />

                      {/* Tibia & Fibula (Shin & Calf bones) */}
                      <line x1="74" y1="346" x2="68" y2="408" stroke="#CBD5E1" strokeWidth="2.5" />
                      <line x1="126" y1="346" x2="132" y2="408" stroke="#CBD5E1" strokeWidth="2.5" />
                    </g>
                  )}

                  {/* 3. Visceral Organs Layer (Brain, Heart, Lungs, Liver, Stomach, Kidneys, Colon) */}
                  {(activeLayer === 'all' || activeLayer === 'visceral') && (
                    <g>
                      {/* Brain Cerebrum */}
                      <g className="transition-transform hover:scale-105">
                        <path
                          d="M86 42 Q90 32 100 32 Q110 32 114 42 Q118 52 112 60 Q106 66 100 66 Q94 66 88 60 Q82 52 86 42 Z"
                          fill="url(#brainGrad)"
                          fillOpacity="0.75"
                          stroke="#8B5CF6"
                          strokeWidth="1.2"
                        />
                        <path d="M100 34 L100 64" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="2 1" />
                        <path d="M90 46 Q95 50 100 46 Q105 50 110 46" stroke="#DDD6FE" strokeWidth="0.8" fill="none" />
                      </g>

                      {/* Lungs (Bilateral Bronchial Chambers) */}
                      <path
                        d="M74 122 C72 138 72 165 88 168 C92 168 94 150 94 135 C94 122 84 120 74 122 Z"
                        fill="url(#lungGrad)"
                        fillOpacity="0.65"
                        stroke="#0D9488"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M126 122 C128 138 128 165 112 168 C108 168 106 150 106 135 C106 122 116 120 126 122 Z"
                        fill="url(#lungGrad)"
                        fillOpacity="0.65"
                        stroke="#0D9488"
                        strokeWidth="1.2"
                      />

                      {/* Trachea Windpipe */}
                      <line x1="100" y1="84" x2="100" y2="122" stroke="#14B8A6" strokeWidth="2.5" strokeDasharray="2 1" />

                      {/* Heart (Cardiac Ventricles & Aorta) */}
                      <g className="cursor-pointer" onClick={() => setSelectedZone(DETAILED_BODY_ZONES[3])}>
                        <path
                          d="M96 134 C92 128 86 134 88 142 C90 152 102 160 102 160 C102 160 114 152 116 142 C118 134 112 128 108 134 C104 138 100 140 96 134 Z"
                          fill="url(#heartGrad)"
                          stroke="#DC2626"
                          strokeWidth="1.5"
                          className="animate-pulse"
                        />
                        {/* Aortic Arch */}
                        <path d="M100 132 Q103 124 107 128" stroke="#EF4444" strokeWidth="2" fill="none" />
                      </g>

                      {/* Liver (Right Upper Quadrant) */}
                      <path
                        d="M74 174 C72 188 88 198 104 196 C105 186 102 176 88 174 Z"
                        fill="url(#liverGrad)"
                        fillOpacity="0.75"
                        stroke="#D97706"
                        strokeWidth="1.2"
                      />

                      {/* Stomach (Epigastric Curvature) */}
                      <path
                        d="M98 178 C108 176 118 182 120 194 C120 204 108 208 98 202 C94 196 94 184 98 178 Z"
                        fill="#FBBF24"
                        fillOpacity="0.75"
                        stroke="#B45309"
                        strokeWidth="1.2"
                      />

                      {/* Kidneys (Bilateral Flank Beans) */}
                      <ellipse cx="80" cy="208" rx="5" ry="8" fill="#B45309" stroke="#78350F" strokeWidth="1" transform="rotate(-15 80 208)" />
                      <ellipse cx="120" cy="208" rx="5" ry="8" fill="#B45309" stroke="#78350F" strokeWidth="1" transform="rotate(15 120 208)" />

                      {/* Colon & Intestinal Loops */}
                      <path
                        d="M80 220 L80 248 L120 248 L120 220"
                        stroke="#10B981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        opacity="0.7"
                      />
                      {/* Small Intestine Folds */}
                      <path
                        d="M90 226 Q95 234 100 226 Q105 234 110 226 Q105 240 100 236 Q95 240 90 226"
                        stroke="#34D399"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.8"
                      />
                    </g>
                  )}

                  {/* 4. Neural & Vascular Tracks (Arteries & Sciatic Nerve) */}
                  {(activeLayer === 'all' || activeLayer === 'neural') && (
                    <g opacity="0.6">
                      {/* Carotid Arteries */}
                      <line x1="94" y1="76" x2="94" y2="120" stroke="#EF4444" strokeWidth="1" />
                      <line x1="106" y1="76" x2="106" y2="120" stroke="#EF4444" strokeWidth="1" />

                      {/* Femoral Arteries */}
                      <line x1="96" y1="260" x2="84" y2="340" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3 2" />
                      <line x1="104" y1="260" x2="116" y2="340" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3 2" />

                      {/* Sciatic Nerve Track */}
                      <path d="M88 260 Q82 310 74 340 L70 400" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                      <path d="M112 260 Q118 310 126 340 L130 400" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                    </g>
                  )}

                  {/* 5. Active Selected Zone Pulsating Target Halo */}
                  <circle
                    cx={selectedZone.pin.x * 2}
                    cy={selectedZone.pin.y * 4.2}
                    r="28"
                    fill={selectedZone.color}
                    fillOpacity="0.22"
                    className="animate-pulse"
                  />
                  <circle
                    cx={selectedZone.pin.x * 2}
                    cy={selectedZone.pin.y * 4.2}
                    r="40"
                    stroke={selectedZone.color}
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>

                {/* ── Interactive 3D Glowing Pins on Body ── */}
                {DETAILED_BODY_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  // If filtering by system, hide non-matching pins
                  if (activeLayer !== 'all' && zone.system !== activeLayer) return null;

                  return (
                    <button
                      key={zone.id}
                      onClick={() => {
                        setSelectedZone(zone);
                      }}
                      className="absolute z-20 group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer"
                      style={{
                        left: `${zone.pin.x}%`,
                        top: `${zone.pin.y}%`,
                      }}
                      title={zone.name}
                    >
                      {/* Ripple Wave when selected */}
                      {isSelected && (
                        <div
                          className="absolute -inset-2 rounded-full animate-ping opacity-40 pointer-events-none"
                          style={{ backgroundColor: zone.color }}
                        />
                      )}

                      {/* Glowing Interactive Pin Capsule */}
                      <div
                        className={`rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'w-8 h-8 scale-125 shadow-lg'
                            : 'w-6 h-6 scale-90 hover:scale-110 opacity-75 hover:opacity-100 shadow-sm'
                        }`}
                        style={{
                          backgroundColor: isSelected ? zone.color : 'white',
                          border: `2px solid ${zone.color}`,
                          boxShadow: isSelected ? `0 0 18px ${zone.color}` : '0 2px 6px rgba(0,0,0,0.15)',
                        }}
                      >
                        <span className="text-xs select-none">{zone.icon}</span>
                      </div>

                      {/* Floating Micro-Badge */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-8 px-2 py-0.5 rounded-md text-[10px] font-extrabold whitespace-nowrap shadow-lg transition-all pointer-events-none z-30 ${
                          isSelected
                            ? 'opacity-100 scale-100 bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                            : 'opacity-0 group-hover:opacity-100 bg-slate-800 text-white'
                        }`}
                      >
                        {zone.name.split('&')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick 16-Zone Pill Selector Bar for Fast Access */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-md">
              {DETAILED_BODY_ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => {
                    setSelectedZone(z);
                  }}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all border cursor-pointer ${
                    selectedZone.id === z.id
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-teal-600 dark:border-teal-600 shadow-xs scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {z.icon} {z.name.split('&')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Selected Organ Deep Dive & Illustrative Symptoms (7 Cols) ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Organ Header Card with Color Identity */}
            <div
              className="p-5 sm:p-6 rounded-3xl border transition-all relative overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-3xl p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    {selectedZone.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xl sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
                        {selectedZone.name}
                      </h3>
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: selectedZone.color }}>
                        {selectedZone.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{selectedZone.subTitle}</p>
                    <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                      Recommended Specialist: <span className="underline">{selectedZone.specialty}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href={`/find-doctors?specialty=${encodeURIComponent(selectedZone.specialty)}`}
                  className="btn btn-secondary text-xs py-1.5 px-3 border border-slate-300 dark:border-slate-700 font-bold shrink-0 hidden sm:flex items-center gap-1"
                >
                  <span>Book {selectedZone.specialty}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {selectedZone.description}
              </p>

              {/* Clinical Anatomy Substructures */}
              <div className="mt-3.5 pt-3 border-t flex flex-wrap items-center gap-1.5" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Key Structures:</span>
                {selectedZone.clinicalAnatomy.map((struct, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    ✦ {struct}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Illustrative Symptoms Showcase Cards ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-extrabold text-base sm:text-lg flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Activity className="w-4 h-4 text-teal-600" />
                  Illustrative Symptoms & Diagnostic Profiles
                </h4>
                <span className="text-xs text-slate-400">Click a symptom to triage</span>
              </div>

              <div className="space-y-3.5">
                {selectedZone.illustrativeSymptoms.map((sym, idx) => {
                  const urgencyBadge = getUrgencyBadge(sym.urgency);
                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-800 border rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all group"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      {/* Top Row: Symptom Name, Character Badge & Urgency Tag */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60">{sym.icon}</span>
                          <div>
                            <h5 className="font-extrabold text-sm sm:text-base group-hover:text-teal-600 transition-colors"
                              style={{ color: 'var(--text-primary)' }}>
                              {sym.name}
                            </h5>
                            <span className="text-[11px] text-slate-400 font-mono italic">({sym.clinicalName})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            {sym.character}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${urgencyBadge.bg}`}>
                            {urgencyBadge.label}
                          </span>
                        </div>
                      </div>

                      {/* Illustrative Diagrammatic Details */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-dashed"
                        style={{ borderColor: 'var(--border-color)' }}>
                        <span className="font-bold text-teal-600 dark:text-teal-400">Illustrative Mechanism: </span>
                        {sym.diagramDescription}
                      </p>

                      {/* Clinical Characteristics Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] mb-3">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="text-slate-400 block font-bold">📍 Pain Radiation Pathway:</span>
                          <span className="text-slate-700 dark:text-slate-200 font-medium">{sym.radiation}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="text-slate-400 block font-bold">⚡ Key Trigger:</span>
                          <span className="text-slate-700 dark:text-slate-200 font-medium">{sym.trigger}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="text-slate-400 block font-bold">✨ Clinical Relief Clue:</span>
                          <span className="text-slate-700 dark:text-slate-200 font-medium">{sym.relief}</span>
                        </div>
                      </div>

                      {/* Visual Severity Meter (1 to 10 scale) */}
                      <div className="flex items-center justify-between gap-3 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Severity:</span>
                          <div className="flex-1 max-w-xs h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                sym.severity >= 8
                                  ? 'bg-red-500'
                                  : sym.severity >= 5
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${sym.severity * 10}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                            {sym.severity}/10
                          </span>
                        </div>

                        <Link
                          href={`/find-doctors?q=${encodeURIComponent(sym.name)}&specialty=${encodeURIComponent(selectedZone.specialty)}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 dark:text-teal-400 hover:underline"
                        >
                          <span>Find Doctors for &ldquo;{sym.name}&rdquo;</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Matched Verified Doctor Card (Flipkart Assured Style) ── */}
            <div
              className="bg-white dark:bg-slate-800 border rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Top Verified Specialist for {selectedZone.name}
                </span>
                <span className="flipkart-assured-badge">✦ HealthBridge ASSURED</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Doctor Avatar & Details */}
                <div className="flex items-center gap-3">
                  <img
                    src={matchedDoctor.avatar}
                    alt={matchedDoctor.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                  />
                  <div>
                    <h4 className="font-bold text-base hover:text-teal-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {matchedDoctor.name}
                    </h4>
                    <p className="text-xs font-semibold text-teal-600">{matchedDoctor.specialty}</p>
                    <p className="text-[11px] text-slate-400">
                      {matchedDoctor.experience} yrs exp • {matchedDoctor.clinicName}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="flipkart-rating-badge text-[11px]">
                        {matchedDoctor.rating} <Star className="w-2.5 h-2.5 fill-white text-white" />
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">({matchedDoctor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div
                  className="sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="flex sm:justify-end items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                      ₹{matchedDoctor.fee}
                    </span>
                    <span className="text-xs line-through text-slate-400">₹{matchedDoctor.originalFee || 1200}</span>
                    <span className="flipkart-discount-tag text-xs">{matchedDoctor.discountPercent || 33}% off</span>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    🟢 {matchedDoctor.availableToday ? 'Available Today' : matchedDoctor.nextAvailable}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <Link
                      href={`/doctor/${matchedDoctor.id}?book=true`}
                      className="flipkart-btn-book text-xs py-2 px-4 flex items-center justify-center gap-1 font-bold flex-1 sm:flex-initial"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" /> Book Consultation
                    </Link>
                    <Link
                      href={`/find-doctors?specialty=${encodeURIComponent(selectedZone.specialty)}`}
                      className="btn btn-secondary text-xs py-2 px-3 border border-slate-300 dark:border-slate-700 font-bold"
                    >
                      All {selectedZone.specialty}s →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mode 2: Illustrative Symptom Atlas Encyclopedia ── */}
      {activeViewMode === 'symptom_atlas' && (
        <div className="space-y-8">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border"
            style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="font-extrabold text-lg sm:text-xl mb-1 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>🎨</span> Clinical Differential Atlas: Visualizing Pain Types & Patterns
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Medical conditions often share similar body locations. Use these comparative visual diagrams to identify your symptom character, radiation path, and urgency level.
            </p>
          </div>

          {/* 1. Headache Spectrum Comparison */}
          <div className="border rounded-2xl p-5 bg-white dark:bg-slate-800/80 shadow-xs" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Cranial Differential</span>
                <h4 className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>
                  Headache Typologies: Where & How It Throbs
                </h4>
              </div>
              <Link href="/find-doctors?specialty=Neurologist" className="text-xs font-bold text-teal-600 hover:underline">
                Consult Neurologist →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  type: 'Tension Headache',
                  icon: '🤕',
                  zone: 'Forehead Band',
                  character: 'Tight vice squeezing forehead & neck base',
                  sensation: 'Dull Ache (Severity 4/10)',
                  color: 'border-blue-400 bg-blue-50/50 dark:bg-blue-950/20',
                  action: 'Physiotherapy & Ergonomics',
                },
                {
                  type: 'Hemicranial Migraine',
                  icon: '⚡',
                  zone: 'One Side + Temple',
                  character: 'Pulsatile pounding with light/sound sensitivity & nausea',
                  sensation: 'Throbbing (Severity 8/10)',
                  color: 'border-purple-400 bg-purple-50/50 dark:bg-purple-950/20',
                  action: 'Prescription Triptans & Dark Room',
                },
                {
                  type: 'Sinus Pressure',
                  icon: '👃',
                  zone: 'Cheeks & Brow Ridge',
                  character: 'Deep facial ache worsened by bending forward with nasal congestion',
                  sensation: 'Fullness (Severity 5/10)',
                  color: 'border-pink-400 bg-pink-50/50 dark:bg-pink-950/20',
                  action: 'ENT Evaluation & Decongestant',
                },
                {
                  type: 'Cluster Headache',
                  icon: '👁️',
                  zone: 'Behind Single Eye',
                  character: 'Piercing hot poker retro-orbital stabbing with eye tearing',
                  sensation: 'Excruciating (Severity 9/10)',
                  color: 'border-red-400 bg-red-50/50 dark:bg-red-950/20',
                  action: 'High-Flow Oxygen & Urgent Care',
                },
              ].map((h, i) => (
                <div key={i} className={`p-4 rounded-xl border-2 ${h.color}`}>
                  <div className="text-2xl mb-2">{h.icon}</div>
                  <h5 className="font-extrabold text-sm mb-1 text-slate-900 dark:text-slate-100">{h.type}</h5>
                  <p className="text-[11px] font-bold text-slate-500 mb-2">📍 {h.zone}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">{h.character}</p>
                  <div className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-400 border-t pt-2 border-slate-200 dark:border-slate-700">
                    {h.sensation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Chest Discomfort Differentials */}
          <div className="border rounded-2xl p-5 bg-white dark:bg-slate-800/80 shadow-xs" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Thoracic Differential</span>
                <h4 className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>
                  Chest Pain Differentials: Cardiac vs Reflux vs Musculoskeletal
                </h4>
              </div>
              <Link href="/emergency" className="text-xs font-bold text-red-600 hover:underline">
                Emergency 112 Red Flags →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border-2 border-red-400 bg-red-50/40 dark:bg-red-950/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-600">🚨 EMERGENCY</span>
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <h5 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">Cardiac Angina / Infarction</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Heavy elephant sitting on central chest. Radiates down left inner arm, neck, and lower jaw with cold sweats and breathlessness.
                </p>
                <div className="text-[11px] font-bold text-red-700 dark:text-red-300">
                  ⚠️ Action: Immediate Ambulance 112 if lasting &gt;5 min
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-amber-400 bg-amber-50/40 dark:bg-amber-950/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-600">⚡ GASTROENTEROLOGY</span>
                  <Flame className="w-5 h-5 text-amber-600" />
                </div>
                <h5 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">Acid Reflux (GERD) Heartburn</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Upward burning sensation ascending retrosternally to mouth. Triggered after heavy spicy dinner or lying flat. Relieved by antacids.
                </p>
                <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                  🍵 Action: Upright position + Antacid + PPI therapy
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-teal-400 bg-teal-50/40 dark:bg-teal-950/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-teal-600">🦴 ORTHOPEDIC</span>
                  <Activity className="w-5 h-5 text-teal-600" />
                </div>
                <h5 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">Costochondritis / Rib Strain</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Sharp localized rib tenderness pinpointed with one finger. Reproducible upon direct palpation or heavy torso twisting.
                </p>
                <div className="text-[11px] font-bold text-teal-700 dark:text-teal-300">
                  📅 Action: Anti-inflammatory gel + Posture rest
                </div>
              </div>
            </div>
          </div>

          {/* 3. Abdominal 4-Quadrant Diagnostic Map */}
          <div className="border rounded-2xl p-5 bg-white dark:bg-slate-800/80 shadow-xs" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Abdominal Atlas</span>
                <h4 className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>
                  4-Quadrant Abdominal Pain Locator
                </h4>
              </div>
              <span className="text-xs text-slate-400">Click any quadrant to find specialist</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border bg-amber-50/30 dark:bg-amber-950/20" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-extrabold text-amber-600">RUQ (Right Upper Quadrant)</span>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Gallbladder & Liver</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  • Gallstones / Biliary Colic (Murphy&apos;s Sign)<br />
                  • Fatty Liver Tension &amp; Hepatitis<br />
                  • Radiates to right shoulder blade after fatty meals
                </p>
              </div>

              <div className="p-4 rounded-xl border bg-teal-50/30 dark:bg-teal-950/20" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-extrabold text-teal-600">LUQ (Left Upper Quadrant)</span>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Stomach & Pancreas</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  • Gastric Peptic Ulcers &amp; Gastritis<br />
                  • Pancreatitis (Boring pain radiating straight through to back)<br />
                  • Splenic flexure gas entrapment
                </p>
              </div>

              <div className="p-4 rounded-xl border bg-red-50/30 dark:bg-red-950/20" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-extrabold text-red-600">RLQ (Right Lower Quadrant)</span>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Appendix Warning (McBurney)</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  • Acute Appendicitis (Starts navel, moves to sharp RLQ)<br />
                  • Ovarian cyst rupture or ectopic pregnancy<br />
                  • Right kidney stone descending
                </p>
              </div>

              <div className="p-4 rounded-xl border bg-indigo-50/30 dark:bg-indigo-950/20" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-extrabold text-indigo-600">LLQ (Left Lower Quadrant)</span>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Colon & Diverticula</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  • Diverticulitis inflammation<br />
                  • Irritable Bowel Syndrome (IBS) cramping<br />
                  • Constipation dysmotility relieved post-defecation
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
