import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function VaultDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearVault
}) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'processing' | 'confirmed'

  const subtotal = items.reduce((sum, item) => sum + item.ring.price * item.quantity, 0);

  const handleSimulateCheckout = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('confirmed');
    }, 1200);
  };

  const handleFinish = () => {
    onClearVault();
    setCheckoutStep('cart');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Dim backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#08090C] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl z-10 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <h3 className="font-display text-lg font-bold text-porcelain tracking-wider">
              YOUR VAULT
            </h3>
            <span className="text-xs font-mono text-porcelain-muted">
              ({items.reduce((s, i) => s + i.quantity, 0)} {items.length === 1 ? 'piece' : 'pieces'})
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-porcelain-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        {checkoutStep === 'processing' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-crimson border-t-transparent animate-spin" />
            <p className="font-mono text-xs uppercase tracking-widest text-porcelain">
              Securing Bespoke Sinter Allocation...
            </p>
            <span className="text-[11px] font-mono text-porcelain-dark">
              Allocating tungsten ingot & laser-inscribing queue
            </span>
          </div>
        ) : checkoutStep === 'confirmed' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 block mb-1">
                Order Protocol #KP-902482
              </span>
              <h4 className="font-display text-2xl font-bold text-porcelain">
                ALLOCATION CONFIRMED
              </h4>
              <p className="text-xs font-sans text-porcelain-muted mt-2 leading-relaxed">
                Your piece has been queued for diamond chamfering and comfort-fit engraving at the Kryptos atelier.
                Dispatch within 48 hours in a pressurized obsidian vault case.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] w-full text-left font-mono text-xs space-y-1.5 text-porcelain-muted">
              <div className="flex justify-between">
                <span>Total Settled:</span>
                <span className="text-porcelain font-bold">${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Shipping:</span>
                <span className="text-emerald-400">Complimentary Courier</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Warranty:</span>
                <span className="text-porcelain">Lifetime Armor Guarantee</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-porcelain text-[#050507] hover:bg-white font-mono text-xs uppercase tracking-widest font-bold transition-all"
            >
              Return to Atelier
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <Lock className="w-8 h-8 text-white/20" />
            <p className="font-display text-lg text-porcelain">Vault is Empty</p>
            <p className="text-xs font-sans text-porcelain-muted max-w-xs leading-relaxed">
              Explore the 3D atelier or curated collection to configure and allocate your tungsten piece.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2.5 rounded-xl border border-white/10 text-xs font-mono uppercase tracking-widest text-porcelain hover:border-white/30"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.ring.id}-${item.size}-${idx}`}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col gap-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-crimson">
                      EDITION {item.ring.editionNumber}
                    </span>
                    <h4 className="font-display text-sm font-bold text-porcelain">
                      {item.ring.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs font-mono text-porcelain-muted">
                      <span>Size: {item.size}</span>
                      <span>·</span>
                      <span>${item.ring.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Laser engraving preview */}
                {item.engraving && (
                  <div className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#050507] border border-white/[0.04] text-porcelain-dark flex items-center justify-between">
                    <span>Engraving:</span>
                    <span className="text-porcelain truncate max-w-[200px]">"{item.engraving}"</span>
                  </div>
                )}

                {/* Quantity Controls & Item Total */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2 border border-white/10 rounded-lg p-1 bg-black/40">
                    <button
                      onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                      className="w-5 h-5 flex items-center justify-center text-porcelain-muted hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono px-2 text-porcelain">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-porcelain-muted hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="font-mono text-sm font-bold text-porcelain">
                    ${item.ring.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drawer Footer & Checkout CTA */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-white/[0.08] bg-[#050507] space-y-4">
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-porcelain-muted">
                <span>Subtotal:</span>
                <span className="text-porcelain font-bold">${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-[11px] text-porcelain-dark">
                <span>Insured Courier:</span>
                <span className="text-emerald-400 uppercase">Complimentary</span>
              </div>
            </div>

            <button
              onClick={handleSimulateCheckout}
              className="w-full py-4 rounded-xl bg-porcelain text-[#050507] hover:bg-white font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 group"
            >
              <span>Initiate Allocation · ${subtotal}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-porcelain-dark">
              <ShieldCheck className="w-3.5 h-3.5 text-crimson" />
              <span>Complimentary Resizing · Lifetime Metallurgy Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
