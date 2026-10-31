// HealthBridge
'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  FileText,
  Clock,
  MapPin,
  ShieldAlert,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverNotice, setServerNotice] = useState<string | null>(null);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        if (value.trim().length > 100) return 'Name cannot exceed 100 characters.';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@example.com).';
        }
        if (value.trim().length > 100) return 'Email cannot exceed 100 characters.';
        return undefined;

      case 'subject':
        if (!value.trim()) return 'Subject is required.';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters.';
        if (value.trim().length > 150) return 'Subject cannot exceed 150 characters.';
        return undefined;

      case 'message':
        if (!value.trim()) return 'Message is required.';
        if (value.trim().length < 15) return 'Message must be at least 15 characters.';
        if (value.trim().length > 2000) return 'Message cannot exceed 2000 characters.';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({ ...prev, [name]: error, general: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasError = false;

    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasError = true;
      }
    });

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.field && data.field in formData) {
          setErrors({ [data.field]: data.error || 'Validation error' });
        } else {
          setErrors({ general: data.error || 'Failed to submit message. Please try again.' });
        }
        setIsSubmitting(false);
        return;
      }

      // Success confirmed by backend
      setIsSubmitted(true);
      if (data.notice) {
        setServerNotice(data.notice);
      }
    } catch {
      setErrors({
        general: 'Unable to connect to the server. Please check your internet connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setServerNotice(null);
  };

  return (
    <section id="contact" className="py-16 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border"
            style={{
              backgroundColor: 'rgba(13, 148, 136, 0.08)',
              borderColor: 'rgba(13, 148, 136, 0.25)',
              color: 'var(--color-primary)',
            }}>
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiries & Support</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
            Get in Touch
          </h2>
          <p className="text-sm lg:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Have questions, suggestions or feedback about HealthBridge? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Contact Information & Context */}
          <div className="lg:col-span-5 space-y-5">
            <div className="card p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Sparkles className="w-5 h-5 text-teal-600" />
                <span>Academic & Project Communication</span>
              </h3>
              <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                HealthBridge is actively developed as a collaborative healthcare informatics platform. We welcome feedback from healthcare educators, developers, clinicians, and student evaluators.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--color-primary)' }}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block" style={{ color: 'var(--text-primary)' }}>Location</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Kanpur, Uttar Pradesh, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--color-primary)' }}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block" style={{ color: 'var(--text-primary)' }}>Response Time</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Usually within 24–48 hours for academic queries</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--color-primary)' }}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block" style={{ color: 'var(--text-primary)' }}>Official Repository</span>
                    <a
                      href="https://github.com/arpitmishra6567/HealthBridge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-teal-600 font-medium"
                    >
                      github.com/arpitmishra6567/HealthBridge
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Caution Banner */}
            <div className="p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed"
              style={{
                backgroundColor: 'var(--color-emergency-light)',
                borderColor: 'rgba(220, 38, 38, 0.2)',
                color: '#991B1B',
              }}>
              <ShieldAlert className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Not for Medical Emergencies</strong>
                If you or someone around you requires urgent medical care, please dial <strong>112</strong> or <strong>108</strong> immediately. This contact form is not monitored for clinical emergencies.
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8 border shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              {isSubmitted ? (
                /* Success State */
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 bg-teal-50 dark:bg-teal-950/60 text-teal-600 border border-teal-200 dark:border-teal-800">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm font-medium text-teal-700 dark:text-teal-300 max-w-md mx-auto mb-4 leading-relaxed">
                    Thank you for contacting HealthBridge! Your message has been submitted successfully.
                  </p>
                  <p className="text-xs max-w-md mx-auto mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Our project team has recorded your details and will review your message promptly.
                  </p>

                  {serverNotice && (
                    <div className="mb-6 p-3 rounded-lg border text-left text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                      <span className="font-semibold block mb-0.5">ℹ️ System Verification:</span>
                      {serverNotice}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary btn-sm text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* The Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {errors.general && (
                    <div className="p-3 rounded-lg border text-xs flex items-center gap-2 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900 animate-fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.general}</span>
                    </div>
                  )}

                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: 'var(--text-tertiary)' }}>
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Dr. Rajesh Sharma or Priya Gupta"
                        maxLength={100}
                        disabled={isSubmitting}
                        className={`input pl-9 text-xs sm:text-sm ${errors.name && touched.name ? 'border-red-500 focus:border-red-500' : ''}`}
                        aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                        aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                      />
                    </div>
                    {errors.name && touched.name && (
                      <p id="name-error" className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Address Field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: 'var(--text-tertiary)' }}>
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="name@example.com"
                        maxLength={100}
                        disabled={isSubmitting}
                        className={`input pl-9 text-xs sm:text-sm ${errors.email && touched.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                        aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p id="email-error" className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: 'var(--text-tertiary)' }}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Project Inquiry / Feature Feedback / Collaboration"
                        maxLength={150}
                        disabled={isSubmitting}
                        className={`input pl-9 text-xs sm:text-sm ${errors.subject && touched.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                        aria-invalid={errors.subject && touched.subject ? 'true' : 'false'}
                        aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
                      />
                    </div>
                    {errors.subject && touched.subject && (
                      <p id="subject-error" className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-message" className="block text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Message <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                        {formData.message.length}/2000
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Please share your thoughts, questions, or evaluation feedback in detail (at least 15 characters)..."
                        maxLength={2000}
                        disabled={isSubmitting}
                        className={`input text-xs sm:text-sm leading-relaxed ${errors.message && touched.message ? 'border-red-500 focus:border-red-500' : ''}`}
                        aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                        aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                      />
                    </div>
                    {errors.message && touched.message && (
                      <p id="message-error" className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full text-xs sm:text-sm font-semibold py-2.5 flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center mt-2.5" style={{ color: 'var(--text-tertiary)' }}>
                      We respect your privacy. Inquiries are used exclusively to address your communication.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

