// HealthBridge
'use client';

// ========================================================
// HEALTHBRIDGE — AI HEALTH NAVIGATOR (2-WAY CONVERSATIONAL)
// Powered by Google Gemini 3.5 Flash Live API with
// strict clinical boundaries and resilient offline fallback
// ========================================================

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { analyzeUserInput } from '@/lib/clinicalTriage';
import {
  Send,
  RotateCcw,
  Sparkles,
  Phone,
  Shield,
  Stethoscope,
  Bot,
  ChevronRight,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'ai' | 'user' | 'system';
  content: string;
  timestamp: Date;
  urgency?: 'emergency' | 'urgent' | 'routine' | 'self-care';
  specialties?: string[];
  actions?: string[];
  recommendedDoctor?: {
    id: string;
    name: string;
    specialty: string;
    fee: number;
    rating: number;
  };
  options?: string[];
}

const initialMessages: Message[] = [
  {
    id: 'msg-0',
    type: 'system',
    content: '⚠️ Demonstration Prototype: This conversational assistant provides educational guidance and specialist navigation only. It does not provide formal diagnosis or prescriptions. In emergencies, immediately dial 112.',
    timestamp: new Date(),
  },
  {
    id: 'msg-1',
    type: 'ai',
    content: 'Hello! I\'m your **HealthBridge AI Health Navigator**.\n\nI can help you navigate symptoms, understand which medical specialist is most appropriate, schedule consultations, and locate emergency trauma care in Kanpur, Uttar Pradesh, and across India.\n\nHow can I help you today? Feel free to describe what you\'re experiencing or ask a question.',
    timestamp: new Date(),
    options: [
      'Help me, I am feeling unwell',
      'I have a headache and fever',
      'Chest tightness or heart inquiry',
      'Stomach pain and acidity',
      'How do I find a verified doctor?',
    ],
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (msg: Omit<Message, 'id' | 'timestamp'>) => {
    setMessages(prev => [...prev, { ...msg, id: Date.now().toString(), timestamp: new Date() }]);
  };

  /**
   * Dispatches user message to Gemini API route and updates chat
   */
  const handleSendText = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    // 1. Append user's message immediately
    const updatedMessages = [
      ...messages,
      { id: Date.now().toString(), type: 'user' as const, content: textToSend, timestamp: new Date() },
    ];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // 2. Query Google Gemini Server Route (/api/chat)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          userQuery: textToSend,
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      const data = await res.json();
      setIsTyping(false);

      if (data && data.reply) {
        addMessage({
          type: 'ai',
          content: data.reply,
          urgency: data.urgency,
          specialties: data.specialties,
          actions: data.actions,
          recommendedDoctor: data.recommendedDoctor,
          options: data.options,
        });
        return;
      }
    } catch (err) {
      console.warn('Google Gemini API unavailable, activating local clinical fallback:', err);
    }

    // 3. Fallback: Local rule-based clinical engine
    setIsTyping(false);
    const analysis = analyzeUserInput(textToSend);
    addMessage({
      type: 'ai',
      content: analysis.reply,
      urgency: analysis.urgency,
      specialties: analysis.specialties,
      actions: analysis.actions,
      recommendedDoctor: analysis.recommendedDoctor,
      options: analysis.options,
    });
  };

  const handleSend = () => {
    handleSendText(input);
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setInput('');
  };

  const urgencyColors: Record<string, { bg: string; text: string; border: string }> = {
    emergency: { bg: 'var(--color-emergency-light)', text: 'var(--color-emergency)', border: 'var(--color-emergency)' },
    urgent: { bg: 'var(--color-urgent-light)', text: '#92400E', border: 'var(--color-urgent)' },
    routine: { bg: 'rgba(13, 148, 136, 0.08)', text: 'var(--color-primary-800)', border: 'var(--color-primary)' },
    'self-care': { bg: 'var(--color-info-light)', text: '#1D4ED8', border: 'var(--color-info)' },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 lg:px-6 py-6">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  AI Health Navigator
                </h1>
                <span className="badge badge-primary text-[10px] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Google Gemini Live API • Health-Only Strict Mode
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Personalized clinical triage, emergency detection & specialist matchmaking
              </p>
            </div>
          </div>

          <button onClick={resetChat} className="btn btn-secondary btn-sm gap-1.5 text-xs" id="reset-chat-btn">
            <RotateCcw className="w-3.5 h-3.5" /> Reset Chat
          </button>
        </div>

        {/* Message Thread Area */}
        <div
          className="flex-1 card overflow-y-auto mb-4 p-4 lg:p-6 space-y-4"
          style={{ minHeight: '460px', maxHeight: 'calc(100vh - 300px)' }}
          id="chat-area"
        >
          {messages.map(msg => (
            <div key={msg.id} className={`animate-slide-up ${msg.type === 'user' ? 'flex justify-end' : ''}`}>
              {/* System Notice Bubble */}
              {msg.type === 'system' ? (
                <div className="p-3 rounded-xl text-xs flex items-start gap-2 border"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  <Shield className="w-4 h-4 shrink-0 text-teal-600 mt-0.5" />
                  <span>{msg.content}</span>
                </div>
              ) : msg.type === 'ai' ? (
                /* AI Message Bubble */
                <div className="max-w-[90%] md:max-w-[82%]">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center mt-0.5 text-white shadow-sm"
                      style={{ backgroundColor: 'var(--color-primary)' }}>
                      <Sparkles className="w-4 h-4" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="p-4 rounded-2xl rounded-tl-sm text-sm leading-relaxed whitespace-pre-line border shadow-xs"
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}>
                        {msg.content.split('**').map((part, i) =>
                          i % 2 === 0 ? <span key={i}>{part}</span> : <strong key={i} className="font-bold text-teal-700 dark:text-teal-400">{part}</strong>
                        )}
                      </div>

                      {/* Urgency Assessment Alert Card */}
                      {msg.urgency && (
                        <div className="p-4 rounded-xl border-l-4 space-y-3 shadow-xs"
                          style={{
                            backgroundColor: urgencyColors[msg.urgency]?.bg,
                            borderColor: urgencyColors[msg.urgency]?.border,
                          }}>
                          {msg.urgency === 'emergency' && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl text-white bg-red-600">
                              <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 animate-pulse shrink-0" />
                                <span className="font-bold text-sm">Emergency Protocol Active: Call 112 / 108</span>
                              </div>
                              <a href="tel:112" className="btn btn-sm bg-white text-red-700 font-bold px-4 hover:bg-red-50 shrink-0">
                                Call 112 Now
                              </a>
                            </div>
                          )}

                          {msg.specialties && msg.specialties.length > 0 && (
                            <div>
                              <p className="text-xs font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                Suggested Specialist Categories:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {msg.specialties.map(s => (
                                  <Link
                                    key={s}
                                    href={`/find-doctors?specialty=${encodeURIComponent(s)}`}
                                    className="badge badge-primary text-xs py-1 px-3 hover:scale-105 transition-all inline-flex items-center gap-1 font-semibold"
                                  >
                                    <Stethoscope className="w-3 h-3" />
                                    {s} Specialists →
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {msg.recommendedDoctor && (
                            <div className="p-3 rounded-xl border flex items-center justify-between gap-3"
                              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-teal-600 block">Top Matching Doctor</span>
                                <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                  {msg.recommendedDoctor.name}
                                </p>
                                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                  {msg.recommendedDoctor.specialty} • ₹{msg.recommendedDoctor.fee} • ⭐ {msg.recommendedDoctor.rating}
                                </p>
                              </div>
                              <Link
                                href={`/doctor/${msg.recommendedDoctor.id}`}
                                className="btn btn-primary btn-sm text-xs gap-1 shrink-0"
                              >
                                Book Slot <ChevronRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}

                          {msg.actions && msg.actions.length > 0 && (
                            <div>
                              <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                                Recommended Next Steps:
                              </p>
                              <ul className="space-y-1">
                                {msg.actions.map((act, i) => (
                                  <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="text-teal-600 font-bold">•</span> {act}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Interactive Prompt Suggestion Chips */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="pt-1">
                          <p className="text-[11px] font-medium mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
                            Suggested responses (or type your own below):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {msg.options.map(opt => (
                              <button
                                key={opt}
                                onClick={() => handleSendText(opt)}
                                className="btn btn-secondary btn-sm text-xs py-1.5 px-3 rounded-full hover:border-teal-500 hover:text-teal-600 transition-all text-left"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Patient / User Bubble */
                <div className="max-w-[80%] md:max-w-[70%]">
                  <div className="p-3.5 px-4 rounded-2xl rounded-tr-sm text-sm font-medium shadow-sm leading-relaxed"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] block text-right mt-1 px-1" style={{ color: 'var(--text-tertiary)' }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator Animation */}
          {isTyping && (
            <div className="flex items-center gap-2.5 animate-fade-in">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 px-4 rounded-2xl rounded-tl-sm border"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium mr-1" style={{ color: 'var(--text-secondary)' }}>
                    AI is analyzing...
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="card p-3 shadow-sm border" style={{ borderColor: 'var(--border-color)' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask any health or symptom question (e.g. 'help me', 'acidity relief', 'who treats vertigo?')..."
              className="input flex-1 text-sm py-2.5 bg-transparent border-none outline-none"
              style={{ color: 'var(--text-primary)' }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              id="symptom-input"
              autoFocus
            />

            <button
              type="submit"
              className="btn btn-primary btn-md px-5 gap-1.5 text-xs font-bold shrink-0"
              disabled={!input.trim() || isTyping}
              id="send-btn"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t px-1"
            style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
              <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Strictly restricted to health, medical symptoms & wellness. Non-health requests are automatically declined.</span>
            </div>
            <Link href="/emergency" className="text-[11px] font-bold text-red-600 hover:underline">
              🚨 Life-threatening emergency? Call 112
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
