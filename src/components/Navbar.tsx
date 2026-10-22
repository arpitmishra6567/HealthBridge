'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Search,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  User,
  ChevronDown,
  Heart,
  LogIn,
  AlertTriangle,
  FolderLock,
  Bot,
  Stethoscope,
  Info,
  ShieldAlert,
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/find-doctors?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/find-doctors');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      {/* Emergency Banner */}
      <div className="text-center py-1.5 px-4 text-xs font-medium flex items-center justify-center gap-2"
        style={{ backgroundColor: 'var(--color-emergency-light)', color: 'var(--color-emergency)' }}>
        <span>🚨 In a medical emergency, call <strong>112</strong> or <strong>108</strong> immediately.</span>
        <Link href="/emergency" className="underline font-bold hover:opacity-80">
          Emergency Helplines & Centers →
        </Link>
      </div>

      <div className="container mx-auto px-4 lg:px-6">
        <nav className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" id="nav-logo">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Health<span style={{ color: 'var(--color-primary)' }}>Bridge</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className={`hidden md:flex items-center flex-1 max-w-md lg:max-w-lg mx-2 relative transition-all duration-200 ${searchFocused ? 'max-w-xl' : ''}`}
          >
            <div className="flex items-center w-full rounded-full border px-3.5 gap-2 transition-all duration-200"
              style={{
                borderColor: searchFocused ? 'var(--color-primary)' : 'var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                boxShadow: searchFocused ? '0 0 0 3px rgba(13, 148, 136, 0.1)' : 'none',
              }}>
              <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search doctors, specialties, clinics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2 bg-transparent border-none outline-none text-xs lg:text-sm"
                style={{ color: 'var(--text-primary)' }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                id="nav-search"
              />
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border-l"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                <MapPin className="w-3 h-3 text-teal-600" />
                <span>Mumbai</span>
              </div>
            </div>
          </form>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/find-doctors" className="btn btn-ghost text-xs font-semibold px-2.5" id="nav-find-doctors">
              Find Doctors
            </Link>
            <Link href="/ai-assistant" className="btn btn-ghost text-xs font-semibold px-2.5 flex items-center gap-1 text-teal-600 dark:text-teal-400" id="nav-ai-assistant">
              <Bot className="w-3.5 h-3.5" />
              AI Navigator
            </Link>
            <Link href="/medical-vault" className="btn btn-ghost text-xs font-semibold px-2.5" id="nav-vault">
              Medical Vault
            </Link>
            <Link href="/dashboard" className="btn btn-ghost text-xs font-semibold px-2.5" id="nav-dashboard">
              Portals
            </Link>
            <Link href="/emergency" className="btn btn-ghost text-xs font-semibold px-2 text-red-600 hover:text-red-700" id="nav-emergency">
              Emergency
            </Link>
            <Link href="/about" className="btn btn-ghost text-xs font-semibold px-2" id="nav-about">
              About
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn btn-icon btn-ghost ml-1"
              aria-label="Toggle theme"
              id="theme-toggle"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link href="/auth/login" className="btn btn-ghost text-xs font-semibold gap-1 ml-1" id="nav-signin">
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </Link>
            <Link href="/auth/login" className="btn btn-primary btn-sm text-xs" id="nav-get-started">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn btn-icon btn-ghost"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn btn-icon btn-ghost"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden animate-slide-down border-t"
          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex items-center rounded-xl border px-3 gap-2"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
              <Search className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search doctors, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2 bg-transparent border-none outline-none text-xs"
                style={{ color: 'var(--text-primary)' }}
              />
            </form>

            <div className="flex flex-col gap-1">
              <Link href="/find-doctors" className="sidebar-link" onClick={() => setMobileOpen(false)}>
                <Search className="w-4 h-4" /> Find Doctors
              </Link>
              <Link href="/ai-assistant" className="sidebar-link text-teal-600 dark:text-teal-400" onClick={() => setMobileOpen(false)}>
                <Bot className="w-4 h-4" /> AI Health Navigator
              </Link>
              <Link href="/medical-vault" className="sidebar-link" onClick={() => setMobileOpen(false)}>
                <FolderLock className="w-4 h-4" /> Medical Vault
              </Link>
              <Link href="/dashboard" className="sidebar-link" onClick={() => setMobileOpen(false)}>
                <User className="w-4 h-4" /> Portals Hub (Patient / Doctor / Admin)
              </Link>
              <Link href="/emergency" className="sidebar-link text-red-600 font-semibold" onClick={() => setMobileOpen(false)}>
                <ShieldAlert className="w-4 h-4" /> Emergency Helplines & Hospitals
              </Link>
              <Link href="/about" className="sidebar-link" onClick={() => setMobileOpen(false)}>
                <Info className="w-4 h-4" /> About HealthBridge
              </Link>

              <hr style={{ borderColor: 'var(--border-color)' }} className="my-2" />
              <Link href="/auth/login" className="sidebar-link" onClick={() => setMobileOpen(false)}>
                <LogIn className="w-4 h-4" /> Sign In / Demo Switcher
              </Link>
              <Link href="/dashboard" className="btn btn-primary w-full mt-2 justify-center" onClick={() => setMobileOpen(false)}>
                Explore Portals
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
