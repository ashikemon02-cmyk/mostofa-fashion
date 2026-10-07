import React, { useState } from 'react';
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { Order } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';

interface OrderTrackingProps {
  orders: Order[];
  lang: 'bn' | 'en';
  onUpdateOrderStatus?: (orderId: string, newStatus: any) => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orders, lang, onUpdateOrderStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSearched(true);

    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে অর্ডার আইডি বা ফোন নম্বর লিখুন।' : 'Please enter Order ID or Phone.');
      return;
    }

    const matched = orders.find((o) => {
      const matchId = o.orderId.toLowerCase() === query || o.orderId.toLowerCase().replace('-', '') === query;
      const matchPhone = o.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''));
      const matchCourier = o.courierTrackingCode.toLowerCase() === query;
      return matchId || matchPhone || matchCourier;
    });

    if (matched) {
      setFoundOrder(matched);
      setErrorMsg('');
    } else {
      setFoundOrder(null);
      setErrorMsg(
        lang === 'bn'
          ? `"${searchQuery}" দিয়ে কোনো অর্ডার পাওয়া যায়নি। সঠিক অর্ডার আইডি বা মোবাইল নম্বর দিন।`
          : `No order found for "${searchQuery}". Please check your details.`
      );
    }
  };

  const selectDemoOrder = (orderId: string) => {
    setSearchQuery(orderId);
    const matched = orders.find((o) => o.orderId === orderId);
    if (matched) {
      setFoundOrder(matched);
      setErrorMsg('');
      setSearched(true);
    }
  };

  const handleCloseTracking = () => {
    setFoundOrder(null);
    setSearchQuery('');
    setErrorMsg('');
    setSearched(false);
  };

  const handleMarkAsClosed = (orderId: string) => {
    if (foundOrder && foundOrder.orderId === orderId) {
      const updated: Order = {
        ...foundOrder,
        status: 'delivered',
        estimatedDelivery: 'ডেলিভারি সম্পন্ন ও ক্লোজড',
        timeline: foundOrder.timeline.map((step) => {
          if (step.title.toLowerCase().includes('deliver') || step.titleBn.includes('ডেলিভারি')) {
            return {
              ...step,
              titleBn: 'সফলভাবে ডেলিভারি সম্পন্ন ও ক্লোজড',
              descriptionBn: 'গ্রাহকের নিকট পার্সেল পৌঁছে দিয়ে অর্ডার ক্লোজ করা হয়েছে।',
              done: true,
              current: true,
              time: 'এইমাত্র ক্লোজড'
            };
          }
          return { ...step, done: true, current: false };
        })
      };
      setFoundOrder(updated);
      if (onUpdateOrderStatus) {
        onUpdateOrderStatus(orderId, 'delivered');
      }
    }
  };

  return (
    <section id="tracking-section" className="py-12 sm:py-16 bg-[#0f111a] border-t border-b border-slate-800 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5 text-rose-500" />
            <span>{lang === 'bn' ? 'স্মার্ট কুরিয়ার ট্র্যাকিং' : 'Real-time Courier Tracking'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {lang === 'bn' ? 'দ্রুত ডেলিভারি ট্র্যাকিং সিস্টেম' : 'Live Order & Delivery Tracking'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {lang === 'bn'
              ? 'আপনার অর্ডার আইডি (যেমন: MF-89241) অথবা অর্ডার করার মোবাইল নম্বর দিয়ে পার্সেলের বর্তমান অবস্থান জানুন।'
              : 'Enter your Order ID (e.g. MF-89241) or Mobile Number to check real-time courier shipment status.'}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'bn' ? 'অর্ডার আইডি বা মোবাইল নম্বর লিখুন...' : 'Order ID (MF-89241) or Phone...'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-950/40 transition-all cursor-pointer whitespace-nowrap"
            >
              {lang === 'bn' ? 'ট্র্যাক করুন' : 'Track'}
            </button>
          </form>

          {/* Quick Demo Chips for Instant Testing */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400 justify-center">
            <span>{lang === 'bn' ? 'উদাহরণ ট্র্যাকিং:' : 'Quick Demo:'}</span>
            <button
              type="button"
              onClick={() => selectDemoOrder('MF-89241')}
              className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-emerald-300 rounded-lg border border-emerald-900/60 cursor-pointer font-mono text-[11px] flex items-center gap-1"
            >
              <span>✓ MF-89241 ({lang === 'bn' ? 'ডেলিভারি সম্পন্ন ও ক্লোজড' : 'Delivered & Closed'})</span>
            </button>
            <button
              type="button"
              onClick={() => selectDemoOrder('MF-89242')}
              className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 cursor-pointer font-mono text-[11px]"
            >
              MF-89242 ({lang === 'bn' ? 'কুরিয়ারে ট্রানজিটে' : 'In Transit'})
            </button>
          </div>

          {errorMsg && (
            <div className="mt-3 p-3 bg-rose-950/70 border border-rose-600 rounded-xl text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tracking Details View */}
        {foundOrder && (
          <div className="relative bg-[#141724] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-8 animate-in fade-in duration-300">
            
            {/* Top Bar with Close Button */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Truck className="w-4 h-4 text-rose-500" />
                <span>{lang === 'bn' ? 'লাইভ কুরিয়ার কনসাইনমেন্ট স্ট্যাটাস' : 'Live Shipment Consignment'}</span>
              </div>
              <button
                type="button"
                onClick={handleCloseTracking}
                className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-rose-900/50 hover:text-white text-slate-400 rounded-lg text-xs transition-colors cursor-pointer border border-slate-700"
                title="Close Tracking"
              >
                <span>✕ {lang === 'bn' ? 'ট্র্যাকিং বন্ধ করুন' : 'Close Tracking'}</span>
              </button>
            </div>

            {/* Top Order Information Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">
                    #{foundOrder.orderId}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                    foundOrder.status === 'delivered'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                      : foundOrder.status === 'out_for_delivery'
                      ? 'bg-amber-950 text-amber-300 border border-amber-700 animate-pulse'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {foundOrder.status === 'delivered' ? (
                      <>
                        <span>✓</span>
                        <span>{lang === 'bn' ? 'ডেলিভারি সম্পন্ন ও ক্লোজড' : 'Delivered & Closed'}</span>
                      </>
                    ) : foundOrder.status === 'out_for_delivery' ? (
                      'Out For Delivery'
                    ) : (
                      foundOrder.status.replace('_', ' ')
                    )}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {lang === 'bn' ? 'অর্ডার গ্রহণের সময়:' : 'Placed on:'}{' '}
                  <span className="text-slate-300">{foundOrder.createdAt}</span>
                </div>
              </div>

              {/* Courier Partner & Consignment Code */}
              <div className="flex flex-wrap items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400">{lang === 'bn' ? 'ডেলিভারি পার্টনার:' : 'Courier Partner:'}</div>
                  <div className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Truck className="w-3.5 h-3.5 text-rose-500" />
                    <span>{foundOrder.courierName}</span>
                  </div>
                </div>

                <div className="border-l border-slate-800 pl-3">
                  <div className="text-slate-400">{lang === 'bn' ? 'কনসাইনমেন্ট কোড:' : 'Tracking Code:'}</div>
                  <div className="font-mono font-bold text-rose-400 mt-0.5">
                    {foundOrder.courierTrackingCode}
                  </div>
                </div>

                <div className="border-l border-slate-800 pl-3">
                  <div className="text-slate-400">{lang === 'bn' ? 'স্ট্যাটাস / ডেলিভারি:' : 'Delivery Status:'}</div>
                  <div className={`font-bold mt-0.5 ${foundOrder.status === 'delivered' ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {foundOrder.estimatedDelivery}
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient & Destination Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold">{lang === 'bn' ? 'প্রাপকের নাম ও মোবাইল:' : 'Recipient:'}</span>
                <div className="font-bold text-white text-sm">{foundOrder.customerName}</div>
                <div className="font-mono text-slate-300">{foundOrder.phone}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold">{lang === 'bn' ? 'ডেলিভারি ঠিকানা:' : 'Destination Address:'}</span>
                <div className="text-slate-200">{foundOrder.address}, {foundOrder.district}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold">{lang === 'bn' ? 'পেমেন্ট ও সর্বমোট বিল:' : 'Payment & Total:'}</span>
                <div className="text-white font-extrabold text-sm font-mono">৳{foundOrder.total.toLocaleString()}</div>
                <div className="text-slate-400 flex items-center gap-1.5">
                  <span className="uppercase text-[11px] font-semibold text-rose-400">{foundOrder.paymentMethod}</span>
                  <span>•</span>
                  <span className={foundOrder.paymentStatus === 'verified_paid' ? 'text-emerald-400' : 'text-amber-400'}>
                    {foundOrder.paymentStatus === 'verified_paid' ? 'Paid' : 'Cash On Delivery'}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Step-by-Step Delivery Progress Stepper */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                {lang === 'bn' ? 'লাইভ ডেলিভারি টাইমলাইন' : 'Live Delivery Timeline'}
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {foundOrder.timeline.map((step, index) => {
                  const isDone = step.done;
                  const isCurrent = step.current;

                  return (
                    <div key={index} className="relative group">
                      {/* Step Indicator Dot */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                          isDone
                            ? 'bg-rose-600 border-rose-500 text-white'
                            : 'bg-slate-900 border-slate-700 text-slate-600'
                        } ${isCurrent ? 'ring-4 ring-rose-500/30' : ''}`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                      </div>

                      {/* Step Details */}
                      <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'text-white' : 'text-slate-400'}`}>
                            {lang === 'bn' ? step.titleBn : step.title}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-400">{step.time}</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          {lang === 'bn' ? step.descriptionBn : step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Support & Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                {foundOrder.status !== 'delivered' ? (
                  <button
                    type="button"
                    onClick={() => handleMarkAsClosed(foundOrder.orderId)}
                    className="px-3.5 py-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600 text-emerald-300 font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>✓</span>
                    <span>{lang === 'bn' ? 'অর্ডারটি ডেলিভারি ও ক্লোজ করুন' : 'Mark Delivered & Close'}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'bn' ? 'এই অর্ডারটির ট্র্যাকিং সফলভাবে ক্লোজড' : 'This Order is Successfully Closed'}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCloseTracking}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold cursor-pointer border border-slate-700 transition-colors"
                >
                  {lang === 'bn' ? 'ট্র্যাকিং বন্ধ করুন' : 'Close View'}
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-1.5 transition-colors font-medium border border-slate-700"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-500" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>

                <a
                  href={`${BUSINESS_INFO.whatsappUrl}${encodeURIComponent(
                    `আসসালামু আলাইকুম, আমি মোস্তফা ফ্যাশনের অর্ডার #${foundOrder.orderId} এর ডেলিভারি তথ্য জানতে চাচ্ছি।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1.5 transition-colors font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
