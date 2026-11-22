import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2, Shield, ShoppingBag } from 'lucide-react';

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
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide Drawer Panel (Zero Sharp Rectangles) */}
      <div className="relative w-full max-w-md rounded-l-3xl bg-[#090A0E]/95 backdrop-blur-2xl border-l border-white/10 h-full flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-6 md:p-7 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-porcelain-muted" />
            <h3 className="font-display font-bold text-base sm:text-lg text-porcelain tracking-tight">
              Vault Allocation
            </h3>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-porcelain">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-porcelain-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Vault"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        {checkoutStep === 'processing' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            <p className="font-display font-medium text-sm text-porcelain">
              Securing Bespoke Sinter Allocation...
            </p>
            <span className="text-xs text-porcelain-dark font-mono">
              Allocating tungsten ingot & laser queue
            </span>
          </div>
        ) : checkoutStep === 'confirmed' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-crimson block mb-1">
                Order Protocol #KP-902482
              </span>
              <h4 className="font-display font-bold text-2xl text-porcelain">
                Allocation Confirmed
              </h4>
              <p className="text-xs text-porcelain-muted font-light mt-2 leading-relaxed max-w-xs">
                Your piece has been queued for diamond chamfering and comfort-fit engraving. Courier dispatch within 24–48 hours.
              </p>
            </div>

            <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/[0.06] w-full text-left font-mono text-xs space-y-2 text-porcelain-muted">
              <div className="flex justify-between">
                <span>Total Settled:</span>
                <span className="text-porcelain font-semibold">${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Shipping:</span>
                <span className="text-porcelain">Complimentary Armored Courier</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Warranty:</span>
                <span className="text-porcelain">Indelible Lifetime Heritage</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full rounded-full py-4 bg-[#F5F5F7] text-[#050507] hover:bg-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer"
            >
              Conclude Transaction
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-porcelain-dark">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-base text-porcelain">
                Vault is Empty
              </h4>
              <p className="text-xs text-porcelain-muted mt-1 font-light">
                No bespoke specimens currently reserved in your session.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.ring.id}-${item.size}-${idx}`}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 flex gap-4 transition-all hover:border-white/15"
              >
                {/* Ring Thumbnail */}
                <div className="w-18 h-18 rounded-xl bg-black/50 border border-white/10 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.ring.image}
                    alt={item.ring.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Ring Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-display font-semibold text-sm text-porcelain truncate">
                        {item.ring.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-porcelain-dark hover:text-crimson transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-porcelain-muted">
                      <span>{item.size}</span>
                      <span>·</span>
                      <span className="text-porcelain font-medium">${item.ring.price}</span>
                    </div>

                    {item.engraving && (
                      <div className="mt-1.5 text-[10px] font-mono text-crimson bg-crimson/10 px-2 py-0.5 rounded-full inline-block truncate max-w-full">
                        "{item.engraving}"
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 rounded-full bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-porcelain transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs text-porcelain px-1 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-porcelain transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-display font-semibold text-xs text-porcelain">
                      ${item.ring.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drawer Footer with Checkout */}
        {items.length > 0 && checkoutStep === 'cart' && (
          <div className="p-6 md:p-7 border-t border-white/[0.08] bg-black/40 space-y-4">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-porcelain-muted">
                <span>Allocation Subtotal:</span>
                <span className="text-porcelain font-semibold font-display text-sm">
                  ${subtotal} USD
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-porcelain-dark">
                <span>Insured Express Courier:</span>
                <span className="text-emerald-400">Complimentary</span>
              </div>
            </div>

            <button
              onClick={handleSimulateCheckout}
              className="w-full rounded-full py-4 bg-[#F5F5F7] text-[#050507] hover:bg-white hover:scale-[1.02] active:scale-95 text-xs font-semibold tracking-wide transition-all shadow-lg cursor-pointer"
            >
              Confirm Vault Allocation · ${subtotal}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
