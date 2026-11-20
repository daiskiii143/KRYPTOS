import React, { useState } from 'react';
import { Mail, ShieldCheck, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
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
    <section id="contact" className="py-24 border-b border-white/[0.06]">
      {/* 1. Header (EmergeFromRing) */}
      <EmergeFromRing originX={-350} originY={30} rotation={-3}>
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-crimson" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-porcelain-muted">
              Atelier Inquiries · Chapter IV
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-porcelain">
            Bespoke Commission & Concierge
          </h2>

          <p className="mt-4 font-serif text-lg sm:text-xl font-light text-porcelain-muted max-w-xl leading-relaxed italic">
            Direct communication with our Zurich metallurgy artisans. Commission custom ciphers,
            request private showroom consultations, or register an existing archive piece.
          </p>
        </div>
      </EmergeFromRing>

      {/* 2. Two-Column Layout: Custom Commission Form + Atelier Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Bespoke Inquiry Form */}
        <EmergeFromRing originX={-320} originY={40} rotation={-2}>
          <div className="bg-[#07080B] border border-white/[0.08] p-8 sm:p-10">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5 animate-fade-in">
                <div className="w-12 h-12 rounded-full border border-white/20 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-porcelain" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-crimson block mb-1">
                    Inquiry Docket #KP-COMM-{(Math.random() * 100000 | 0)}
                  </span>
                  <h3 className="font-display text-2xl font-normal text-porcelain">
                    Commission Dispatched
                  </h3>
                  <p className="font-sans text-xs text-porcelain-muted mt-2 max-w-xs mx-auto leading-relaxed font-light">
                    An atelier artisan will review your metallurgical request and reply to{' '}
                    <span className="text-porcelain">{formData.email}</span> within 12 hours.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] border border-white/15 text-porcelain hover:bg-white/10 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-porcelain-dark block mb-2">
                    Commission Docket
                  </span>
                  <h3 className="font-display text-xl font-normal text-porcelain">
                    Initiate Custom Order
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tristan Vance"
                      className="w-full px-3.5 py-2.5 bg-transparent border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@domain.com"
                      className="w-full px-3.5 py-2.5 bg-transparent border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block mb-2">
                      Base Ring Chassis
                    </label>
                    <select
                      value={formData.ringStyle}
                      onChange={(e) => setFormData({ ...formData, ringStyle: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#050507] border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors"
                    >
                      {RING_EDITIONS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} (${r.price})
                        </option>
                      ))}
                      <option value="bespoke">Bespoke Original Blueprint</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block mb-2">
                      Target US Size
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#050507] border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors"
                    >
                      {['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'Unsure (Sizing Kit Needed)'].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block mb-2">
                    Custom Rune / Inscription / Coordinates
                  </label>
                  <input
                    type="text"
                    maxLength={28}
                    value={formData.engraving}
                    onChange={(e) => setFormData({ ...formData, engraving: e.target.value.toUpperCase() })}
                    placeholder="e.g. 47°22'N 8°32'E · ELDER RUNES"
                    className="w-full px-3.5 py-2.5 bg-transparent border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block mb-2">
                    Bespoke Inlay / Metal Preference Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Describe custom gemstones, Damascus fold specifications, or personal heirloom requests..."
                    className="w-full px-3.5 py-2.5 bg-transparent border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-porcelain text-[#050507] hover:bg-white font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all"
                >
                  Transmit Bespoke Docket
                </button>
              </form>
            )}
          </div>
        </EmergeFromRing>

        {/* Right Column: Atelier Details & Assurance */}
        <EmergeFromRing originX={-280} originY={50} rotation={-2}>
          <div className="space-y-8 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="p-6 bg-[#07080B] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-crimson" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-porcelain">
                    Direct Atelier Contact
                  </span>
                </div>
                <p className="font-mono text-sm text-porcelain hover:text-white">
                  atelier@kryptos.store
                </p>
                <p className="font-sans text-xs text-porcelain-muted font-light leading-relaxed">
                  Private consultations conducted Monday through Friday. Zurich Metallurgical Foundry & London Private Vault by prior appointment.
                </p>
              </div>

              <div className="p-6 bg-[#07080B] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-crimson" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-porcelain">
                    Production & Dispatch Protocol
                  </span>
                </div>
                <p className="font-sans text-xs text-porcelain-muted font-light leading-relaxed">
                  In-stock archive sizes dispatch within 24 hours via temperature-monitored armored courier. Custom laser inscriptions add 1 business day for diamond chamfering.
                </p>
              </div>

              <div className="p-6 bg-[#07080B] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-crimson" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-porcelain">
                    Lifetime Integrity Guarantee
                  </span>
                </div>
                <p className="font-sans text-xs text-porcelain-muted font-light leading-relaxed">
                  Aerospace tungsten carbide will never bend, distort, or tarnish. Our hallmark guarantees full metallurgical replacement against accidental fracture.
                </p>
              </div>
            </div>

            {/* Hallmarks Signature */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-porcelain-dark">
              <span>ZURICH · LONDON · REYKJAVIK</span>
              <span>WC 85.7% · MOHS 9.0</span>
            </div>
          </div>
        </EmergeFromRing>
      </div>

      {/* 3. Shipping & Returns FAQ Accordion (Wrapped in EmergeFromRing) */}
      <EmergeFromRing originX={-300} originY={60} rotation={-2}>
        <div className="mt-20 pt-16 border-t border-white/[0.08]">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-porcelain-dark block mb-2">
              Atelier Protocol
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-porcelain">
              Frequently Clarified Inquiries
            </h3>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-2 font-display text-base sm:text-lg text-porcelain hover:text-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-porcelain-muted transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-porcelain' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-2 pb-4 font-sans text-xs sm:text-sm font-light text-porcelain-muted leading-relaxed max-w-2xl animate-fade-in">
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
