'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';
import { doctors, specialties, type Doctor } from '@/lib/mockData';
import { searchBySymptom } from '@/lib/symptomAnalyzer';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Activity,
  Sparkles,
  ArrowRight,
  MapPin,
  Check,
  Star,
  ShieldCheck,
  Clock,
  Video,
  Grid,
  List as ListIcon,
  RotateCcw,
  Eye,
  EyeOff,
} from 'lucide-react';

// Popular symptom shortcuts for 1-click filter
const QUICK_SYMPTOMS = [
  { label: '🤒 Viral Fever', query: 'fever', specialty: 'General Physician' },
  { label: '❤️ Chest Pain', query: 'chest pain', specialty: 'Cardiologist' },
  { label: '🧴 Skin & Acne', query: 'acne', specialty: 'Dermatologist' },
  { label: '🦴 Joint Pain', query: 'joint pain', specialty: 'Orthopedic' },
  { label: '🧠 Headache', query: 'headache', specialty: 'Neurologist' },
  { label: '👶 Child Care', query: 'child fever', specialty: 'Pediatrician' },
  { label: '🦷 Toothache', query: 'toothache', specialty: 'Dentist' },
];

const CITIES = ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai'];

function FindDoctorsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialSpecialty = searchParams.get('specialty') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [maxFee, setMaxFee] = useState(2000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableToday, setAvailableToday] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [selectedGender, setSelectedGender] = useState<'All' | 'Female' | 'Male'>('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(true); // Toggle filter panel on/off
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchFocused, setSearchFocused] = useState(false);

  // Sync with URL params if they change
  useEffect(() => {
    if (initialQuery) setSearchQuery(initialQuery);
    if (initialSpecialty) setSelectedSpecialty(initialSpecialty);
  }, [initialQuery, initialSpecialty]);

  // Autocomplete suggestions based on query
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

  // Main filtered doctors logic
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    // Search query matching (Doctor name, specialty, tag, qualifications, or symptom)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      let directMatches = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q)) ||
        d.qualifications.toLowerCase().includes(q) ||
        d.clinicName.toLowerCase().includes(q)
      );

      // Symptom intelligence fallback
      if (directMatches.length === 0) {
        const symptomMatches = searchBySymptom(searchQuery);
        if (symptomMatches.length > 0) {
          const matchedSpecNames = symptomMatches.map(s => s.specialty);
          directMatches = result.filter(d => matchedSpecNames.includes(d.specialty));
        }
      }
      result = directMatches;
    }

    if (selectedSpecialty) {
      result = result.filter(d => d.specialty === selectedSpecialty);
    }

    if (maxFee < 2000) {
      result = result.filter(d => d.fee <= maxFee);
    }

    if (verifiedOnly) {
      result = result.filter(d => d.verified);
    }

    if (availableToday) {
      result = result.filter(d => d.availableToday);
    }

    if (minRating > 0) {
      result = result.filter(d => d.rating >= minRating);
    }

    if (minExperience > 0) {
      result = result.filter(d => d.experience >= minExperience);
    }

    if (selectedGender !== 'All') {
      result = result.filter(d => d.gender === selectedGender);
    }

    // Flipkart Sorting Options
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        result.sort((a, b) => (b.reviewCount * b.rating) - (a.reviewCount * a.rating));
        break;
      case 'fee-low':
        result.sort((a, b) => a.fee - b.fee);
        break;
      case 'fee-high':
        result.sort((a, b) => b.fee - a.fee);
        break;
      case 'distance':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'experience':
        result.sort((a, b) => b.experience - a.experience);
        break;
      default:
        // Relevance: weighted combination of rating and verification
        result.sort((a, b) => (b.verified ? 1 : 0) * 100 + b.rating - ((a.verified ? 1 : 0) * 100 + a.rating));
    }

    return result;
  }, [searchQuery, selectedSpecialty, maxFee, verifiedOnly, availableToday, minRating, minExperience, selectedGender, sortBy]);

  const clearFilters = () => {
    setSelectedSpecialty('');
    setMaxFee(2000);
    setVerifiedOnly(false);
    setAvailableToday(false);
    setMinRating(0);
    setMinExperience(0);
    setSelectedGender('All');
    setSearchQuery('');
  };

  const activeFilterCount = [
    Boolean(selectedSpecialty),
    maxFee < 2000,
    verifiedOnly,
    availableToday,
    minRating > 0,
    minExperience > 0,
    selectedGender !== 'All',
    Boolean(searchQuery),
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── FLIPKART STYLE TOP SEARCH & CITY BAR ── */}
      <div className="border-b bg-white dark:bg-slate-900 sticky top-16 z-30 shadow-xs" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container mx-auto px-4 lg:px-6 py-3.5">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            {/* City Selector */}
            <div className="relative shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer pr-4"
                  id="city-selector"
                >
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Optimized Search Input with Live Suggestions */}
            <div className="relative flex-1">
              <div
                className="flex items-center gap-2 px-4 rounded-xl border bg-white dark:bg-slate-800 transition-all focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 shadow-xs"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties (e.g. Cardiologist), or symptoms (e.g. Chest pain, Fever)..."
                  className="flex-1 py-2.5 bg-transparent border-none outline-none text-sm"
                  style={{ color: 'var(--text-primary)' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  id="doctor-search-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown Popover */}
              {searchFocused && searchSuggestions && (
                <div
                  className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border z-50 overflow-hidden"
                  style={{ borderColor: 'var(--border-color)' }}
                  onMouseDown={(e) => e.preventDefault()} // Prevents blur before click
                >
                  {/* Specialties */}
                  {searchSuggestions.specialties.length > 0 && (
                    <div className="p-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <p className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">Specialties</p>
                      {searchSuggestions.specialties.map(s => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setSelectedSpecialty(s.name);
                            setSearchQuery('');
                            setSearchFocused(false);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-sm hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center justify-between"
                        >
                          <span className="font-semibold text-teal-700 dark:text-teal-300">{s.icon} {s.name}</span>
                          <span className="text-xs text-slate-400">{s.doctorCount}+ doctors</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Symptoms */}
                  {searchSuggestions.symptoms.length > 0 && (
                    <div className="p-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <p className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">Related Symptoms</p>
                      {searchSuggestions.symptoms.map((sym, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedSpecialty(sym.specialty);
                            setSearchQuery(sym.specialty);
                            setSearchFocused(false);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-sm hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center justify-between"
                        >
                          <span className="text-slate-700 dark:text-slate-200">🔍 {searchQuery} → Recommend: <strong className="text-teal-600">{sym.specialty}</strong></span>
                          <span className="text-xs font-bold text-teal-600">{Math.round(sym.confidence * 100)}% match</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Doctors */}
                  {searchSuggestions.doctors.length > 0 && (
                    <div className="p-2">
                      <p className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">Top Doctors</p>
                      {searchSuggestions.doctors.map(d => (
                        <Link
                          key={d.id}
                          href={`/doctor/${d.id}`}
                          onClick={() => setSearchFocused(false)}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-sm hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center justify-between block"
                        >
                          <span className="font-semibold text-slate-800 dark:text-slate-100">{d.name} <span className="text-xs font-normal text-slate-500">({d.specialty})</span></span>
                          <span className="flipkart-rating-badge">{d.rating} ★</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Symptom Checker Shortcut */}
            <Link
              href={`/symptom-checker${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
              className="btn btn-primary gap-1.5 shrink-0 text-xs py-2.5 px-4 rounded-xl shadow-xs"
              id="ai-symptom-checker-btn"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>AI Symptom Checker</span>
            </Link>

            {/* FILTER FEATURE TOGGLE BUTTON (Prominent Desktop & Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                showFilters
                  ? 'bg-teal-50 border-teal-600 text-teal-700 dark:bg-teal-950 dark:text-teal-200'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
              id="filter-toggle-button"
              title="Toggle filters sidebar visibility"
            >
              <SlidersHorizontal className="w-4 h-4 text-teal-600" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Symptom Chips Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar text-xs">
            <span className="text-slate-400 font-semibold shrink-0 text-[11px] mr-1">Quick Symptoms:</span>
            {QUICK_SYMPTOMS.map((qs) => {
              const isActive = selectedSpecialty === qs.specialty || searchQuery === qs.query;
              return (
                <button
                  key={qs.label}
                  onClick={() => {
                    if (isActive) {
                      setSelectedSpecialty('');
                      setSearchQuery('');
                    } else {
                      setSelectedSpecialty(qs.specialty);
                      setSearchQuery(qs.query);
                    }
                  }}
                  className={`px-3 py-1 rounded-full shrink-0 font-medium transition-all text-xs border ${
                    isActive
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs scale-102'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {qs.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FLIPKART STYLE HORIZONTAL QUICK-TOGGLE BAR ── */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border-b py-2 px-4 lg:px-6" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setAvailableToday(!availableToday)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                availableToday
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
              }`}
              id="quick-toggle-available-today"
            >
              <span className={`w-2 h-2 rounded-full ${availableToday ? 'bg-white' : 'bg-emerald-500'}`}></span>
              Available Today
            </button>

            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                verifiedOnly
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
              }`}
              id="quick-toggle-verified"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              HealthBridge Assured
            </button>

            <button
              onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                minRating === 4.5
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
              }`}
              id="quick-toggle-rating"
            >
              <Star className="w-3 h-3 fill-current" />
              4.5+ Rating
            </button>

            <button
              onClick={() => setMaxFee(maxFee === 500 ? 2000 : 500)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                maxFee === 500
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
              }`}
              id="quick-toggle-budget"
            >
              Under ₹500
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                id="clear-all-quick-filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear All ({activeFilterCount})
              </button>
            )}
          </div>

          {/* View Mode Toggle (Flipkart List vs Grid) */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border rounded-lg p-0.5" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                viewMode === 'list' ? 'bg-teal-600 text-white font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View (Flipkart Classic)"
            >
              <ListIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                viewMode === 'grid' ? 'bg-teal-600 text-white font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT: FILTER SIDEBAR + FLIPKART DOCTOR LIST ── */}
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <div className="flex gap-6 items-start">
          {/* ── COLLAPSIBLE FILTER SIDEBAR (FLIPKART STYLE) ── */}
          {showFilters && (
            <aside
              className="w-full lg:w-72 shrink-0 animate-fade-in"
              id="filter-sidebar"
            >
              <div
                className="bg-white dark:bg-slate-900 border rounded-2xl p-5 sticky top-40 space-y-5 shadow-xs"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                    <h3 className="font-bold text-sm tracking-wide" style={{ color: 'var(--text-primary)' }}>
                      FILTERS
                    </h3>
                  </div>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      CLEAR ALL
                    </button>
                  )}
                </div>

                {/* 1. Specialties Category List */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    Specialty
                  </label>
                  <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
                    <button
                      onClick={() => setSelectedSpecialty('')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedSpecialty === ''
                          ? 'bg-teal-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>All Specialties</span>
                      <span>({doctors.length})</span>
                    </button>
                    {specialties.map((s) => {
                      const count = doctors.filter(d => d.specialty === s.name).length;
                      const isSelected = selectedSpecialty === s.name;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelectedSpecialty(isSelected ? '' : s.name)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-teal-600 text-white font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <span>{s.icon}</span>
                            <span className="truncate">{s.name}</span>
                          </span>
                          <span className={`text-[11px] ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                            ({count})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Price Range Slider & Presets */}
                <div className="pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Max Consultation Fee
                    </label>
                    <span className="text-xs font-extrabold text-teal-600">
                      ₹{maxFee === 2000 ? '2,000+' : maxFee}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="2000"
                    step="100"
                    value={maxFee}
                    onChange={(e) => setMaxFee(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                    id="filter-fee-slider"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₹300</span>
                    <span>₹1,000</span>
                    <span>₹2,000+</span>
                  </div>

                  {/* Quick Price Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    {[500, 800, 2000].map(fee => (
                      <button
                        key={fee}
                        onClick={() => setMaxFee(fee)}
                        className={`py-1 text-[11px] rounded font-semibold border ${
                          maxFee === fee
                            ? 'bg-teal-50 border-teal-600 text-teal-700 dark:bg-teal-950 dark:text-teal-200'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {fee === 2000 ? 'Any Fee' : `≤ ₹${fee}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Customer Ratings (Flipkart Star Filter) */}
                <div className="pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                    Customer Ratings
                  </label>
                  <div className="space-y-1">
                    {[
                      { val: 0, label: 'All Ratings' },
                      { val: 4.8, label: '4.8★ & above' },
                      { val: 4.5, label: '4.5★ & above' },
                      { val: 4.0, label: '4.0★ & above' },
                    ].map(r => (
                      <button
                        key={r.val}
                        onClick={() => setMinRating(r.val)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                          minRating === r.val
                            ? 'bg-teal-50 border border-teal-600 text-teal-700 dark:bg-teal-950 dark:text-teal-200'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{r.label}</span>
                        {r.val > 0 && <span className="flipkart-rating-badge text-[10px]">{r.val}★</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Experience Filter */}
                <div className="pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                    Doctor Experience
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { val: 0, label: 'Any' },
                      { val: 10, label: '10+ Yrs' },
                      { val: 15, label: '15+ Yrs' },
                    ].map(exp => (
                      <button
                        key={exp.val}
                        onClick={() => setMinExperience(exp.val)}
                        className={`py-1 text-[11px] rounded font-semibold border ${
                          minExperience === exp.val
                            ? 'bg-teal-50 border-teal-600 text-teal-700 dark:bg-teal-950 dark:text-teal-200'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Doctor Gender */}
                <div className="pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                    Doctor Gender
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['All', 'Female', 'Male'] as const).map(g => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`py-1 text-[11px] rounded font-semibold border ${
                          selectedGender === g
                            ? 'bg-teal-50 border-teal-600 text-teal-700 dark:bg-teal-950 dark:text-teal-200'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Feature Toggles */}
                <div className="pt-3 border-t space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                  <label className="flex items-center justify-between cursor-pointer" id="sidebar-toggle-verified">
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>HealthBridge Assured</span>
                    <button
                      type="button"
                      onClick={() => setVerifiedOnly(!verifiedOnly)}
                      className={`w-9 h-5 rounded-full relative transition-colors ${
                        verifiedOnly ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          verifiedOnly ? 'left-4.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer" id="sidebar-toggle-today">
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Available Today Only</span>
                    <button
                      type="button"
                      onClick={() => setAvailableToday(!availableToday)}
                      className={`w-9 h-5 rounded-full relative transition-colors ${
                        availableToday ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          availableToday ? 'left-4.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* ── DOCTOR RESULTS (FLIPKART STYLE LIST) ── */}
          <main className="flex-1 min-w-0">
            {/* ── FLIPKART STYLE SORT TABS ROW ── */}
            <div
              className="bg-white dark:bg-slate-900 border rounded-2xl p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs"
              style={{ borderColor: 'var(--border-color)' }}
            >
              {/* Results count & active search label */}
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Showing <span className="font-extrabold text-teal-600">{filteredDoctors.length}</span> verified doctors
                  {selectedSpecialty && <span> in <strong className="text-teal-700 dark:text-teal-300">{selectedSpecialty}</strong></span>}
                  {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  ✓ Instant appointment confirmation • 100% verified credentials
                </p>
              </div>

              {/* Flipkart Sort Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                  Sort By:
                </span>
                {[
                  { id: 'relevance', label: 'Relevance' },
                  { id: 'popularity', label: 'Popularity' },
                  { id: 'fee-low', label: 'Price -- Low to High' },
                  { id: 'fee-high', label: 'Price -- High to Low' },
                  { id: 'rating', label: 'Rating: High to Low' },
                  { id: 'experience', label: 'Experience' },
                ].map(sort => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id)}
                    className={`px-2.5 py-1.5 rounded-lg font-semibold shrink-0 transition-colors ${
                      sortBy === sort.id
                        ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-200 border-b-2 border-teal-600'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Doctor Cards */}
            {filteredDoctors.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div
                className="bg-white dark:bg-slate-900 border rounded-2xl text-center py-16 px-6"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl mx-auto mb-4">
                  🔍
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  No doctors found matching your filters
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                  We couldn&apos;t find any doctors matching all criteria. Try loosening your fee or specialty filters.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={clearFilters} className="btn btn-primary text-xs">
                    Clear All Filters
                  </button>
                  <Link href="/symptom-checker" className="btn btn-secondary text-xs">
                    Try AI Symptom Checker
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function FindDoctorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-center">Loading Doctor Directory...</div>}>
      <FindDoctorsContent />
    </Suspense>
  );
}
