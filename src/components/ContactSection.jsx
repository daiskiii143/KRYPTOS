import React, { useState } from 'react';
import { z } from 'zod';
import { RING_EDITIONS } from '../data/rings';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please provide a valid email address'),
  ringStyle: z.string().min(1, 'Select a ring edition'),
  size: z.string().min(1, 'Select a ring size'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ringStyle: 'sovereign',
    size: 'US 10',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
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
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EFE9] font-normal tracking-[-0.02em] leading-tight">
          Concierge & Inquiries
        </h2>
        <p className="mt-3 text-sm text-[#8E8A82] font-normal max-w-xl leading-relaxed">
          Direct communication with our studio artisans. Commission bespoke alloy variations, request sizing assistance, or arrange private consultations.
        </p>
      </div>

      {/* Two-Column Open Layout: Form + Editorial Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left Column: Form with Zod Validation */}
        <div className="rounded-xl bg-[#151518] border border-[#F2EFE9]/[0.08] p-6 sm:p-8">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <h3 className="font-sans font-medium text-xl text-[#F2EFE9]">
                Inquiry Received
              </h3>
              <p className="text-xs text-[#8E8A82] max-w-xs mx-auto leading-relaxed">
                An artisan concierge has received your commission details and will reply within one business day.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', ringStyle: 'sovereign', size: 'US 10', notes: '' });
                }}
                className="mt-4 text-xs text-[#F2EFE9] underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8A82]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Elena Rostova"
                  className="w-full rounded-lg px-4 py-3 bg-[#0D0D0F] border border-[#F2EFE9]/[0.10] text-[#F2EFE9] text-xs focus:outline-none focus:border-[#F2EFE9]/40 transition-colors placeholder:text-[#8E8A82]/40"
                />
                {errors.name && (
                  <p className="text-[11px] text-[#8E8A82]">{errors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8A82]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="elena@domain.com"
                  className="w-full rounded-lg px-4 py-3 bg-[#0D0D0F] border border-[#F2EFE9]/[0.10] text-[#F2EFE9] text-xs focus:outline-none focus:border-[#F2EFE9]/40 transition-colors placeholder:text-[#8E8A82]/40"
                />
                {errors.email && (
                  <p className="text-[11px] text-[#8E8A82]">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#8E8A82]">
                    Ring Edition
                  </label>
                  <select
                    value={formData.ringStyle}
                    onChange={(e) => setFormData({ ...formData, ringStyle: e.target.value })}
                    className="w-full rounded-lg px-3 py-3 bg-[#0D0D0F] border border-[#F2EFE9]/[0.10] text-[#F2EFE9] text-xs focus:outline-none focus:border-[#F2EFE9]/40 transition-colors"
                  >
                    {RING_EDITIONS.map((r) => (
                      <option key={r.id} value={r.id} className="bg-[#151518] text-[#F2EFE9]">
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#8E8A82]">
                    Estimated Size
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full rounded-lg px-3 py-3 bg-[#0D0D0F] border border-[#F2EFE9]/[0.10] text-[#F2EFE9] text-xs focus:outline-none focus:border-[#F2EFE9]/40 transition-colors"
                  >
                    {['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'].map((s) => (
                      <option key={s} value={s} className="bg-[#151518] text-[#F2EFE9]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8A82]">
                  Commission Notes or Inscription
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify custom engravings, alloy requests, or timeline..."
                  className="w-full rounded-lg px-4 py-3 bg-[#0D0D0F] border border-[#F2EFE9]/[0.10] text-[#F2EFE9] text-xs focus:outline-none focus:border-[#F2EFE9]/40 transition-colors placeholder:text-[#8E8A82]/40 resize-none"
                />
                {errors.notes && (
                  <p className="text-[11px] text-[#8E8A82]">{errors.notes}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full py-3.5 bg-[#F2EFE9] text-[#0D0D0F] hover:bg-white text-xs font-medium tracking-normal transition-all duration-200 cursor-pointer shadow-sm active:scale-98"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Editorial Contact Details with 1px Hairline Dividers */}
        <div className="space-y-8 divide-y divide-[#F2EFE9]/[0.08] lg:pt-2">
          <div>
            <span className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
              Consultation
            </span>
            <h4 className="font-sans font-medium text-base text-[#F2EFE9] mb-1">
              Private Studio Appointments
            </h4>
            <p className="text-xs text-[#8E8A82] leading-relaxed mb-3">
              Consultations available for bespoke sizing trials, custom cipher drafting, and private commissions.
            </p>
            <a
              href="mailto:atelier@kryptos.store"
              className="text-xs text-[#F2EFE9] hover:opacity-80 transition-opacity underline underline-offset-4"
            >
              atelier@kryptos.store
            </a>
          </div>

          <div className="pt-6">
            <span className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
              Global Transit
            </span>
            <h4 className="font-sans font-medium text-base text-[#F2EFE9] mb-1">
              Armored Express Dispatch
            </h4>
            <p className="text-xs text-[#8E8A82] leading-relaxed">
              Complimentary insured worldwide courier with direct signature verification upon receipt.
            </p>
          </div>

          <div className="pt-6">
            <span className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
              Authenticity
            </span>
            <h4 className="font-sans font-medium text-base text-[#F2EFE9] mb-1">
              Permanent Archive Hallmark
            </h4>
            <p className="text-xs text-[#8E8A82] leading-relaxed">
              Each piece is inscribed with an indelible micro-hallmark cataloged in our permanent studio register.
            </p>
          </div>
        </div>
      </div>

      {/* Questions Accordion with Clean 1px Hairline Dividers (Zero Icons) */}
      <div className="mt-16 pt-12 border-t border-[#F2EFE9]/[0.08]">
        <div className="mb-6">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F2EFE9] font-normal tracking-[-0.02em]">
            Frequently Asked
          </h3>
        </div>

        <div className="divide-y divide-[#F2EFE9]/[0.08] border-b border-[#F2EFE9]/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-sans font-medium text-sm text-[#F2EFE9] hover:opacity-80 transition-opacity">
                    {faq.q}
                  </span>
                  <span className="text-xs text-[#8E8A82] font-mono select-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-xs text-[#8E8A82] leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
