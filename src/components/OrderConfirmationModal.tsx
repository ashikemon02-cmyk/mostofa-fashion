import React from 'react';
import { CheckCircle2, Truck, Printer, MessageCircle, X, Download, ShieldCheck } from 'lucide-react';
import { Order } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { BrandLogo } from './BrandLogo';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
  lang: 'bn' | 'en';
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder,
  lang
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#141724] border border-slate-700 rounded-3xl shadow-2xl text-left my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Close */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!' : 'Order Placed Successfully!'}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Official Invoice Body (Stylized like the Official Pad BP.png) */}
        <div id="printable-invoice" className="p-6 sm:p-8 space-y-6 text-slate-200">
          
          {/* Letterhead Header echoing BP.png */}
          <div className="border-b-2 border-rose-600 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <BrandLogo variant="dark" size="md" showSubtitle={true} />
              </div>

              <div className="text-right text-xs space-y-0.5">
                <div className="font-bold text-white text-sm">{BUSINESS_INFO.proprietor}</div>
                <div className="text-slate-400">Proprietor</div>
                <div className="font-mono text-rose-400 font-semibold">{BUSINESS_INFO.phone}</div>
                <div className="text-slate-400 text-[11px]">{BUSINESS_INFO.email}</div>
              </div>
            </div>

            {/* Address Banner Strip */}
            <div className="mt-3 py-1.5 px-3 bg-black/60 rounded-lg text-[11px] text-slate-300 flex items-center justify-between flex-wrap gap-2">
              <span>📍 {BUSINESS_INFO.address.shopNo}, {BUSINESS_INFO.address.market}, {BUSINESS_INFO.address.location}, Sylhet.</span>
              <span className="text-emerald-400 font-medium">Trade Lic: {BUSINESS_INFO.tradeLicense.licenseNo}</span>
            </div>

            {/* Official Ref & Date Line (From Pad) */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div>
                <span>Ref: </span>
                <strong className="text-rose-400">MF/INV/{order.orderId}</strong>
              </div>
              <div>
                <span>Date: </span>
                <strong className="text-white">{order.createdAt}</strong>
              </div>
            </div>
          </div>

          {/* Customer & Courier Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                {lang === 'bn' ? 'বিলিং ও ডেলিভারি প্রাপক' : 'Customer Info'}
              </span>
              <div className="font-bold text-white text-sm">{order.customerName}</div>
              <div className="text-slate-300 font-mono">{order.phone}</div>
              <div className="text-slate-300">{order.address}, {order.district}</div>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                {lang === 'bn' ? 'কুরিয়ার ও পেমেন্ট বিবরণী' : 'Courier & Payment'}
              </span>
              <div className="font-bold text-white">{order.courierName}</div>
              <div className="text-rose-400 font-mono text-[11px]">
                Tracking: {order.courierTrackingCode}
              </div>
              <div className="text-slate-300 capitalize">
                {lang === 'bn' ? 'পেমেন্ট মেথড: ' : 'Payment: '}
                <strong className="text-white uppercase">{order.paymentMethod}</strong>{' '}
                ({order.paymentStatus === 'verified_paid' ? 'Paid' : 'COD'})
              </div>
              {order.transactionId && (
                <div className="text-[11px] font-mono text-emerald-400">
                  TrxID: {order.transactionId}
                </div>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 text-left">{lang === 'bn' ? 'বিবরণ' : 'Item'}</th>
                  <th className="p-3 text-center">{lang === 'bn' ? 'সাইজ/রং' : 'Variant'}</th>
                  <th className="p-3 text-center">{lang === 'bn' ? 'পরিমাণ' : 'Qty'}</th>
                  <th className="p-3 text-right">{lang === 'bn' ? 'মূল্য' : 'Amount'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {order.items.map((it, idx) => {
                  const isWholesale = it.quantity >= it.product.wholesaleMinQty;
                  const unitPrice = isWholesale ? it.product.wholesalePrice : it.product.price;
                  return (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="p-3 font-semibold text-white">
                        {lang === 'bn' ? it.product.nameBn : it.product.name}
                      </td>
                      <td className="p-3 text-center text-slate-400">
                        {it.selectedSize} / {it.selectedColor}
                      </td>
                      <td className="p-3 text-center font-mono">{it.quantity}</td>
                      <td className="p-3 text-right font-mono font-bold text-white">
                        ৳{(unitPrice * it.quantity).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Calculations Breakdown */}
            <div className="bg-slate-900/90 p-4 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{lang === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                <span className="font-mono text-white">৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                <span className="font-mono text-white">
                  {order.deliveryCharge === 0 ? 'FREE (৳০)' : `৳${order.deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-extrabold text-white pt-2 border-t border-slate-800">
                <span>{lang === 'bn' ? 'সর্বমোট প্রদেয় বিল:' : 'Total Payable:'}</span>
                <span className="text-rose-500 font-mono text-lg">৳{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onTrackOrder(order.orderId);
              }}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Truck className="w-4 h-4" />
              <span>{lang === 'bn' ? 'লাইভ কুরিয়ার ট্র্যাক করুন' : 'Track This Order Now'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ইনভয়েস প্রিন্ট' : 'Print Invoice'}</span>
            </button>

            <a
              href={`${BUSINESS_INFO.whatsappUrl}${encodeURIComponent(
                `আসসালামু আলাইকুম মো: নিজাম উদ্দিন ভাই, আমি মোস্তফা ফ্যাশনে অর্ডার করেছি। আমার অর্ডার আইডি #${order.orderId}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
