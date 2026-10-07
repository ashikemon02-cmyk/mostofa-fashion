import React from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, Download, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

interface TradeLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const TradeLicenseModal: React.FC<TradeLicenseModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#131622] border border-slate-700 rounded-3xl shadow-2xl text-left my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {lang === 'bn' ? 'সরকারি ট্রেড লাইসেন্স ও ব্যবসায়িক সত্যতা' : 'Government Trade License & Verification'}
              </h2>
              <div className="text-xs text-emerald-400 font-medium">
                {lang === 'bn' ? 'বিয়ানীবাজার পৌরসভা কর্তৃক নিবন্ধিত ও যাচাইকৃত' : 'Officially Registered & Verified Business'}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Container */}
        <div className="p-5 sm:p-6 space-y-5 text-xs text-slate-300">
          
          {/* Certificate Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 p-4 rounded-2xl border border-emerald-800/60 text-center space-y-1">
            <div className="text-[11px] uppercase tracking-widest text-emerald-300 font-bold">
              BEANIBAZAR PAURASHAVA · SYLHET
            </div>
            <div className="text-base sm:text-lg font-black text-white">
              TRADE / PROFESSIONAL LICENSE
            </div>
            <div className="text-xs text-slate-400">
              Municipality Ordinance 2009 of 102/108 Act
            </div>
          </div>

          {/* Details Table */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
            <div className="grid grid-cols-3 p-3">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'প্রতিষ্ঠানের নাম' : 'Business Name'}</span>
              <span className="col-span-2 font-bold text-white text-sm">
                {BUSINESS_INFO.name} ({BUSINESS_INFO.nameBn})
              </span>
            </div>

            <div className="grid grid-cols-3 p-3">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'লাইসেন্স নম্বর' : 'License No.'}</span>
              <span className="col-span-2 font-mono font-bold text-emerald-400">
                {BUSINESS_INFO.tradeLicense.licenseNo} (ID: {BUSINESS_INFO.tradeLicense.licenseIdNo})
              </span>
            </div>

            <div className="grid grid-cols-3 p-3">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'ব্যবসার ধরন' : 'Business Type'}</span>
              <span className="col-span-2 text-slate-200">
                Import, Export & Wholesale Ready-Made Garments Business
              </span>
            </div>

            <div className="grid grid-cols-3 p-3">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'মালিক / প্রোপ্রাইটর' : 'License Holder'}</span>
              <span className="col-span-2 font-bold text-white">
                {BUSINESS_INFO.proprietor} ({BUSINESS_INFO.proprietorBn})
              </span>
            </div>

            <div className="grid grid-cols-3 p-3">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'প্রতিষ্ঠানের ঠিকানা' : 'Business Address'}</span>
              <span className="col-span-2 text-slate-200">
                {BUSINESS_INFO.address.fullAddress}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'স্থায়ী ঠিকানা' : 'Permanent Address'}</span>
              <span className="col-span-2 text-slate-300">
                {BUSINESS_INFO.ownerAddress.village}, {BUSINESS_INFO.ownerAddress.postOffice}, {BUSINESS_INFO.ownerAddress.upazila}, {BUSINESS_INFO.ownerAddress.district}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'মেয়াদ ও বৈধতা' : 'Validity'}</span>
              <span className="col-span-2 font-semibold text-emerald-400">
                অর্থবছর ২০২৬-২০২৭ (Valid till 30th June 2027 A.D)
              </span>
            </div>

            <div className="grid grid-cols-3 p-3">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'যোগাযোগ নম্বর' : 'Phone'}</span>
              <span className="col-span-2 font-mono font-bold text-rose-400">
                {BUSINESS_INFO.phone}
              </span>
            </div>
          </div>

          {/* Legal Trust Statement */}
          <div className="flex items-start gap-2.5 p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              {lang === 'bn'
                ? 'মোস্তফা ফ্যাশন সরকারি নিয়ম মেনে ট্রেড লাইসেন্স প্রাপ্ত এবং ট্যাক্স পরিশোধকারী অনুমোদিত প্রতিষ্ঠান। গ্রাহক ও পাইকারি ক্রেতাদের আর্থিক ও পণ্য নিরাপত্তা নিশ্চিত।'
                : 'Mostofa Fashion is fully licensed by Beanibazar Municipality and strictly complies with all commercial and trade regulations in Bangladesh.'}
            </span>
          </div>

          {/* Close & Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
