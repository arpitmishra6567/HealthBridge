// HealthBridge
'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import {
  ShieldCheck,
  Cpu,
  Lock,
  BookOpen,
  Users,
  Sparkles,
  ExternalLink,
  Code2,
  Crown,
} from 'lucide-react';

/* =========================================================================
   Official Brand SVG Icons
   ========================================================================= */

function LinkedInIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

/* =========================================================================
   Team Data
   ========================================================================= */

interface TeamMember {
  name: string;
  role: string;
  isLeader?: boolean;
  description: string;
  linkedInUrl: string;
  initials: string;
  avatarBg: string;
  badgeText?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Arpit Mishra',
    role: 'Team Leader',
    isLeader: true,
    badgeText: 'Team Leader',
    description: 'Leading project architecture, planning and overall integration.',
    linkedInUrl: 'https://www.linkedin.com/in/arpitmishra-tech',
    initials: 'AM',
    avatarBg: 'bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white',
  },
  {
    name: 'Aman Pal',
    role: 'Frontend Developer & UI/UX',
    description: 'Building intuitive interfaces and responsive user experiences.',
    linkedInUrl: 'https://www.linkedin.com/in/amanpal-tech',
    initials: 'AP',
    avatarBg: 'bg-gradient-to-br from-cyan-600 via-sky-700 to-blue-800 text-white',
  },
  {
    name: 'Arpit Tiwari',
    role: 'Backend Developer & Database',
    description: 'Working on backend architecture, APIs and database management.',
    linkedInUrl: 'https://www.linkedin.com/in/arpit-tiwari-6b4399328',
    initials: 'AT',
    avatarBg: 'bg-gradient-to-br from-indigo-600 via-slate-700 to-slate-900 text-white',
  },
  {
    name: 'Ritesh Tiwari',
    role: 'AI/ML & Data',
    description: 'Developing AI-assisted capabilities and data-related functionality.',
    linkedInUrl: 'https://www.linkedin.com/in/ritesh-tiwari-798938328',
    initials: 'RT',
    avatarBg: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white',
  },
];

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

      <main className="flex-1 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">

          {/* ========================================================
              PHASE 2: ABOUT HEALTHBRIDGE HERO SECTION
              ======================================================== */}
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border"
              style={{
                backgroundColor: 'rgba(13, 148, 136, 0.08)',
                borderColor: 'rgba(13, 148, 136, 0.25)',
                color: 'var(--color-primary)',
              }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Healthcare Informatics & AI Navigation</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
              About HealthBridge
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-semibold mb-6 text-teal-600 dark:text-teal-400">
              Connecting People with Smarter Healthcare.
            </p>

            {/* Description */}
            <div className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto space-y-4 text-left sm:text-center" style={{ color: 'var(--text-secondary)' }}>
              <p>
                HealthBridge is an AI-powered healthcare navigation and personal medical record platform designed to simplify access to healthcare information and services.
              </p>
              <p>
                Our platform brings together AI-assisted symptom guidance, specialist discovery, an interactive 3D body visualizer, digital medical records and emergency assistance through a unified interface.
              </p>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Our vision is to make healthcare navigation more accessible, organized and intelligent.
              </p>
            </div>

            {/* Tagline Badge */}
            <div className="mt-8 inline-block p-4 sm:px-6 sm:py-3 rounded-2xl border"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--text-tertiary)' }}>
                Platform Philosophy
              </p>
              <p className="text-sm sm:text-base font-bold italic" style={{ color: 'var(--color-primary)' }}>
                &ldquo;Right Care. Right Doctor. Right Information. Right Time.&rdquo;
              </p>
            </div>
          </div>

          {/* Academic & Educational Purpose Notice Banner */}
          <div className="p-6 rounded-2xl border mb-16 flex flex-col sm:flex-row items-center gap-5 transition-shadow hover:shadow-md"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(13, 148, 136, 0.12)', color: 'var(--color-primary)' }}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="badge badge-primary text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Academic Project
                </span>
                <h3 className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                  Educational & Research Purpose
                </h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                HealthBridge is engineered as a comprehensive digital health prototype for academic evaluation. All doctor profiles, clinics, and medical records consist of synthetic demonstration data designed to exhibit production-grade user workflows and privacy architecture.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href="#team" className="btn btn-secondary btn-sm text-xs">
                Meet the Team
              </a>
              <a href="#contact" className="btn btn-primary btn-sm text-xs">
                Get in Touch
              </a>
            </div>
          </div>

          {/* ========================================================
              PHASE 3: MEET OUR TEAM SECTION
              ======================================================== */}
          <section id="team" className="mb-20 scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border"
                style={{
                  backgroundColor: 'rgba(13, 148, 136, 0.08)',
                  borderColor: 'rgba(13, 148, 136, 0.25)',
                  color: 'var(--color-primary)',
                }}>
                <Users className="w-3.5 h-3.5" />
                <span>Core Contributors</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                Meet Our Team
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                The multidisciplinary team behind HealthBridge, combining software architecture, intuitive design, resilient backends, and applied healthcare AI.
              </p>
            </div>

            {/* Team Grid: 4 cards responsive (Desktop: 4, Tablet: 2, Mobile: 1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="card p-6 flex flex-col justify-between items-center text-center relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  {/* Team Leader Subtle Badge */}
                  {member.isLeader && (
                    <div className="absolute top-4 right-4">
                      <span className="badge badge-primary text-[10px] font-bold px-2 py-0.5 shadow-sm flex items-center gap-1">
                        <Crown className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {member.badgeText}
                      </span>
                    </div>
                  )}

                  {/* Top content: Avatar, Name, Role, Description */}
                  <div className="w-full flex flex-col items-center">
                    {/* Premium Initials Avatar */}
                    <div className="relative mb-4 mt-2">
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl tracking-wider shadow-md transition-transform duration-300 group-hover:scale-105 border-2 ${member.avatarBg}`}
                        style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        {member.initials}
                      </div>
                      <div
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-sm"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: '#0A66C2',
                        }}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Member Full Name */}
                    <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
                      {member.name}
                    </h3>

                    {/* Professional Role */}
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-3 min-h-[32px] flex items-center justify-center">
                      {member.role}
                    </p>

                    {/* Short Role Description */}
                    <p className="text-xs leading-relaxed italic mb-6 px-1" style={{ color: 'var(--text-secondary)' }}>
                      &ldquo;{member.description}&rdquo;
                    </p>
                  </div>

                  {/* Bottom: Clickable LinkedIn Icon Button (CRITICAL) */}
                  <div className="w-full pt-4 border-t flex flex-col items-center" style={{ borderColor: 'var(--border-color)' }}>
                    <a
                      href={member.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View LinkedIn Profile"
                      aria-label={`View ${member.name}'s LinkedIn Profile (opens in new tab)`}
                      className="group/btn inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border w-full hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <LinkedInIcon className="w-4 h-4 text-[#0A66C2] transition-transform duration-200 group-hover/btn:scale-110" />
                      <span>View LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================
              PHASE 4: PROJECT GITHUB INTEGRATION SECTION
              ======================================================== */}
          <section id="github" className="mb-20 scroll-mt-20">
            <div className="card p-8 lg:p-10 border shadow-md relative overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>

              {/* Decorative background grid pattern */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none bg-teal-500" />
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none bg-indigo-500" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Col: GitHub Icon & Info */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}>
                    <GitHubIcon className="w-4 h-4" />
                    <span>Open Source Academic Repository</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Explore Our Project on GitHub
                  </h2>

                  <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                    Explore the HealthBridge source code, project implementation, development structure and ongoing improvements.
                  </p>

                  {/* Repository details snippet */}
                  <div className="p-3.5 rounded-xl border font-mono text-xs max-w-xl flex items-center justify-between gap-3 overflow-x-auto"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-2 truncate">
                      <Code2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                        arpitmishra6567 / HealthBridge
                      </span>
                    </div>
                    <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold shrink-0">
                      TypeScript • Next.js
                    </span>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    {['Next.js 16 App Router', 'React 19', 'TypeScript', 'Tailwind CSS', 'Turbopack', 'Google Gemini AI', 'Responsive 3D Canvas'].map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-0.5 rounded-md border font-medium"
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Col: Primary Call-to-Action Card */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start lg:items-center justify-center p-6 rounded-2xl border"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm border transition-transform hover:scale-105"
                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    <GitHubIcon className="w-8 h-8" />
                  </div>

                  <h3 className="text-base font-bold mb-1 text-center" style={{ color: 'var(--text-primary)' }}>
                    HealthBridge
                  </h3>
                  <p className="text-xs text-center mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    https://github.com/arpitmishra6567/HealthBridge
                  </p>

                  <a
                    href="https://github.com/arpitmishra6567/HealthBridge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full text-xs font-semibold py-2.5 flex items-center justify-center gap-2 group transition-all"
                  >
                    <GitHubIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <p className="text-[10px] text-center mt-2.5" style={{ color: 'var(--text-tertiary)' }}>
                    Opens public repository in a new tab
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              THE 4 CORE PROBLEMS & SOLUTIONS
              ======================================================== */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
                The Healthcare Dilemma We Are Addressing
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                Solving critical bottlenecks in patient navigation and clinical record fragmentation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {problems.map((p, idx) => (
                <div key={idx} className="card p-6 flex flex-col justify-between border" style={{ borderColor: 'var(--border-color)' }}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                        Problem {p.num}
                      </span>
                      <span className="text-xs text-red-600 font-semibold">Clinical Bottleneck</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {p.desc}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border text-xs"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <span className="font-semibold text-teal-700 dark:text-teal-400 block mb-0.5">
                      ✓ HealthBridge Solution:
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{p.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================
              TECHNICAL ARCHITECTURE & PRIVACY ENGINEERING
              ======================================================== */}
          <section className="card p-8 lg:p-10 mb-20 border" style={{ borderColor: 'var(--border-color)' }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center" style={{ color: 'var(--text-primary)' }}>
              Technical Architecture & Privacy Engineering
            </h2>
            <p className="text-xs sm:text-sm text-center mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Engineered with modern frontend standards, zero-trust consent protocols, and defensive AI clinical safeguards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    Modern Frontend Stack
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Built with Next.js 16 (App Router & Turbopack), React 19, TypeScript, and native CSS variables for instant light/dark mode adaptation with zero layout shift.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    Consent Architecture
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Time-bound authorization tokens with automatic expiry (24–72 hours), explicit patient approvals, granular record scoping, and tamper-resistant audit logs.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    Clinical Safety Guardrails
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    AI triage outputs are strictly informational with hardcoded emergency keyword triggers that override standard flows with instant 112 emergency dispatch protocols.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              PHASE 5: CONTACT US SECTION
              ======================================================== */}
          <ContactSection />

          {/* ========================================================
              CALL TO ACTION / PLATFORM DISCOVERY
              ======================================================== */}
          <div className="mt-16 text-center p-8 rounded-2xl border"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Experience the HealthBridge Platform
            </h2>
            <p className="text-xs sm:text-sm max-w-xl mx-auto mb-6" style={{ color: 'var(--text-secondary)' }}>
              Explore how AI triage, verified doctors, and medical vault records converge into a unified patient experience.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/find-doctors" className="btn btn-primary text-xs">
                Explore Doctor Marketplace
              </Link>
              <Link href="/symptom-checker" className="btn btn-secondary text-xs">
                3D Symptom Visualizer
              </Link>
              <Link href="/ai-assistant" className="btn btn-secondary text-xs">
                Try AI Symptom Triage
              </Link>
              <Link href="/dashboard" className="btn btn-ghost text-xs border">
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
