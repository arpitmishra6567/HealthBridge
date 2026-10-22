'use client';

import Link from 'next/link';
import { Star, MapPin, Clock, BadgeCheck, User } from 'lucide-react';
import type { Doctor } from '@/lib/mockData';

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const initials = doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');

  return (
    <div className="card card-hover animate-fade-in" id={`doctor-card-${doctor.id}`}>
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center text-lg font-bold"
            style={{
              backgroundColor: doctor.gender === 'Female' ? '#F0FDFA' : '#EFF6FF',
              color: doctor.gender === 'Female' ? 'var(--color-primary)' : '#3B82F6',
            }}>
            {doctor.avatar ? (
              <img src={doctor.avatar} alt={doctor.name} className="w-full h-full rounded-xl object-cover" />
            ) : (
              initials
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-base flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                {doctor.name}
                {doctor.verified && (
                  <BadgeCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                )}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-primary)' }}>{doctor.specialty}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{doctor.qualifications}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>₹{doctor.fee}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>consultation</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{doctor.rating}</span>
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>({doctor.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <MapPin className="w-3 h-3" />
              <span>{doctor.distance} km · {doctor.area}</span>
            </div>
            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <User className="w-3 h-3" />
              <span>{doctor.experience} yrs exp</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {doctor.tags.map(tag => (
              <span key={tag} className="badge badge-primary text-xs">{tag}</span>
            ))}
            {doctor.verified && (
              <span className="badge badge-success text-xs">✓ Verified</span>
            )}
          </div>

          {/* Availability + Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" style={{ color: doctor.availableToday ? 'var(--color-success)' : 'var(--text-tertiary)' }} />
              <span className="text-xs font-medium" style={{ color: doctor.availableToday ? 'var(--color-success)' : 'var(--text-secondary)' }}>
                {doctor.availableToday ? '🟢 Available Today' : `Next: ${doctor.nextAvailable}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/doctor/${doctor.id}`} className="btn btn-secondary btn-sm">
                View Profile
              </Link>
              <Link href={`/doctor/${doctor.id}?book=true`} className="btn btn-primary btn-sm">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
