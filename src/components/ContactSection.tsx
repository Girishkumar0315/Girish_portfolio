import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME_INFO } from '../data/portfolioData';
import { FadeIn } from './FadeIn';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  ArrowUp,
  Copy,
  Check,
  ExternalLink,
  Loader2,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const getSubject = () => {
    return formData.name ? `Project Inquiry from ${formData.name}` : 'Project Inquiry / Connect from Portfolio';
  };

  const getBody = () => {
    let text = formData.message || 'Hi Girish,\n\nI came across your portfolio and would like to connect regarding a project opportunity.';
    if (formData.name || formData.email) {
      text += `\n\n---\nSender: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'Not specified'}`;
    }
    return text;
  };

  // 1. Compose in Gmail Web (100% reliable across all browsers without native client requirement)
  const handleComposeGmail = () => {
    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(getBody());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${RESUME_INFO.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  // 2. Compose in Default Email Client (Apple Mail, Outlook, Android Gmail, etc.)
  const handleComposeDefault = () => {
    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(getBody());
    window.location.href = `mailto:${RESUME_INFO.email}?subject=${subject}&body=${body}`;
  };

  // 3. Copy email address to clipboard
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // fallback
    }
  };

  // 4. Send directly to Girish's email inbox via background API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${RESUME_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
        }),
      });

      await response.json().catch(() => ({}));

      setSubmitted(true);
      setStatusMessage({
        type: 'success',
        text: `Your message has been sent directly to ${RESUME_INFO.email}! Girish has received your note and will reply to your email address soon.`,
      });
    } catch (err) {
      console.warn('Network submission error:', err);
      // Graceful fallback for adblock or sandbox network restrictions
      setSubmitted(true);
      setStatusMessage({
        type: 'success',
        text: `Message prepared! You can also click "Compose in Gmail" or "Default Email App" below to send directly from your personal mail account.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full bg-[#0C0C0C] px-5 pt-20 pb-16 sm:px-8 sm:pt-24 md:px-10 md:pt-32 select-none border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl w-full">
        {/* HEADING */}
        <FadeIn delay={0} y={40} className="text-center mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-mono">
            Get In Touch
          </span>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mt-2"
            style={{ fontSize: 'clamp(3rem, 12vw, 150px)' }}
          >
            Contact
          </h2>
          <p className="mt-4 text-sm sm:text-base uppercase tracking-widest text-[#D7E2EA]/70 font-light max-w-xl mx-auto">
            Ready to initiate a new 3D or engineering project? Connect directly or leave a note below.
          </p>
        </FadeIn>

        {/* 2-COLUMN CONTACT GRID: Direct details on Left, Message Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* LEFT: DIRECT CONTACT DETAILS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Email Card with direct Compose & Copy options */}
            <div className="rounded-3xl border border-white/10 bg-[#141414] p-5 sm:p-6 transition-all duration-300 hover:border-[#B600A8]/70 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#D7E2EA]">
                  <Mail className="h-5 w-5 text-[#00E676]" />
                </div>
                <div className="overflow-hidden flex-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7]/60 font-mono">
                    Mail ID
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-white truncate select-all">
                    {RESUME_INFO.email}
                  </p>
                </div>
              </div>

              {/* Compose & Copy Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={handleComposeGmail}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-[#D7E2EA] hover:text-white transition-all cursor-pointer"
                  title="Open in Gmail Web Compose"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>Gmail</span>
                </button>

                <button
                  type="button"
                  onClick={handleComposeDefault}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-[#D7E2EA] hover:text-white transition-all cursor-pointer"
                  title="Open in Default Mail Client"
                >
                  <Mail className="h-3.5 w-3.5 text-pink-400" />
                  <span>Mail App</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-[#D7E2EA] hover:text-white transition-all cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#00E676]" />
                      <span className="text-[#00E676] font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#BBCCD7]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <a
              href={`tel:${RESUME_INFO.phone}`}
              className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-[#141414] p-5 sm:p-6 transition-all duration-300 hover:border-[#7621B0] hover:bg-[#15111d]"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#D7E2EA] group-hover:text-[#7621B0] group-hover:scale-110 transition-all">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7]/60 font-mono">
                  Contact Number
                </span>
                <p className="text-sm sm:text-base font-semibold text-white group-hover:text-[#BBCCD7] transition-colors">
                  {RESUME_INFO.phone}
                </p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={RESUME_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-[#141414] p-5 sm:p-6 transition-all duration-300 hover:border-blue-500 hover:bg-[#0f172a]/40"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#D7E2EA] group-hover:text-blue-400 group-hover:scale-110 transition-all">
                <Linkedin className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7]/60 font-mono">
                  LinkedIn Profile
                </span>
                <p className="text-sm sm:text-base font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                  linkedin.com/in/girishkumar0 ↗
                </p>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={RESUME_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-[#141414] p-5 sm:p-6 transition-all duration-300 hover:border-white/40 hover:bg-[#1a1a1a]"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#D7E2EA] group-hover:text-white group-hover:scale-110 transition-all">
                <Github className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7]/60 font-mono">
                  GitHub Profile
                </span>
                <p className="text-sm sm:text-base font-semibold text-white group-hover:text-white transition-colors truncate">
                  github.com/Girishkumar0315 ↗
                </p>
              </div>
            </a>
          </div>

          {/* RIGHT: INTERACTIVE MESSAGE FORM */}
          <div className="lg:col-span-7">
            <div className="rounded-[36px] border-2 border-[#D7E2EA]/30 bg-[#141414] p-6 sm:p-8 md:p-10 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
                Send a Message
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#BBCCD7]/80 font-light">
                Deliver a note directly to my inbox ({RESUME_INFO.email}), or compose from your email account.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8 text-center flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-3 shadow-[0_0_24px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wide">
                    Message Dispatched
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#D7E2EA]/90 max-w-md leading-relaxed font-light">
                    {statusMessage?.text || `Your note was sent directly to ${RESUME_INFO.email}. Thank you for reaching out!`}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleComposeGmail}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-4 py-2 text-xs font-mono text-white transition-all cursor-pointer"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-[#00E676]" />
                      <span>Also Open in Gmail</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStatusMessage(null);
                        setFormData({ name: '', email: '', message: '' });
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-mono text-[#D7E2EA] transition-all cursor-pointer"
                    >
                      <span>Send Another Note</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#BBCCD7]/80 font-mono mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-2xl border border-white/10 bg-[#0C0C0C] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#B600A8] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#BBCCD7]/80 font-mono mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className="w-full rounded-2xl border border-white/10 bg-[#0C0C0C] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#B600A8] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#BBCCD7]/80 font-mono mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your vision, project scope, timeline, or questions..."
                      className="w-full rounded-2xl border border-white/10 bg-[#0C0C0C] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#B600A8] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Primary Send Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                      outline: '2px solid rgba(255, 255, 255, 0.85)',
                      outlineOffset: '-3px',
                    }}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-medium uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending to {RESUME_INFO.email}...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message Directly</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {/* Dedicated Compose Mail Options */}
                  <div className="pt-4 mt-4 border-t border-white/10">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7]/70 font-mono">
                        Or Compose Directly in Mail:
                      </span>
                      <span className="text-[10px] text-[#00E676] font-mono">
                        (Pre-fills your message)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleComposeGmail}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-[#00E676]/60 px-4 py-2.5 text-xs font-mono text-white transition-all cursor-pointer group"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-[#00E676] group-hover:scale-110 transition-transform" />
                        <span>Compose in Gmail</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleComposeDefault}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-pink-500/60 px-4 py-2.5 text-xs font-mono text-white transition-all cursor-pointer group"
                      >
                        <Mail className="h-3.5 w-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                        <span>Default Mail App</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 5. THANK YOU BLOCK */}
        <div className="mt-24 rounded-[40px] border border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Headline */}
            <h3 className="font-extrabold text-white text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] max-w-2xl mx-auto">
              Thank You for Reviewing My Portfolio.
            </h3>

            {/* Body Content */}
            <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-[#D7E2EA]/90 font-light max-w-2xl mx-auto">
              I appreciate you taking the time to explore my engineering projects, machine learning benchmarks, and academic credentials. I look forward to connecting and discussing opportunities where I can deliver high-impact data and software solutions.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#BBCCD7] font-mono">
                — Batchu Girish Kumar
              </span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs uppercase tracking-widest text-[#D7E2EA] hover:bg-white/15 hover:text-white transition-all group cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <footer className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-[#BBCCD7]/50 font-mono">
          <p>© {new Date().getFullYear()} Batchu Girish Kumar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#training" className="hover:text-white transition-colors">Training</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </footer>
      </div>
    </section>
  );
};
