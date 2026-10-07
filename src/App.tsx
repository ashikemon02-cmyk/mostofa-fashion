import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  ChevronRight,
  ShieldCheck,
  Truck,
  Layers,
  Phone
} from 'lucide-react';
import { Product, CartItem, Order, Category } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { INITIAL_ORDERS } from './data/mockOrders';
import { BUSINESS_INFO } from './data/businessInfo';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { QuickCheckoutModal } from './components/QuickCheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTracking } from './components/OrderTracking';
import { WholesaleSection } from './components/WholesaleSection';
import { TradeLicenseModal } from './components/TradeLicenseModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  // Language State
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mf_cart_items');
      if (!saved) return [];
      const parsed: CartItem[] = JSON.parse(saved);
      return parsed.map((item) => {
        const latest = INITIAL_PRODUCTS.find((p) => p.id === item.product.id);
        return latest ? { ...item, product: latest } : item;
      });
    } catch {
      return [];
    }
  });

  // Orders Persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mf_user_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_ORDERS];
      }
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mf_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, size: string, color: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedSize === size && it.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedSize: size,
            selectedColor: color,
            quantity
          }
        ];
      }
    });

    showToast(
      lang === 'bn'
        ? `"${product.nameBn}" কার্টে যুক্ত করা হয়েছে!`
        : `Added "${product.name}" to your bag!`
    );
  };

  // Instant 1-click buy now
  const handleInstantBuy = (product: Product, size: string, color: string, quantity: number) => {
    handleAddToCart(product, size, color, quantity);
    setIsCheckoutOpen(true);
  };

  // Cart Item Modifications
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Order Placement
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    try {
      const existingSaved = localStorage.getItem('mf_user_orders');
      const parsed = existingSaved ? JSON.parse(existingSaved) : [];
      localStorage.setItem('mf_user_orders', JSON.stringify([newOrder, ...parsed]));
    } catch (e) {
      console.error(e);
    }

    setCartItems([]);
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);
  };

  const handleTrackSpecificOrder = (orderId: string) => {
    const trackingElem = document.getElementById('tracking-section');
    if (trackingElem) {
      trackingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(
      lang === 'bn'
        ? `অর্ডার #${orderId} সফলভাবে ক্লোজ করা হয়েছে!`
        : `Order #${orderId} closed successfully!`
    );
  };

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Sort Products
  const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || p.subcategory === selectedSubcategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.nameBn.includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.subcategoryBn.includes(q) ||
      p.fabric.toLowerCase().includes(q);

    return matchesCategory && matchesSubcategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  // Extract unique subcategories for the active category
  const availableSubcategories = Array.from(
    new Set(
      INITIAL_PRODUCTS.filter((p) => selectedCategory === 'all' || p.category === selectedCategory).map(
        (p) => p.subcategory
      )
    )
  );

  const cartTotalItemsCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0e1017] text-slate-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        cartCount={cartTotalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToSection={navigateToSection}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory('all');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        lang={lang}
        onToggleLang={() => setLang(lang === 'bn' ? 'en' : 'bn')}
        onOpenLicense={() => setIsLicenseOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Banner with Brand Story and Physical Location */}
        <HeroBanner
          onExploreClick={() => navigateToSection('products-section')}
          onWholesaleClick={() => navigateToSection('wholesale-section')}
          onTrackClick={() => navigateToSection('tracking-section')}
          onOpenLicense={() => setIsLicenseOpen(true)}
          lang={lang}
        />

        {/* Product Catalog Section */}
        <section id="products-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          
          {/* Section Header & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left">
            <div>
              <div className="flex items-center gap-2 text-rose-500 font-bold uppercase tracking-wider text-xs font-display">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'bn' ? 'লেটেস্ট গার্মেন্টস কালেকশন' : 'Latest Garments Catalog'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {lang === 'bn' ? 'আকর্ষণীয় ফ্যাশন ও পাইকারি সম্ভার' : 'Curated Ready-Made & Wholesale Collection'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                {lang === 'bn'
                  ? 'খুচরা গ্রাহকদের জন্য আকর্ষণীয় ছাড় এবং দোকানদারদের জন্য আকর্ষণীয় পাইকারি রেট।'
                  : 'Premium men\'s wear, women\'s boutique, and high-margin bulk wholesale lots.'}
              </p>
            </div>

            {/* Sort & Order Action */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সর্ট করুন:' : 'Sort:'}</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="featured">{lang === 'bn' ? 'ফিচার্ড ও জনপ্রিয়' : 'Featured'}</option>
                <option value="price_low">{lang === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
                <option value="price_high">{lang === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
                <option value="rating">{lang === 'bn' ? 'সেরা রেটিং' : 'Customer Rating'}</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-2xl mb-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', labelBn: 'সকল কালেকশন', labelEn: 'All Collection', count: INITIAL_PRODUCTS.length },
              { id: 'mens', labelBn: 'পুরুষদের পোশাক', labelEn: "Men's Clothing", count: INITIAL_PRODUCTS.filter(p => p.category === 'mens').length },
              { id: 'womens', labelBn: 'মহিলাদের পোশাক', labelEn: "Women's Clothing", count: INITIAL_PRODUCTS.filter(p => p.category === 'womens').length },
              { id: 'wholesale', labelBn: 'পাইকারি লট', labelEn: 'Wholesale Lots', count: INITIAL_PRODUCTS.filter(p => p.category === 'wholesale').length },
              { id: 'readymade', labelBn: 'টি-শার্ট ও পোলো শার্ট', labelEn: 'T-Shirts & Polos', count: INITIAL_PRODUCTS.filter(p => p.category === 'readymade').length },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id as Category);
                    setSelectedSubcategory('all');
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{lang === 'bn' ? cat.labelBn : cat.labelEn}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subcategory Secondary Row */}
          {availableSubcategories.length > 1 && (
            <div className="flex items-center gap-2 mb-8 overflow-x-auto text-xs py-1">
              <span className="text-slate-400 text-[11px] shrink-0">
                {lang === 'bn' ? 'ধরন:' : 'Type:'}
              </span>
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3 py-1 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                  selectedSubcategory === 'all'
                    ? 'border-rose-500 bg-rose-950/60 text-white font-bold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'bn' ? 'সব ধরন' : 'All Types'}
              </button>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3 py-1 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedSubcategory === sub
                      ? 'border-rose-500 bg-rose-950/60 text-white font-bold'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-slate-900/50 rounded-3xl border border-slate-800 p-8 space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="font-bold text-white text-base">
                {lang === 'bn' ? 'কোনো প্রোডাক্ট পাওয়া যায়নি' : 'No products found'}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {lang === 'bn'
                  ? 'আপনার সার্চ ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।'
                  : 'Try searching with a different term or clear filters.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                {lang === 'bn' ? 'সব প্রোডাক্ট দেখুন' : 'Reset All Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  onInstantBuy={handleInstantBuy}
                  lang={lang}
                />
              ))}
            </div>
          )}

        </section>

        {/* Wholesale Section & Calculator */}
        <WholesaleSection lang={lang} />

        {/* Fast Delivery Tracking System */}
        <OrderTracking 
          orders={orders} 
          lang={lang} 
          onUpdateOrderStatus={handleUpdateOrderStatus} 
        />

        {/* Physical Shop Visit & Google Map Location Card */}
        <section className="py-12 bg-[#0c0e15] border-t border-slate-800 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800 text-rose-300 text-xs font-semibold">
                  <span>🏪 {lang === 'bn' ? 'সরাসরি শোরুমে আমন্ত্রণ' : 'Visit Our Physical Showroom'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {BUSINESS_INFO.address.shopNo}, {BUSINESS_INFO.address.market}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'bn'
                    ? `${BUSINESS_INFO.address.fullAddressBn} যেকোনো দিন এসে সরাসরি কোয়ালিটি দেখে খুচরা ও পাইকারি ক্রয় করতে পারেন। পাইকারি ব্যবসায়ীদের জন্য বিশেষ চা আপ্যায়নের ব্যবস্থা রয়েছে।`
                    : `Located at ${BUSINESS_INFO.address.fullAddress}. Visit our showroom to inspect fabrics and discuss wholesale volume partnerships with proprietor ${BUSINESS_INFO.proprietor}.`}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                  <div className="text-slate-300">
                    {lang === 'bn' ? 'প্রোপ্রাইটর: ' : 'Proprietor: '}
                    <strong className="text-white">{BUSINESS_INFO.proprietor}</strong>
                  </div>
                  <span className="text-slate-700">•</span>
                  <div className="text-slate-300">
                    {lang === 'bn' ? 'মোবাইল: ' : 'Phone: '}
                    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-rose-400 font-mono font-bold hover:underline">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সরাসরি কল দিন' : 'Call Now'}</span>
                </a>

                <button
                  onClick={() => setIsLicenseOpen(true)}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bn' ? 'লাইসেন্স ডকুমেন্ট' : 'Trade License'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateToSection('products-section');
        }}
        onNavigateToSection={navigateToSection}
        onOpenLicense={() => setIsLicenseOpen(true)}
        lang={lang}
      />

      {/* Floating Instant Contact */}
      <FloatingWhatsApp lang={lang} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        lang={lang}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        lang={lang}
      />

      {/* Quick Checkout Modal */}
      <QuickCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderPlaced}
        lang={lang}
      />

      {/* Order Confirmation & Printable Invoice Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onTrackOrder={handleTrackSpecificOrder}
        lang={lang}
      />

      {/* Trade License Modal */}
      <TradeLicenseModal
        isOpen={isLicenseOpen}
        onClose={() => setIsLicenseOpen(false)}
        lang={lang}
      />

      {/* Quick Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-rose-500/80 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
