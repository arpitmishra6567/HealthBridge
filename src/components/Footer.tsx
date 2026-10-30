import Link from 'next/link';
import { Heart, Phone } from 'lucide-react';

function GitHubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Column 1 & 2: Brand Information */}
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

            {/* Tagline */}
            <p className="text-xs lg:text-sm font-semibold mb-2 text-teal-700 dark:text-teal-400">
              Right Care. Right Doctor. Right Information. Right Time.
            </p>

            <p className="text-xs leading-relaxed max-w-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              An AI-assisted healthcare navigation and consent-based personal medical record platform engineered to simplify clinical access and record continuity.
            </p>

            {/* Social & Project Links */}
            <div className="flex items-center gap-2.5 mb-4">
              {/* GitHub Repository Icon */}
              <a
                href="https://github.com/arpitmishra6567/HealthBridge"
                target="_blank"
                rel="noopener noreferrer"
                title="HealthBridge GitHub Repository (opens in new tab)"
                aria-label="HealthBridge GitHub Repository (opens in new tab)"
                className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-105 hover:border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <GitHubIcon className="w-4 h-4" />
              </a>

              {/* Team Leader LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/in/arpitmishra-tech"
                target="_blank"
                rel="noopener noreferrer"
                title="Team Leader Arpit Mishra's LinkedIn Profile (opens in new tab)"
                aria-label="Team Leader Arpit Mishra's LinkedIn Profile (opens in new tab)"
                className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-105 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  color: '#0A66C2',
                }}
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <span className="text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                GitHub & Team LinkedIn
              </span>
            </div>

            {/* Academic Notice */}
            <div className="p-3 rounded-xl border max-w-sm text-[11px] leading-relaxed"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
              <strong>🎓 Academic Notice:</strong> Built for a college mini-project evaluation. All doctor profiles, clinics, and medical records are synthetic demonstration data.
            </div>
          </div>

          {/* Column 3: Useful Links (Directly matching Phase 6 requirements) */}
          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Find Doctors', href: '/find-doctors' },
                { label: 'AI Symptom Checker', href: '/symptom-checker' },
                { label: 'Emergency Assistance', href: '/emergency' },
                { label: 'Contact Us', href: '/about#contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-teal-600 hover:underline inline-flex items-center gap-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Platform Navigation */}
          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Patient Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'AI Health Navigator', href: '/ai-assistant' },
                { label: '3D Anatomy Visualizer', href: '/symptom-checker' },
                { label: 'Personal Medical Vault', href: '/medical-vault' },
                { label: 'Patient Dashboard', href: '/dashboard/patient' },
                { label: 'Emergency Helplines', href: '/emergency' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-teal-600 hover:underline"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Project & Portals */}
          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Project & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Meet Our Team', href: '/about#team' },
                { label: 'GitHub Repository', href: '/about#github' },
                { label: 'Doctor Workspace', href: '/dashboard/doctor' },
                { label: 'Admin & Verification', href: '/dashboard/admin' },
                { label: 'Portals Hub', href: '/dashboard' },
                { label: 'Sign In / Demo Login', href: '/auth/login' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-teal-600 hover:underline"
                    style={{ color: 'var(--text-secondary)' }}
                  >
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
          {/* Exact Copyright Line requested: © 2026 HealthBridge. All rights reserved. */}
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © 2026 HealthBridge. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
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
