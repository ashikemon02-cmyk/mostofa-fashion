import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { CartItem, PaymentMethod, Order } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';

interface QuickCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: Order) => void;
  lang: 'bn' | 'en';
}

export const QuickCheckoutModal: React.FC<QuickCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
  lang
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Sylhet');
  const [deliveryArea, setDeliveryArea] = useState<'inside_sylhet' | 'outside_sylhet'>('inside_sylhet');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  if (!isOpen || items.length === 0) return null;

  // Subtotal calculation (supporting wholesale tiers)
  const subtotal = items.reduce((sum, item) => {
    const isWholesale = item.quantity >= item.product.wholesaleMinQty;
    const price = isWholesale ? item.product.wholesalePrice : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // Free delivery threshold
  const isFreeDelivery = subtotal >= BUSINESS_INFO.delivery.freeDeliveryThreshold;
  const deliveryCharge = isFreeDelivery
    ? 0
    : deliveryArea === 'inside_sylhet'
    ? BUSINESS_INFO.delivery.insideSylhetFee
    : BUSINESS_INFO.delivery.outsideSylhetFee;

  const total = subtotal + deliveryCharge;

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে আপনার নাম লিখুন।' : 'Please enter your full name.');
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 11 || (!cleanPhone.startsWith('01') && !cleanPhone.startsWith('8801'))) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01813787559)।'
          : 'Please enter a valid 11-digit Bangladesh phone number.'
      );
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে বিস্তারিত ডেলিভারি ঠিকানা লিখুন (রোড, বাড়ি, এলাকা)।'
          : 'Please provide a detailed delivery address.'
      );
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'rocket') && !transactionId.trim()) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে পেমেন্ট করার পর ট্রানজেকশন আইডি (TrxID) লিখুন।'
          : 'Please enter your payment Transaction ID (TrxID).'
      );
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `MF-${randomSuffix}`;

    const newOrder: Order = {
      orderId: newOrderId,
      customerName: customerName.trim(),
      phone: cleanPhone,
      address: address.trim(),
      district: district.trim(),
      deliveryArea,
      items: [...items],
      subtotal,
      deliveryCharge,
      discount: 0,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'verified_paid',
      transactionId: transactionId.trim() || undefined,
      senderNumber: senderNumber.trim() || undefined,
      status: 'placed',
      courierName: deliveryArea === 'inside_sylhet' ? 'Steadfast Courier' : 'RedX Logistics',
      courierTrackingCode: `STF-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: deliveryArea === 'inside_sylhet' ? '২৪ থেকে ৪৮ ঘণ্টার মধ্যে' : '৪৮ থেকে ৭২ ঘণ্টার মধ্যে',
      createdAt: new Date().toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' }),
      notes: notes.trim() || undefined,
      timeline: [
        {
          title: 'Order Placed',
          titleBn: 'অর্ডার সফলভাবে গৃহীত হয়েছে',
          time: 'এইমাত্র',
          description: 'Order placed via online checkout portal.',
          descriptionBn: 'অনলাইন চেকআউটের মাধ্যমে সফলভাবে অর্ডার সাবমিট হয়েছে।',
          done: true,
          current: true
        },
        {
          title: 'Order Verification',
          titleBn: 'ফোন কনফার্মেশন ও ভেরিফিকেশন',
          time: 'অপেক্ষমাণ',
          description: 'Our customer support will call to confirm address.',
          descriptionBn: 'মোস্তফা ফ্যাশন টিম আপনার নম্বরে কল দিয়ে ঠিকানা কনফার্ম করবে।',
          done: false
        },
        {
          title: 'Quality Packaging',
          titleBn: 'প্যাকিং ও কোয়ালিটি চেকিং',
          time: 'অপেক্ষমাণ',
          description: 'Garments inspection and poly packaging.',
          descriptionBn: 'ওয়্যারহাউস থেকে নিখুঁত কোয়ালিটি চেকিং সম্পন্ন।',
          done: false
        },
        {
          title: 'Handover to Courier',
          titleBn: 'কুরিয়ারে হস্তান্তর',
          time: 'অপেক্ষমাণ',
          description: 'Handing over to courier partner.',
          descriptionBn: 'কুরিয়ার ডেলিভারি হাবে পার্সেল প্রেরণ।',
          done: false
        },
        {
          title: 'Delivered',
          titleBn: 'ডেলিভারি সম্পন্ন',
          time: 'অপেক্ষমাণ',
          description: 'Delivered to your doorstep.',
          descriptionBn: 'আপনার দরজায় নিরাপদ ডেলিভারি সম্পন্ন।',
          done: false
        }
      ]
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#141724] border border-slate-700/80 rounded-3xl shadow-2xl text-left my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-rose-500 font-black text-lg">MOSTOFA FASHION</span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-medium">
                {lang === 'bn' ? 'দ্রুত চেকআউট' : 'Quick Checkout'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
              {lang === 'bn' ? 'অর্ডার ও ডেলিভারি তথ্য' : 'Order & Delivery Details'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-rose-950/80 border border-rose-600 rounded-xl text-xs text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-6">
          
          {/* Section 1: Customer Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <span>১. {lang === 'bn' ? 'গ্রাহকের যোগাযোগের তথ্য' : 'Customer Details'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: মো: কামরুল হাসান' : 'e.g. Md. Kamrul Hasan'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Mobile Number (11 Digits) *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'bn' ? 'সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা) *' : 'Delivery Address *'}
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: বাড়ি ১২, লেন ৩, বিয়ানীবাজার বাজার এলাকা' : 'House, Road, Area'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'bn' ? 'জেলা / শহর' : 'District / City'}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="যেমন: সিলেট / ঢাকা"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            {/* Delivery Area Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'bn' ? 'ডেলিভারি এরিয়া নির্বাচন করুন:' : 'Select Delivery Zone:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label 
                  onClick={() => setDeliveryArea('inside_sylhet')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryArea === 'inside_sylhet'
                      ? 'bg-rose-950/40 border-rose-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryArea === 'inside_sylhet'}
                      onChange={() => setDeliveryArea('inside_sylhet')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {lang === 'bn' ? 'সিলেট জেলা ও বিয়ানীবাজার' : 'Inside Sylhet & Beanibazar'}
                      </div>
                      <div className="text-[10px] text-slate-400">২৪-৪৮ ঘণ্টার মধ্যে ডেলিভারি</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-rose-400">
                    {isFreeDelivery ? 'ফ্রি' : `৳${BUSINESS_INFO.delivery.insideSylhetFee}`}
                  </span>
                </label>

                <label 
                  onClick={() => setDeliveryArea('outside_sylhet')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryArea === 'outside_sylhet'
                      ? 'bg-rose-950/40 border-rose-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryArea === 'outside_sylhet'}
                      onChange={() => setDeliveryArea('outside_sylhet')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {lang === 'bn' ? 'সিলেটের বাইরে (সারা বাংলাদেশ)' : 'Outside Sylhet (All Bangladesh)'}
                      </div>
                      <div className="text-[10px] text-slate-400">৪৮-৭২ ঘণ্টার মধ্যে কুরিয়ার</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-rose-400">
                    {isFreeDelivery ? 'ফ্রি' : `৳${BUSINESS_INFO.delivery.outsideSylhetFee}`}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <span>২. {lang === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন' : 'Select Payment Method'}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Cash On Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-xl">💵</span>
                <span className="text-xs font-bold">{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash On Delivery'}</span>
                <span className="text-[10px] text-slate-500">{lang === 'bn' ? 'হাতে পেয়ে টাকা' : 'Pay at doorstep'}</span>
              </button>

              {/* bKash */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'bkash'
                    ? 'bg-pink-950/60 border-pink-500 text-pink-300 ring-1 ring-pink-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  b
                </div>
                <span className="text-xs font-bold">{lang === 'bn' ? 'বিকাশ' : 'bKash'}</span>
                <span className="text-[10px] text-slate-500">Send Money / Pay</span>
              </button>

              {/* Nagad */}
              <button
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'nagad'
                    ? 'bg-orange-950/60 border-orange-500 text-orange-300 ring-1 ring-orange-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  ন
                </div>
                <span className="text-xs font-bold">{lang === 'bn' ? 'নগদ' : 'Nagad'}</span>
                <span className="text-[10px] text-slate-500">Send Money</span>
              </button>

              {/* Rocket */}
              <button
                type="button"
                onClick={() => setPaymentMethod('rocket')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'rocket'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-300 ring-1 ring-purple-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  R
                </div>
                <span className="text-xs font-bold">{lang === 'bn' ? 'রকেট' : 'Rocket'}</span>
                <span className="text-[10px] text-slate-500">DBBL Rocket</span>
              </button>
            </div>

            {/* bKash / Nagad Payment Instructions Box */}
            {(paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'rocket') && (
              <div className="p-4 bg-slate-900/90 border border-pink-900/50 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">
                    {paymentMethod === 'bkash' ? 'বিকাশ' : paymentMethod === 'nagad' ? 'নগদ' : 'রকেট'} পার্সোনাল নম্বর:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-rose-400 text-sm">
                      {BUSINESS_INFO.payment.bkashPersonal}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyNumber(BUSINESS_INFO.payment.bkashPersonal)}
                      className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer transition-colors"
                      title="Copy Number"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 bg-black/40 p-2.5 rounded-lg border border-slate-800">
                  <div>১. আপনার {paymentMethod.toUpperCase()} অ্যাকাউন্ট থেকে 'Send Money' করুন।</div>
                  <div>২. প্রাপক নম্বর: <strong className="text-white font-mono">{BUSINESS_INFO.payment.bkashPersonal}</strong></div>
                  <div>৩. সর্বমোট টাকা পাঠাবেন: <strong className="text-rose-400 font-mono">৳{total}</strong></div>
                  <div>৪. সফল লেনদেনের পর নিচের ঘরে আপনার বিকাশ নম্বর ও TrxID লিখুন।</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {lang === 'bn' ? 'প্রেরক মোবাইল নম্বর *' : 'Sender Mobile No. *'}
                    </label>
                    <input
                      type="tel"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-black/50 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {lang === 'bn' ? 'ট্রানজেকশন আইডি (TrxID) *' : 'Transaction ID (TrxID) *'}
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="যেমন: BKS9283741"
                      className="w-full bg-black/50 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono uppercase placeholder-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Order Summary & Review */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {lang === 'bn' ? 'অর্ডার সারাংশ' : 'Order Summary'} ({items.length} {lang === 'bn' ? 'আইটেম' : 'items'})
            </h4>

            <div className="max-h-36 overflow-y-auto space-y-2 pr-1 text-xs">
              {items.map((it, idx) => {
                const isWholesale = it.quantity >= it.product.wholesaleMinQty;
                const unitP = isWholesale ? it.product.wholesalePrice : it.product.price;
                return (
                  <div key={idx} className="flex justify-between items-center text-slate-300 border-b border-slate-800/60 pb-1.5">
                    <span className="truncate max-w-[280px]">
                      {it.quantity}x {lang === 'bn' ? it.product.nameBn : it.product.name} ({it.selectedSize})
                    </span>
                    <span className="font-mono font-semibold text-white">৳{(unitP * it.quantity).toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{lang === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                <span className="font-mono text-white font-semibold">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                <span className="font-mono text-white font-semibold">
                  {isFreeDelivery ? <span className="text-emerald-400">FREE (৳০)</span> : `৳${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                <span>{lang === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
                <span className="text-rose-500 font-mono text-lg">৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {isSubmitting
                  ? (lang === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Processing Order...')
                  : (lang === 'bn' ? `অর্ডার নিশ্চিত করুন (৳${total.toLocaleString()})` : `Confirm Order (৳${total.toLocaleString()})`)}
              </span>
            </button>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'bn' ? 'মোস্তফা ফ্যাশন কর্তৃক ১০০% নিরাপদ ও বিশ্বস্ত ডেলিভারি' : '100% Secure & Reliable Service by Mostofa Fashion'}</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
