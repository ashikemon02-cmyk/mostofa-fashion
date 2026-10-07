import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  lang: 'bn' | 'en';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  lang
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const isWholesale = item.quantity >= item.product.wholesaleMinQty;
    const price = isWholesale ? item.product.wholesalePrice : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const freeDeliveryThreshold = BUSINESS_INFO.delivery.freeDeliveryThreshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#13151f] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h2 className="font-bold text-lg text-white">
                {lang === 'bn' ? 'শপিং ব্যাগ' : 'Shopping Bag'}
              </h2>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {items.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Banner Progress */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300">
                {remainingForFreeDelivery === 0 ? (
                  <span className="text-emerald-400 font-bold">
                    🎉 {lang === 'bn' ? 'অভিনন্দন! আপনি পাচ্ছেন ফ্রি ডেলিভারি!' : 'Congratulations! Free delivery unlocked!'}
                  </span>
                ) : (
                  <span>
                    {lang === 'bn' 
                      ? <>আর মাত্র <strong className="text-rose-400 font-mono">৳{remainingForFreeDelivery}</strong> টাকার অর্ডারে ফ্রি ডেলিভারি!</>
                      : <>Add <strong className="text-rose-400 font-mono">৳{remainingForFreeDelivery}</strong> more for Free Delivery!</>}
                  </span>
                )}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-rose-600 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl">
                  🛍️
                </div>
                <h3 className="font-bold text-white text-base">
                  {lang === 'bn' ? 'আপনার ব্যাগ খালি' : 'Your bag is empty'}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  {lang === 'bn' 
                    ? 'আমাদের প্রিমিয়াম পাঞ্জাবি, শার্ট, ডেনিম এবং উইমেনস কালেকশন থেকে পছন্দ করুন।'
                    : 'Explore our latest collections of ready-made garments and wholesale packs.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'কেনাকাটা শুরু করুন' : 'Start Shopping'}
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const isWholesale = item.quantity >= item.product.wholesaleMinQty;
                const unitPrice = isWholesale ? item.product.wholesalePrice : item.product.price;
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                    className="flex gap-3 bg-[#181b26] p-3 rounded-2xl border border-slate-800 relative group"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800 flex items-center justify-center">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-slate-600" />
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                            {lang === 'bn' ? item.product.nameBn : item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{lang === 'bn' ? 'সাইজ:' : 'Size:'} <strong className="text-slate-200">{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span>{lang === 'bn' ? 'রঙ:' : 'Color:'} <strong className="text-slate-200">{item.selectedColor}</strong></span>
                        </div>

                        {isWholesale && (
                          <div className="text-[10px] text-emerald-400 font-medium">
                            ✓ {lang === 'bn' ? 'পাইকারি ডিসকাউন্ট রেট' : 'Wholesale Rate Applied'}
                          </div>
                        )}
                      </div>

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-white bg-slate-850">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-xs sm:text-sm font-extrabold text-white font-mono">
                            ৳{itemTotal.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            @৳{unitPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/95 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>{lang === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
                  <span className="font-mono text-white font-bold text-sm">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>{lang === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Fee'}</span>
                  <span className="text-slate-300 font-mono">
                    {subtotal >= freeDeliveryThreshold ? (
                      <span className="text-emerald-400 font-bold">FREE (৳০)</span>
                    ) : (
                      lang === 'bn' ? 'চেকআউটে নির্ধারিত হবে (৳৬০/৳১২০)' : 'Calculated at checkout'
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-sm font-bold text-white">{lang === 'bn' ? 'সর্বমোট প্রদেয়' : 'Total Amount'}</span>
                <span className="text-xl font-extrabold text-rose-500 font-mono">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'অর্ডার সম্পূর্ণ করতে এগিয়ে যান' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি ও বিকাশ পেমেন্ট সুবিধা' : 'Cash on Delivery & bKash Supported'}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
