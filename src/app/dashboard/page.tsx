'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Stethoscope, ShieldCheck, ArrowRight, Activity, FileText, CheckCircle2 } from 'lucide-react';

export default function DashboardPortalHub() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge badge-primary text-xs font-semibold px-3 py-1 mb-3">
              Role-Based Portals
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Select Your Portal View
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              HealthBridge features separate, dedicated experiences for Patients, Verified Doctors, and Healthcare Administrators.
              Select any role below to explore the working interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patient Portal Card */}
            <div className="card p-6 flex flex-col justify-between hover:shadow-lg transition-all border-2 hover:border-teal-500">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)', color: 'var(--color-primary)' }}>
                  <User className="w-7 h-7" />
                </div>
                <span className="badge badge-primary text-[10px] mb-2">Role: Patient</span>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Patient Dashboard
                </h2>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Manage your personal health vault, upcoming doctor appointments, vitals, active medications, and grant or revoke doctor consent.
                </p>

                <div className="space-y-2 mb-6">
                  {['Upcoming appointments & booking', 'Consent-based vault sharing', 'Allergies & active prescriptions', 'AI triage history'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/dashboard/patient" className="btn btn-primary w-full justify-center gap-1.5">
                Open Patient Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Doctor Portal Card */}
            <div className="card p-6 flex flex-col justify-between hover:shadow-lg transition-all border-2 hover:border-blue-500">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                  <Stethoscope className="w-7 h-7" />
                </div>
                <span className="badge badge-outline text-[10px] mb-2">Role: Verified Doctor</span>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Doctor Dashboard
                </h2>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Clinic schedule management, patient consultation queue, triage summaries, and authorized medical record access with audit logging.
                </p>

                <div className="space-y-2 mb-6">
                  {['Patient consultation queue', 'Patient-authorized vault access', 'Slot & clinic timing controls', 'NMC credential & verified badge'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/dashboard/doctor" className="btn btn-secondary w-full justify-center gap-1.5 hover:bg-blue-50 hover:text-blue-700">
                Open Doctor Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Admin Portal Card */}
            <div className="card p-6 flex flex-col justify-between hover:shadow-lg transition-all border-2 hover:border-indigo-500">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1' }}>
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="badge badge-outline text-[10px] mb-2">Role: System Admin</span>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Admin Dashboard
                </h2>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Verification review of doctor applications against State Medical Council credentials, platform consent audit logs, and compliance.
                </p>

                <div className="space-y-2 mb-6">
                  {['Doctor verification workflow', 'NMC registration checking', 'Consent security audit logs', 'Platform health metrics'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/dashboard/admin" className="btn btn-secondary w-full justify-center gap-1.5 hover:bg-indigo-50 hover:text-indigo-700">
                Open Admin Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
