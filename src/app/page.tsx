'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';
import { doctors, specialties } from '@/lib/mockData';
import {
  Search,
  MapPin,
  ArrowRight,
  Shield,
  Brain,
  FolderLock,
  CalendarCheck,
  ChevronRight,
  Star,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  BadgeCheck,
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const topDoctors = doctors.filter(d => d.rating >= 4.7).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ========================================
          HERO SECTION — Marketplace Search
          ======================================== */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        {/* Decorative gradient */}
        <div className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 0%, rgba(13,148,136,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(13,148,136,0.1) 0%, transparent 50%)',
          }}
        />

        <div className="container mx-auto px-4 lg:px-6 py-16 lg:py-24 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Healthcare Navigation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
              style={{ color: 'var(--text-primary)' }}>
              Find & Book the Best{' '}
              <span style={{ color: 'var(--color-primary)' }}>Doctors</span>{' '}
              Near You
            </h1>

            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Discover verified specialists, get AI-assisted health guidance, and keep your medical records organized — all in one place.
            </p>

            {/* Search Panel */}
            <div className="card p-2 md:p-3 max-w-2xl mx-auto animate-slide-up stagger-2" id="hero-search">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex items-center flex-1 gap-2 px-4 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
                  <input
                    type="text"
                    placeholder="Search doctors, specialties, conditions..."
                    className="flex-1 py-3 bg-transparent border-none outline-none text-sm"
                    style={{ color: 'var(--text-primary)' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="hero-search-input"
                  />
                </div>
                <div className="flex items-center gap-2 px-4 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-32 py-3 bg-transparent border-none outline-none text-sm"
                    style={{ color: 'var(--text-primary)' }}
                    defaultValue="Mumbai"
                    id="hero-location-input"
                  />
                </div>
                <Link
                  href={`/find-doctors${searchQuery ? `?q=${searchQuery}` : ''}`}
                  className="btn btn-primary btn-lg px-8"
                  id="hero-search-btn"
                >
                  <Search className="w-4 h-4" />
                  Search
                </Link>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 animate-slide-up stagger-3">
              <Link href="/ai-assistant" className="btn btn-primary btn-md gap-2 shadow-md">
                <Sparkles className="w-4 h-4" /> Get Healthcare Guidance
              </Link>
              <Link href="/find-doctors" className="btn btn-secondary btn-md gap-2">
                <Search className="w-4 h-4" /> Find a Doctor
              </Link>
              <Link href="/emergency" className="btn btn-md gap-2 border border-red-300 dark:border-red-900 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40">
                🚨 Emergency Care (112)
              </Link>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 animate-slide-up stagger-3">
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Popular:</span>
              {['Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic'].map(s => (
                <Link key={s} href={`/find-doctors?specialty=${s}`}
                  className="text-xs font-medium px-3 py-1 rounded-full transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--border-color)',
                  }}>
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12 animate-slide-up stagger-4">
            {[
              { icon: Users, label: 'Verified Doctors', value: '2,500+' },
              { icon: Star, label: 'Patient Reviews', value: '50,000+' },
              { icon: Clock, label: 'Avg. Wait Time', value: '< 15 min' },
              { icon: BadgeCheck, label: 'Specialties', value: '40+' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-3 rounded-xl"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <stat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--color-primary)' }} />
                <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
            * Statistics shown are illustrative demonstration data
          </p>
        </div>
      </section>

      {/* ========================================
          SPECIALTIES GRID
          ======================================== */}
      <section className="section" id="specialties">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Browse by Specialty
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Find the right specialist for your health needs
              </p>
            </div>
            <Link href="/find-doctors" className="btn btn-ghost btn-sm hidden md:flex">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {specialties.slice(0, 12).map((spec, i) => (
              <Link
                key={spec.id}
                href={`/find-doctors?specialty=${spec.name}`}
                className={`card card-hover text-center py-5 px-3 animate-slide-up stagger-${Math.min(i + 1, 6)}`}
                id={`specialty-${spec.id}`}
              >
                <div className="text-3xl mb-2">{spec.icon}</div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{spec.name}</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{spec.doctorCount}+ doctors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          TOP RATED DOCTORS
          ======================================== */}
      <section className="section pt-0" id="top-doctors">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Top Rated Doctors
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Highest-rated verified specialists near you (demo data)
              </p>
            </div>
            <Link href="/find-doctors" className="btn btn-ghost btn-sm hidden md:flex">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {topDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          <div className="text-center mt-6 md:hidden">
            <Link href="/find-doctors" className="btn btn-secondary">
              View All Doctors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          AI NAVIGATOR BANNER
          ======================================== */}
      <section className="py-16" id="ai-banner">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-navy) 100%)',
            }}>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, var(--color-primary-200), transparent)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, var(--color-primary-200), transparent)', transform: 'translate(-30%, 30%)' }} />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  <Brain className="w-3.5 h-3.5" />
                  AI-Powered Prototype
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Not sure which specialist you need?
                </h2>
                <p className="text-sm text-white/70 mb-6 max-w-lg">
                  Describe your symptoms to our AI Health Navigator and get guidance on the appropriate specialist. 
                  This is a demonstration feature — always consult a qualified doctor for medical advice.
                </p>
                <Link href="/ai-assistant" className="btn bg-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
                  style={{ color: 'var(--color-primary-800)' }}
                  id="ai-banner-cta">
                  <Sparkles className="w-4 h-4" />
                  Try AI Health Navigator
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Preview Chat */}
              <div className="w-full md:w-80 rounded-xl p-4 backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="space-y-3">
                  <div className="rounded-lg p-3 text-xs text-white/90"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <p className="font-medium mb-1">🤖 AI Navigator</p>
                    <p>Hi! Describe your symptoms and I&apos;ll help guide you to the right care.</p>
                  </div>
                  <div className="rounded-lg p-3 text-xs text-white ml-8"
                    style={{ backgroundColor: 'var(--color-primary)' }}>
                    I&apos;ve had a persistent headache for 3 days with mild fever
                  </div>
                  <div className="rounded-lg p-3 text-xs text-white/90"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <p className="font-medium mb-1">🤖 Analyzing symptoms...</p>
                    <p>Recommended: <span className="font-semibold">Neurologist</span> or <span className="font-semibold">General Physician</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          HOW IT WORKS
          ======================================== */}
      <section className="section" id="how-it-works">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              How HealthBridge Works
            </h2>
            <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
              From symptoms to the right doctor in a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: Search, title: 'Describe Symptoms', desc: 'Tell us what you\'re experiencing in plain language' },
              { step: '02', icon: Brain, title: 'AI Analysis', desc: 'Our AI helps identify the appropriate medical specialty' },
              { step: '03', icon: BadgeCheck, title: 'Find Specialist', desc: 'Browse verified doctors with qualifications and reviews' },
              { step: '04', icon: CalendarCheck, title: 'Book Appointment', desc: 'Schedule your visit and keep records organized' },
            ].map((item, i) => (
              <div key={item.step} className={`text-center animate-slide-up stagger-${i + 1}`}>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary-100)' }}>
                  <item.icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="text-xs font-bold mb-1" style={{ color: 'var(--color-primary)' }}>{item.step}</div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                {i < 3 && (
                  <ArrowRight className="w-5 h-5 mx-auto mt-4 hidden md:block" style={{ color: 'var(--border-color)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURES
          ======================================== */}
      <section className="section pt-0" id="features">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI Symptom Triage',
                desc: 'Describe your symptoms naturally and get AI-assisted guidance on which specialist to visit. Prototype feature with safety guardrails.',
                link: '/ai-assistant',
                cta: 'Try AI Assistant',
              },
              {
                icon: Shield,
                title: 'Verified Doctors',
                desc: 'Browse doctors with verified qualifications, registration status, patient reviews, and transparent consultation fees.',
                link: '/find-doctors',
                cta: 'Find Doctors',
              },
              {
                icon: FolderLock,
                title: 'Medical Vault',
                desc: 'Store prescriptions, lab reports, and medical history securely. Share records with doctors through consent-based access.',
                link: '/medical-vault',
                cta: 'Explore Vault',
              },
            ].map((feature, i) => (
              <div key={feature.title} className={`card p-8 animate-slide-up stagger-${i + 1}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--color-primary-100)' }}>
                  <feature.icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                <Link href={feature.link} className="btn btn-secondary btn-sm">
                  {feature.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          ROLE-BASED PORTALS SECTION
          ======================================== */}
      <section className="section pt-0" id="portals">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <span className="badge badge-primary text-xs font-semibold px-3 py-1 mb-2">
              Multi-Role Platform
            </span>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Tailored Portals for Every Stakeholder
            </h2>
            <p className="text-sm mt-1 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Explore how HealthBridge connects Patients, Verified Doctors, and Administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 flex flex-col justify-between hover:shadow-md transition-all border-t-4"
              style={{ borderTopColor: 'var(--color-primary)' }}>
              <div>
                <span className="text-2xl mb-2 block">👤</span>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>Patient Portal</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Personal medical vault, allergy flags, active prescriptions, doctor appointments, and consent-based sharing.
                </p>
              </div>
              <Link href="/dashboard/patient" className="btn btn-primary btn-sm justify-center gap-1.5">
                Open Patient View <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="card p-6 flex flex-col justify-between hover:shadow-md transition-all border-t-4"
              style={{ borderTopColor: '#3B82F6' }}>
              <div>
                <span className="text-2xl mb-2 block">🩺</span>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>Doctor Workspace</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Patient consultation queue, AI triage summaries, authorized vault records, and clinic slot controls.
                </p>
              </div>
              <Link href="/dashboard/doctor" className="btn btn-secondary btn-sm justify-center gap-1.5 hover:text-blue-600">
                Open Doctor View <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="card p-6 flex flex-col justify-between hover:shadow-md transition-all border-t-4"
              style={{ borderTopColor: '#6366F1' }}>
              <div>
                <span className="text-2xl mb-2 block">🛡️</span>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>Administrator Panel</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Doctor application approval/rejection, State Medical Council validation, and consent audit trails.
                </p>
              </div>
              <Link href="/dashboard/admin" className="btn btn-secondary btn-sm justify-center gap-1.5 hover:text-indigo-600">
                Open Admin View <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SAFETY SECTION
          ======================================== */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
              Your Safety & Privacy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, text: 'Doctor credentials verified through registration validation' },
                { icon: FolderLock, text: 'Medical records shared only with your explicit consent' },
                { icon: CheckCircle2, text: 'AI triage clearly labelled as a prototype — not a substitute for doctors' },
                { icon: BadgeCheck, text: 'All demonstration data clearly marked as fictional' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <item.icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          CTA SECTION
          ======================================== */}
      <section className="section">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Ready to Find the Right Care?
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Join HealthBridge to discover verified doctors, manage your health records, and get AI-powered health guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup" className="btn btn-primary btn-lg" id="cta-get-started">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/find-doctors" className="btn btn-secondary btn-lg" id="cta-find-doctors">
              Browse Doctors
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
