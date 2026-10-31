// HealthBridge
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { sampleRecords } from '@/lib/mockData';
import {
  FolderLock,
  Search,
  Plus,
  FileText,
  TestTube,
  Pill,
  AlertCircle,
  Stethoscope,
  Upload,
  Calendar,
  Filter,
  Clock,
  Shield,
  Eye,
  ChevronRight,
  X,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Records', icon: FileText, count: 6 },
  { id: 'prescription', name: 'Prescriptions', icon: FileText, count: 1 },
  { id: 'lab-report', name: 'Lab Reports', icon: TestTube, count: 2 },
  { id: 'consultation', name: 'Consultations', icon: Stethoscope, count: 1 },
  { id: 'medication', name: 'Medications', icon: Pill, count: 1 },
  { id: 'allergy', name: 'Allergies', icon: AlertCircle, count: 1 },
];

const sharingRequests = [
  { id: '1', doctorName: 'Dr. Priya Sharma', specialty: 'Cardiologist', scope: 'Lab Reports, Medications', expiry: '30 days', status: 'pending' as const },
  { id: '2', doctorName: 'Dr. Rajesh Kumar', specialty: 'Neurologist', scope: 'Full Medical History', expiry: '7 days', status: 'approved' as const },
];

export default function MedicalVaultPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [activeView, setActiveView] = useState<'records' | 'timeline' | 'sharing'>('records');
  const [sharingStates, setSharingStates] = useState<Record<string, string>>({});

  const filteredRecords = sampleRecords.filter(r => {
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    const matchesSearch = !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryIcons: Record<string, { icon: typeof FileText; color: string; bg: string }> = {
    prescription: { icon: FileText, color: '#2563EB', bg: '#DBEAFE' },
    'lab-report': { icon: TestTube, color: '#7C3AED', bg: '#EDE9FE' },
    consultation: { icon: Stethoscope, color: 'var(--color-primary)', bg: 'var(--color-primary-100)' },
    medication: { icon: Pill, color: '#EA580C', bg: '#FFF7ED' },
    allergy: { icon: AlertCircle, color: 'var(--color-emergency)', bg: 'var(--color-emergency-light)' },
    document: { icon: FileText, color: '#64748B', bg: '#F1F5F9' },
    surgery: { icon: Stethoscope, color: '#DC2626', bg: '#FEE2E2' },
  };

  const handleSharingAction = (requestId: string, action: 'approve' | 'deny') => {
    setSharingStates(prev => ({ ...prev, [requestId]: action === 'approve' ? 'approved' : 'denied' }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <div className="container mx-auto px-4 lg:px-6 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary-100)' }}>
              <FolderLock className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Medical Vault</h1>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Secure personal medical records (demo data)</p>
            </div>
          </div>
          <button onClick={() => setShowUpload(true)} className="btn btn-primary" id="upload-record-btn">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </div>

        {/* View Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          {[
            { id: 'records' as const, label: 'Records' },
            { id: 'timeline' as const, label: 'Timeline' },
            { id: 'sharing' as const, label: 'Sharing' },
          ].map(view => (
            <button key={view.id} onClick={() => setActiveView(view.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: activeView === view.id ? 'var(--bg-card)' : 'transparent',
                color: activeView === view.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: activeView === view.id ? 'var(--shadow-sm)' : 'none',
              }}>
              {view.label}
            </button>
          ))}
        </div>

        {activeView === 'records' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Sidebar */}
            <aside className="lg:w-56 shrink-0">
              <div className="space-y-1">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left"
                      style={{
                        backgroundColor: activeCategory === cat.id ? 'var(--color-primary-100)' : 'transparent',
                        color: activeCategory === cat.id ? 'var(--color-primary-700)' : 'var(--text-secondary)',
                        fontWeight: activeCategory === cat.id ? 600 : 400,
                      }}>
                      <Icon className="w-4 h-4" />
                      <span className="flex-1">{cat.name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Records List */}
            <main className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center flex-1 gap-2 px-3 rounded-xl border"
                  style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
                  <Search className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <input type="text" placeholder="Search records..." className="flex-1 py-2.5 bg-transparent border-none outline-none text-sm"
                    style={{ color: 'var(--text-primary)' }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>

              {filteredRecords.length > 0 ? (
                <div className="space-y-3">
                  {filteredRecords.map(record => {
                    const catInfo = categoryIcons[record.category] || categoryIcons.document;
                    const Icon = catInfo.icon;
                    return (
                      <div key={record.id} className="card card-hover cursor-pointer animate-fade-in" id={`record-${record.id}`}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: catInfo.bg }}>
                            <Icon className="w-5 h-5" style={{ color: catInfo.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{record.title}</h3>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{record.doctor}</p>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{record.summary}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                                <Calendar className="w-3 h-3" /> {record.date}
                              </span>
                              {record.tags.map(tag => (
                                <span key={tag} className="badge badge-primary text-xs">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <button className="btn btn-ghost btn-sm btn-icon shrink-0">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <Search className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No records found</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or category filter</p>
                </div>
              )}
            </main>
          </div>
        )}

        {activeView === 'timeline' && (
          <div className="max-w-2xl mx-auto">
            <div className="relative pl-8 space-y-6">
              <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--border-color)' }} />
              {sampleRecords
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record, i) => {
                  const catInfo = categoryIcons[record.category] || categoryIcons.document;
                  const Icon = catInfo.icon;
                  return (
                    <div key={record.id} className={`relative animate-slide-up stagger-${Math.min(i + 1, 6)}`}>
                      <div className="absolute -left-5 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: catInfo.bg, border: '2px solid var(--bg-primary)' }}>
                        <Icon className="w-3 h-3" style={{ color: catInfo.color }} />
                      </div>
                      <div className="card">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>{record.date}</span>
                          <span className="badge badge-primary text-xs capitalize">{record.category.replace('-', ' ')}</span>
                        </div>
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{record.title}</h3>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{record.doctor} — {record.summary}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {activeView === 'sharing' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="card p-4 flex items-start gap-3"
              style={{ backgroundColor: 'var(--color-info-light)' }}>
              <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#2563EB' }} />
              <div>
                <p className="text-sm font-medium" style={{ color: '#1E40AF' }}>Consent-Based Sharing</p>
                <p className="text-xs mt-1" style={{ color: '#3B82F6' }}>
                  Your medical records are only shared when you explicitly approve a doctor&apos;s request. 
                  You can revoke access at any time.
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Access Requests</h3>

            {sharingRequests.map(req => {
              const currentStatus = sharingStates[req.id] || req.status;
              return (
                <div key={req.id} className="card animate-fade-in">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'var(--color-primary-100)' }}>
                        <UserCheck className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{req.doctorName}</h4>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{req.specialty}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                          Scope: {req.scope} · Expiry: {req.expiry}
                        </p>
                      </div>
                    </div>
                    <div>
                      {currentStatus === 'pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleSharingAction(req.id, 'approve')}
                            className="btn btn-primary btn-sm">Approve</button>
                          <button onClick={() => handleSharingAction(req.id, 'deny')}
                            className="btn btn-ghost btn-sm">Deny</button>
                        </div>
                      ) : (
                        <span className={`badge ${currentStatus === 'approved' ? 'badge-success' : 'badge-danger'}`}>
                          {currentStatus === 'approved' ? '✓ Approved' : '✕ Denied'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
              All sharing requests shown are fictional demonstration data
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="card max-w-md w-full animate-scale-in" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Upload Medical Record</h3>
              <button onClick={() => setShowUpload(false)} className="btn btn-ghost btn-icon">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Record Title</label>
                <input type="text" className="input" placeholder="e.g., Blood Test Report" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Category</label>
                <select className="input">
                  <option>Lab Report</option>
                  <option>Prescription</option>
                  <option>Consultation</option>
                  <option>Medical Document</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Upload File</label>
                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors hover:border-teal-400"
                  style={{ borderColor: 'var(--border-color)' }}>
                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-tertiary)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Click to upload or drag and drop</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Demo: File upload is simulated. No files are actually stored.
              </p>
              <button onClick={() => setShowUpload(false)} className="btn btn-primary w-full">
                Upload Record
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
