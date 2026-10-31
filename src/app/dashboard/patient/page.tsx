// HealthBridge
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { samplePatientProfile, sampleAppointments, sampleRecords } from '@/lib/mockData';
import {
  Calendar,
  Clock,
  Pill,
  AlertTriangle,
  FolderLock,
  Activity,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Phone,
  ArrowRight,
  Bot,
  Plus,
} from 'lucide-react';

export default function PatientDashboardPage() {
  const [profile] = useState(samplePatientProfile);
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [pendingConsent, setPendingConsent] = useState<{
    id: string;
    doctor: string;
    specialty: string;
    purpose: string;
    scope: string;
    status: 'pending' | 'approved' | 'denied';
  }>({
    id: 'REQ-449',
    doctor: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    purpose: 'Pre-consultation review of cardiac lab reports and ongoing medications',
    scope: 'Cardiac Lab & Prescription records only (24 Hours validity)',
    status: 'pending',
  });

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
  };

  const handleConsentAction = (status: 'approved' | 'denied') => {
    setPendingConsent(prev => ({ ...prev, status }));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Top Breadcrumb & Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>
                <Link href="/" className="hover:underline">Home</Link>
                <span>/</span>
                <span>Portals</span>
                <span>/</span>
                <span style={{ color: 'var(--color-primary)' }}>Patient Dashboard</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Welcome back, {profile.name} 👋
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Manage your appointments, personal health vault, vitals, and verified doctor access.
              </p>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl border text-xs"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <span className="px-2.5 py-1 rounded-lg font-semibold text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                Patient
              </span>
              <Link href="/dashboard/doctor" className="px-2.5 py-1 rounded-lg font-medium transition-colors hover:text-teal-600"
                style={{ color: 'var(--text-secondary)' }}>
                Doctor View →
              </Link>
              <Link href="/dashboard/admin" className="px-2.5 py-1 rounded-lg font-medium transition-colors hover:text-teal-600"
                style={{ color: 'var(--text-secondary)' }}>
                Admin Portal →
              </Link>
            </div>
          </div>

          {/* Quick Health Summary Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)', color: 'var(--color-primary)' }}>
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Blood Pressure</p>
                <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{profile.vitals.bloodPressure}</p>
                <span className="text-[10px] text-emerald-600 font-medium">Optimal Range</span>
              </div>
            </div>

            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Known Allergies</p>
                <p className="text-base font-bold text-red-600">{profile.allergies.length} Flagged</p>
                <span className="text-[10px] text-red-500 font-medium">Penicillin Critical</span>
              </div>
            </div>

            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Active Medications</p>
                <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{profile.medications.length} Prescribed</p>
                <span className="text-[10px] text-blue-600 font-medium">Next: Morning Dose</span>
              </div>
            </div>

            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#A855F7' }}>
                <FolderLock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Vault Records</p>
                <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{sampleRecords.length} Documents</p>
                <span className="text-[10px] text-purple-600 font-medium">ABHA-Ready Demo</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Main Activities & Data */}
            <div className="lg:col-span-2 space-y-8">
              {/* Urgent Consent Sharing Request Banner */}
              {pendingConsent.status === 'pending' && (
                <div className="rounded-2xl border p-5 relative overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(13, 148, 136, 0.05)',
                    borderColor: 'var(--color-primary)',
                  }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge badge-primary text-[10px]">Consent Authorization Request</span>
                        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Expires in 24h</span>
                      </div>
                      <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                        {pendingConsent.doctor} ({pendingConsent.specialty}) is requesting record access
                      </h3>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                        <strong>Purpose:</strong> {pendingConsent.purpose}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                        <strong>Scope:</strong> {pendingConsent.scope}
                      </p>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => handleConsentAction('approved')}
                          className="btn btn-primary btn-sm gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Approve 24-Hr Access
                        </button>
                        <button
                          onClick={() => handleConsentAction('denied')}
                          className="btn btn-secondary btn-sm gap-1.5"
                        >
                          <XCircle className="w-4 h-4" />
                          Deny Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {pendingConsent.status === 'approved' && (
                <div className="rounded-xl border p-4 flex items-center justify-between"
                  style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: '#10B981' }}>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                      Access granted to {pendingConsent.doctor}. Secure token active for 24 hours.
                    </span>
                  </div>
                  <button
                    onClick={() => handleConsentAction('denied')}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Revoke Now
                  </button>
                </div>
              )}

              {/* Upcoming Appointments Section */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Upcoming Appointments
                    </h2>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Your scheduled consultations with verified specialists
                    </p>
                  </div>
                  <Link href="/find-doctors" className="btn btn-primary btn-sm gap-1.5">
                    <Plus className="w-4 h-4" /> Book New
                  </Link>
                </div>

                <div className="space-y-4">
                  {appointments.filter(a => a.status === 'upcoming').map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-sm"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold"
                          style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)', color: 'var(--color-primary)' }}>
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                              {apt.doctorName}
                            </h3>
                            <span className="badge badge-outline text-[10px]">{apt.doctorSpecialty}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {apt.time}
                            </span>
                            <span className="capitalize font-medium text-teal-700 dark:text-teal-400">
                              • {apt.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link href="/ai-assistant" className="btn btn-ghost btn-xs text-xs" title="Prepare notes with AI triage">
                          <Bot className="w-3.5 h-3.5 mr-1" /> AI Prep
                        </Link>
                        <button
                          onClick={() => handleCancelAppointment(apt.id)}
                          className="btn btn-secondary btn-xs text-xs text-red-600 hover:text-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}

                  {appointments.filter(a => a.status === 'upcoming').length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No upcoming appointments scheduled.</p>
                      <Link href="/find-doctors" className="btn btn-primary btn-sm mt-3">Find a Doctor</Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Medications & Refills */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Prescriptions & Daily Medications
                    </h2>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Active medication schedule authorized by treating physicians
                    </p>
                  </div>
                  <Link href="/medical-vault" className="text-xs text-teal-600 hover:underline font-semibold">
                    View in Vault →
                  </Link>
                </div>

                <div className="space-y-3">
                  {profile.medications.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border flex items-center justify-between gap-4"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                          <Pill className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {med.name}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            {med.dosage} • {med.frequency} • {med.timing}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                          By {med.prescribedBy}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Medical Vault Records */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Recent Health Records
                    </h2>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Laboratory tests, consultation summaries, and prescriptions
                    </p>
                  </div>
                  <Link href="/medical-vault" className="btn btn-secondary btn-sm gap-1.5">
                    <FolderLock className="w-4 h-4" /> Open Vault
                  </Link>
                </div>

                <div className="space-y-3">
                  {sampleRecords.slice(0, 3).map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)', color: 'var(--color-primary)' }}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {rec.title}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            {rec.date} • {rec.doctor}
                          </p>
                        </div>
                      </div>
                      <span className="badge badge-primary text-[10px] capitalize">
                        {rec.category.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Patient Profile, Allergies, Quick AI Triage */}
            <div className="space-y-6">
              {/* Patient UHID Card */}
              <div className="card p-5 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(13, 148, 136, 0.08) 100%)',
                  borderColor: 'var(--border-color)',
                }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}>
                    RS
                  </div>
                  <div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                      {profile.name}
                    </h3>
                    <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                      UHID: {profile.uhid}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y text-xs" style={{ borderColor: 'var(--border-color)' }}>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Age / Gender:</span>
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{profile.age} Y / {profile.gender}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Blood Group:</span>
                    <p className="font-semibold text-red-600">{profile.bloodGroup}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Emergency Contact:</span>
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{profile.emergencyContact.relation}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Contact No:</span>
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{profile.contact}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span>Consent Status: Strict Opt-in</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Protected
                  </span>
                </div>
              </div>

              {/* Critical Allergies Box */}
              <div className="card p-5 border-l-4" style={{ borderLeftColor: '#EF4444' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    Critical Allergies
                  </h3>
                  <span className="badge badge-emergency text-[10px]">Medical Alert</span>
                </div>
                <div className="space-y-2">
                  {profile.allergies.map((alg, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <div>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{alg.name}</span>
                        <span className="block text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Dx: {alg.diagnosed}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        alg.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {alg.severity} Severity
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick AI Symptom Navigator Card */}
              <div className="card p-5"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                }}>
                <div className="flex items-center gap-2 mb-2 text-teal-600 dark:text-teal-400">
                  <Bot className="w-5 h-5" />
                  <h3 className="font-bold text-sm">Feeling Unwell?</h3>
                </div>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Enter symptoms into the AI Triage Navigator to assess urgency and discover the appropriate specialist category.
                </p>
                <Link href="/ai-assistant" className="btn btn-primary btn-sm w-full gap-1.5 justify-center">
                  Start AI Symptom Triage <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Emergency Helplines Callout */}
              <div className="rounded-xl border p-4"
                style={{
                  backgroundColor: 'var(--color-emergency-light)',
                  borderColor: 'var(--color-emergency)',
                  color: 'var(--color-emergency)',
                }}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Phone className="w-4 h-4" />
                  <span>Immediate Medical Distress?</span>
                </div>
                <p className="text-xs opacity-90 mb-3">
                  Do not wait for appointment slots in critical conditions. Call emergency dispatch immediately.
                </p>
                <div className="flex gap-2">
                  <a href="tel:112" className="btn btn-sm text-xs font-bold text-white flex-1 text-center justify-center"
                    style={{ backgroundColor: 'var(--color-emergency)' }}>
                    Call 112 (National)
                  </a>
                  <Link href="/emergency" className="btn btn-secondary btn-sm text-xs font-semibold">
                    Hospital Finder
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
