import React, { useState } from 'react';
import { X, Star, ShoppingBag, Zap, ShieldCheck, Truck, MessageCircle, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onInstantBuy: (product: Product, size: string, color: string, quantity: number) => void;
  lang: 'bn' | 'en';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantBuy,
  lang
}) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(product?.image || null);

  React.useEffect(() => {
    if (product) {
      setActiveImage(product.image || null);
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const displayImage = activeImage || product.image;

  const isWholesaleQty = quantity >= product.wholesaleMinQty;
  const unitPrice = isWholesaleQty ? product.wholesalePrice : product.price;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#141722] border border-slate-700 rounded-3xl shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image & Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-[3/4] max-h-[480px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={lang === 'bn' ? product.nameBn : product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              ) : null}
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-2">
                {product.gallery.filter(Boolean).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      displayImage === img ? 'border-rose-500 scale-105' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-slate-200">
                    {lang === 'bn' ? '১০০% ফেব্রিক গ্যারান্টি' : '100% Quality'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'bn' ? 'রং ও কাটিং শতভাগ পাকা' : 'Guaranteed colorfast'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-rose-500 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-slate-200">
                    {lang === 'bn' ? 'দ্রুত হোম ডেলিভারি' : 'Fast Delivery'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'bn' ? '২৪-৪৮ ঘণ্টার মধ্যে' : '24-48 hours delivery'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Sizing, Wholesale & Order Buttons */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-950/60 px-2.5 py-1 rounded-md border border-rose-900/50">
                  {lang === 'bn' ? product.subcategoryBn : product.subcategory}
                </span>

                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({product.reviewsCount} {lang === 'bn' ? 'রিভিউ' : 'reviews'})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {lang === 'bn' ? product.nameBn : product.name}
              </h2>

              {/* Pricing Breakdown */}
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    ৳{unitPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400 line-through font-mono">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  {isWholesaleQty && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      {lang === 'bn' ? 'পাইকারি রেট প্রযোজ্য!' : 'Wholesale Applied!'}
                    </span>
                  )}
                </div>

                <div className="text-xs text-rose-300 flex items-center justify-between border-t border-slate-800 pt-2">
                  <span>
                    {lang === 'bn' 
                      ? `খুচরা মূল্য: ৳${product.price} | পাইকারি মূল্য (${product.wholesaleMinQty}+ পিস): ৳${product.wholesalePrice}`
                      : `Retail: ৳${product.price} | Wholesale (${product.wholesaleMinQty}+ pcs): ৳${product.wholesalePrice}`}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'bn' ? product.descriptionBn : product.description}
              </p>

              {/* Fabric Specs */}
              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-500">{lang === 'bn' ? 'কাপড়/ফেব্রিক: ' : 'Fabric: '}</span>
                  <span className="font-semibold text-white">{lang === 'bn' ? product.fabricBn : product.fabric}</span>
                </div>
                <div>
                  <span className="text-slate-500">{lang === 'bn' ? 'স্টক স্ট্যাটাস: ' : 'Availability: '}</span>
                  <span className="text-emerald-400 font-semibold">
                    {lang === 'bn' ? `স্টকে আছে (${product.stockCount} পিস এভেইলেবল)` : `In Stock (${product.stockCount} available)`}
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {lang === 'bn' ? 'সাইজ নির্বাচন করুন:' : 'Choose Size:'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {lang === 'bn' ? 'কালার / রঙ:' : 'Choose Color:'} <span className="text-rose-400 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'bg-rose-950/80 text-white border-rose-500'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-1">
                <label className="text-xs font-semibold text-slate-300">
                  {lang === 'bn' ? 'পরিমাণ:' : 'Quantity:'}
                </label>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold font-mono text-white bg-slate-850">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs text-slate-400">
                  {lang === 'bn' ? 'সর্বমোট মূল্য: ' : 'Total: '}
                  <span className="font-extrabold text-white text-base font-mono">
                    ৳{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions & WhatsApp Order */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product, selectedSize, selectedColor, quantity);
                    onClose();
                  }}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'কার্টে রাখুন' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={() => {
                    onInstantBuy(product, selectedSize, selectedColor, quantity);
                    onClose();
                  }}
                  className="py-3 px-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{lang === 'bn' ? 'এখনই অর্ডার করুন' : 'Order Now'}</span>
                </button>
              </div>

              {/* WhatsApp direct order for this specific item */}
              <a
                href={`${BUSINESS_INFO.whatsappUrl}${encodeURIComponent(
                  `আসসালামু আলাইকুম মো: নিজাম উদ্দিন ভাই, আমি মোস্তফা ফ্যাশন থেকে "${product.name}" (সাইজ: ${selectedSize}, রঙ: ${selectedColor}, পরিমাণ: ${quantity} পিস) অর্ডার করতে চাচ্ছি।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/50 text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে এই পণ্যের বিষয়ে কথা বলুন' : 'Inquire via WhatsApp'}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
