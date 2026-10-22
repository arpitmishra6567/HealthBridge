'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Heart,
  ShieldCheck,
  Cpu,
  Database,
  Lock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Users,
  Compass,
  FileCheck,
} from 'lucide-react';

export default function AboutPage() {
  const problems = [
    {
      num: '01',
      title: 'Specialist Mismatch',
      desc: 'Patients often visit the nearest clinic without knowing if the doctor has the specialized training needed for their condition, leading to repeat visits and delayed care.',
      solution: 'AI-assisted specialty matching guides patients to verified domain experts directly.',
    },
    {
      num: '02',
      title: 'Unverified Credentials',
      desc: 'Verifying State Medical Council registrations, post-graduate degrees, and authentic patient feedback is cumbersome and lacks transparency.',
      solution: 'Mandatory verification against the National Medical Commission registry with verified badges.',
    },
    {
      num: '03',
      title: 'Fragmented Medical History',
      desc: 'Prescriptions, lab reports, and allergy histories remain scattered across physical papers and clinic silos, unavailable during critical decisions.',
      solution: 'A unified personal Medical Vault with time-bound, consent-based doctor sharing tokens.',
    },
    {
      num: '04',
      title: 'Delayed Healthcare Decisions',
      desc: 'Patients struggle to assess whether subtle symptoms require an emergency room, an urgent clinic visit, or home monitoring.',
      solution: 'An evidence-based conversational AI triage engine with instantaneous emergency red-flag detection.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge badge-primary text-xs font-semibold px-3 py-1 mb-3">
              College Mini Project • Healthcare Technology
            </span>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Right Care. Right Doctor. Right Information. Right Time.
            </h1>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              HealthBridge is an India-focused digital healthcare prototype engineered to bridge symptom triage,
              verified specialist discovery, and consent-based personal health records into one coherent platform.
            </p>
          </div>

          {/* Academic Project Badge Banner */}
          <div className="p-6 rounded-2xl border mb-16 flex flex-col sm:flex-row items-center gap-4"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)', color: 'var(--color-primary)' }}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                Academic & Educational Purpose
              </h3>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                This platform is built for college mini-project evaluation. All doctor profiles, medical records,
                and triage outputs are fictional synthetic data created solely for UI/UX and architectural demonstration.
              </p>
            </div>
            <Link href="/dashboard" className="btn btn-primary btn-sm shrink-0">
              Explore Demo Portals
            </Link>
          </div>

          {/* The 4 Core Problems & Solutions */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                The Healthcare Dilemma We Are Addressing
              </h2>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Solving critical bottlenecks in patient navigation and clinical record fragmentation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {problems.map((p, idx) => (
                <div key={idx} className="card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                        Problem {p.num}
                      </span>
                      <span className="text-xs text-red-600 font-semibold">Clinical Bottleneck</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {p.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {p.desc}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border text-xs"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <span className="font-semibold text-teal-700 dark:text-teal-400 block mb-0.5">
                      ✓ HealthBridge Solution:
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{p.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture Section */}
          <div className="card p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
              Technical Architecture & Privacy Engineering
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <Cpu className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                  Frontend Engineering
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Built with Next.js 16 (App Router & Turbopack), React 19, TypeScript, and modern CSS custom variables for instant light/dark mode adaptation.
                </p>
              </div>

              <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <Lock className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                  Consent Architecture
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Time-bound authorization tokens with automatic expiry (24-72h), explicit patient approvals, granular record scoping, and audit trails.
                </p>
              </div>

              <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <ShieldCheck className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                  Clinical Guardrails
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  AI triage outputs are strictly informational with hardcoded emergency keyword triggers that override standard flows with 112 dispatch protocols.
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Experience the HealthBridge Platform
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/find-doctors" className="btn btn-primary">
                Explore Doctor Marketplace
              </Link>
              <Link href="/ai-assistant" className="btn btn-secondary">
                Try AI Symptom Triage
              </Link>
              <Link href="/dashboard" className="btn btn-secondary">
                View Role Dashboards
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
