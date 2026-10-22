'use client';

import { useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { doctors } from '@/lib/mockData';
import {
  Star,
  MapPin,
  Clock,
  BadgeCheck,
  Phone,
  ArrowLeft,
  CalendarCheck,
  User,
  Award,
  Languages,
  CheckCircle2,
  Building2,
  MessageSquare,
  X,
} from 'lucide-react';

function DoctorDetailContent() {
  const params = useParams();
  const doctor = doctors.find(d => d.id === params.id);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!doctor) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Doctor Not Found</h1>
          <Link href="/find-doctors" className="btn btn-primary">Browse Doctors</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const initials = doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { label: d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }), value: d.toISOString().split('T')[0] };
  });

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setBookingConfirmed(true);
    }
  };

  const sampleReviews = [
    { name: 'Patient A', rating: 5, comment: 'Very thorough and professional. Explained everything clearly. [Demo review]', date: '2 weeks ago' },
    { name: 'Patient B', rating: 4, comment: 'Good experience overall. Short wait time. [Demo review]', date: '1 month ago' },
    { name: 'Patient C', rating: 5, comment: 'Highly recommend. Very knowledgeable and patient. [Demo review]', date: '2 months ago' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <div className="container mx-auto px-4 lg:px-6 py-6">
        {/* Back Button */}
        <Link href="/find-doctors" className="btn btn-ghost btn-sm mb-4" id="back-to-doctors">
          <ArrowLeft className="w-4 h-4" /> Back to Doctors
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Card */}
            <div className="card mb-6" id="doctor-profile">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
                  style={{
                    backgroundColor: doctor.gender === 'Female' ? '#F0FDFA' : '#EFF6FF',
                    color: doctor.gender === 'Female' ? 'var(--color-primary)' : '#3B82F6',
                  }}>
                  {initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        {doctor.name}
                        {doctor.verified && <BadgeCheck className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />}
                      </h1>
                      <p className="text-lg font-medium" style={{ color: 'var(--color-primary)' }}>{doctor.specialty}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{doctor.qualifications}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{doctor.rating}</span>
                      <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>({doctor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <User className="w-4 h-4" /> {doctor.experience} years experience
                    </div>
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <MapPin className="w-4 h-4" /> {doctor.area}, {doctor.location}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {doctor.tags.map(tag => <span key={tag} className="badge badge-primary">{tag}</span>)}
                    {doctor.verified && <span className="badge badge-success">✓ NMC Verified</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b overflow-x-auto" style={{ borderColor: 'var(--border-color)' }}>
              {['overview', 'reviews', 'location'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 py-3 text-sm font-medium capitalize transition-colors whitespace-nowrap"
                  style={{
                    color: activeTab === tab ? 'var(--color-primary)' : 'var(--text-secondary)',
                    borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                  }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                <div className="card">
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>About</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{doctor.about}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Qualifications</h3>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{doctor.qualifications}</p>
                    <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>Reg: {doctor.registrationNumber}</p>
                  </div>
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <Languages className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Languages</h3>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{doctor.languages.join(', ')}</p>
                  </div>
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Clinic</h3>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{doctor.clinicName}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{doctor.area}, {doctor.location}</p>
                  </div>
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Timings</h3>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{doctor.timings}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-fade-in">
                {sampleReviews.map((review, i) => (
                  <div key={i} className="card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                          {review.name[review.name.length - 1]}
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{review.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{review.comment}</p>
                    <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{review.date}</p>
                  </div>
                ))}
                <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>All reviews shown are fictional demonstration data</p>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="card animate-fade-in">
                <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Location</h3>
                <div className="rounded-xl h-64 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-tertiary)' }} />
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{doctor.clinicName}</p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{doctor.area}, {doctor.location}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{doctor.distance} km away</p>
                    <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>[Map integration placeholder]</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="card sticky top-24" id="booking-panel">
              <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Book Appointment</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>Simulated booking — demo only</p>

              <div className="p-3 rounded-xl mb-4 flex items-center justify-between"
                style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Consultation Fee</span>
                <span className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>₹{doctor.fee}</span>
              </div>

              {!bookingConfirmed ? (
                <>
                  {/* Date Selection */}
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Select Date</label>
                    <div className="grid grid-cols-2 gap-2">
                      {dates.slice(0, 4).map(d => (
                        <button key={d.value} onClick={() => setSelectedDate(d.value)}
                          className="p-2 rounded-lg text-xs font-medium text-center transition-all"
                          style={{
                            backgroundColor: selectedDate === d.value ? 'var(--color-primary)' : 'var(--bg-secondary)',
                            color: selectedDate === d.value ? 'white' : 'var(--text-secondary)',
                            border: `1px solid ${selectedDate === d.value ? 'var(--color-primary)' : 'var(--border-color)'}`,
                          }}>
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="mb-4 animate-fade-in">
                      <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Select Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className="p-2 rounded-lg text-xs font-medium text-center transition-all"
                            style={{
                              backgroundColor: selectedTime === t ? 'var(--color-primary)' : 'var(--bg-secondary)',
                              color: selectedTime === t ? 'white' : 'var(--text-secondary)',
                              border: `1px solid ${selectedTime === t ? 'var(--color-primary)' : 'var(--border-color)'}`,
                            }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button onClick={handleBook} className="btn btn-primary w-full"
                    disabled={!selectedDate || !selectedTime}
                    id="confirm-booking-btn">
                    <CalendarCheck className="w-4 h-4" />
                    Confirm Booking
                  </button>
                </>
              ) : (
                <div className="text-center py-4 animate-scale-in">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-success-light)' }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
                  </div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Booking Confirmed!</h4>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {doctor.name} · {selectedTime}
                  </p>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    (This is a simulated booking for demonstration purposes)
                  </p>
                  <div className="flex gap-2">
                    <Link href="/dashboard" className="btn btn-primary btn-sm flex-1">
                      View Dashboard
                    </Link>
                    <button onClick={() => { setBookingConfirmed(false); setSelectedDate(''); setSelectedTime(''); }}
                      className="btn btn-secondary btn-sm flex-1">
                      Book Another
                    </button>
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{doctor.availableToday ? '🟢 Available today' : `Next: ${doctor.nextAvailable}`}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function DoctorDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-sm font-medium">Loading doctor profile...</p>
        </div>
      </div>
    }>
      <DoctorDetailContent />
    </Suspense>
  );
}
