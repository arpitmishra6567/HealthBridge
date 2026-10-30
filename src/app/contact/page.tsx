'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="mb-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to About HealthBridge</span>
            </Link>
          </div>

          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

