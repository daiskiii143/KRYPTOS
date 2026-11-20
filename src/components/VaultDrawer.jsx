import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2, Shield } from 'lucide-react';

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
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-crimson block mb-1">
                Order Protocol #KP-902482
              </span>
              <h4 className="font-display text-2xl font-normal text-porcelain tracking-wide">
                Allocation Confirmed
              </h4>
              <p className="font-sans text-xs font-light text-porcelain-muted mt-2 leading-relaxed">
                Your piece has been queued for diamond chamfering and comfort-fit engraving.
                Courier dispatch within 24–48 hours.
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/[0.06] w-full text-left font-mono text-xs space-y-2 text-porcelain-muted">
              <div className="flex justify-between">
                <span>Total Settled:</span>
                <span className="text-porcelain font-medium">${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Shipping:</span>
                <span className="text-porcelain">Complimentary Armored Courier</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Warranty:</span>
                <span className="text-porcelain">Lifetime Atelier Guarantee</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 bg-porcelain text-[#050507] hover:bg-white font-mono text-xs uppercase tracking-[0.25em] font-medium transition-colors"
            >
              Conclude Transaction
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 divide-y divide-white/[0.06]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16 text-porcelain-dark">
                  <Shield className="w-8 h-8 stroke-1 text-white/20" />
                  <p className="font-mono text-xs uppercase tracking-[0.2em]">
                    Vault is currently empty
                  </p>
                  <span className="font-sans text-xs text-porcelain-muted font-light">
                    Select a formation from the atelier or permanent collection.
                  </span>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${item.ring.id}-${idx}`} className="pt-6 first:pt-0 space-y-3">
                    <div className="flex gap-4">
                      {/* Product Thumbnail with Generated Image */}
                      <div className="w-20 h-20 bg-[#040405] border border-white/10 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.ring.image}
                          alt={item.ring.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-porcelain-dark block">
                              EDITION {item.ring.editionNumber}
                            </span>
                            <h4 className="font-display text-base font-normal text-porcelain truncate">
                              {item.ring.name}
                            </h4>
                          </div>
                          <span className="font-mono text-xs text-porcelain font-medium">
                            ${item.ring.price * item.quantity}
                          </span>
                        </div>

                        <div className="font-mono text-[11px] text-porcelain-muted mt-1">
                          Size: {item.size}
                        </div>

                        {item.engraving && (
                          <div className="font-mono text-[10px] text-crimson tracking-wider truncate mt-0.5">
                            Laser: "{item.engraving}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Delete Controls */}
                    <div className="flex items-center justify-between font-mono text-xs pt-1">
                      <div className="flex items-center border border-white/15">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity(idx, item.quantity - 1);
                            } else {
                              onRemoveItem(idx);
                            }
                          }}
                          className="p-1.5 text-porcelain-muted hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-porcelain">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="p-1.5 text-porcelain-muted hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="p-1.5 text-porcelain-dark hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-white/[0.08] bg-[#050507] space-y-4">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-porcelain-muted">
                    <span>Subtotal:</span>
                    <span className="text-porcelain">${subtotal} USD</span>
                  </div>
                  <div className="flex justify-between text-porcelain-muted text-[11px]">
                    <span>Insured Armored Courier:</span>
                    <span className="text-porcelain">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-porcelain-muted text-[11px]">
                    <span>Atelier Lifetime Seal:</span>
                    <span className="text-porcelain">Included</span>
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-3 flex justify-between font-mono text-sm text-porcelain">
                  <span className="uppercase tracking-wider">Total</span>
                  <span className="font-medium">${subtotal} USD</span>
                </div>

                <button
                  onClick={handleSimulateCheckout}
                  className="w-full py-4 bg-porcelain text-[#050507] hover:bg-white font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all"
                >
                  Confirm Vault Allocation
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
