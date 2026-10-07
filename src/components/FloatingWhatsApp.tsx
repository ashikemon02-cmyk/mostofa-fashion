import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

interface FloatingWhatsAppProps {
  lang: 'bn' | 'en';
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="Customer Support Contact" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Friendly Tooltip */}
      {showTooltip && (
        <div className="relative bg-[#161926] border border-slate-700 text-white text-xs px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2 max-w-[220px] animate-bounce">
          <span>
            {lang === 'bn' 
              ? 'কথা বলতে চান? মো: নিজাম উদ্দিনকে সরাসরি মেসেজ দিন!' 
              : 'Have questions? Chat with Md. Nizam Uddin!'}
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Buttons: Call & WhatsApp */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center shadow-lg border border-slate-700 transition-all hover:scale-110 active:scale-95"
          title={BUSINESS_INFO.phone}
          aria-label="Call Md. Nizam Uddin"
        >
          <Phone className="w-5 h-5 text-rose-500" />
        </a>

        <a
          href={`${BUSINESS_INFO.whatsappUrl}${encodeURIComponent(
            'আসসালামু আলাইকুম মো: নিজাম উদ্দিন ভাই, আমি মোস্তফা ফ্যাশন সম্পর্কে জানতে আগ্রহী।'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white flex items-center justify-center shadow-xl shadow-emerald-950/60 transition-all hover:scale-110 active:scale-95"
          title="WhatsApp Chat"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </aside>
  );
};
