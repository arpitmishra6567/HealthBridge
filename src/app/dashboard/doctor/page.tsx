// HealthBridge
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { sampleDoctorAppointments, doctors, sampleRecords } from '@/lib/mockData';
import {
  Stethoscope,
  BadgeCheck,
  Calendar,
  Clock,
  User,
  FolderLock,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Video,
  MapPin,
  Award,
  ChevronRight,
  ExternalLink,
  Lock,
  Unlock,
  Settings,
  X,
  Phone,
} from 'lucide-react';

export default function DoctorDashboardPage() {
  const currentDoctor = doctors[0]; // Dr. Priya Sharma
  const [appointments, setAppointments] = useState(sampleDoctorAppointments);
  const [activeTab, setActiveTab] = useState<'queue' | 'availability' | 'records' | 'profile'>('queue');
  const [selectedPatientRecord, setSelectedPatientRecord] = useState<string | null>(null);

  // Availability schedule state
  const [fee, setFee] = useState(currentDoctor.fee);
  const [availableToday, setAvailableToday] = useState(currentDoctor.availableToday);
  const [slotDuration, setSlotDuration] = useState('20 Mins');

  const updateStatus = (id: string, newStatus: 'Waiting' | 'In-Progress' | 'Completed') => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Breadcrumb & Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>
                <Link href="/" className="hover:underline">Home</Link>
                <span>/</span>
                <Link href="/dashboard" className="hover:underline">Portals</Link>
                <span>/</span>
                <span className="text-blue-600 font-semibold">Doctor Workspace</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {currentDoctor.name}
                </h1>
                <span className="badge badge-primary gap-1 text-xs">
                  <BadgeCheck className="w-3.5 h-3.5" /> NMC Verified
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                {currentDoctor.specialty} • {currentDoctor.clinicName} • Reg ID: {currentDoctor.registrationNumber}
              </p>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl border text-xs"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <Link href="/dashboard/patient" className="px-2.5 py-1 rounded-lg font-medium transition-colors hover:text-teal-600"
                style={{ color: 'var(--text-secondary)' }}>
                ← Patient View
              </Link>
              <span className="px-2.5 py-1 rounded-lg font-semibold text-white bg-blue-600">
                Doctor
              </span>
              <Link href="/dashboard/admin" className="px-2.5 py-1 rounded-lg font-medium transition-colors hover:text-teal-600"
                style={{ color: 'var(--text-secondary)' }}>
                Admin Portal →
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card p-4">
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Today&apos;s Appointments</p>
              <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{appointments.length}</p>
              <span className="text-[10px] text-blue-600 font-medium">3 In-Clinic • 1 Video Call</span>
            </div>
            <div className="card p-4">
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Waiting in Clinic</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">
                {appointments.filter(a => a.status === 'Waiting').length} Patients
              </p>
              <span className="text-[10px] text-amber-600 font-medium">Avg wait time ~12m</span>
            </div>
            <div className="card p-4">
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Vault Consents Active</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">
                {appointments.filter(a => a.vaultAccessGranted).length} Authorized
              </p>
              <span className="text-[10px] text-emerald-600 font-medium">Valid for 24 hours</span>
            </div>
            <div className="card p-4">
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Consultation Fee</p>
              <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>₹{fee}</p>
              <span className="text-[10px] text-teal-600 font-medium">Available Today: {availableToday ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b mb-6 gap-6" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('queue')}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'queue'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Patient Consultation Queue ({appointments.length})
            </button>

            <button
              onClick={() => setActiveTab('availability')}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'availability'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              Schedule & Clinic Slots
            </button>

            <button
              onClick={() => setActiveTab('records')}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'records'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <FolderLock className="w-4 h-4" />
              Patient Authorized Records ({appointments.filter(a => a.vaultAccessGranted).length})
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Award className="w-4 h-4" />
              NMC Verification & Credentials
            </button>
          </div>

          {/* TAB 1: Queue */}
          {activeTab === 'queue' && (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="card p-5 transition-all hover:shadow-sm"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-white bg-blue-600">
                        {apt.timeSlot}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                            {apt.patientName}
                          </h3>
                          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            ({apt.patientAge}y, {apt.patientGender}) • UHID: {apt.uhid}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            apt.type === 'Video Call' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {apt.type}
                          </span>
                        </div>

                        <p className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                          <strong>Chief Complaint:</strong> {apt.chiefComplaint}
                        </p>

                        {apt.triageSummary && (
                          <div className="mt-2 text-xs p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-900">
                            <strong>🤖 Pre-Consultation AI Triage Summary:</strong> {apt.triageSummary}
                          </div>
                        )}

                        <div className="flex items-center gap-3 mt-2 text-xs">
                          {apt.vaultAccessGranted ? (
                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                              <Unlock className="w-3.5 h-3.5" /> Medical Vault Authorized (Expires in 23h)
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-amber-600 font-medium">
                              <Lock className="w-3.5 h-3.5" /> Vault Access Pending Patient Consent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        apt.status === 'In-Progress' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                        apt.status === 'Waiting' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        Status: {apt.status}
                      </span>

                      {apt.status === 'Waiting' && (
                        <button
                          onClick={() => updateStatus(apt.id, 'In-Progress')}
                          className="btn btn-primary btn-sm text-xs bg-blue-600 hover:bg-blue-700"
                        >
                          Start Consult
                        </button>
                      )}

                      {apt.status === 'In-Progress' && (
                        <button
                          onClick={() => updateStatus(apt.id, 'Completed')}
                          className="btn btn-primary btn-sm text-xs bg-emerald-600 hover:bg-emerald-700"
                        >
                          Complete & Close
                        </button>
                      )}

                      {apt.vaultAccessGranted && (
                        <button
                          onClick={() => {
                            setSelectedPatientRecord(apt.uhid);
                            setActiveTab('records');
                          }}
                          className="btn btn-secondary btn-sm text-xs gap-1"
                        >
                          <FolderLock className="w-3.5 h-3.5" /> View Vault
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Availability & Slots */}
          {activeTab === 'availability' && (
            <div className="card p-6 max-w-2xl">
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Consultation Availability & Fee Configuration
              </h2>
              <p className="text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
                Updates made here immediately reflect on your public doctor card and booking calendar.
              </p>

              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl border"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Accept Walk-in / Today Booking</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Show &apos;Available Today&apos; badge to patients nearby</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availableToday}
                      onChange={(e) => setAvailableToday(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      Consultation Fee (₹ INR)
                    </label>
                    <input
                      type="number"
                      value={fee}
                      onChange={(e) => setFee(Number(e.target.value))}
                      className="input w-full text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      Default Slot Duration
                    </label>
                    <select
                      value={slotDuration}
                      onChange={(e) => setSlotDuration(e.target.value)}
                      className="input w-full text-sm"
                    >
                      <option value="15 Mins">15 Minutes</option>
                      <option value="20 Mins">20 Minutes</option>
                      <option value="30 Mins">30 Minutes</option>
                      <option value="45 Mins">45 Minutes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    Clinic Timing Hours
                  </label>
                  <input
                    type="text"
                    defaultValue={currentDoctor.timings}
                    className="input w-full text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button className="btn btn-primary btn-sm bg-blue-600 hover:bg-blue-700">
                    Save Schedule Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Authorized Records */}
          {activeTab === 'records' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    Patient Authorized Medical Vault Access
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Only records authorized by the patient with an active consent token are displayed. All views are logged in the platform audit log.
                  </p>
                </div>
                <span className="badge badge-primary text-[10px]">Strict Consent Enforced</span>
              </div>

              <div className="space-y-4">
                {sampleRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-blue-600 bg-blue-100 dark:bg-blue-950">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                            {rec.title}
                          </h4>
                          <span className="badge badge-outline text-[10px] capitalize">
                            {rec.category.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                          {rec.summary}
                        </p>
                        <p className="text-[11px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
                          Record Date: {rec.date} • Authorized Patient: Rahul Sharma (UHID: HB-8849-2026)
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Token Valid
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Profile & NMC Verification */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Award className="w-5 h-5 text-blue-600" />
                  National Medical Commission (NMC) Verification
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                    <p className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4" /> State Medical Council Status: Verified Active
                    </p>
                    <p className="text-emerald-700 dark:text-emerald-400 mt-1">
                      Registration Certificate verified against the Uttar Pradesh Medical Council Registry.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-2 border-y" style={{ borderColor: 'var(--border-color)' }}>
                    <div>
                      <span style={{ color: 'var(--text-tertiary)' }}>Registration Number:</span>
                      <p className="font-semibold font-mono" style={{ color: 'var(--text-primary)' }}>{currentDoctor.registrationNumber}</p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-tertiary)' }}>Medical Council:</span>
                      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Uttar Pradesh Medical Council (UPMC)</p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-tertiary)' }}>Qualifications:</span>
                      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{currentDoctor.qualifications}</p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-tertiary)' }}>Experience:</span>
                      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{currentDoctor.experience} Years Active</p>
                    </div>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Clinic Address:</span>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {currentDoctor.clinicName}, {currentDoctor.area}, {currentDoctor.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
                  Doctor Bio & Specializations
                </h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {currentDoctor.about}
                </p>

                <div className="mb-4">
                  <span className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Languages Spoken:</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {currentDoctor.languages.map((l, i) => (
                      <span key={i} className="badge badge-outline text-xs">{l}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Specialist Focus Tags:</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {currentDoctor.tags.map((t, i) => (
                      <span key={i} className="badge badge-primary text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
