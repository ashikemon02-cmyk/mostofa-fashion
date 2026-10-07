import React, { useState } from 'react';
import { Package, Calculator, MessageCircle, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

interface WholesaleSectionProps {
  lang: 'bn' | 'en';
}

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({ lang }) => {
  const [selectedProductType, setSelectedProductType] = useState('panjabi');
  const [bulkQty, setBulkQty] = useState(25);
  const [shopName, setShopName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pricing formula by category
  const productRates: Record<string, { name: string; nameBn: string; baseRetail: number; wholesaleBase: number }> = {
    panjabi: { name: 'Executive Cotton-Silk Panjabi', nameBn: 'এক্সিকিউটিভ কটন সিল্ক পাঞ্জাবি', baseRetail: 1650, wholesaleBase: 950 },
    shirts: { name: 'Export Oxford Formal Shirts', nameBn: 'প্রিমিয়াম অক্সফোর্ড ফরমাল শার্ট', baseRetail: 1150, wholesaleBase: 650 },
    denim: { name: 'Export Heavy Denim Jeans', nameBn: 'এক্সপোর্ট স্ট্রেচ ডেনিম জিন্স', baseRetail: 1350, wholesaleBase: 780 },
    threepiece: { name: 'Designer Georgette 3-Piece', nameBn: 'ডিজাইনার জর্জেট থ্রি-পিস', baseRetail: 2450, wholesaleBase: 1450 },
    tshirts: { name: '220 GSM Drop-Shoulder T-Shirts', nameBn: '২২০ জিএসএম ড্রপ শোল্ডার টি-শার্ট', baseRetail: 550, wholesaleBase: 280 }
  };

  const currentRate = productRates[selectedProductType];

  // Tier discounts for volume:
  // 10-24 pcs: base wholesale
  // 25-49 pcs: additional 5% off
  // 50+ pcs: additional 10% off
  let extraDiscount = 0;
  if (bulkQty >= 50) {
    extraDiscount = 0.10;
  } else if (bulkQty >= 25) {
    extraDiscount = 0.05;
  }

  const effectiveWholesaleUnitPrice = Math.round(currentRate.wholesaleBase * (1 - extraDiscount));
  const estimatedTotal = effectiveWholesaleUnitPrice * bulkQty;
  const retailEquivalentTotal = currentRate.baseRetail * bulkQty;
  const totalShopkeeperSavings = retailEquivalentTotal - estimatedTotal;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiryMessage = `আসসালামু আলাইকুম মো: নিজাম উদ্দিন ভাই (মোস্তফা ফ্যাশন), আমি পাইকারি অর্ডারের জন্য জানতে চাচ্ছি:
দোকান/ব্যবসার নাম: ${shopName || 'ব্যবসায়ী'}
আইটেম: ${currentRate.nameBn}
পরিমাণ: ${bulkQty} পিস
আনুমানিক বাজেট: ৳${estimatedTotal.toLocaleString()}
জেলা: ${district || 'বাংলাদেশ'}
মোবাইল: ${contactPhone}`;

  return (
    <section id="wholesale-section" className="py-14 sm:py-20 bg-gradient-to-b from-[#0f111a] via-[#141724] to-[#10121c] border-b border-slate-800 scroll-mt-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800 text-rose-300 text-xs font-semibold">
            <Package className="w-3.5 h-3.5 text-rose-500" />
            <span>{lang === 'bn' ? 'আমদানি, রপ্তানি ও পাইকারি রেডিমেড গার্মেন্টস' : 'Import, Export & Wholesale Garments'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'দোকানদার ও পাইকারি বিক্রেতাদের জন্য বিশেষ রেট' : 'Wholesale Supply & Bulk Calculator'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            {lang === 'bn'
              ? 'মোস্তফা ফ্যাশন সরাসরি কারখানা থেকে তৈরি উন্নত মানের রেডিমেড পোশাক সরবরাহ করে। সারা বাংলাদেশের যেকোনো জেলা ও উপজেলায় কুরিয়ারের মাধ্যমে বাল্ক ডেলিভারি দেওয়া হয়।'
              : 'Direct factory pricing for fashion boutiques, showroom owners, and garments retailers across Bangladesh.'}
          </p>
        </div>

        {/* Content: Calculator Left + Inquiry Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Bulk Pricing Calculator */}
          <div className="lg:col-span-7 bg-[#161a29] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-600/20 text-rose-500 rounded-xl">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {lang === 'bn' ? 'পাইকারি মূল্য ও মুনাফা ক্যালকুলেটর' : 'Bulk Cost & Profit Estimator'}
                  </h3>
                  <div className="text-xs text-slate-400">
                    {lang === 'bn' ? 'সরাসরি কারখানার হোলসেল দর নির্ধারণ করুন' : 'Real-time volume tiered discount'}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded-full">
                  {lang === 'bn' ? 'মিল রেট নিশ্চিত' : 'Factory Direct'}
                </span>
              </div>
            </div>

            {/* Product Type Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                {lang === 'bn' ? 'পোশাকের ক্যাটাগরি বাছাই করুন:' : 'Select Garments Category:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(productRates).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedProductType(key)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedProductType === key
                        ? 'bg-rose-950/70 border-rose-500 text-white shadow-md shadow-rose-950/30'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{lang === 'bn' ? val.nameBn : val.name}</div>
                    <div className="text-[10px] text-rose-400 font-mono mt-0.5">পাইকারি @৳{val.wholesaleBase}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider & Presets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">
                  {lang === 'bn' ? 'অর্ডারের পরিমাণ (পিস):' : 'Order Quantity (Pcs):'}
                </span>
                <span className="text-rose-400 font-mono text-base font-extrabold">
                  {bulkQty} {lang === 'bn' ? 'পিস' : 'Pcs'}
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={bulkQty}
                onChange={(e) => setBulkQty(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />

              <div className="flex flex-wrap gap-2 pt-1">
                {[12, 24, 50, 100, 200].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setBulkQty(q)}
                    className={`px-3 py-1 text-xs rounded-lg border font-mono transition-colors cursor-pointer ${
                      bulkQty === q
                        ? 'bg-rose-600 text-white border-rose-500 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {q} পিস
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown Card */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-black/40 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">{lang === 'bn' ? 'খুচরা সাধারণ মূল্য' : 'Retail Price'}</div>
                  <div className="font-mono font-bold text-slate-300 mt-0.5">৳{currentRate.baseRetail}/pc</div>
                </div>

                <div className="bg-black/40 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">{lang === 'bn' ? 'আপনার পাইকারি দর' : 'Wholesale Rate'}</div>
                  <div className="font-mono font-extrabold text-emerald-400 mt-0.5">
                    ৳{effectiveWholesaleUnitPrice}/pc
                  </div>
                </div>

                <div className="bg-black/40 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-slate-400">{lang === 'bn' ? 'ভলিউম ডিসকাউন্ট' : 'Volume Bonus'}</div>
                  <div className="font-mono font-bold text-rose-400 mt-0.5">
                    {extraDiscount > 0 ? `${extraDiscount * 100}% এক্সট্রা ছাড়` : 'স্ট্যান্ডার্ড লট'}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">{lang === 'bn' ? 'আনুমানিক মোট প্রদেয়:' : 'Estimated Total:'}</div>
                  <div className="text-xl sm:text-2xl font-black text-rose-500 font-mono">
                    ৳{estimatedTotal.toLocaleString()}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">{lang === 'bn' ? 'আপনার সম্ভাব্য লাভ:' : 'Your Margin/Profit:'}</div>
                  <div className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
                    +৳{totalShopkeeperSavings.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quote Button */}
            <a
              href={`${BUSINESS_INFO.whatsappUrl}${encodeURIComponent(whatsappInquiryMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'bn' ? 'এই পাইকারি কোটেশন হোয়াটসঅ্যাপে পাঠান' : 'Send Bulk Quote via WhatsApp'}</span>
            </a>
          </div>

          {/* Right Column: Wholesale Inquiry Submission Form */}
          <div className="lg:col-span-5 bg-[#161a29] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="mb-6 space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {lang === 'bn' ? 'পাইকারি ডিলারশিপ ও অর্ডার ফরম' : 'Wholesale Dealer Inquiry'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn'
                  ? 'আপনার দোকানের তথ্য দিন, মোস্তফা ফ্যাশন থেকে সর্বোচ্চ অগ্রাধিকার দিয়ে যোগাযোগ করা হবে।'
                  : 'Submit your shop details to get priority wholesale catalogue.'}
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h4 className="font-bold text-white text-base">
                  {lang === 'bn' ? 'আপনার রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে!' : 'Inquiry Submitted Successfully!'}
                </h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  {lang === 'bn'
                    ? `মোস্তফা ফ্যাশনের প্রোপ্রাইটর মো: নিজাম উদ্দিন শীঘ্রই আপনার সাথে ${contactPhone} নম্বরে যোগাযোগ করবেন।`
                    : 'We will contact you shortly with our wholesale sample pack.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'আরেকটি ফরম পূরণ করুন' : 'Submit Another'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Contact Person Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: মো: নিজাম উদ্দিন' : 'Full Name'}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {lang === 'bn' ? 'দোকান বা ব্যবসা প্রতিষ্ঠানের নাম *' : 'Shop / Business Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: ভাই ভাই ফ্যাশন' : 'Shop Name'}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {lang === 'bn' ? 'জেলা / উপজেলা *' : 'District *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder={lang === 'bn' ? 'যেমন: সিলেট' : 'District'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
                  >
                    {lang === 'bn' ? 'পাইকারি ইনকোয়ারি সাবমিট করুন' : 'Submit Wholesale Inquiry'}
                  </button>
                </div>

                {/* Direct Call Line */}
                <div className="pt-3 border-t border-slate-800 text-center text-slate-400">
                  <div>{lang === 'bn' ? 'জরুরি প্রয়োজনে সরাসরি কল করুন:' : 'Urgent wholesale hotline:'}</div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-bold text-rose-400 text-sm font-mono hover:underline inline-flex items-center gap-1.5 mt-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{BUSINESS_INFO.phone}</span>
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
