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
} from 'lucide-react';
import { doctors } from '@/lib/mockData';

interface BodyZone {
  id: string;
  name: string;
  icon: string;
  badge: string;
  symptoms: string[];
  specialty: string;
  pin: { x: number; y: number }; // Percentage coordinates on body
  color: string;
  doctorId: string;
  description: string;
}

const BODY_ZONES: BodyZone[] = [
  {
    id: 'brain',
    name: 'Head & Brain',
    icon: '🧠',
    badge: 'Neurology',
    symptoms: ['Migraine / Severe Headache', 'Dizziness & Vertigo', 'Memory & Focus', 'Sleep Disorders'],
    specialty: 'Neurologist',
    pin: { x: 50, y: 12 },
    color: '#8B5CF6',
    doctorId: '2', // Dr. Rajesh Kumar
    description: 'Expert care for severe headaches, brain fog, nerve pain, and neurological health.',
  },
  {
    id: 'ent',
    name: 'Eyes, Ear & Throat',
    icon: '👂',
    badge: 'ENT & Vision',
    symptoms: ['Sinus Pressure', 'Ear Pain / Infection', 'Sore Throat', 'Blurry Vision / Eye Strain'],
    specialty: 'ENT Specialist',
    pin: { x: 50, y: 20 },
    color: '#EC4899',
    doctorId: '8', // Dr. Karthik Nair
    description: 'Relief for chronic sinusitis, hearing trouble, tonsillitis, and optical health.',
  },
  {
    id: 'heart',
    name: 'Chest & Heart',
    icon: '❤️',
    badge: 'Cardiology',
    symptoms: ['Chest Discomfort / Tightness', 'Heart Palpitations', 'High Blood Pressure', 'Shortness of Breath'],
    specialty: 'Cardiologist',
    pin: { x: 52, y: 32 },
    color: '#EF4444',
    doctorId: '1', // Dr. Priya Sharma
    description: 'Specialized cardiac evaluation, ECG interpretation, and cardiovascular care.',
  },
  {
    id: 'lungs',
    name: 'Lungs & Breathing',
    icon: '🫁',
    badge: 'Pulmonology',
    symptoms: ['Persistent Dry/Wet Cough', 'Asthma Wheezing', 'Chest Congestion', 'Post-COVID Recovery'],
    specialty: 'Pulmonologist',
    pin: { x: 44, y: 35 },
    color: '#06B6D4',
    doctorId: '10', // Dr. Rohan Joshi
    description: 'Comprehensive respiratory care for chronic cough, allergies, and lung health.',
  },
  {
    id: 'abdomen',
    name: 'Stomach & Digestion',
    icon: '🥑',
    badge: 'General & Gastro',
    symptoms: ['Stomach Ache / Cramps', 'Severe Acidity / Reflux', 'Bloating & Indigestion', 'Viral Stomach Flu'],
    specialty: 'General Physician',
    pin: { x: 50, y: 46 },
    color: '#F59E0B',
    doctorId: '6', // Dr. Arjun Mehta
    description: 'Immediate relief for digestive issues, gut infections, and general medical care.',
  },
  {
    id: 'bones',
    name: 'Spine, Bones & Joints',
    icon: '🦴',
    badge: 'Orthopedics',
    symptoms: ['Lower Back Pain', 'Knee Joint Stiffness', 'Sports Sprain', 'Neck Strain & Arthritis'],
    specialty: 'Orthopedic',
    pin: { x: 50, y: 65 },
    color: '#3B82F6',
    doctorId: '4', // Dr. Vikram Singh
    description: 'Expert treatment for joint replacement, ligament tears, spine and posture care.',
  },
  {
    id: 'skin',
    name: 'Skin, Hair & Nails',
    icon: '🧴',
    badge: 'Dermatology',
    symptoms: ['Acne & Pimples', 'Itchy Rashes & Allergies', 'Hair Fall & Dandruff', 'Eczema & Psoriasis'],
    specialty: 'Dermatologist',
    pin: { x: 30, y: 40 },
    color: '#10B981',
    doctorId: '3', // Dr. Ananya Patel
    description: 'Advanced clinical dermatology for clear skin, scalp wellness, and allergy relief.',
  },
  {
    id: 'pediatrics',
    name: 'Child & Infant Care',
    icon: '👶',
    badge: 'Pediatrics',
    symptoms: ['Child Fever & Cold', 'Vaccination Schedule', 'Growth Milestones', 'Colic & Teething'],
    specialty: 'Pediatrician',
    pin: { x: 70, y: 40 },
    color: '#F97316',
    doctorId: '5', // Dr. Meera Reddy
    description: 'Gentle, compassionate healthcare for newborns, toddlers, and young teens.',
  },
];

