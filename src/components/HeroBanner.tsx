import React from 'react';
import { ShieldCheck, Truck, ArrowRight, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

interface HeroBannerProps {
  onExploreClick: () => void;
  onWholesaleClick: () => void;
  onTrackClick: () => void;
  onOpenLicense: () => void;
  lang: 'bn' | 'en';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onWholesaleClick,
  onTrackClick,
  onOpenLicense,
  lang
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#11131a] via-[#161822] to-[#0f1117] border-b border-slate-800">
      {/* Subtle geometric background accents inspired by the visiting card */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative angular red accent lines echoing visiting card */}
      <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-rose-600 via-rose-700 to-transparent hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Statement & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Government Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'bn' 
                  ? 'বিয়ানীবাজার পৌরসভা অনুমোদিত লাইসেন্স নং: ০৬৩২৪-০০' 
                  : 'Govt. Verified Trade License: 06324-00'}
              </span>
              <button 
                onClick={onOpenLicense}
                className="underline hover:text-white cursor-pointer ml-1 text-[11px]"
              >
                {lang === 'bn' ? 'যাচাই করুন' : 'Verify'}
              </button>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rose-500 font-bold uppercase tracking-widest text-xs sm:text-sm font-display">
                <Sparkles className="w-4 h-4" />
                <span>MOSTOFA FASHION · STYLE FOR EVERYONE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {lang === 'bn' ? (
                  <>
                    আমদানি, রপ্তানি ও পাইকারি <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-500 to-amber-400">
                      রেডিমেড গার্মেন্টস ব্যবসা
                    </span>
                  </>
                ) : (
                  <>
                    Import, Export & Wholesale <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-500 to-amber-400">
                      Ready-Made Garments
                    </span>
                  </>
                )}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                {lang === 'bn'
                  ? 'পুরুষদের প্রিমিয়াম পাঞ্জাবি, শার্ট, ডেনিম জিন্স এবং নারীদের আকর্ষণীয় থ্রি-পিস ও রেডিমেড পোশাকের নির্ভরযোগ্য প্রতিষ্ঠান। খুচরা ও পাইকারি অর্ডারে দেশব্যাপী দ্রুত কুরিয়ার ডেলিভারি।'
                  : "Sylhet's premier fashion hub for premium men's formal shirts, luxury panjabis, export denim, and elegant women's ready-made apparel. Retail and bulk wholesale supply nationwide."}
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-900/40 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'পোশাক কালেকশন দেখুন' : 'Explore Collections'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWholesaleClick}
                className="px-5 py-3.5 bg-slate-800/80 hover:bg-slate-700/90 text-slate-100 font-semibold text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'পাইকারি লট ও রেট' : 'Wholesale Catalog'}</span>
              </button>

              <button
                onClick={onTrackClick}
                className="px-4 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm rounded-xl border border-slate-700/70 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-rose-500" />
                <span>{lang === 'bn' ? 'অর্ডার ট্র্যাক' : 'Track Order'}</span>
              </button>
            </div>

            {/* Quick Contact & Direct WhatsApp Line */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="font-semibold text-white">{BUSINESS_INFO.proprietor}:</span>
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-rose-400 font-mono">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <span className="text-slate-700">•</span>
              <a
                href={`${BUSINESS_INFO.whatsappUrl}${encodeURIComponent('আসসালামু আলাইকুম, মোস্তফা ফ্যাশন থেকে পণ্য কেনার বিষয়ে জানতে চাচ্ছি।')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি চ্যাট' : 'Direct WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Card Presentation (Replicating Visiting Card & Garments Presentation) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-br from-slate-900 via-slate-850 to-black p-5 rounded-2xl border border-slate-700/80 shadow-2xl shadow-black/80">
              
              {/* Upper Header of the Virtual Card */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-rose-500 font-display">MOSTOFA</span>
                    <span className="text-lg font-black text-white">FASHION</span>
                  </div>
                  <div className="text-[11px] text-rose-400 font-semibold uppercase tracking-wider">
                    Import, Export & Wholesale
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Ready-Made Garments Business
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white">{BUSINESS_INFO.proprietor}</div>
                  <div className="text-[10px] text-slate-400">Proprietor</div>
                  <div className="text-[10px] text-rose-400 font-mono mt-0.5">{BUSINESS_INFO.phone}</div>
                </div>
              </div>

              {/* 4 Feature Pillars corresponding to Visiting Card */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-600/20 text-rose-500 flex items-center justify-center font-bold text-xs shrink-0">
                    👔
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {lang === 'bn' ? "মেন'স ওয়্যার" : "Men's Wear"}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {lang === 'bn' ? 'পাঞ্জাবি, শার্ট, জিন্স' : 'Panjabi, Shirt, Denim'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-600/20 text-rose-500 flex items-center justify-center font-bold text-xs shrink-0">
                    👗
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {lang === 'bn' ? "উইমেন'স ওয়্যার" : "Women's Wear"}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {lang === 'bn' ? 'থ্রি-পিস ও কুর্তি' : 'Three-Piece & Kurti'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-600/20 text-rose-500 flex items-center justify-center font-bold text-xs shrink-0">
                    📦
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {lang === 'bn' ? 'পাইকারি লট' : 'Wholesale Lots'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {lang === 'bn' ? 'সরাসরি মিল রেট' : 'Direct Factory Rates'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-600/20 text-rose-500 flex items-center justify-center font-bold text-xs shrink-0">
                    🛍️
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {lang === 'bn' ? 'রেডিমেড গার্মেন্টস' : 'Ready-Made'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {lang === 'bn' ? '১০০% কোয়ালিটি' : 'Guaranteed Fabric'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Shop Location Details from Card */}
              <div className="bg-black/50 border border-rose-950 p-3 rounded-xl text-left space-y-1">
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-rose-500 mt-0.5">📍</span>
                  <div>
                    <span className="font-semibold text-white">
                      {BUSINESS_INFO.address.shopNo}, {BUSINESS_INFO.address.market}
                    </span>
                    <div className="text-[11px] text-slate-400">
                      {BUSINESS_INFO.address.location}, {BUSINESS_INFO.address.district}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 pl-5">
                  ✉️ {BUSINESS_INFO.email}
                </div>
              </div>

              {/* Footer Trust Bar in Virtual Card */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  ✓ {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash On Delivery'}
                </span>
                <span className="text-slate-300 font-medium">
                  {lang === 'bn' ? '২৪-৪৮ ঘণ্টায় ডেলিভারি' : 'Fast 24-48h Delivery'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
