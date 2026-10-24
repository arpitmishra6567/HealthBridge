'use client';

// ================================================================
// HEALTHBRIDGE — AI SYMPTOM CHECKER
// Patients enter symptoms → AI analyzes → asks follow-up questions
// → shows specialist matches with ratings & fees
// ================================================================

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { analyzeSymptoms, searchBySymptom } from '@/lib/symptomAnalyzer';
import type { AnalysisResult, FollowUpQuestion, DoctorRecommendation } from '@/lib/symptomAnalyzer';
import { doctors } from '@/lib/mockData';
import {
  Search,
  Sparkles,
  Brain,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  BadgeCheck,
  ChevronRight,
  Shield,
  AlertTriangle,
  Phone,
  User,
  CheckCircle2,
  Activity,
  Stethoscope,
  X,
  RotateCcw,
  TrendingUp,
  MessageCircleQuestion,
  FileSearch,
  IndianRupee,
  Bot,
  Loader2,
  Heart,
  HelpCircle,
} from 'lucide-react';

// ── Conversation step types ──
type Step =
  | { type: 'input' }
  | { type: 'analyzing' }
  | { type: 'results'; data: AnalysisResult }
  | { type: 'followup'; questions: FollowUpQuestion[]; answers: Record<string, string>; originalSymptoms: string }
  | { type: 'refined'; data: AnalysisResult; previousData: AnalysisResult };

// ── Quick symptom suggestions ──
const QUICK_SYMPTOMS = [
  { label: 'Headache & Dizziness', icon: '🤕', symptoms: 'persistent headache with dizziness' },
  { label: 'Chest Tightness', icon: '💓', symptoms: 'chest tightness and palpitations' },
  { label: 'Stomach Pain', icon: '🫃', symptoms: 'stomach pain with acidity and bloating' },
  { label: 'Skin Rash', icon: '🧴', symptoms: 'itchy red rash on skin' },
  { label: 'Back & Joint Pain', icon: '🦴', symptoms: 'lower back pain and knee stiffness' },
  { label: 'Fever & Body Ache', icon: '🤒', symptoms: 'fever with body ache and cold' },
  { label: 'Anxiety & Stress', icon: '🧘', symptoms: 'anxiety and trouble sleeping' },
  { label: 'Child Fever', icon: '👶', symptoms: 'my child has high fever and cough' },
];

