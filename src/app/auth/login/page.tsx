// HealthBridge
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  User,
  Stethoscope,
  ShieldCheck,
  Heart,
  ArrowRight,
  Lock,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoLogin = (role: 'patient' | 'doctor' | 'admin') => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (role === 'patient') router.push('/dashboard/patient');
      else if (role === 'doctor') router.push('/dashboard/doctor');
      else router.push('/dashboard/admin');
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      if (selectedRole === 'patient') router.push('/dashboard/patient');
      else if (selectedRole === 'doctor') router.push('/dashboard/doctor');
      else router.push('/dashboard/admin');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-xl">
          {/* Quick Demo Login Hub for Project Evaluation */}
          <div className="rounded-2xl border p-5 mb-8 shadow-sm"
            style={{
              backgroundColor: 'rgba(13, 148, 136, 0.04)',
              borderColor: 'var(--color-primary)',
            }}>
            <div className="flex items-center gap-2 mb-2 text-teal-700 dark:text-teal-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>COLLEGE EVALUATOR ONE-CLICK DEMO LOGIN</span>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
              Instantly jump into any user experience to evaluate the working features without typing credentials:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleDemoLogin('patient')}
                disabled={isSubmitting}
                className="btn btn-secondary btn-sm text-xs flex flex-col items-center py-2.5 gap-1 hover:border-teal-500 hover:text-teal-700 transition-all text-center"
              >
                <User className="w-4 h-4 text-teal-600" />
                <span className="font-bold">Patient Portal</span>
                <span className="text-[10px] opacity-75">Rahul Sharma</span>
              </button>

              <button
                onClick={() => handleDemoLogin('doctor')}
                disabled={isSubmitting}
                className="btn btn-secondary btn-sm text-xs flex flex-col items-center py-2.5 gap-1 hover:border-blue-500 hover:text-blue-700 transition-all text-center"
              >
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <span className="font-bold">Doctor Portal</span>
                <span className="text-[10px] opacity-75">Dr. Priya Sharma</span>
              </button>

              <button
                onClick={() => handleDemoLogin('admin')}
                disabled={isSubmitting}
                className="btn btn-secondary btn-sm text-xs flex flex-col items-center py-2.5 gap-1 hover:border-indigo-500 hover:text-indigo-700 transition-all text-center"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="font-bold">Admin Portal</span>
                <span className="text-[10px] opacity-75">Platform Verification</span>
              </button>
            </div>
          </div>

          {/* Regular Login Form */}
          <div className="card p-8">
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-3"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {authMode === 'signin' ? 'Sign In to HealthBridge' : 'Create an Account'}
              </h1>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Access verified doctor discovery, symptom triage & secure medical vault
              </p>
            </div>

            {/* Role Tab Selector */}
            <div className="flex p-1 rounded-xl border mb-6 text-xs font-semibold"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'patient'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Patient
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('doctor')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'doctor'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" /> Doctor
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {selectedRole === 'doctor' ? 'Official Medical Email / Reg Number' : 'Email Address or Mobile Number'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3" style={{ color: 'var(--text-tertiary)' }} />
                  <input
                    type="text"
                    required
                    placeholder={
                      selectedRole === 'doctor' ? 'doctor@hospital.org or MMC-2014-04981' :
                      selectedRole === 'admin' ? 'admin@healthbridge.internal' :
                      'name@example.com or +91 98765 43210'
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full pl-9 text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Password
                  </label>
                  <a href="#" className="text-xs text-teal-600 hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3" style={{ color: 'var(--text-tertiary)' }} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full pl-9 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full justify-center gap-2 mt-2"
                style={{
                  backgroundColor:
                    selectedRole === 'doctor' ? '#2563EB' :
                    selectedRole === 'admin' ? '#4F46E5' : 'var(--color-primary)'
                }}
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Continue to {selectedRole === 'doctor' ? 'Doctor Workspace' : selectedRole === 'admin' ? 'Admin Panel' : 'Patient Vault'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t text-center text-xs" style={{ borderColor: 'var(--border-color)' }}>
              {authMode === 'signin' ? (
                <p style={{ color: 'var(--text-secondary)' }}>
                  Don&apos;t have an account yet?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="font-bold text-teal-600 hover:underline"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>
                  Already registered?{' '}
                  <button
                    onClick={() => setAuthMode('signin')}
                    className="font-bold text-teal-600 hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
