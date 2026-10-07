import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BUSINESS_INFO } from '../data/businessInfo';

interface FooterProps {
  onSelectCategory: (cat: any) => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenLicense: () => void;
  lang: 'bn' | 'en';
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateToSection,
  onOpenLicense,
  lang
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0d14] text-slate-400 border-t border-slate-800 text-left">
      {/* Top Value Assurance Grid */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/10 text-rose-500 flex items-center justify-center text-lg shrink-0">
              🏷️
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {lang === 'bn' ? 'সরাসরি পাইকারি মূল্য' : 'Wholesale Direct'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'কারখানা থেকে সুলভ মূল্য' : 'Factory prices guaranteed'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center text-lg shrink-0">
              🛡️
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {lang === 'bn' ? 'পৌরসভা অনুমোদিত' : 'Govt. Verified'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'ট্রেড লাইসেন্স নং: ০৬৩২৪-০০' : 'License No: 06324-00'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center text-lg shrink-0">
              🚚
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {lang === 'bn' ? 'সারা দেশে দ্রুত ডেলিভারি' : 'Nationwide Delivery'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? '২৪-৪৮ ঘণ্টার মধ্যে হোম সার্ভিস' : 'Steadfast & RedX courier'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-400 flex items-center justify-center text-lg shrink-0">
              💳
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'পণ্য হাতে পেয়ে টাকা দিন' : 'Pay after unboxing'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="dark" size="md" showSubtitle={true} />
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {lang === 'bn'
                ? 'মোস্তফা ফ্যাশন — পুরুষ ও নারীদের আকর্ষণীয় রেডিমেড পোশাকের সমাহার ও পাইকারি বিক্রয়ের বিশ্বস্ত প্রতিষ্ঠান। সিলেট, বিয়ানীবাজার থেকে সারা বাংলাদেশে পাইকারি ও খুচরা সরবরাহ।'
                : 'Mostofa Fashion is a premier ready-made garments retailer and bulk wholesale supplier based in Beanibazar, Sylhet, serving fashion lovers and retailers across Bangladesh.'}
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-rose-400 font-mono">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-rose-400">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'bn' ? 'পোশাক কালেকশন' : 'Collections'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('mens');
                    onNavigateToSection('products-section');
                  }}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'পুরুষদের পোশাক (পাঞ্জাবি, শার্ট)' : "Men's Formal & Casual"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('womens');
                    onNavigateToSection('products-section');
                  }}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'মহিলাদের পোশাক (থ্রি-পিস, কুর্তি)' : "Women's Boutique & 3-Piece"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('wholesale');
                    onNavigateToSection('products-section');
                  }}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'পাইকারি লট ও বান্ডেল' : 'Wholesale Master Cartons'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('readymade');
                    onNavigateToSection('products-section');
                  }}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'রেডিমেড টি-শার্ট ও পোলো' : 'Ready-Made Streetwear'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Services & Tracking */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'bn' ? 'সেবা ও ট্র্যাকিং' : 'Customer Care'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateToSection('tracking-section')}
                  className="hover:text-rose-400 transition-colors cursor-pointer text-rose-400 font-medium"
                >
                  {lang === 'bn' ? 'অর্ডার ট্র্যাকিং সিস্টেম' : 'Track Your Order'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('wholesale-section')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'পাইকারি দর ও কোটেশন' : 'Wholesale Calculator'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLicense}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'bn' ? 'ট্রেড লাইসেন্স সত্যতা' : 'Trade License Verification'}</span>
                </button>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="hover:text-rose-400 transition-colors"
                >
                  {lang === 'bn' ? 'মালিকের সাথে সরাসরি কথা' : 'Call Md. Nizam Uddin'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Payment & Courier Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'bn' ? 'পেমেন্ট ও কুরিয়ার' : 'Payments & Couriers'}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5">{lang === 'bn' ? 'গৃহীত পেমেন্ট মাধ্যম:' : 'Supported Payments:'}</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[11px] text-pink-400 font-bold">bKash</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[11px] text-orange-400 font-bold">Nagad</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[11px] text-purple-400 font-bold">Rocket</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[11px] text-emerald-400 font-bold">COD</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5">{lang === 'bn' ? 'কুরিয়ার পার্টনারসমূহ:' : 'Delivery Partners:'}</span>
                <div className="text-[11px] text-slate-300 space-y-0.5">
                  <div>• Steadfast Courier (ফাস্ট সিলেট ও জাতীয়)</div>
                  <div>• RedX Logistics (হোম ডেলিভারি)</div>
                  <div>• Pathao Courier & Sundarban</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">MOSTOFA FASHION</strong>. All Rights Reserved.
            <span className="block sm:inline sm:ml-2 text-slate-400">
              Proprietor: Md. Nizam Uddin | Beanibazar, Sylhet
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              title="Back to Top"
            >
              <span>{lang === 'bn' ? 'উপরে যান' : 'Back to Top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