export default function SymptomCheckerPage() {
  const [symptomInput, setSymptomInput] = useState('');
  const [step, setStep] = useState<Step>({ type: 'input' });
  const [searchSuggestions, setSearchSuggestions] = useState<{ specialty: string; icon: string; confidence: number }[]>([]);
  const [conversationHistory, setConversationHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Live search suggestions as user types ──
  useEffect(() => {
    if (symptomInput.trim().length >= 2 && step.type === 'input') {
      const results = searchBySymptom(symptomInput);
      setSearchSuggestions(results.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [symptomInput, step.type]);

  // ── Scroll to results when available ──
  useEffect(() => {
    if (step.type === 'results' || step.type === 'followup' || step.type === 'refined') {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [step.type]);

  // ── Analyze symptoms ──
  const handleAnalyze = useCallback(async (text?: string) => {
    const symptoms = text || symptomInput;
    if (!symptoms.trim()) return;

    setSearchSuggestions([]);
    setConversationHistory(prev => [...prev, { role: 'user', text: symptoms }]);
    setStep({ type: 'analyzing' });

    // Simulate AI processing time for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const result = analyzeSymptoms(symptoms);

    // If there are follow-up questions, show them first
    if (result.followUpQuestions.length > 0 && result.urgency !== 'emergency') {
      setConversationHistory(prev => [...prev, {
        role: 'ai',
        text: `I've identified potential matches. To refine my analysis, I have a few follow-up questions for you.`,
      }]);
      setStep({
        type: 'followup',
        questions: result.followUpQuestions,
        answers: {},
        originalSymptoms: symptoms,
      });
    } else {
      setConversationHistory(prev => [...prev, {
        role: 'ai',
        text: result.summary,
      }]);
      setStep({ type: 'results', data: result });
    }
  }, [symptomInput]);

  // ── Handle follow-up answer ──
  const handleFollowUpAnswer = (questionId: string, answer: string) => {
    if (step.type !== 'followup') return;
    const newAnswers = { ...step.answers, [questionId]: answer };
    setStep({ ...step, answers: newAnswers });
  };

  // ── Submit follow-up answers for refined analysis ──
  const handleSubmitFollowUps = async () => {
    if (step.type !== 'followup') return;

    const answersText = Object.values(step.answers).join(', ');
    const combinedText = `${step.originalSymptoms}. Additional details: ${answersText}`;

    setConversationHistory(prev => [
      ...prev,
      { role: 'user', text: `Follow-up answers: ${answersText}` },
    ]);

    setStep({ type: 'analyzing' });
    await new Promise(resolve => setTimeout(resolve, 1200));

    const initialResult = analyzeSymptoms(step.originalSymptoms);
    const refinedResult = analyzeSymptoms(combinedText);

    // Boost confidence for refined results
    refinedResult.specialtyMatches = refinedResult.specialtyMatches.map(m => ({
      ...m,
      confidence: Math.min(98, m.confidence + 8),
    }));

    setConversationHistory(prev => [...prev, {
      role: 'ai',
      text: `Based on your additional details, I've refined the analysis. ${refinedResult.summary}`,
    }]);

    setStep({ type: 'refined', data: refinedResult, previousData: initialResult });
  };

  // ── Skip follow-ups ──
  const handleSkipFollowUps = () => {
    if (step.type !== 'followup') return;
    const result = analyzeSymptoms(step.originalSymptoms);
    setConversationHistory(prev => [...prev, {
      role: 'ai',
      text: result.summary,
    }]);
    setStep({ type: 'results', data: result });
  };

  // ── Reset ──
  const handleReset = () => {
    setSymptomInput('');
    setStep({ type: 'input' });
    setSearchSuggestions([]);
    setConversationHistory([]);
    inputRef.current?.focus();
  };

  // ── Get active results ──
  const activeResult: AnalysisResult | null =
    step.type === 'results' ? step.data :
    step.type === 'refined' ? step.data :
    null;

  // ── Urgency styling ──
  const urgencyConfig = {
    emergency: { bg: '#FEE2E2', border: '#DC2626', text: '#991B1B', label: '🚨 Emergency', badge: 'badge-danger' },
    urgent: { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E', label: '⚠️ Urgent', badge: 'badge-warning' },
    routine: { bg: 'rgba(13,148,136,0.08)', border: 'var(--color-primary)', text: 'var(--color-primary-800)', label: '✅ Routine', badge: 'badge-primary' },
    'self-care': { bg: '#DBEAFE', border: '#2563EB', text: '#1D4ED8', label: '💊 Self-Care', badge: 'badge-info' },
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO — Symptom Input Area
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 20% 0%, rgba(13,148,136,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(99,102,241,0.12) 0%, transparent 50%)',
          }}
        />

        <div className="container mx-auto px-4 lg:px-6 py-10 lg:py-16 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
              <Brain className="w-3.5 h-3.5" />
              AI-Powered Symptom Analysis
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3"
              style={{ color: 'var(--text-primary)' }}>
              Describe Your Symptoms,{' '}
              <span style={{ color: 'var(--color-primary)' }}>Find the Right Specialist</span>
            </h1>

            <p className="text-sm md:text-base mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Enter your symptoms in plain language. Our AI analyzes them, asks clarifying questions, and recommends the best-matched specialists with ratings and consultation fees.
            </p>

            {/* ─── Main Symptom Input ─── */}
            <div className="card p-3 max-w-2xl mx-auto animate-slide-up stagger-2 relative" id="symptom-search-card">
              <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }} className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center flex-1 gap-2 px-4 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="e.g. headache with dizziness, stomach pain, skin rash..."
                    className="flex-1 py-3.5 bg-transparent border-none outline-none text-sm"
                    style={{ color: 'var(--text-primary)' }}
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    disabled={step.type === 'analyzing'}
                    id="symptom-input"
                    autoFocus
                  />
                  {symptomInput && (
                    <button type="button" onClick={() => setSymptomInput('')} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <X className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-8 gap-2"
                  disabled={!symptomInput.trim() || step.type === 'analyzing'}
                  id="analyze-btn"
                >
                  {step.type === 'analyzing' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Analyze
                    </>
                  )}
                </button>
              </form>

              {/* ─── Live Search Suggestions ─── */}
              {searchSuggestions.length > 0 && (
                <div className="absolute left-3 right-3 top-full mt-1 card p-2 shadow-lg z-20 animate-slide-down" id="search-suggestions">
                  <p className="text-[10px] font-bold uppercase px-2 py-1" style={{ color: 'var(--text-tertiary)' }}>
                    Possible Specialties
                  </p>
                  {searchSuggestions.map(s => (
                    <button key={s.specialty}
                      onClick={() => {
                        setSymptomInput(symptomInput);
                        handleAnalyze(symptomInput);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-lg">{s.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{s.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                          <div className="h-full rounded-full" style={{
                            width: `${s.confidence}%`,
                            backgroundColor: s.confidence >= 80 ? 'var(--color-primary)' : s.confidence >= 60 ? 'var(--color-urgent)' : 'var(--text-tertiary)',
                          }} />
                        </div>
                        <span className="text-[10px] font-bold" style={{ color: 'var(--text-tertiary)' }}>
                          {s.confidence}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ─── Quick Symptom Chips ─── */}
            {step.type === 'input' && (
              <div className="mt-6 animate-slide-up stagger-3">
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  Or select a common symptom:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {QUICK_SYMPTOMS.map(qs => (
                    <button
                      key={qs.label}
                      onClick={() => {
                        setSymptomInput(qs.symptoms);
                        handleAnalyze(qs.symptoms);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all hover:scale-105 hover:shadow-md"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-color)',
                      }}
                      id={`quick-symptom-${qs.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span>{qs.icon}</span>
                      {qs.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Reset button when not in input state ─── */}
            {step.type !== 'input' && step.type !== 'analyzing' && (
              <div className="mt-4">
                <button onClick={handleReset} className="btn btn-secondary btn-sm gap-1.5 text-xs">
                  <RotateCcw className="w-3.5 h-3.5" /> New Analysis
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ANALYZING STATE — Animated Processing
          ═══════════════════════════════════════════ */}
      {step.type === 'analyzing' && (
        <section className="py-16" ref={resultsRef}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-lg mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse-soft"
                style={{ backgroundColor: 'var(--color-primary-100)' }}>
                <Brain className="w-10 h-10 animate-spin" style={{ color: 'var(--color-primary)', animationDuration: '3s' }} />
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                AI is Analyzing Your Symptoms
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                Cross-referencing symptom patterns with medical specialties...
              </p>
              <div className="flex justify-center gap-3">
                {['Parsing symptoms...', 'Matching specialties...', 'Finding doctors...'].map((label, i) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs font-medium animate-fade-in"
                    style={{ color: 'var(--color-primary)', animationDelay: `${i * 0.5}s` }}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          FOLLOW-UP QUESTIONS — AI asks for details
          ═══════════════════════════════════════════ */}
      {step.type === 'followup' && (
        <section className="py-10" ref={resultsRef}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 animate-slide-up">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                  <MessageCircleQuestion className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Help Me Understand Better
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Answer these questions for a more accurate specialist recommendation
                  </p>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {step.questions.map((q, qi) => (
                  <div key={q.id} className={`card p-5 animate-slide-up stagger-${Math.min(qi + 1, 6)}`}
                    style={{
                      borderColor: step.answers[q.id] ? 'var(--color-primary-200)' : 'var(--border-color)',
                      boxShadow: step.answers[q.id] ? '0 0 0 2px rgba(13,148,136,0.08)' : undefined,
                    }}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          backgroundColor: step.answers[q.id] ? 'var(--color-primary)' : 'var(--bg-secondary)',
                          color: step.answers[q.id] ? 'white' : 'var(--text-secondary)',
                        }}>
                        {step.answers[q.id] ? <CheckCircle2 className="w-4 h-4" /> : qi + 1}
                      </div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-10">
                      {q.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleFollowUpAnswer(q.id, opt)}
                          className="px-3.5 py-2 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
                          style={{
                            backgroundColor: step.answers[q.id] === opt ? 'var(--color-primary)' : 'var(--bg-secondary)',
                            color: step.answers[q.id] === opt ? 'white' : 'var(--text-secondary)',
                            border: `1.5px solid ${step.answers[q.id] === opt ? 'var(--color-primary)' : 'var(--border-color)'}`,
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t animate-slide-up"
                style={{ borderColor: 'var(--border-color)' }}>
                <button onClick={handleSkipFollowUps} className="btn btn-ghost btn-sm text-xs gap-1.5"
                  style={{ color: 'var(--text-tertiary)' }}>
                  Skip & Show Results →
                </button>
                <button
                  onClick={handleSubmitFollowUps}
                  className="btn btn-primary btn-md gap-2"
                  disabled={Object.keys(step.answers).length === 0}
                  id="submit-followups-btn"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Refined Analysis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          RESULTS — Specialty Matches + Doctor Cards
          ═══════════════════════════════════════════ */}
      {activeResult && (
        <section className="py-10" ref={resultsRef}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-5xl mx-auto">

              {/* ── Safety Alert (Emergency/Urgent) ── */}
              {activeResult.safetyNote && (
                <div className="p-4 rounded-xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-slide-up"
                  style={{
                    backgroundColor: urgencyConfig[activeResult.urgency].bg,
                    border: `2px solid ${urgencyConfig[activeResult.urgency].border}`,
                  }}>
                  <div className="flex items-center gap-2">
                    {activeResult.urgency === 'emergency' ? (
                      <Phone className="w-5 h-5 animate-pulse shrink-0" style={{ color: urgencyConfig[activeResult.urgency].border }} />
                    ) : (
                      <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: urgencyConfig[activeResult.urgency].border }} />
                    )}
                    <p className="text-sm font-semibold" style={{ color: urgencyConfig[activeResult.urgency].text }}>
                      {activeResult.safetyNote}
                    </p>
                  </div>
                  {activeResult.urgency === 'emergency' && (
                    <a href="tel:112" className="btn btn-danger btn-sm shrink-0 gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Call 112 Now
                    </a>
                  )}
                </div>
              )}

              {/* ── Urgency Badge + Summary ── */}
              <div className="flex items-start gap-4 mb-8 animate-slide-up stagger-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0"
                  style={{ backgroundColor: 'var(--color-primary-100)' }}>
                  <FileSearch className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      Analysis Results
                    </h2>
                    <span className={`badge ${urgencyConfig[activeResult.urgency].badge} text-[10px] font-bold`}>
                      {urgencyConfig[activeResult.urgency].label}
                    </span>
                    {step.type === 'refined' && (
                      <span className="badge badge-primary text-[10px] font-bold gap-1">
                        <TrendingUp className="w-3 h-3" /> Refined
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {activeResult.summary.split('**').map((part, i) =>
                      i % 2 === 0 ? <span key={i}>{part}</span> : <strong key={i} className="font-bold" style={{ color: 'var(--color-primary)' }}>{part}</strong>
                    )}
                  </p>
                </div>
              </div>

              {/* ── Specialty Matches Grid ── */}
              <div className="mb-10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Stethoscope className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  Matched Specialties
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeResult.specialtyMatches.map((match, i) => (
                    <div key={match.specialty}
                      className={`card p-4 animate-slide-up stagger-${Math.min(i + 1, 6)} hover:shadow-lg transition-all`}
                      style={{
                        borderColor: i === 0 ? 'var(--color-primary-200)' : 'var(--border-color)',
                        boxShadow: i === 0 ? '0 0 0 2px rgba(13,148,136,0.06)' : undefined,
                      }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{match.icon}</span>
                          <div>
                            <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{match.specialty}</h4>
                            <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{match.description}</p>
                          </div>
                        </div>
                        {i === 0 && (
                          <span className="badge badge-primary text-[9px] font-bold">Best Match</span>
                        )}
                      </div>

                      {/* Confidence Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                          <span style={{ color: 'var(--text-tertiary)' }}>Confidence</span>
                          <span style={{
                            color: match.confidence >= 80 ? 'var(--color-primary)' : match.confidence >= 60 ? '#D97706' : 'var(--text-tertiary)',
                          }}>
                            {match.confidence}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${match.confidence}%`,
                              background: match.confidence >= 80
                                ? 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))'
                                : match.confidence >= 60
                                ? 'linear-gradient(90deg, #D97706, #F59E0B)'
                                : 'var(--text-tertiary)',
                            }}
                          />
                        </div>
                      </div>

                      {/* Matched Keywords */}
                      {match.matchedKeywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {match.matchedKeywords.map(kw => (
                            <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link href={`/find-doctors?specialty=${encodeURIComponent(match.specialty)}`}
                        className="btn btn-secondary btn-sm w-full text-xs mt-auto gap-1">
                        View {match.specialty} Doctors <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Recommended Doctors with Ratings & Fees ── */}
              {activeResult.doctorRecommendations.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Heart className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    Recommended Specialists
                  </h3>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Sorted by match score, ratings, and availability (demonstration data)
                  </p>

                  <div className="space-y-3">
                    {activeResult.doctorRecommendations.map((doc, i) => (
                      <DoctorResultCard key={doc.id} doctor={doc} rank={i + 1} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Disclaimer ── */}
              <div className="card p-4 flex items-start gap-3 animate-slide-up"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    Important Disclaimer
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    This AI symptom checker is a demonstration prototype for educational and navigation purposes only.
                    It does not provide medical diagnosis, prescriptions, or replace professional medical advice.
                    Always consult a qualified healthcare professional. In emergencies, call 112 immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          HOW IT WORKS (shown only on initial state)
          ═══════════════════════════════════════════ */}
      {step.type === 'input' && (
        <section className="section pt-8" id="how-symptom-checker-works">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                How the AI Symptom Checker Works
              </h2>
              <p className="text-sm mt-1 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
                From symptoms to the right specialist in 3 smart steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  step: '01',
                  icon: Search,
                  title: 'Describe Your Symptoms',
                  desc: 'Enter what you\'re feeling in plain language — headache, stomach pain, skin rash, etc.',
                  color: 'var(--color-primary)',
                },
                {
                  step: '02',
                  icon: MessageCircleQuestion,
                  title: 'Answer Follow-Up Questions',
                  desc: 'The AI asks targeted questions about duration, severity, and triggers to narrow down the diagnosis.',
                  color: '#6366F1',
                },
                {
                  step: '03',
                  icon: Stethoscope,
                  title: 'Get Specialist Recommendations',
                  desc: 'See matched specialties with confidence scores, top-rated doctors, fees, and booking options.',
                  color: '#EC4899',
                },
              ].map((item, i) => (
                <div key={item.step} className={`text-center animate-slide-up stagger-${i + 1}`}>
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}10` }}>
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <div className="text-xs font-bold mb-1" style={{ color: item.color }}>{item.step}</div>
                  <h3 className="font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  {i < 2 && (
                    <ArrowRight className="w-5 h-5 mx-auto mt-4 hidden md:block" style={{ color: 'var(--border-color)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

// ────────────────────────────────────────────────────────
// DOCTOR RESULT CARD — Shows rating, fee, match score
// ────────────────────────────────────────────────────────

function DoctorResultCard({ doctor, rank }: { doctor: DoctorRecommendation; rank: number }) {
  const initials = doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');

  return (
    <div className={`card card-hover p-5 animate-slide-up stagger-${Math.min(rank, 6)}`}
      id={`result-doctor-${doctor.id}`}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Avatar + Match Score */}
        <div className="flex items-start gap-4 flex-1">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-base font-bold"
              style={{
                backgroundColor: rank === 1 ? 'var(--color-primary-100)' : '#EFF6FF',
                color: rank === 1 ? 'var(--color-primary)' : '#3B82F6',
              }}>
              {initials}
            </div>
            {/* Match score badge */}
            <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shadow-md"
              style={{
                background: doctor.matchScore >= 85
                  ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
                  : doctor.matchScore >= 65
                  ? 'linear-gradient(135deg, #D97706, #F59E0B)'
                  : '#94A3B8',
              }}>
              {doctor.matchScore}%
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {doctor.name}
              </h4>
              {doctor.verified && (
                <BadgeCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
              )}
            </div>
            <p className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
              {doctor.specialty}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              {doctor.qualifications}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-3 mt-2.5">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{doctor.rating}</span>
                <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>({doctor.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <MapPin className="w-3 h-3" />
                {doctor.distance} km · {doctor.area}
              </div>
              <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <User className="w-3 h-3" />
                {doctor.experience} yrs exp
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {doctor.verified && (
                <span className="badge badge-success text-[10px]">✓ Verified</span>
              )}
              {doctor.availableToday && (
                <span className="badge badge-primary text-[10px]">🟢 Available Today</span>
              )}
              {rank === 1 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', color: '#92400E' }}>
                  ⭐ Best Match
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Fee + Actions */}
        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 md:gap-2 md:min-w-[140px] pt-3 md:pt-0 border-t md:border-t-0 md:border-l md:pl-5"
          style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <IndianRupee className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
              <span className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{doctor.fee}</span>
            </div>
            <p className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>consultation fee</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: doctor.availableToday ? 'var(--color-success)' : 'var(--text-tertiary)' }}>
            <Clock className="w-3 h-3" />
            <span className="font-medium">
              {doctor.availableToday ? 'Available Today' : doctor.nextAvailable}
            </span>
          </div>
          <div className="flex gap-2">
            <Link href={`/doctor/${doctor.id}`} className="btn btn-secondary btn-sm text-[11px]">
              Profile
            </Link>
            <Link href={`/doctor/${doctor.id}?book=true`} className="btn btn-primary btn-sm text-[11px] gap-1">
              Book <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
