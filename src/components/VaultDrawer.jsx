import React, { useState } from 'react';

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
    }, 1000);
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
        className="fixed inset-0 bg-[#0D0D0F]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#151518] border-l border-[#F2EFE9]/[0.08] h-full flex flex-col justify-between shadow-2xl z-10">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#F2EFE9]/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-sans font-medium text-base text-[#F2EFE9]">
              Shopping Bag
            </h3>
            <span className="text-xs text-[#8E8A82]">
              ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-medium text-[#8E8A82] hover:text-[#F2EFE9] transition-colors cursor-pointer"
            aria-label="Close Bag"
          >
            Close
          </button>
        </div>

        {/* Drawer Body */}
        {checkoutStep === 'processing' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#F2EFE9]/20 border-t-[#F2EFE9] animate-spin" />
            <p className="font-sans font-medium text-sm text-[#F2EFE9]">
              Processing Bag Order...
            </p>
          </div>
        ) : checkoutStep === 'confirmed' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5">
            <h4 className="font-serif text-2xl text-[#F2EFE9] font-normal">
              Order Confirmed
            </h4>
            <p className="text-xs text-[#8E8A82] font-normal leading-relaxed max-w-xs">
              Your piece has been queued for diamond chamfering. Armored express courier dispatch within 24–48 hours.
            </p>

            <div className="rounded-lg p-4 bg-[#0D0D0F] border border-[#F2EFE9]/[0.06] w-full text-left text-xs space-y-2 text-[#8E8A82]">
              <div className="flex justify-between">
                <span>Total Settled:</span>
                <span className="text-[#F2EFE9] font-medium">${subtotal} USD</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-[#F2EFE9]">Complimentary Courier</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full rounded-full py-3.5 bg-[#F2EFE9] text-[#0D0D0F] hover:bg-white text-xs font-medium tracking-normal transition-all cursor-pointer"
            >
              Continue
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-2">
            <h4 className="font-sans font-medium text-base text-[#F2EFE9]">
              Your Bag is Empty
            </h4>
            <p className="text-xs text-[#8E8A82] font-normal">
              No items currently selected.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.ring.id}-${item.size}-${idx}`}
                className="rounded-lg bg-[#0D0D0F] border border-[#F2EFE9]/[0.06] p-4 flex gap-4"
              >
                {/* Ring Thumbnail */}
                <div className="w-16 h-16 rounded bg-[#151518] border border-[#F2EFE9]/[0.06] flex-shrink-0 overflow-hidden">
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
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sans font-medium text-sm text-[#F2EFE9] truncate">
                        {item.ring.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[11px] text-[#8E8A82] hover:text-[#F2EFE9] transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-[#8E8A82]">
                      <span>{item.size}</span>
                      <span>·</span>
                      <span className="text-[#F2EFE9] font-medium">${item.ring.price}</span>
                    </div>

                    {item.engraving && (
                      <div className="mt-1 text-[10px] text-[#8E8A82] truncate">
                        Engraving: "{item.engraving}"
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F2EFE9]/[0.06]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        className="w-5 h-5 rounded flex items-center justify-center text-xs text-[#8E8A82] hover:text-[#F2EFE9] transition-colors"
                      >
                        −
                      </button>
                      <span className="text-xs text-[#F2EFE9] font-medium px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-xs text-[#8E8A82] hover:text-[#F2EFE9] transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-sans font-medium text-xs text-[#F2EFE9]">
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
          <div className="p-6 border-t border-[#F2EFE9]/[0.08] bg-[#0D0D0F] space-y-3">
            <div className="flex justify-between text-xs text-[#8E8A82]">
              <span>Subtotal</span>
              <span className="text-[#F2EFE9] font-medium text-sm">
                ${subtotal} USD
              </span>
            </div>

            <button
              onClick={handleSimulateCheckout}
              className="w-full rounded-full py-3.5 bg-[#F2EFE9] text-[#0D0D0F] hover:bg-white text-xs font-medium tracking-normal transition-all cursor-pointer shadow-sm active:scale-98"
            >
              Checkout · ${subtotal}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
