import Link from 'next/link';
import { Heart, ShieldCheck, Phone, Stethoscope, User, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Health<span style={{ color: 'var(--color-primary)' }}>Bridge</span>
              </span>
            </Link>
            <p className="text-xs lg:text-sm leading-relaxed max-w-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              Right Care. Right Doctor. Right Information. Right Time. An AI-assisted healthcare navigation and consent-based personal medical record platform.
            </p>
            <div className="p-3 rounded-xl border max-w-sm text-[11px] leading-relaxed"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
              <strong>🎓 Academic Notice:</strong> Built for a college mini-project. All doctors, clinics, and medical records are synthetic demonstration data.
            </div>
          </div>

          {/* Patient Platform */}
          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Patient Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Find Verified Doctors', href: '/find-doctors' },
                { label: 'AI Health Navigator', href: '/ai-assistant' },
                { label: 'Personal Medical Vault', href: '/medical-vault' },
                { label: 'Patient Dashboard', href: '/dashboard/patient' },
                { label: 'Emergency Helplines', href: '/emergency' },
              ].map(item => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="transition-colors hover:text-teal-600 hover:underline"
                    style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals & Roles */}
          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Portals & Roles
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Portals Selection Hub', href: '/dashboard' },
                { label: 'Doctor Workspace', href: '/dashboard/doctor' },
                { label: 'Admin & Verification', href: '/dashboard/admin' },
                { label: 'Sign In / Demo Login', href: '/auth/login' },
                { label: 'Create Account', href: '/auth/login' },
              ].map(item => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="transition-colors hover:text-teal-600 hover:underline"
                    style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project & Safety */}
          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              About & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Project Architecture', href: '/about' },
                { label: 'Problem Statements', href: '/about' },
                { label: 'Consent Architecture', href: '/about' },
                { label: 'Emergency Assistance', href: '/emergency' },
                { label: 'Disclaimers & Ethics', href: '/about' },
              ].map(item => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="transition-colors hover:text-teal-600 hover:underline"
                    style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency Alert & Copyright */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © 2026 HealthBridge. College Mini Project in Digital Health Technology & Medical Informatics.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/emergency"
              className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--color-emergency-light)', color: 'var(--color-emergency)' }}
            >
              <Phone className="w-3.5 h-3.5" />
              Immediate Emergency? Call 112
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
