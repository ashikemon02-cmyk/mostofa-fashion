import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'card';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true
}) => {
  const isDarkBg = variant === 'dark';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Monogram MF with Hanger */}
      <div className={`relative flex items-center justify-center shrink-0 ${
        size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12'
      } bg-white rounded-lg p-1.5 shadow-sm border border-slate-200`}>
        <svg viewBox="0 0 120 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hanger Hook */}
          <path d="M60 22 C60 12, 68 8, 72 14 C76 20, 68 26, 60 30" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Hanger Triangle */}
          <path d="M12 48 L60 30 L108 48 Z" fill="none" stroke="#111827" strokeWidth="4.5" strokeLinejoin="round" />
          {/* Hanger Bar notch */}
          <line x1="20" y1="48" x2="100" y2="48" stroke="#111827" strokeWidth="3" />
          {/* M Letter (Black) */}
          <text x="36" y="86" fontFamily="Outfit, Arial, sans-serif" fontSize="46" fontWeight="900" fill="#111827" textAnchor="middle">
            M
          </text>
          {/* F Letter (Red) */}
          <text x="82" y="86" fontFamily="Outfit, Arial, sans-serif" fontSize="46" fontWeight="900" fill="#dc2626" textAnchor="middle">
            F
          </text>
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight">
          <span className="font-extrabold text-rose-600 tracking-wide font-display text-lg sm:text-xl leading-none">
            MOSTOFA
          </span>
          <span className={`font-black ml-1.5 text-base sm:text-lg leading-none ${isDarkBg ? 'text-white' : 'text-slate-900'}`}>
            FASHION
          </span>
        </div>
        
        {showSubtitle && (
          <div className="flex flex-col mt-0.5">
            <span className="text-[10px] sm:text-[11px] font-semibold text-rose-500 uppercase tracking-wider leading-tight">
              Import, Export & Wholesale
            </span>
            <span className={`text-[9px] font-medium leading-tight ${isDarkBg ? 'text-slate-400' : 'text-slate-600'}`}>
              Ready-Made Garments
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
