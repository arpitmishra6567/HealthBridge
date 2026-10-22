'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { sampleDoctorApplications, sampleConsentAuditLogs, doctors } from '@/lib/mockData';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Search,
  Award,
  Users,
  Building,
  Activity,
  History,
  Eye,
  Check,
  X,
  Lock,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState(sampleDoctorApplications);
  const [auditLogs] = useState(sampleConsentAuditLogs);
  const [activeTab, setActiveTab] = useState<'verifications' | 'audit' | 'doctors'>('verifications');
  const [notification, setNotification] = useState<string | null>(null);

  const handleVerify = (id: string, newStatus: 'Verified' | 'Rejected' | 'Pending Review') => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    setNotification(`Application ${id} status updated to ${newStatus}. Registry updated.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Top Header & Role Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>
                <Link href="/" className="hover:underline">Home</Link>
                <span>/</span>
                <Link href="/dashboard" className="hover:underline">Portals</Link>
                <span>/</span>
                <span className="text-indigo-600 font-semibold">Administrator Control Panel</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Platform Administration & Verification
                </h1>
                <span className="badge badge-primary gap-1 text-xs bg-indigo-600 text-white">
                  <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Doctor credential validation, State Medical Council audit, consent security monitoring, and regulatory compliance.
              </p>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl border text-xs"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <Link href="/dashboard/patient" className="px-2.5 py-1 rounded-lg font-medium transition-colors hover:text-teal-600"
                style={{ color: 'var(--text-secondary)' }}>
                ← Patient
              </Link>
              <Link href="/dashboard/doctor" className="px-2.5 py-1 rounded-lg font-medium transition-colors hover:text-teal-600"
                style={{ color: 'var(--text-secondary)' }}>
                Doctor View
              </Link>
              <span className="px-2.5 py-1 rounded-lg font-semibold text-white bg-indigo-600">
                Admin
              </span>
            </div>
          </div>

          {/* Flash Notification */}
          {notification && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-slide-down">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Platform Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card p-4">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-semibold">Pending Verifications</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {applications.filter(a => a.status === 'Pending Review').length}
              </p>
              <span className="text-[10px] text-amber-600 font-medium">Require credential checks</span>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-semibold">Verified Doctors</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {doctors.filter(d => d.verified).length + 24}
              </p>
              <span className="text-[10px] text-emerald-600 font-medium">Active on marketplace</span>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-semibold">Registered Patients</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>1,420</p>
              <span className="text-[10px] text-blue-600 font-medium">98.4% UHID linked</span>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <History className="w-4 h-4" />
                <span className="text-xs font-semibold">Consent Audits</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>3,890</p>
              <span className="text-[10px] text-purple-600 font-medium">Zero unauthorized leaks</span>
            </div>
          </div>

          {/* Admin Tabs */}
          <div className="flex border-b mb-6 gap-6" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('verifications')}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'verifications'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Award className="w-4 h-4" />
              Doctor Applications & Verification Queue ({applications.filter(a => a.status === 'Pending Review').length})
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'audit'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Lock className="w-4 h-4" />
              Consent Security & Access Audit Log
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'doctors'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Live Marketplace Doctor Directory ({doctors.length})
            </button>
          </div>

          {/* TAB 1: Doctor Verification Workflow */}
          {activeTab === 'verifications' && (
            <div className="space-y-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="card p-6 border-l-4 transition-all"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    borderLeftColor: app.status === 'Verified' ? '#10B981' : app.status === 'Rejected' ? '#EF4444' : '#F59E0B',
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <span className="font-mono text-xs px-2 py-0.5 rounded font-bold"
                          style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                          {app.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          app.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          Submitted: {app.submittedAt}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                        {app.doctorName}
                      </h3>
                      <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                        {app.specialty} • {app.experienceYears} Years Clinical Experience
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 p-3.5 rounded-xl border text-xs"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                        <div>
                          <span style={{ color: 'var(--text-tertiary)' }}>Council Registration No:</span>
                          <p className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{app.smcRegistrationNumber}</p>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-tertiary)' }}>State Council:</span>
                          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{app.stateMedicalCouncil}</p>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-tertiary)' }}>Qualifications:</span>
                          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{app.qualification}</p>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-tertiary)' }}>Institution:</span>
                          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{app.medicalCollege}</p>
                        </div>
                      </div>

                      {/* Attached Verification Documents */}
                      <div>
                        <span className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Uploaded Credentials for Verification:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {app.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border text-xs"
                              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                              <FileText className="w-3.5 h-3.5 text-blue-600" />
                              <span style={{ color: 'var(--text-primary)' }}>{doc.type}</span>
                              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                                Valid
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 shrink-0 justify-center">
                      {app.status === 'Pending Review' ? (
                        <>
                          <button
                            onClick={() => handleVerify(app.id, 'Verified')}
                            className="btn btn-primary btn-sm gap-1.5 bg-emerald-600 hover:bg-emerald-700 justify-center"
                          >
                            <Check className="w-4 h-4" />
                            Approve & Verify Doctor
                          </button>
                          <button
                            onClick={() => handleVerify(app.id, 'Rejected')}
                            className="btn btn-secondary btn-sm gap-1.5 text-red-600 hover:text-red-700 justify-center"
                          >
                            <X className="w-4 h-4" />
                            Reject Application
                          </button>
                        </>
                      ) : (
                        <div className="text-center p-3 rounded-lg border text-xs"
                          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Decision Recorded</p>
                          <button
                            onClick={() => handleVerify(app.id, 'Pending Review')}
                            className="text-xs text-indigo-600 hover:underline mt-1 font-medium block"
                          >
                            Re-open Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Consent Audit Logs */}
          {activeTab === 'audit' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                    Regulatory Consent Audit Trail
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Tamper-evident logs of all patient medical records access, consent authorizations, and revocations.
                  </p>
                </div>
                <span className="badge badge-primary text-[10px]">DISHA / ABDM Ready</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
                      <th className="py-2.5 px-3">Audit ID</th>
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">Patient UHID</th>
                      <th className="py-2.5 px-3">Doctor / Requestor</th>
                      <th className="py-2.5 px-3">Scope / Category</th>
                      <th className="py-2.5 px-3">Action</th>
                      <th className="py-2.5 px-3">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="border-b transition-colors hover:bg-gray-50/50 dark:hover:bg-slate-900/50"
                        style={{ borderColor: 'var(--border-color)' }}>
                        <td className="py-3 px-3 font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{log.id}</td>
                        <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>{log.timestamp}</td>
                        <td className="py-3 px-3 font-mono font-semibold text-teal-600">{log.patientUhid}</td>
                        <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-primary)' }}>{log.doctorName}</td>
                        <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>{log.recordCategory}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.action === 'Access Granted' ? 'bg-emerald-100 text-emerald-800' :
                            log.action === 'Access Revoked' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono" style={{ color: 'var(--text-tertiary)' }}>{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Doctors Directory */}
          {activeTab === 'doctors' && (
            <div className="card p-6">
              <h3 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
                Active Doctors on HealthBridge Marketplace
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map(d => (
                  <div key={d.id} className="p-4 rounded-xl border"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{d.name}</span>
                      {d.verified ? (
                        <span className="badge badge-primary text-[10px]">Verified</span>
                      ) : (
                        <span className="badge badge-secondary text-[10px]">Unverified</span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-primary)' }}>{d.specialty}</p>
                    <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-tertiary)' }}>Reg: {d.registrationNumber}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Rating: ⭐ {d.rating} ({d.reviewCount} reviews)</p>
                    <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Fee: ₹{d.fee}</span>
                      <Link href={`/doctor/${d.id}`} className="text-teal-600 hover:underline font-medium">
                        Public Profile →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
