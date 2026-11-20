import React, { useState } from 'react';
import { Mail, ShieldCheck, Clock, ChevronDown, CheckCircle2, Send, MapPin } from 'lucide-react';
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
      q: 'How does the complimentary inner-band laser inscription work?',
      a: 'We utilize fiber laser engraving tuned to 1,064 nm wavelength to vaporize micro-layers of tungsten carbide without altering the tensile structural strength. Up to 28 characters of Roman capitals, numerals, or Nordic Elder Futhark runes can be inscribed on the inner comfort bore.'
    },
    {
      q: 'Can tungsten carbide rings be cut or resized?',
      a: 'Due to tungsten carbide’s extreme Mohs 9.0 hardness and sintering process, it cannot be traditionally cut or stretched. In the event your finger size evolves over the years, our Lifetime Atelier Exchange allows you to return your piece for a pristine replacement in your updated size for a nominal processing fee.'
    },
    {
      q: 'What is the courier transit protocol and insurance?',
      a: 'All pieces dispatch in tamper-evident, sealed black vault boxes via insured express courier (DHL Express / FedEx Priority). Signature is required upon delivery. Domestic transit takes 24–48 hours; international transit takes 3–5 business days.'
    },
    {
      q: 'What is covered under the KRYPTOS Lifetime Atelier Guarantee?',
      a: 'Every ring is warranted against structural failure, tungsten fracturing, and delamination of the optical resin overcoat for life. Should your band suffer accidental damage during normal wear, our atelier will repair or recast the piece.'
    },
    {
      q: 'What is the private bespoke commission timeline?',
      a: 'Custom commissions featuring custom-cut gemstones, rare meteorite inlays, or proprietary cipher glyphs require 3 to 4 weeks of metallurgical drafting, sintering, and laser micro-calibration in our Zurich facility.'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-transparent">
      {/* 1. Header (EmergeFromRing) */}
      <EmergeFromRing originX={-320} originY={25} rotation={-2}>
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.08] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-porcelain-muted">
              Atelier Inquiries · Chapter IV
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-porcelain leading-[1.05]">
            Bespoke Commission & Concierge
          </h2>

          <p className="mt-4 text-sm sm:text-base font-light text-porcelain-muted max-w-xl leading-relaxed">
            Direct communication with our Zurich metallurgy artisans. Commission custom ciphers, request private showroom consultations, or register an existing archive piece.
          </p>
        </div>
      </EmergeFromRing>

      {/* 2. Two-Column Layout: Custom Commission Form + Atelier Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Left Column: Bespoke Inquiry Form (Zero Sharp Rectangles) */}
        <EmergeFromRing originX={-280} originY={35} rotation={-1.5}>
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-crimson block mb-1">
                    Inquiry Docket #KP-COMM-{(Math.random() * 100000 | 0)}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-porcelain">
                    Commission Dispatched
                  </h3>
                  <p className="text-xs text-porcelain-muted mt-2 max-w-xs mx-auto leading-relaxed font-light">
                    An atelier artisan will review your metallurgical request and reply to{' '}
                    <span className="text-porcelain font-medium">{formData.email}</span> within 12 hours.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="rounded-full px-6 py-2.5 text-xs font-medium bg-white/[0.04] border border-white/10 text-porcelain hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-xs font-mono text-crimson uppercase tracking-wider block mb-1">
                    Bespoke Protocol
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-porcelain">
                    Commission Docket
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-porcelain-muted">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Lord / Lady"
                      className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-porcelain text-xs focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-porcelain-muted">Email Dispatch</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="atelier@domain.com"
                      className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-porcelain text-xs focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-porcelain-muted">Base Chassis</label>
                    <select
                      value={formData.ringStyle}
                      onChange={(e) => setFormData({ ...formData, ringStyle: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 bg-black/50 border border-white/10 text-porcelain text-xs focus:outline-none focus:border-white transition-colors"
                    >
                      {RING_EDITIONS.map((r) => (
                        <option key={r.id} value={r.id} className="bg-[#090A0E] text-white">
                          {r.name} (${r.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-porcelain-muted">Target US Size</label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 bg-black/50 border border-white/10 text-porcelain text-xs focus:outline-none focus:border-white transition-colors"
                    >
                      {['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'].map((sz) => (
                        <option key={sz} value={sz} className="bg-[#090A0E] text-white">
                          {sz} Comfort-Fit
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-porcelain-muted">
                    Custom Runes or Engraving Request
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={formData.engraving}
                    onChange={(e) => setFormData({ ...formData, engraving: e.target.value.toUpperCase() })}
                    placeholder="E.G. LATITUDE · LONGITUDE · LATIN CIPHER"
                    className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-porcelain-muted">Commission Specifications</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specific requests regarding crystal tints, meteorite inclusion, or presentation lockbox..."
                    className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-porcelain text-xs focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full py-4 bg-[#F5F5F7] text-[#050507] hover:bg-white hover:scale-[1.02] active:scale-95 text-xs font-semibold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Commission Docket</span>
                </button>
              </form>
            )}
          </div>
        </EmergeFromRing>

        {/* Right Column: Direct Atelier Information */}
        <EmergeFromRing originX={-260} originY={40} rotation={-1.5}>
          <div className="space-y-5">
            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-porcelain-dark">
                <MapPin className="w-4 h-4 text-crimson" />
                <span>PRIMARY FACILITY</span>
              </div>
              <h4 className="font-display font-semibold text-lg text-porcelain">
                Zurich High Jewelry Crucible
              </h4>
              <p className="text-xs text-porcelain-muted font-light leading-relaxed">
                Gotthardstrasse 26, 8002 Zürich, Switzerland. By private metallurgical appointment only.
              </p>
              <div className="pt-2 text-xs font-mono text-porcelain">
                <a href="mailto:atelier@kryptos.store" className="hover:underline text-porcelain">
                  atelier@kryptos.store
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-porcelain-dark">
                <Clock className="w-4 h-4 text-crimson" />
                <span>CONCIERGE PROTOCOL</span>
              </div>
              <h4 className="font-display font-semibold text-lg text-porcelain">
                Global Artisan Support
              </h4>
              <p className="text-xs text-porcelain-muted font-light leading-relaxed">
                Monday through Friday, 08:00–18:00 CET. Secure encrypted inquiries handled within 12 standard business hours.
              </p>
            </div>

            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-porcelain-dark">
                <ShieldCheck className="w-4 h-4 text-crimson" />
                <span>ARCHIVE AUTHENTICITY</span>
              </div>
              <h4 className="font-display font-semibold text-lg text-porcelain">
                Laser Hallmark Registry
              </h4>
              <p className="text-xs text-porcelain-muted font-light leading-relaxed">
                Every piece holds a unique cryptographic archive hallmark indexed in our private ledger.
              </p>
            </div>
          </div>
        </EmergeFromRing>
      </div>

      {/* 3. FAQ Accordion (Rounded Glass Panels) */}
      <EmergeFromRing originX={-280} originY={40} rotation={-1.5}>
        <div className="mt-20 space-y-6">
          <div>
            <span className="text-xs font-mono text-porcelain-dark tracking-widest uppercase block mb-1">
              Atelier Knowledge Base
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-porcelain">
              Frequently Clarified Inquiries
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/15"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-display font-medium text-sm sm:text-base text-porcelain">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-porcelain-muted transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-porcelain' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-porcelain-muted leading-relaxed font-light border-t border-white/[0.04]">
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
