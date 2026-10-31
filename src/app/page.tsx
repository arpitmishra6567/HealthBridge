// HealthBridge
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';
import Interactive3DAnatomy from '@/components/Interactive3DAnatomy';
import { doctors, specialties } from '@/lib/mockData';
import { searchBySymptom } from '@/lib/symptomAnalyzer';
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
  Activity,
  Heart,
  ShieldAlert,
  Video,
  X,
  SlidersHorizontal,
  Flame,
  Check,
  PhoneCall,
} from 'lucide-react';

const CITIES = ['Kanpur', 'Lucknow', 'Varanasi', 'Prayagraj', 'Agra', 'Noida'];

const HERO_SYMPTOMS = [
  { label: '🤒 Viral Fever', query: 'fever' },
  { label: '❤️ Chest Discomfort', query: 'chest pain' },
  { label: '🧴 Skin Acne & Rashes', query: 'acne' },
  { label: '🦷 Toothache Relief', query: 'toothache' },
  { label: '🧠 Severe Headache', query: 'headache' },
  { label: '🦴 Back & Knee Pain', query: 'back pain' },
  { label: '👶 Infant Care', query: 'child fever' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Kanpur');
  const [searchFocused, setSearchFocused] = useState(false);

  // Quick filter for Top Doctors Showcase
  const [activeDoctorFilter, setActiveDoctorFilter] = useState<'all' | 'today' | 'budget' | 'top'>('all');

  // Predictive search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return null;
    const q = searchQuery.toLowerCase();

    const matchedSpecialties = specialties.filter(s =>
      s.name.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedDoctors = doctors.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.specialty.toLowerCase().includes(q)
    ).slice(0, 3);

    const symptomMatches = searchBySymptom(searchQuery).slice(0, 3);

    return {
      specialties: matchedSpecialties,
      doctors: matchedDoctors,
      symptoms: symptomMatches,
    };
  }, [searchQuery]);

  // Doctors for the showcase
  const displayedDoctors = useMemo(() => {
    let list = [...doctors];
    if (activeDoctorFilter === 'today') {
      list = list.filter(d => d.availableToday);
    } else if (activeDoctorFilter === 'budget') {
      list = list.filter(d => d.fee <= 600);
    } else if (activeDoctorFilter === 'top') {
      list = list.filter(d => d.rating >= 4.8);
    }
    return list.slice(0, 4);
  }, [activeDoctorFilter]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ========================================================
          1. EASY-TO-USE, FRIENDLY HERO + OPTIMISED SEARCH
          ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        {/* Decorative 3D Ambient Orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.25) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Friendly Reassurance Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800 shadow-2xs animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Simple, Trusted Healthcare • Zero Booking Fees • 100% Free to Search</span>
            </div>

            {/* Easy-to-understand Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight mb-4"
              style={{ color: 'var(--text-primary)' }}>
              Healthcare Made <span className="text-teal-600 underline decoration-teal-300 dark:decoration-teal-700 decoration-wavy">Simple & Quick</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-medium">
              Check symptoms with AI in plain language, find verified doctors near you with guaranteed transparent fees, and book appointments in 2 clicks.
            </p>

            {/* ── OPTIMISED SEARCH PANEL ── */}
            <div className="relative max-w-3xl mx-auto mb-6 text-left">
              <div
                className="bg-white dark:bg-slate-900 border-2 rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-xl flex flex-col sm:flex-row gap-2 transition-all focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {/* Location Picker */}
                <div className="flex items-center gap-2 px-4 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r"
                  style={{ borderColor: 'var(--border-color)' }}>
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                    id="hero-city-select"
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Main Search Input */}
                <div className="flex items-center flex-1 px-3 gap-2">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search doctor name, specialty, or type symptoms (e.g. Fever, Chest pain)..."
                    className="w-full py-2 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    id="hero-search-input"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Big Friendly Search Button */}
                <Link
                  href={`/find-doctors${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
                  className="flipkart-btn-book px-7 py-3 rounded-xl sm:rounded-full text-sm font-bold flex items-center justify-center gap-2 text-white shadow-md hover:scale-102 transition-transform shrink-0"
                  id="hero-search-button"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Doctors</span>
                </Link>
              </div>

              {/* Autocomplete Dropdown Popover */}
              {searchFocused && searchSuggestions && (
                <div
                  className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border z-50 overflow-hidden"
                  style={{ borderColor: 'var(--border-color)' }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {/* Specialties */}
                  {searchSuggestions.specialties.length > 0 && (
                    <div className="p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <p className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">Specialties</p>
                      {searchSuggestions.specialties.map(s => (
                        <Link
                          key={s.id}
                          href={`/find-doctors?specialty=${encodeURIComponent(s.name)}`}
                          onClick={() => setSearchFocused(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center justify-between"
                        >
                          <span className="font-semibold text-teal-700 dark:text-teal-300">{s.icon} {s.name}</span>
                          <span className="text-xs text-slate-400">{s.doctorCount}+ doctors</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Symptoms */}
                  {searchSuggestions.symptoms.length > 0 && (
                    <div className="p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <p className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">Related Symptoms</p>
                      {searchSuggestions.symptoms.map((sym, idx) => (
                        <Link
                          key={idx}
                          href={`/find-doctors?specialty=${encodeURIComponent(sym.specialty)}`}
                          onClick={() => setSearchFocused(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center justify-between"
                        >
                          <span className="text-slate-700 dark:text-slate-200">🔍 &ldquo;{searchQuery}&rdquo; → Recommends: <strong className="text-teal-600">{sym.specialty}</strong></span>
                          <span className="text-xs font-bold text-teal-600">{Math.round(sym.confidence * 100)}% match</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Doctors */}
                  {searchSuggestions.doctors.length > 0 && (
                    <div className="p-3">
                      <p className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">Top Doctors</p>
                      {searchSuggestions.doctors.map(d => (
                        <Link
                          key={d.id}
                          href={`/doctor/${d.id}`}
                          onClick={() => setSearchFocused(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center justify-between"
                        >
                          <span className="font-semibold text-slate-800 dark:text-slate-100">{d.name} <span className="text-xs font-normal text-slate-500">({d.specialty})</span></span>
                          <span className="flipkart-rating-badge text-xs">{d.rating} ★</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick 1-Click Popular Symptom Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Popular:</span>
              {HERO_SYMPTOMS.map((item) => (
                <Link
                  key={item.label}
                  href={`/find-doctors?q=${encodeURIComponent(item.query)}`}
                  className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border hover:border-teal-500 hover:text-teal-600 transition-all shadow-2xs hover:scale-105"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* 4 Easy 1-Click Primary Action Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <Link
                href="/symptom-checker"
                className="bg-white dark:bg-slate-800 border rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all group"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-2.5 flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 text-teal-600 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Check Symptoms</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">2-Min AI Diagnosis</p>
              </Link>

              <Link
                href="/find-doctors"
                className="bg-white dark:bg-slate-800 border rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all group"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-2.5 flex items-center justify-center bg-sky-50 dark:bg-sky-950/60 text-sky-600 group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Find Doctors</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Flipkart-Style List</p>
              </Link>

              <Link
                href="/medical-vault"
                className="bg-white dark:bg-slate-800 border rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all group"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-2.5 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 group-hover:scale-110 transition-transform">
                  <FolderLock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Medical Vault</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Encrypted Records</p>
              </Link>

              <Link
                href="/emergency"
                className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-2.5 flex items-center justify-center bg-red-100 dark:bg-red-900/60 text-red-600 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="font-bold text-sm text-red-600 dark:text-red-400">Emergency 112</h3>
                <p className="text-[11px] text-red-500/80 mt-0.5">Instant Ambulance</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. ILLUSTRATIVE 3D BODY & SYMPTOM VISUALIZER SECTION
          ======================================================== */}
      <section className="py-12 lg:py-16" id="3d-visualizer">
        <div className="container mx-auto px-4 lg:px-6">
          <Interactive3DAnatomy />
        </div>
      </section>

      {/* ========================================================
          3. FLIPKART-STYLE TOP RATED DOCTORS SHOWCASE
          ======================================================== */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-y" style={{ borderColor: 'var(--border-color)' }} id="top-doctors">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Header & Filter Toggle Buttons */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span>✦</span> Verified Specialists Near You
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Top Rated Doctors (Flipkart-Style List)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Transparent consultation fees, strike-through discounts, and instant clinic & video appointments.
              </p>
            </div>

            {/* Quick Filter Toggle Chips for Doctors */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveDoctorFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeDoctorFilter === 'all'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border text-slate-600 dark:text-slate-300'
                }`}
              >
                All Top Doctors
              </button>
              <button
                onClick={() => setActiveDoctorFilter('today')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  activeDoctorFilter === 'today'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Available Today
              </button>
              <button
                onClick={() => setActiveDoctorFilter('budget')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeDoctorFilter === 'budget'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border text-slate-600 dark:text-slate-300'
                }`}
              >
                Under ₹600
              </button>
              <button
                onClick={() => setActiveDoctorFilter('top')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  activeDoctorFilter === 'top'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border text-slate-600 dark:text-slate-300'
                }`}
              >
                <Star className="w-3 h-3 fill-current" /> 4.8+ Rating
              </button>
            </div>
          </div>

          {/* Flipkart Doctor Cards Listing */}
          <div className="space-y-4">
            {displayedDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} viewMode="list" />
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-8">
            <Link
              href="/find-doctors"
              className="btn btn-secondary px-8 py-3 text-sm font-bold inline-flex items-center gap-2 border-2"
            >
              <span>Explore All {doctors.length} Doctors with Full Flipkart Filters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. 3D ILLUSTRATIVE FEATURES SHOWCASE
          ======================================================== */}
      <section className="py-16" id="features">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-1 block">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Illustrative 3D Healthcare Features
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Engineered to make care accessible, transparent, and effortlessly simple for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="card-3d bg-white dark:bg-slate-800 border rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 mb-4 shadow-xs">
                  <Brain className="w-7 h-7" />
                </div>
                <div className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 mb-2">
                  Gemini AI Powered
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  AI Symptom Intelligence
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Describe symptoms in your everyday words. AI asks 2-3 clarifying questions to pinpoint the exact specialist you need.
                </p>
              </div>
              <Link href="/symptom-checker" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:underline">
                Test Symptom Analyzer <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="card-3d bg-white dark:bg-slate-800 border rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 mb-4 shadow-xs">
                  <BadgeCheck className="w-7 h-7" />
                </div>
                <div className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 mb-2">
                  Flipkart Style Marketplace
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Verified Doctor Directory
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Browse doctors with NMC registration validation, transparent consultation fees, strike-through MRP, and zero hidden platform charges.
                </p>
              </div>
              <Link href="/find-doctors" className="text-xs font-bold text-sky-600 flex items-center gap-1 hover:underline">
                Browse Doctor Marketplace <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="card-3d bg-white dark:bg-slate-800 border rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 mb-4 shadow-xs">
                  <FolderLock className="w-7 h-7" />
                </div>
                <div className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 mb-2">
                  ABDM Encrypted
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Digital Medical Locker
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  All your prescriptions, lab tests, and allergy warnings safe in one private vault. Share with consulting doctors only when you consent.
                </p>
              </div>
              <Link href="/medical-vault" className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                Explore Medical Vault <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="card-3d bg-white dark:bg-slate-800 border rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 mb-4 shadow-xs">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <div className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 mb-2">
                  24/7 Red Alert
                </div>
                <h3 className="text-lg font-bold mb-2 text-rose-600 dark:text-rose-400">
                  Emergency 112 SOS
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  One-tap access to nearest emergency hospital rooms, real-time ICU bed availability, and direct 112 ambulance dispatch.
                </p>
              </div>
              <Link href="/emergency" className="text-xs font-bold text-rose-600 flex items-center gap-1 hover:underline">
                Open Emergency Hub <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. BROWSE BY SPECIALTY (12 SPECIALTIES)
          ======================================================== */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-t" style={{ borderColor: 'var(--border-color)' }} id="specialties">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Browse All 12 Specialties
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Find the right expert for every healthcare need
              </p>
            </div>
            <Link href="/find-doctors" className="btn btn-ghost btn-sm hidden sm:flex text-xs font-bold text-teal-600">
              View All Doctors <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {specialties.map((spec) => (
              <Link
                key={spec.id}
                href={`/find-doctors?specialty=${encodeURIComponent(spec.name)}`}
                className="bg-white dark:bg-slate-800 border rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all group shadow-2xs"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="text-3xl mb-2 group-hover:scale-115 transition-transform">{spec.icon}</div>
                <h3 className="font-bold text-xs sm:text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                  {spec.name}
                </h3>
                <p className="text-[11px] text-teal-600 font-semibold mt-1">
                  {spec.doctorCount}+ Doctors
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. ROLE-BASED PORTALS
          ======================================================== */}
      <section className="py-16" id="portals">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-1 block">
              Multi-Stakeholder Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Tailored Portals for Everyone
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Seamlessly connecting Patients, Verified Doctors, and Healthcare Administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patient Portal */}
            <div className="bg-white dark:bg-slate-800 border rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all border-t-4 border-t-teal-600"
              style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <span className="text-3xl mb-3 block">👤</span>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>Patient Portal</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Manage upcoming appointments, view active prescriptions, check allergy flags, and access your encrypted medical locker.
                </p>
              </div>
              <Link href="/dashboard/patient" className="btn btn-primary btn-sm justify-center gap-1.5 text-xs font-bold py-2">
                Open Patient Portal <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Doctor Portal */}
            <div className="bg-white dark:bg-slate-800 border rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all border-t-4 border-t-blue-500"
              style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <span className="text-3xl mb-3 block">🩺</span>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>Doctor Workspace</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Manage patient consultation queues, review AI triage summaries, check authorized vault records, and control slot availability.
                </p>
              </div>
              <Link href="/dashboard/doctor" className="btn btn-secondary btn-sm justify-center gap-1.5 text-xs font-bold py-2 hover:text-blue-600">
                Open Doctor View <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Admin Portal */}
            <div className="bg-white dark:bg-slate-800 border rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all border-t-4 border-t-indigo-500"
              style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <span className="text-3xl mb-3 block">🛡️</span>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>Administrator Panel</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Validate State Medical Council doctor registrations, review clinic credentials, monitor consent audit logs, and oversee system health.
                </p>
              </div>
              <Link href="/dashboard/admin" className="btn btn-secondary btn-sm justify-center gap-1.5 text-xs font-bold py-2 hover:text-indigo-600">
                Open Admin View <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. BOTTOM CTA
          ======================================================== */}
      <section className="py-16 bg-gradient-to-br from-teal-800 to-slate-900 text-white text-center">
        <div className="container mx-auto px-4 lg:px-6 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Find the Right Doctor in Minutes
          </h2>
          <p className="text-sm text-teal-100/80 mb-8 leading-relaxed">
            Join HealthBridge to discover verified doctors, get AI-powered symptom guidance, and keep your health records securely organized.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/find-doctors"
              className="flipkart-btn-book py-3.5 px-8 text-sm font-bold shadow-lg"
            >
              Browse Verified Doctors Now
            </Link>
            <Link
              href="/symptom-checker"
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-8 text-sm font-bold"
            >
              <Activity className="w-4 h-4" /> Check Symptoms with AI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
