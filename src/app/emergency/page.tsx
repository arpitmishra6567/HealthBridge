'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { emergencyCenters } from '@/lib/mockData';
import {
  Phone,
  AlertTriangle,
  MapPin,
  Clock,
  ShieldAlert,
  ArrowRight,
  HeartPulse,
  Activity,
  Bot,
  ExternalLink,
} from 'lucide-react';

export default function EmergencyPage() {
  const [selectedArea, setSelectedArea] = useState('All');

  const redFlags = [
    { title: 'Severe Chest Pain or Pressure', desc: 'Heavy squeezing in center of chest, radiating to left arm, neck, or jaw.', action: 'Call 112 / 108 immediately — Suspected acute coronary event.' },
    { title: 'FAST Stroke Symptoms', desc: 'Face drooping, Arm weakness, Slurred speech, Time to call emergency services.', action: 'Do not wait. Brain tissue is lost every minute.' },
    { title: 'Extreme Shortness of Breath', desc: 'Inability to speak in full sentences, gasping, or blue discoloration of lips/fingertips.', action: 'Sit upright, administer oxygen if prescribed, seek immediate ER.' },
    { title: 'Uncontrolled Bleeding or Major Trauma', desc: 'Continuous spurting blood, deep penetrating wounds, or severe head injury.', action: 'Apply firm direct pressure with clean cloth and dispatch ambulance.' },
    { title: 'Loss of Consciousness / Seizures', desc: 'Unresponsive patient, prolonged seizure (>5 mins), or confusion following injury.', action: 'Turn patient on side (recovery position), clear airway, call 112.' },
  ];

  const helplines = [
    { number: '112', title: 'National Emergency Helpline', desc: 'Police, Fire, Ambulance (All India 24/7)', primary: true },
    { number: '108', title: 'Emergency Medical & Ambulance', desc: 'State Emergency Ambulance Service', primary: true },
    { number: '102', title: 'Maternal & Child Ambulance', desc: 'Free transport for pregnant mothers & infants', primary: false },
    { number: '1075', title: 'National Health Helpline', desc: 'Ministry of Health & Family Welfare', primary: false },
    { number: '14416', title: 'Tele-MANAS (Mental Health)', desc: '24/7 Free, Confidential Mental Health Counseling', primary: false },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
          {/* Urgent Emergency Alert Header */}
          <div className="rounded-3xl p-6 lg:p-8 mb-10 text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
              boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.25)',
            }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full w-fit text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" /> Medical Emergency Protocol
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                  Emergency Medical Navigation
                </h1>
                <p className="text-sm lg:text-base mt-2 opacity-95 leading-relaxed">
                  If someone is experiencing acute chest pain, stroke symptoms, loss of consciousness, or severe breathing distress,
                  dial <strong>112</strong> or <strong>108</strong> immediately. Do not delay seeking emergency care.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="tel:112"
                  className="px-6 py-4 rounded-2xl font-black text-lg bg-white text-red-700 shadow-xl flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95"
                >
                  <Phone className="w-6 h-6 animate-bounce" />
                  DIAL 112 NOW
                </a>
                <a
                  href="tel:108"
                  className="px-6 py-4 rounded-2xl font-black text-lg bg-red-800 text-white border-2 border-white/30 flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95"
                >
                  <Phone className="w-6 h-6" />
                  DIAL 108 (Ambulance)
                </a>
              </div>
            </div>
          </div>

          {/* India Emergency Numbers Grid */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Phone className="w-5 h-5 text-red-600" />
              Verified Emergency Helplines (India)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {helplines.map((h, i) => (
                <div key={i} className="card p-5 border flex flex-col justify-between"
                  style={{
                    backgroundColor: h.primary ? 'var(--color-emergency-light)' : 'var(--bg-secondary)',
                    borderColor: h.primary ? 'var(--color-emergency)' : 'var(--border-color)',
                  }}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-black" style={{ color: h.primary ? 'var(--color-emergency)' : 'var(--text-primary)' }}>
                        {h.number}
                      </span>
                      {h.primary && (
                        <span className="badge badge-emergency text-[10px]">Toll-Free 24/7</span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                      {h.title}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {h.desc}
                    </p>
                  </div>

                  <a
                    href={`tel:${h.number}`}
                    className="btn btn-sm mt-4 w-full justify-center gap-1.5 font-bold"
                    style={{
                      backgroundColor: h.primary ? 'var(--color-emergency)' : 'var(--color-primary)',
                      color: 'white',
                    }}
                  >
                    <Phone className="w-4 h-4" /> Call {h.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flag Symptoms Checklist */}
          <div className="mb-12">
            <div className="card p-6 border-l-4" style={{ borderLeftColor: '#DC2626' }}>
              <div className="flex items-center gap-2 mb-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-lg font-bold">Red Flag Critical Symptoms Checklist</h2>
              </div>
              <p className="text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
                If any of the following signs are present, prioritize immediate ambulance transport over clinic visits.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {redFlags.map((flag, idx) => (
                  <div key={idx} className="p-4 rounded-xl border"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                      <h3 className="font-bold text-sm text-red-700 dark:text-red-400">
                        {flag.title}
                      </h3>
                    </div>
                    <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {flag.desc}
                    </p>
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      💡 {flag.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nearby Emergency Centers & Trauma Units */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <HeartPulse className="w-5 h-5 text-teal-600" />
                  Nearby 24/7 Emergency Rooms & Trauma Centers
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Simulated demonstration centers in Mumbai with active emergency casualty departments
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedArea('All')}
                  className={`btn btn-xs ${selectedArea === 'All' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  All Mumbai
                </button>
                <button
                  onClick={() => setSelectedArea('Central')}
                  className={`btn btn-xs ${selectedArea === 'Central' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Central (Parel)
                </button>
                <button
                  onClick={() => setSelectedArea('Western')}
                  className={`btn btn-xs ${selectedArea === 'Western' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Western Suburbs
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emergencyCenters
                .filter(c => selectedArea === 'All' || c.area.toLowerCase().includes(selectedArea.toLowerCase()))
                .map((hospital) => (
                  <div key={hospital.id} className="card p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                            {hospital.name}
                          </h3>
                          <p className="text-xs flex items-center gap-1 mt-1" style={{ color: 'var(--text-tertiary)' }}>
                            <MapPin className="w-3.5 h-3.5" /> {hospital.address}
                          </p>
                        </div>
                        <span className="badge badge-emergency text-[10px] shrink-0 font-bold">
                          {hospital.traumaLevel}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y text-xs text-center"
                        style={{ borderColor: 'var(--border-color)' }}>
                        <div>
                          <span style={{ color: 'var(--text-tertiary)' }}>Distance:</span>
                          <p className="font-bold text-teal-600">{hospital.distance}</p>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-tertiary)' }}>Est. Transit:</span>
                          <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{hospital.estTime}</p>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-tertiary)' }}>ICU Availability:</span>
                          <p className="font-bold text-emerald-600">{hospital.icuBedsAvailable} Beds</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-1 text-emerald-600">
                          ✓ Cardiac Cath Lab Active
                        </span>
                        <span className="flex items-center gap-1 text-blue-600">
                          ✓ Ambulance on Standby
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                      <a
                        href={`tel:${hospital.emergencyNumber.replace(/\\s/g, '')}`}
                        className="btn btn-primary btn-sm flex-1 justify-center gap-1.5 font-bold"
                        style={{ backgroundColor: 'var(--color-emergency)', color: 'white' }}
                      >
                        <Phone className="w-4 h-4" /> Emergency: {hospital.emergencyNumber}
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(hospital.name + ' ' + hospital.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm gap-1 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Navigate
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* AI Navigator Alternative */}
          <div className="mt-12 p-6 rounded-2xl border text-center max-w-2xl mx-auto"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <Bot className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
              Unsure if your symptoms are an emergency?
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
              Our AI Health Navigator uses an evidence-based clinical question flow to help assess symptom urgency and recommend whether you need an emergency room or a routine specialist.
            </p>
            <Link href="/ai-assistant" className="btn btn-primary btn-sm inline-flex items-center gap-1.5">
              Launch AI Symptom Triage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
