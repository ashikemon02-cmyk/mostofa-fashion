import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, Truck, Menu, X, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BUSINESS_INFO } from '../data/businessInfo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: any) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  onOpenLicense: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateToSection,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  lang,
  onToggleLang,
  onOpenLicense
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const t = {
    all: lang === 'bn' ? 'সব কালেকশন' : 'All Items',
    mens: lang === 'bn' ? 'পুরুষদের পোশাক' : "Men's Wear",
    womens: lang === 'bn' ? 'মহিলাদের পোশাক' : "Women's Wear",
    wholesale: lang === 'bn' ? 'পাইকারি লট' : 'Wholesale',
    readymade: lang === 'bn' ? 'রেডিমেড গার্মেন্টস' : 'Ready-Made',
    tracking: lang === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Track Order',
    license: lang === 'bn' ? 'লাইসেন্স ও ভেরিফিকেশন' : 'Trade License',
    callNow: lang === 'bn' ? 'সরাসরি কল' : 'Call Now',
    searchPlaceholder: lang === 'bn' ? 'পাঞ্জাবি, শার্ট, জিন্স, থ্রি-পিস খুঁজুন...' : 'Search panjabi, shirts, jeans...'
  };

  const navLinks = [
    { id: 'all', label: t.all, isFilter: true },
    { id: 'mens', label: t.mens, isFilter: true },
    { id: 'womens', label: t.womens, isFilter: true },
    { id: 'wholesale', label: t.wholesale, isFilter: true },
    { id: 'tracking-section', label: t.tracking, isSection: true },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isFilter) {
      onSelectCategory(link.id);
      onNavigateToSection('products-section');
    } else if (link.isSection) {
      onNavigateToSection(link.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#11131a]/95 backdrop-blur-md border-b border-slate-800 transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-black text-rose-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              {lang === 'bn' ? 'হোলসেল রেডি' : 'Wholesale Ready'}
            </span>
            <span className="truncate text-slate-200">
              {lang === 'bn'
                ? 'আমদানি, রপ্তানি ও পাইকারি রেডিমেড পোশাকের বিশ্বস্ত প্রতিষ্ঠান | বিয়ানীবাজার, সিলেট'
                : 'Import, Export & Wholesale Ready-Made Garments | Azir Complex, Beanibazar'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] shrink-0 text-slate-300">
            <button
              onClick={onOpenLicense}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-emerald-400"
              title="Verified Trade License"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'পৌরসভা লাইসেন্স নং: ০৬৩২৪-০০' : 'Govt. License: 06324-00'}</span>
            </button>
            <span className="text-slate-600">|</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-1 hover:text-white transition-colors font-medium text-rose-300"
            >
              <Phone className="w-3 h-3" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Lockup */}
        <div 
          onClick={() => {
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="cursor-pointer"
        >
          <BrandLogo variant="dark" size="sm" showSubtitle={true} />
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = link.isFilter && activeCategory === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-rose-500 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
                )}
              </button>
            );
          })}

          <button
            onClick={onOpenLicense}
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer py-1 border border-emerald-500/30 px-2.5 rounded-full hover:bg-emerald-950/40 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.license}</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Language, Order Tracking, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle / Box */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 w-48 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-slate-400 hover:text-white ml-1 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Track Button */}
          <button
            onClick={() => onNavigateToSection('tracking-section')}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-200 hover:text-rose-400 bg-slate-800/70 hover:bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Truck className="w-4 h-4 text-rose-500" />
            <span className="font-medium">{t.tracking}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-md border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer"
            title="Switch Language"
          >
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>

          {/* Cart Bag Icon with Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors shadow-lg shadow-rose-900/30 flex items-center justify-center cursor-pointer"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-slate-900 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-rose-400"
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                onOpenLicense();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md text-sm font-medium text-emerald-400 hover:bg-slate-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.license}</span>
            </button>

            <button
              onClick={() => {
                onNavigateToSection('tracking-section');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md text-sm font-medium text-rose-400 hover:bg-slate-800 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>{t.tracking}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <div className="text-xs text-slate-400">
              {BUSINESS_INFO.address.shopNo}, {BUSINESS_INFO.address.market}, {BUSINESS_INFO.address.location}
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-rose-500" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
