'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';
import { doctors, specialties } from '@/lib/mockData';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

export default function FindDoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [maxFee, setMaxFee] = useState(2000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableToday, setAvailableToday] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q)) ||
        d.qualifications.toLowerCase().includes(q)
      );
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

    // Sort
    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'fee-low': result.sort((a, b) => a.fee - b.fee); break;
      case 'fee-high': result.sort((a, b) => b.fee - a.fee); break;
      case 'distance': result.sort((a, b) => a.distance - b.distance); break;
      case 'experience': result.sort((a, b) => b.experience - a.experience); break;
      default: result.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    }

    return result;
  }, [searchQuery, selectedSpecialty, maxFee, verifiedOnly, availableToday, minRating, sortBy]);

  const clearFilters = () => {
    setSelectedSpecialty('');
    setMaxFee(2000);
    setVerifiedOnly(false);
    setAvailableToday(false);
    setMinRating(0);
    setSearchQuery('');
  };

  const activeFilterCount = [
    selectedSpecialty, maxFee < 2000, verifiedOnly, availableToday, minRating > 0
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* Header */}
      <div className="border-b" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Find Doctors</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center flex-1 gap-2 px-4 rounded-xl border"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
              <Search className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search by name, specialty, condition..."
                className="flex-1 py-3 bg-transparent border-none outline-none text-sm"
                style={{ color: 'var(--text-primary)' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="doctor-search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1 rounded hover:bg-gray-100">
                  <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'} lg:hidden`}
              id="toggle-filters-btn"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 shrink-0`}>
            <div className="card sticky top-24 space-y-6" id="filter-panel">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                    Clear All
                  </button>
                )}
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Specialty</label>
                <select
                  className="input"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  id="filter-specialty"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Fee Range */}
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>
                  Max Consultation Fee: ₹{maxFee === 2000 ? '2,000+' : maxFee}
                </label>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="100"
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full accent-teal-600"
                  id="filter-fee"
                />
                <div className="flex justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span>₹200</span><span>₹2,000+</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Min Rating</label>
                <div className="flex gap-2">
                  {[0, 4.0, 4.5, 4.8].map(r => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${minRating === r ? '' : ''}`}
                      style={{
                        backgroundColor: minRating === r ? 'var(--color-primary)' : 'var(--bg-secondary)',
                        color: minRating === r ? 'white' : 'var(--text-secondary)',
                        border: `1px solid ${minRating === r ? 'var(--color-primary)' : 'var(--border-color)'}`,
                      }}
                    >
                      {r === 0 ? 'Any' : `${r}+★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer" id="filter-verified">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Verified Only</span>
                  <button
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className="w-10 h-6 rounded-full relative transition-colors"
                    style={{ backgroundColor: verifiedOnly ? 'var(--color-primary)' : 'var(--border-color)' }}
                  >
                    <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ left: verifiedOnly ? '22px' : '4px' }} />
                  </button>
                </label>

                <label className="flex items-center justify-between cursor-pointer" id="filter-available-today">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Available Today</span>
                  <button
                    onClick={() => setAvailableToday(!availableToday)}
                    className="w-10 h-6 rounded-full relative transition-colors"
                    style={{ backgroundColor: availableToday ? 'var(--color-primary)' : 'var(--border-color)' }}
                  >
                    <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ left: availableToday ? '22px' : '4px' }} />
                  </button>
                </label>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{filteredDoctors.length}</span> doctors found
                {selectedSpecialty && <span> in <span style={{ color: 'var(--color-primary)' }}>{selectedSpecialty}</span></span>}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-tertiary)' }}>Sort by:</span>
                <select
                  className="input py-1.5 px-3 w-auto text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  id="sort-select"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Highest Rating</option>
                  <option value="fee-low">Fee: Low to High</option>
                  <option value="fee-high">Fee: High to Low</option>
                  <option value="distance">Nearest First</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>
            </div>

            {/* Doctor Cards */}
            {filteredDoctors.length > 0 ? (
              <div className="space-y-4">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="card text-center py-16">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No doctors found</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Try adjusting your filters or search terms
                </p>
                <button onClick={clearFilters} className="btn btn-primary">Clear All Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