export default function Interactive3DAnatomy() {
  const [selectedZone, setSelectedZone] = useState<BodyZone>(BODY_ZONES[2]); // Default to Heart
  const [rotation, setRotation] = useState<'front' | 'iso' | 'back'>('iso');

  // Matching doctor from mockData
  const matchedDoctor = doctors.find(d => d.id === selectedZone.doctorId) || doctors[0];

  return (
    <div className="card-3d bg-white dark:bg-slate-900 border rounded-3xl p-6 lg:p-8 shadow-xl overflow-hidden relative"
      style={{ borderColor: 'var(--border-color)' }}>
      {/* Background ambient glow */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: selectedZone.color }}
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b"
        style={{ borderColor: 'var(--border-color)' }}>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            <Rotate3d className="w-3.5 h-3.5 text-teal-600 animate-spin" style={{ animationDuration: '6s' }} />
            3D Interactive Health Visualizer
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Where Does It Hurt? Click Any Organ in 3D
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Select a body area below to discover matching symptoms, required medical specialties, and instant doctor booking.
          </p>
        </div>

        {/* 3D Perspective Angles */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto shrink-0 border"
          style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => setRotation('front')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              rotation === 'front' ? 'bg-white dark:bg-slate-700 shadow-xs text-teal-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            0° Front
          </button>
          <button
            onClick={() => setRotation('iso')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              rotation === 'iso' ? 'bg-white dark:bg-slate-700 shadow-xs text-teal-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            3D Isometric
          </button>
          <button
            onClick={() => setRotation('back')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              rotation === 'back' ? 'bg-white dark:bg-slate-700 shadow-xs text-teal-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Spine View
          </button>
        </div>
      </div>

      {/* Main 3D Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ── LEFT: 3D Body Hologram Stage (Cols 5) ── */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            className="perspective-1000 relative w-64 sm:w-72 h-96 sm:h-[420px] rounded-2xl flex items-center justify-center p-4 transition-transform duration-500"
            style={{
              transform:
                rotation === 'iso'
                  ? 'rotateY(-12deg) rotateX(6deg)'
                  : rotation === 'back'
                  ? 'rotateY(180deg)'
                  : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Grid Pedestal / Holographic Floor */}
            <div
              className="absolute bottom-2 w-56 h-28 rounded-full border border-teal-500/30 opacity-60"
              style={{
                transform: 'rotateX(75deg) translateZ(-40px)',
                background: 'radial-gradient(ellipse at center, rgba(13,148,136,0.2) 0%, transparent 70%)',
                boxShadow: '0 0 25px rgba(13,148,136,0.3)',
              }}
            />

            {/* Stylized Silhouette Human Anatomy SVG */}
            <div className="relative w-full h-full flex items-center justify-center">
              <svg
                viewBox="0 0 200 400"
                className="w-full h-full drop-shadow-md select-none transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.08))',
                }}
              >
                {/* Body Silhouette */}
                <g fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700">
                  {/* Head */}
                  <ellipse cx="100" cy="50" rx="22" ry="26" fill="rgba(13,148,136,0.08)" />
                  {/* Neck */}
                  <path d="M94 76 L94 92 M106 76 L106 92" />
                  {/* Torso & Shoulders */}
                  <path
                    d="M60 98 C75 92 125 92 140 98 C148 102 144 140 138 180 C134 205 130 220 126 230 C122 235 78 235 74 230 C70 220 66 205 62 180 C56 140 52 102 60 98 Z"
                    fill="rgba(13,148,136,0.04)"
                  />
                  {/* Arms */}
                  <path d="M58 98 C45 130 38 170 34 210 M142 98 C155 130 162 170 166 210" strokeLinecap="round" />
                  {/* Spine line */}
                  <path d="M100 80 L100 230" strokeDasharray="3 3" opacity="0.4" />
                  {/* Legs */}
                  <path d="M84 232 C82 280 80 330 76 380 M116 232 C118 280 120 330 124 380" strokeLinecap="round" />
                  {/* Knee Joints */}
                  <circle cx="81" cy="305" r="4" fill="rgba(13,148,136,0.2)" />
                  <circle cx="119" cy="305" r="4" fill="rgba(13,148,136,0.2)" />
                </g>

                {/* Active Highlight Glow Area on Body */}
                <circle
                  cx={selectedZone.pin.x * 2}
                  cy={selectedZone.pin.y * 3.8}
                  r="26"
                  fill={selectedZone.color}
                  fillOpacity="0.2"
                  className="animate-pulse"
                />
              </svg>

              {/* Interactive 3D Glowing Pins */}
              {BODY_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className="absolute z-20 group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer"
                    style={{
                      left: `${zone.pin.x}%`,
                      top: `${zone.pin.y}%`,
                    }}
                    title={zone.name}
                  >
                    {/* Ripple Ring */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'scale-125 pulse-glow'
                          : 'scale-90 hover:scale-110 opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: isSelected ? zone.color : 'white',
                        boxShadow: isSelected
                          ? `0 0 16px ${zone.color}`
                          : '0 2px 6px rgba(0,0,0,0.15)',
                        border: `2px solid ${zone.color}`,
                      }}
                    >
                      <span className="text-xs select-none">{zone.icon}</span>
                    </div>

                    {/* Hover Floating Label */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-9 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-md transition-all pointer-events-none ${
                        isSelected
                          ? 'opacity-100 scale-100 bg-slate-900 text-white'
                          : 'opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border'
                      }`}
                    >
                      {zone.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Body Part Pill Selector for Accessibility */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 max-w-sm">
            {BODY_ZONES.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZone(z)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all border ${
                  selectedZone.id === z.id
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-teal-600 dark:border-teal-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {z.icon} {z.name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Selected Organ Breakdown & Instant Doctor Match (Cols 7) ── */}
        <div className="lg:col-span-7 space-y-5">
          {/* Organ & Specialty Header */}
          <div className="p-4 sm:p-5 rounded-2xl border transition-all"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs border"
                  style={{ borderColor: 'var(--border-color)' }}>
                  {selectedZone.icon}
                </span>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl" style={{ color: 'var(--text-primary)' }}>
                    {selectedZone.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-600">
                    Recommended Specialist: <span className="underline font-bold">{selectedZone.specialty}</span>
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-xs"
                style={{ backgroundColor: selectedZone.color }}>
                {selectedZone.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              {selectedZone.description}
            </p>

            {/* Clickable Common Symptoms Chips */}
            <div className="mt-3.5 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Common Symptoms in this zone (Click to filter):
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedZone.symptoms.map((sym) => (
                  <Link
                    key={sym}
                    href={`/find-doctors?q=${encodeURIComponent(sym)}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border hover:border-teal-500 hover:text-teal-600 transition-all flex items-center gap-1 group shadow-2xs"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    <span>{sym}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Instant Top Doctor Match (Flipkart Preview Style) ── */}
          <div className="bg-white dark:bg-slate-800 border rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden"
            style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Top Verified Specialist for {selectedZone.name}
              </span>
              <span className="flipkart-assured-badge">
                ✦ HealthBridge ASSURED
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Doctor Avatar & Details */}
              <div className="flex items-center gap-3">
                <img
                  src={matchedDoctor.avatar}
                  alt={matchedDoctor.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                />
                <div>
                  <h4 className="font-bold text-base hover:text-teal-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {matchedDoctor.name}
                  </h4>
                  <p className="text-xs font-semibold text-teal-600">{matchedDoctor.specialty}</p>
                  <p className="text-[11px] text-slate-400">{matchedDoctor.experience} yrs exp • {matchedDoctor.clinicName}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="flipkart-rating-badge text-[11px]">
                      {matchedDoctor.rating} <Star className="w-2.5 h-2.5 fill-white text-white" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">({matchedDoctor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0"
                style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex sm:justify-end items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                    ₹{matchedDoctor.fee}
                  </span>
                  <span className="text-xs line-through text-slate-400">
                    ₹{matchedDoctor.originalFee || 1200}
                  </span>
                  <span className="flipkart-discount-tag text-xs">
                    {matchedDoctor.discountPercent || 33}% off
                  </span>
                </div>
                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                  🟢 {matchedDoctor.availableToday ? 'Available Today' : matchedDoctor.nextAvailable}
                </p>

                <div className="flex gap-2 mt-2">
                  <Link
                    href={`/doctor/${matchedDoctor.id}?book=true`}
                    className="flipkart-btn-book text-xs py-2 px-4 flex items-center justify-center gap-1 font-bold flex-1 sm:flex-initial"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" /> Book Visit
                  </Link>
                  <Link
                    href={`/find-doctors?specialty=${encodeURIComponent(selectedZone.specialty)}`}
                    className="btn btn-secondary text-xs py-2 px-3 border border-slate-300 dark:border-slate-700"
                  >
                    View All {selectedZone.specialty}s →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
