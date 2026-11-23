import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, Send } from 'lucide-react';
import { RING_EDITIONS } from '../data/rings';
import EmergeFromRing from './animation/EmergeFromRing';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ringStyle: 'sovereign',
    size: 'US 10',
    engraving: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: 'Complimentary Inner-Band Laser Engraving',
      a: 'We use high-precision fiber laser systems to engrave up to 28 characters—dates, coordinates, ciphers, initials, or runes—on the polished interior comfort bore of your ring at no additional cost.'
    },
    {
      q: 'Ring Sizing & Lifetime Exchange',
      a: 'Because tungsten carbide is diamond-hard (Mohs 9.0), it cannot be traditionally cut or stretched. If your finger size changes over the years, our Lifetime Exchange program allows you to return your piece for a brand new ring in your updated size for a nominal processing fee.'
    },
    {
      q: 'Shipping & Insurance',
      a: 'Every piece is packaged in a sealed vault presentation box and dispatched via fully insured express courier (DHL Express / FedEx Priority) with adult signature required upon delivery. Domestic delivery takes 1–2 business days; international delivery takes 3–5 business days.'
    },
    {
      q: 'Lifetime Guarantee',
      a: 'Every KRYPTOS ring is backed by an unconditional lifetime guarantee against structural failure, fracturing, or inlay delamination during normal wear. Should your ring ever suffer accidental damage, we will repair or replace it.'
    },
    {
      q: 'Custom Order Timeline',
      a: 'Custom commissions involving tailored gemstone cuts, bespoke alloy finishes, or custom ciphers require 2 to 3 weeks for precision drafting, sintering, and final hand-finishing before delivery.'
    }
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-transparent">
      {/* 1. Header */}
      <EmergeFromRing originX={-320} originY={25} rotation={-2}>
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.08] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-porcelain-muted">
              Inquiries & Commissions
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-porcelain leading-[1.05]">
            Bespoke Commission & Concierge
          </h2>

          <p className="mt-4 text-sm sm:text-base font-light text-porcelain-muted max-w-xl leading-relaxed">
            Direct communication with our artisans. Commission custom ciphers, request sizing assistance, or consult on a bespoke commission.
          </p>
        </div>
      </EmergeFromRing>

      {/* 2. Two-Column Layout: Clean Form + Open Editorial Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left Column: Inquiry Form */}
        <EmergeFromRing originX={-280} originY={35} rotation={-1.5}>
          <div className="rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-porcelain mb-1">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-porcelain-muted max-w-xs mx-auto leading-relaxed">
                    An artisan concierge will review your commission notes and respond within one business day.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-mono text-porcelain underline hover:text-white transition-colors cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Elena Rostova"
                    className="w-full rounded-xl px-4 py-2.5 bg-black/40 border border-white/[0.08] text-porcelain text-xs focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@domain.com"
                    className="w-full rounded-xl px-4 py-2.5 bg-black/40 border border-white/[0.08] text-porcelain text-xs focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                      Ring Edition
                    </label>
                    <select
                      value={formData.ringStyle}
                      onChange={(e) => setFormData({ ...formData, ringStyle: e.target.value })}
                      className="w-full rounded-xl px-3 py-2.5 bg-black/40 border border-white/[0.08] text-porcelain text-xs focus:outline-none focus:border-white/30 transition-colors"
                    >
                      {RING_EDITIONS.map((r) => (
                        <option key={r.id} value={r.id} className="bg-[#090A0E] text-white">
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                      Estimated Size
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full rounded-xl px-3 py-2.5 bg-black/40 border border-white/[0.08] text-porcelain text-xs focus:outline-none focus:border-white/30 transition-colors"
                    >
                      {['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'].map((s) => (
                        <option key={s} value={s} className="bg-[#090A0E] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                    Bespoke Inscription or Commission Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specify custom engravings, sizing questions, or custom requests..."
                    className="w-full rounded-xl px-4 py-2.5 bg-black/40 border border-white/[0.08] text-porcelain text-xs focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full py-3.5 bg-[#F5F5F7] text-[#050507] hover:bg-white active:scale-98 transition-all font-medium text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </EmergeFromRing>

        {/* Right Column: Open Editorial Information with Hairline Dividers */}
        <EmergeFromRing originX={-260} originY={40} rotation={-1.5}>
          <div className="space-y-8 divide-y divide-white/[0.08] lg:pt-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                Consultation
              </span>
              <h4 className="font-display font-semibold text-lg text-porcelain mb-1">
                Private Atelier Appointments
              </h4>
              <p className="text-xs sm:text-sm text-porcelain-muted font-light leading-relaxed mb-3">
                Appointments available for bespoke alloy formulation, custom gemstone sourcing, and family crest ciphers.
              </p>
              <a
                href="mailto:atelier@kryptos.store"
                className="text-xs font-mono text-porcelain hover:text-white transition-colors underline underline-offset-4"
              >
                atelier@kryptos.store
              </a>
            </div>

            <div className="pt-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                Global Transit
              </span>
              <h4 className="font-display font-semibold text-lg text-porcelain mb-1">
                Insured Courier Delivery
              </h4>
              <p className="text-xs sm:text-sm text-porcelain-muted font-light leading-relaxed">
                Complimentary insured priority dispatch with signature verification across 120+ countries worldwide.
              </p>
            </div>

            <div className="pt-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                Authenticity
              </span>
              <h4 className="font-display font-semibold text-lg text-porcelain mb-1">
                Indelible Archive Hallmark
              </h4>
              <p className="text-xs sm:text-sm text-porcelain-muted font-light leading-relaxed">
                Each handcrafted ring is marked with a distinct microscopic hallmark and registered in our archive.
              </p>
            </div>
          </div>
        </EmergeFromRing>
      </div>

      {/* 3. Questions Accordion (Clean Editorial Hairline Dividers) */}
      <EmergeFromRing originX={-280} originY={40} rotation={-1.5}>
        <div className="mt-20">
          <div className="mb-6">
            <span className="text-[11px] font-mono text-crimson tracking-wider uppercase block mb-1">
              Assistance & Policies
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-porcelain">
              Questions
            </h3>
          </div>

          <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <span className="font-display font-medium text-base sm:text-lg text-porcelain group-hover:text-white transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 group-hover:text-white transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-2 text-xs sm:text-sm text-porcelain-muted leading-relaxed font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </EmergeFromRing>
    </section>
  );
}
