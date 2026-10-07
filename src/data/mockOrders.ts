import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    orderId: 'MF-89241',
    customerName: 'Md. Nizam Uddin',
    phone: '01813787559',
    address: 'Azir Shopping Complex, Shop 204-205, South Beanibazar',
    district: 'Sylhet',
    deliveryArea: 'inside_sylhet',
    items: [
      {
        product: {
          id: 'mf-p-101',
          name: 'Executive Cotton Silk Embroidered Panjabi',
          nameBn: 'এক্সিকিউটিভ কটন সিল্ক এমব্রয়ডারি পাঞ্জাবি',
          category: 'mens',
          subcategory: 'Panjabi',
          subcategoryBn: 'পাঞ্জাবি',
          price: 1650,
          originalPrice: 2200,
          wholesalePrice: 950,
          wholesaleMinQty: 10,
          image: '/images/products/panjabi.jpg',
          description: '',
          descriptionBn: '',
          sizes: ['42 (L)'],
          colors: [{ name: 'Royal White', hex: '#f8fafc' }],
          fabric: 'Mercerized Cotton-Silk',
          fabricBn: 'মার্সারাইজড কটন-সিল্ক',
          inStock: true,
          stockCount: 120,
          rating: 4.9,
          reviewsCount: 38
        },
        selectedSize: '42 (L)',
        selectedColor: 'Royal White',
        quantity: 2
      },
      {
        product: {
          id: 'mf-p-103',
          name: 'Export Quality Stretch Denim Jeans (Slim-Straight)',
          nameBn: 'এক্সপোর্ট কোয়ালিটি স্ট্রেচ ডেনিম জিন্স প্যান্ট',
          category: 'mens',
          subcategory: 'Denim',
          subcategoryBn: 'জিন্স প্যান্ট',
          price: 1350,
          originalPrice: 1850,
          wholesalePrice: 780,
          wholesaleMinQty: 12,
          image: '/images/products/denim_jeans.jpg',
          description: '',
          descriptionBn: '',
          sizes: ['32'],
          colors: [{ name: 'Vintage Dark Indigo', hex: '#1e293b' }],
          fabric: '98% Cotton Denim',
          fabricBn: '৯৮% কটন ডেনিম',
          inStock: true,
          stockCount: 150,
          rating: 4.9,
          reviewsCount: 52
        },
        selectedSize: '32',
        selectedColor: 'Vintage Dark Indigo',
        quantity: 1
      }
    ],
    subtotal: 4650,
    deliveryCharge: 60,
    discount: 150,
    total: 4560,
    paymentMethod: 'bkash',
    paymentStatus: 'verified_paid',
    transactionId: 'BKS928374102',
    senderNumber: '01813787559',
    status: 'delivered',
    courierName: 'Steadfast Courier',
    courierTrackingCode: 'STF-SYL-992384',
    estimatedDelivery: 'ডেলিভারি সম্পন্ন ও ক্লোজড',
    createdAt: '2026-10-04 10:15 AM',
    timeline: [
      {
        title: 'Order Placed',
        titleBn: 'অর্ডার গৃহীত হয়েছে',
        time: '০৪ অক্টোবর ২০২৬, সকাল ১০:১৫',
        description: 'Order received via online portal and verified.',
        descriptionBn: 'অনলাইন চেকআউটের মাধ্যমে সফলভাবে অর্ডার সাবমিট হয়েছে।',
        done: true
      },
      {
        title: 'Order Confirmed & Paid',
        titleBn: 'অর্ডার কনফার্ম ও পেমেন্ট ভেরিফাইড',
        time: '০৪ অক্টোবর ২০২৬, সকাল ১০:৪৫',
        description: 'Payment of ৳4,560 verified via bKash (TrxID: BKS928374102).',
        descriptionBn: 'বিকাশ পেমেন্ট (TrxID: BKS928374102) সফলভাবে যাচাই করা হয়েছে।',
        done: true
      },
      {
        title: 'Packaging & Quality Check',
        titleBn: 'প্যাকিং ও কোয়ালিটি চেকিং',
        time: '০৪ অক্টোবর ২০২৬, দুপুর ০১:৩০',
        description: 'Items double-checked for stitching quality & sealed in security poly.',
        descriptionBn: 'মোস্তফা ফ্যাশন ওয়্যারহাউস থেকে কোয়ালিটি চেক করে সিকিউরিটি প্যাকেজিং সম্পন্ন।',
        done: true
      },
      {
        title: 'Dispatched to Courier',
        titleBn: 'কুরিয়ারে হস্তান্তর',
        time: '০৪ অক্টোবর ২০২৬, বিকাল ০৪:০০',
        description: 'Handed over to Steadfast Courier Hub (Consignment # STF-SYL-992384).',
        descriptionBn: 'স্টিডফাস্ট কুরিয়ার হাবে পার্সেল বুঝিয়ে দেওয়া হয়েছে।',
        done: true
      },
      {
        title: 'Out for Delivery',
        titleBn: 'ডেলিভারির জন্য বের হয়েছিল',
        time: '০৫ অক্টোবর ২০২৬, সকাল ০৯:০০',
        description: 'Delivery rider was on the way to destination.',
        descriptionBn: 'কুরিয়ার রাইডার পার্সেল নিয়ে গন্তব্যের উদ্দেশ্যে রওনা হয়েছিল।',
        done: true
      },
      {
        title: 'Delivered & Closed',
        titleBn: 'সফলভাবে ডেলিভারি সম্পন্ন ও ক্লোজড',
        time: '০৫ অক্টোবর ২০২৬, সকাল ১১:৩০',
        description: 'Package successfully delivered and order closed.',
        descriptionBn: 'গ্রাহকের নিকট সফলভাবে পার্সেল বুঝিয়ে দেওয়া হয়েছে এবং অর্ডার ট্র্যাকিং ক্লোজ করা হয়েছে।',
        done: true,
        current: true
      }
    ]
  },
  {
    orderId: 'MF-89242',
    customerName: 'Kabir Ahmed',
    phone: '01711223344',
    address: 'Road 12, Dhanmondi, Dhaka',
    district: 'Dhaka',
    deliveryArea: 'outside_sylhet',
    items: [
      {
        product: {
          id: 'mf-p-104',
          name: 'Designer Georgette Embroidered Salwar Kameez (3-Piece)',
          nameBn: 'ডিজাইনার জর্জেট এমব্রয়ডারি থ্রি-পিস',
          category: 'womens',
          subcategory: 'Three-Piece',
          subcategoryBn: 'থ্রি-পিস',
          price: 2450,
          originalPrice: 3200,
          wholesalePrice: 1450,
          wholesaleMinQty: 6,
          image: '/images/products/three_piece.jpg',
          description: '',
          descriptionBn: '',
          sizes: ['Ready 40 (L)'],
          colors: [{ name: 'Ruby Crimson', hex: '#be123c' }],
          fabric: 'Heavy Fox Georgette',
          fabricBn: 'হেভি ফক্স জর্জেট',
          inStock: true,
          stockCount: 65,
          rating: 5.0,
          reviewsCount: 41
        },
        selectedSize: 'Ready 40 (L)',
        selectedColor: 'Ruby Crimson',
        quantity: 1
      }
    ],
    subtotal: 2450,
    deliveryCharge: 120,
    discount: 0,
    total: 2570,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'shipped',
    courierName: 'RedX Logistics',
    courierTrackingCode: 'RDX-DHK-482190',
    estimatedDelivery: 'আগামীকাল বিকেল নাগাদ',
    createdAt: '2026-10-04 03:20 PM',
    timeline: [
      {
        title: 'Order Placed',
        titleBn: 'অর্ডার গৃহীত হয়েছে',
        time: '০৪ অক্টোবর ২০২৬, বিকাল ০৩:২০',
        description: 'Cash On Delivery order received.',
        descriptionBn: 'ক্যাশ অন ডেলিভারি অর্ডার গৃহীত হয়েছে।',
        done: true
      },
      {
        title: 'Order Confirmed',
        titleBn: 'অর্ডার কনফার্মেশন',
        time: '০৪ অক্টোবর ২০২৬, বিকাল ০৪:০০',
        description: 'Customer phone confirmation completed.',
        descriptionBn: 'ফোনে গ্রাহকের সাথে কথা বলে ঠিকানা ও অর্ডার নিশ্চিত করা হয়েছে।',
        done: true
      },
      {
        title: 'Packaging & Quality Check',
        titleBn: 'প্যাকিং সম্পন্ন',
        time: '০৫ অক্টোবর ২০২৬, সকাল ১০:০০',
        description: 'Quality checked and securely packaged.',
        descriptionBn: 'নিখুঁত কোয়ালিটি চেকিং ও প্যাকেজিং সম্পন্ন।',
        done: true
      },
      {
        title: 'Dispatched to Courier',
        titleBn: 'কুরিয়ারে ট্রানজিটে রয়েছে',
        time: '০৫ অক্টোবর ২০২৬, দুপুর ১২:৩০',
        description: 'Parcel in transit to Dhaka distribution center.',
        descriptionBn: 'রেডএক্স কুরিয়ার সেন্ট্রাল হাবে ট্রানজিটে রয়েছে।',
        done: true,
        current: true
      },
      {
        title: 'Out for Delivery',
        titleBn: 'ডেলিভারির জন্য প্রস্তুত',
        time: 'অপেক্ষমাণ',
        description: 'Rider assignment pending.',
        descriptionBn: 'লোকাল ডেলিভারি রাইডার নিয়োগ অপেক্ষমাণ।',
        done: false
      },
      {
        title: 'Delivered',
        titleBn: 'ডেলিভারি সম্পন্ন',
        time: 'অপেক্ষমাণ',
        description: 'Delivery completion and COD collection.',
        descriptionBn: 'পণ্য পৌঁছে দিয়ে ক্যাশ টাকা সংগ্রহ।',
        done: false
      }
    ]
  }
];
