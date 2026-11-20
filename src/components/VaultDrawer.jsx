import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2 } from 'lucide-react';

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
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#08090C] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl z-10 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-6 md:p-8 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-lg font-normal text-porcelain tracking-[0.2em] uppercase">
              Your Vault
            </h3>
            <span className="font-mono text-xs text-porcelain-muted">
              ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-porcelain-muted hover:text-white transition-colors"
            aria-label="Close Vault"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        {checkoutStep === 'processing' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-8 h-8 rounded-full border border-white/30 border-t-white animate-spin" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-porcelain">
              Securing Bespoke Sinter Allocation...
            </p>
            <span className="font-mono text-[11px] text-porcelain-dark">
              Allocating tungsten ingot & laser queue
            </span>
          </div>
        ) : checkoutStep === 'confirmed' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-porcelain" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-porcelain-muted block mb-1">
                Order Protocol #KP-902482
              </span>
              <h4 className="font-display text-2xl font-normal text-porcelain tracking-wide">
                Allocation Confirmed
              </h4>
              <p className="font-sans text-xs font-light text-porcelain-muted mt-2 leading-relaxed">
                Your piece has been queued for diamond chamfering and comfort-fit engraving.
                Courier dispatch within 48 hours.
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/[0.06] w-full text-left font-mono text-xs space-y-2 text-porcelain-muted">
              <div className="flex justify-between">
                <span>Total Settled:</span>
                <span className="text-porcelain font-medium">${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Shipping:</span>
                <span className="text-porcelain">Complimentary Courier</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Warranty:</span>
                <span className="text-porcelain">Lifetime Armor Guarantee</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 bg-porcelain text-[#050507] hover:bg-white font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all"
            >
              Return to Atelier
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <p className="font-display text-lg text-porcelain font-normal">Vault is Empty</p>
            <p className="font-sans text-xs font-light text-porcelain-muted max-w-xs leading-relaxed">
              Explore the atelier to configure and allocate your bespoke tungsten piece.
            </p>
            <button
              onClick={onClose}
              className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-porcelain underline underline-offset-8 hover:text-white"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {items.map((item, idx) => (
              <div
                key={`${item.ring.id}-${item.size}-${idx}`}
                className="pb-6 border-b border-white/[0.06] flex flex-col gap-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-porcelain-dark">
                      Edition {item.ring.editionNumber}
                    </span>
                    <h4 className="font-display text-base font-normal text-porcelain">
                      {item.ring.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 font-mono text-xs text-porcelain-muted">
                      <span>Size: {item.size}</span>
                      <span>·</span>
                      <span>${item.ring.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="p-1 text-white/30 hover:text-white transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {item.engraving && (
                  <div className="font-mono text-[11px] text-porcelain-dark">
                    Inscription: <span className="text-porcelain">"{item.engraving}"</span>
                  </div>
                )}

                {/* Quantity Controls & Item Total */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 border border-white/10 p-1">
                    <button
                      onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                      className="w-5 h-5 flex items-center justify-center text-porcelain-muted hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs px-2 text-porcelain">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-porcelain-muted hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="font-mono text-xs text-porcelain font-medium">
                    ${item.ring.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drawer Footer & Checkout CTA */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-6 md:p-8 border-t border-white/[0.08] bg-[#050507] space-y-4">
            <div className="flex justify-between font-mono text-xs text-porcelain-muted">
              <span>Subtotal:</span>
              <span className="text-porcelain font-medium">${subtotal} USD</span>
            </div>
            <div className="flex justify-between font-mono text-[11px] text-porcelain-dark">
              <span>Insured Courier:</span>
              <span className="text-porcelain uppercase">Complimentary</span>
            </div>

            <button
              onClick={handleSimulateCheckout}
              className="w-full py-4 bg-porcelain text-[#050507] hover:bg-white font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all"
            >
              Initiate Allocation · ${subtotal}
            </button>

            <div className="text-center font-mono text-[10px] text-porcelain-dark uppercase tracking-[0.15em]">
              Complimentary Resizing · Lifetime Metallurgy Guarantee
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
