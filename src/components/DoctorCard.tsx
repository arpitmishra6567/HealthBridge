'use client';

import Link from 'next/link';
import { Star, MapPin, Clock, BadgeCheck, Video, CalendarCheck, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import type { Doctor } from '@/lib/mockData';
import { useState } from 'react';

export default function DoctorCard({ doctor, viewMode = 'list' }: { doctor: Doctor; viewMode?: 'list' | 'grid' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const initials = doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');
  const originalFee = doctor.originalFee || Math.round(doctor.fee * 1.4);
  const discountPercent = doctor.discountPercent || Math.round(((originalFee - doctor.fee) / originalFee) * 100);
  const videoFee = doctor.videoConsultFee || Math.round(doctor.fee * 0.75);

  return (
    <div
      className={`card card-hover transition-all duration-200 border overflow-hidden relative group ${
        viewMode === 'grid' ? 'flex flex-col' : 'p-4 sm:p-5'
      }`}
      id={`doctor-card-${doctor.id}`}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Wishlist Heart Icon (Flipkart style) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border shadow-sm hover:scale-110"
        style={{ borderColor: 'var(--border-color)' }}
        aria-label="Save doctor"
        title={isWishlisted ? "Saved to favorites" : "Save doctor"}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-500'
          }`}
        />
      </button>

      <div className={`flex ${viewMode === 'grid' ? 'flex-col p-4' : 'flex-col md:flex-row'} gap-4 lg:gap-6`}>
        {/* ── LEFT COLUMN: Avatar & Badges (Flipkart Product Image Style) ── */}
        <div className={`shrink-0 flex flex-col items-center ${viewMode === 'grid' ? 'w-full' : 'md:w-44'}`}>
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
            {doctor.avatar ? (
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-3xl font-bold"
                style={{
                  backgroundColor: doctor.gender === 'Female' ? '#F0FDFA' : '#EFF6FF',
                  color: doctor.gender === 'Female' ? 'var(--color-primary)' : '#3B82F6',
                }}
              >
                {initials}
              </div>
            )}

            {/* Experience Pill on Image */}
            <div className="absolute bottom-1.5 left-1.5 right-1.5 text-center bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold py-0.5 px-2 rounded-md">
              {doctor.experience} Yrs Experience
            </div>
          </div>

          {/* Flipkart-Style Assured Badge */}
          <div className="mt-2.5">
            <span className="flipkart-assured-badge">
              <span>✦</span> HealthBridge <span>ASSURED</span>
            </span>
          </div>

          {/* Quick Availability Chip */}
          <div className="mt-2 text-center">
            {doctor.availableToday ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Available Today
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Next: {doctor.nextAvailable.split(',')[0]}
              </span>
            )}
          </div>
        </div>

        {/* ── CENTER COLUMN: Doctor Specs & Details (Flipkart Spec List Style) ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Title & Verified */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <Link
                  href={`/doctor/${doctor.id}`}
                  className="font-bold text-lg sm:text-xl hover:text-teal-600 transition-colors flex items-center gap-1.5 group-hover:underline"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {doctor.name}
                  {doctor.verified && (
                    <span title="State Medical Council Verified">
                      <BadgeCheck className="w-4 h-4 shrink-0 text-teal-600 fill-teal-100 dark:fill-teal-950" />
                    </span>
                  )}
                </Link>
                <p className="text-sm font-semibold mt-0.5 text-teal-700 dark:text-teal-400">
                  {doctor.specialty}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {doctor.qualifications} • Reg: {doctor.registrationNumber}
                </p>
              </div>
            </div>

            {/* Flipkart Rating Green Pill & Reviews Row */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <span className="flipkart-rating-badge">
                {doctor.rating} <Star className="w-3 h-3 fill-white text-white" />
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {doctor.reviewCount} Ratings & {Math.round(doctor.reviewCount * 0.45)} Reviews
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                {doctor.satisfactionRate || 98}% Patient Satisfaction
              </span>
            </div>

            {/* Flipkart-Style Specification Bullets */}
            <div className="space-y-1.5 mt-3 pt-3 border-t border-dashed" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flipkart-spec-bullet">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Clinic:</span> {doctor.clinicName} • {doctor.area}, {doctor.location} <span className="text-teal-600 dark:text-teal-400 font-medium">({doctor.distance} km away)</span>
              </div>
              <div className="flipkart-spec-bullet">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Languages:</span> {doctor.languages.join(', ')}
              </div>
              <div className="flipkart-spec-bullet">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Wait Time:</span> &lt; 10 mins average clinic wait • Instant token
              </div>
              <div className="flipkart-spec-bullet">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Includes:</span> Free Follow-up for {doctor.freeFollowupDays || 7} Days & Prescription Vault Sync
              </div>
            </div>

            {/* Tags Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {doctor.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Pricing & Booking Actions (Flipkart Buy Box Style) ── */}
        <div
          className={`shrink-0 flex flex-col justify-between ${
            viewMode === 'grid'
              ? 'w-full pt-3 mt-2 border-t'
              : 'md:w-56 md:border-l md:pl-5 pt-3 md:pt-0 border-t md:border-t-0'
          }`}
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            {/* Price Row */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                ₹{doctor.fee}
              </span>
              <span className="text-sm line-through text-slate-400 dark:text-slate-500 font-medium">
                ₹{originalFee}
              </span>
              <span className="flipkart-discount-tag">
                {discountPercent}% off
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Per Consultation • Zero Platform Fee
            </p>

            {/* Free Followup Badge */}
            <div className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <span>✓</span> Free 7-Day Digital Follow-up
            </div>

            {/* Next Slot Promise */}
            <div className="mt-2 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 text-xs text-teal-800 dark:text-teal-200">
              <span className="font-semibold block">⚡ Next Available Slot:</span>
              <span className="text-teal-600 dark:text-teal-300">{doctor.nextAvailable}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mt-4">
            <Link
              href={`/doctor/${doctor.id}?book=true`}
              className="w-full flipkart-btn-book py-2.5 px-3 flex items-center justify-center gap-1.5 text-sm"
              id={`book-clinic-${doctor.id}`}
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              Book Clinic Visit
            </Link>

            <Link
              href={`/doctor/${doctor.id}?book=true&type=video`}
              className="w-full btn btn-secondary py-2 px-3 text-xs flex items-center justify-center gap-1.5 border border-teal-600 font-semibold"
              id={`book-video-${doctor.id}`}
            >
              <Video className="w-3.5 h-3.5 shrink-0" />
              Video Consult (₹{videoFee})
            </Link>

            <Link
              href={`/doctor/${doctor.id}`}
              className="text-center block text-xs font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400 transition-colors pt-1"
            >
              View Full Profile & Reviews →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
