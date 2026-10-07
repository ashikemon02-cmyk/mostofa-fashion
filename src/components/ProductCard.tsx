import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Zap, Layers } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onInstantBuy: (product: Product, size: string, color: string, quantity: number) => void;
  lang: 'bn' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onInstantBuy,
  lang
}) => {
  const [imgError, setImgError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');

  React.useEffect(() => {
    setImgError(false);
  }, [product.image]);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group flex flex-col bg-[#141721] rounded-2xl border border-slate-800/80 hover:border-rose-900/60 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/20 text-left">
      
      {/* Product Image Container */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative aspect-[3/4] w-full bg-slate-900 overflow-hidden cursor-pointer"
      >
        {!imgError && product.image ? (
          <img
            src={product.image}
            alt={lang === 'bn' ? product.nameBn : product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* Styled Zero-Broken-Image CSS/SVG Fallback */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-rose-950/30 to-black p-4 text-center">
            <span className="text-3xl mb-2">👔</span>
            <span className="text-xs font-bold text-slate-300 line-clamp-1">
              {lang === 'bn' ? product.nameBn : product.name}
            </span>
            <span className="text-[10px] text-rose-400 mt-1">Mostofa Fashion Sylhet</span>
          </div>
        )}

        {/* Subtle Discount / Tag */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow">
            {lang === 'bn' ? `-${discountPercent}% ছাড়` : `${discountPercent}% OFF`}
          </div>
        )}

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 p-2 bg-black/75 hover:bg-rose-600 text-white rounded-lg backdrop-blur-sm transition-colors cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Metadata Row: Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-rose-400">
              {lang === 'bn' ? product.subcategoryBn : product.subcategory}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-mono text-[11px]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-bold text-slate-100 hover:text-rose-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {lang === 'bn' ? product.nameBn : product.name}
          </h3>

          {/* Fabric Spec */}
          <div className="text-xs text-slate-400 truncate">
            <span className="text-slate-500">{lang === 'bn' ? 'ফেব্রিক: ' : 'Fabric: '}</span>
            <span className="text-slate-300">{lang === 'bn' ? product.fabricBn : product.fabric}</span>
          </div>

          {/* Price Layout */}
          <div className="pt-1 flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-extrabold text-white font-mono tabular-nums">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Wholesale Tier Notice */}
          <div className="bg-rose-950/40 border border-rose-900/40 rounded-lg px-2.5 py-1 text-[11px] text-rose-300 flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium">
              <Layers className="w-3 h-3 text-rose-400" />
              <span>{lang === 'bn' ? 'পাইকারি রেট:' : 'Wholesale:'}</span>
            </span>
            <span className="font-bold text-white font-mono">
              ৳{product.wholesalePrice.toLocaleString()} 
              <span className="text-[10px] text-slate-400 font-normal">
                {lang === 'bn' ? ` (${product.wholesaleMinQty}+ পিস)` : ` (${product.wholesaleMinQty}+ pcs)`}
              </span>
            </span>
          </div>
        </div>

        {/* Quick Size Selection */}
        {product.sizes.length > 1 && (
          <div className="pt-1">
            <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'সাইজ নির্বাচন:' : 'Select Size:'}</span>
              <span className="text-slate-300 font-medium">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'border-rose-500 bg-rose-950/80 text-white font-bold'
                      : 'border-slate-700 bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions: 1-Click Buy Now & Add To Bag */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddToCart(product, selectedSize, selectedColor, 1)}
            className="w-full py-2 px-2 bg-slate-800 hover:bg-slate-750 active:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'কার্টে রাখুন' : 'Add to Bag'}</span>
          </button>

          <button
            onClick={() => onInstantBuy(product, selectedSize, selectedColor, 1)}
            className="w-full py-2 px-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/40 transition-all active:scale-95 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{lang === 'bn' ? 'এখনই অর্ডার' : 'Order Now'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
