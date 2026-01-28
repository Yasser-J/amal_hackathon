
import React from 'react';
import { Pill, Sparkles, Utensils, Building2, FlaskConical, Zap, Settings2, Scissors } from 'lucide-react';
import { Submission, Sector, Status } from './types';

export const SECTORS: { id: Sector; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'Drug', label: 'Drugs', icon: <Pill className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'Cosmetic', label: 'Cosmetics', icon: <Sparkles className="w-4 h-4" />, color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 'Food', label: 'Food', icon: <Utensils className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'Construction', label: 'Construction', icon: <Building2 className="w-4 h-4" />, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'Chemical', label: 'Chemical', icon: <FlaskConical className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'Electrical', label: 'Electrical', icon: <Zap className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'Mechanical', label: 'Mechanical', icon: <Settings2 className="w-4 h-4" />, color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { id: 'Textile', label: 'Textile', icon: <Scissors className="w-4 h-4" />, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
];

const realisticProducts: Record<Sector, { en: string[], ar: string[] }> = {
  'Drug': {
    en: ['Lipitor 20mg', 'Amoxicillin 500mg', 'Ventolin Inhaler', 'Januvia 100mg', 'Glucophage 850mg', 'Advil Liquid-Gels', 'Zyrtec Tablets'],
    ar: ['ليبيتور 20 ملغ', 'أموكسيسيلين 500 ملغ', 'بخاخ فينتولين', 'جانوڤيا 100 ملغ', 'جلوكوفاج 850 ملغ', 'أدفيل كبسولات سائلة', 'زيرتيك أقراص']
  },
  'Cosmetic': {
    en: ['Retinol Night Cream', 'SPF 50+ Sunscreen', 'Mineral Foundation', 'Micellar Water', 'Hydrating Face Mask', 'Vitamin C Serum', 'Anti-Hairfall Shampoo'],
    ar: ['كريم ليلي ريتينول', 'واقي شمس 50+', 'كريم أساس معدني', 'ماء ميسيلار', 'قناع وجه مرطب', 'سيروم فيتامين سي', 'شامبو ضد تساقط الشعر']
  },
  'Food': {
    en: ['Premium Basmati Rice', 'Extra Virgin Olive Oil', 'Whole Grain Oats', 'Greek Yogurt', 'Organic Raw Honey', 'Frozen Salmon Fillets', 'Almond Milk Unsweetened'],
    ar: ['أرز بسمتي فاخر', 'زيت زيتون بكر ممتاز', 'شوفان كامل الحبة', 'زبادي يوناني', 'عسل نحل عضوي خام', 'فيليه سلمون مجمد', 'حليب لوز غير محلى']
  },
  'Construction': {
    en: ['High-Tensile Steel Rebar', 'Grade C50 Concrete', 'Fire-Rated Drywall', 'Structural I-Beam', 'Weather-Resistant Sealant', 'Insulated Glass Panel', 'Eco-Brick Series 5'],
    ar: ['حديد تسليح عالي المقاومة', 'خرسانة درجة C50', 'ألواح جبس مقاومة للحريق', 'عارضة فولاذية إنشائية', 'مانع تسرب مقاوم للعوامل الجوية', 'لوح زجاجي عازل', 'سلسلة الطوب البيئي 5']
  },
  'Chemical': {
    en: ['Industrial Solvent X-1', 'Urea Fertilizer 46%', 'Liquid Chlorine 12%', 'Polyethylene Pellets', 'Sulfuric Acid 98%', 'Acetone Technical Grade', 'Ethylene Glycol'],
    ar: ['مذيب صناعي X-1', 'سماد يوريا 46٪', 'كلور سائل 12٪', 'حبيبات البولي إيثيلين', 'حمض الكبريتيك 98٪', 'أسيتون درجة تقنية', 'إيثيلين جليكول']
  },
  'Electrical': {
    en: ['Smart Power Transformer', 'LED Street Light 150W', 'High-Voltage Circuit Breaker', 'Lithium-Ion Storage Cell', 'Solar Inverter 5kW', 'Armored Copper Cable', 'Digital Energy Meter'],
    ar: ['محول طاقة ذكي', 'إضاءة شوارع LED 150 واط', 'قاطع دائرة جهد عالي', 'خلية تخزين ليثيوم أيون', 'عاكس شمسي 5 كيلو واط', 'كابل نحاسي مدرع', 'عداد طاقة رقمي']
  },
  'Mechanical': {
    en: ['Hydraulic Pump HP-500', 'Industrial Gearbox G-90', 'Centrifugal Water Pump', 'Pneumatic Control Valve', 'Variable Speed Drive', 'Heavy-Duty Bearing XL', 'Turbo Compressor'],
    ar: ['مضخة هيدروليكية HP-500', 'صندوق تروس صناعي G-90', 'مضخة مياه طاردة مركزية', 'صمام تحكم هوائي', 'محرك سرعة متغيرة', 'محمل كريات شديد التحمل', 'ضاغط توربيني']
  },
  'Textile': {
    en: ['Flame Retardant Fabric', 'Organic Cotton Uniform', 'Polyester Industrial Thread', 'Anti-Static Lab Coat', 'High-Visibility Safety Vest', 'Microfiber Cleanroom Suit', 'Aramid Protective Mesh'],
    ar: ['نسيج مقاوم للهب', 'زي قطني عضوي', 'خيوط بوليستر صناعية', 'معطف مختبر مضاد للاستاتيكية', 'سترة سلامة عالية الوضوح', 'بدلة غرف معقمة ميكروفايبر', 'شبكة أراميد واقية']
  }
};

const applicants = [
  "Gulf Pharmaceutical Industries", "Saudi Basic Industries Corp (SABIC)", "Almarai Company", 
  "Aramco Chemicals", "Emirates Food Industries", "Riyadh Pharma", "Dubai Construction Group",
  "Qatar Chemical Company", "Kuwait National Petroleum", "Jordanian Beauty Solutions"
];

const manufacturers = [
  "Global Tech Labs", "Regional Production Center", "National Industrial Plant", 
  "Precision Manufacturing Ltd", "BioHealth Systems", "Construction Core Facility"
];

const origins = ["Saudi Arabia", "UAE", "Germany", "USA", "France", "Japan", "South Korea", "China", "Jordan", "Egypt"];

const sectors: Sector[] = ['Drug', 'Cosmetic', 'Food', 'Construction', 'Chemical', 'Electrical', 'Mechanical', 'Textile'];

const generateSubmissionDetails = (ref: string, applicant: string, manufacturer: string, origin: string, risk: 'Low' | 'Medium' | 'High', justification: string) => ({
  manufacturer,
  origin,
  riskLevel: risk,
  lastUpdated: '2026-02-01',
  description: `Official registration request for ${ref} submitted by ${applicant}. Documentation includes technical specifications, safety data sheets, and compliance certificates for the local market.`,
  justification,
  attachments: [
    { type: 'image', name: 'Product Photo', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80' },
    { type: 'image', name: 'Ingredients Label', url: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80' },
    { type: 'pdf', name: 'Compliance Certificate', url: '#' },
  ],
  timeline: [
    { label: 'Request Submission', status: 'completed' as const, date: '2026-01-20' },
    { label: 'AI-Assessment', status: 'completed' as const, date: '2026-01-22' },
    { label: 'Human Review', status: 'current' as const },
    { label: 'Approval/Rejection', status: 'pending' as const },
  ]
});

const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generate 50 items with exactly 23 Review Required
export const MOCK_SUBMISSIONS: Submission[] = Array.from({ length: 50 }).map((_, i) => {
  const id = (i + 1).toString();
  const sector = sectors[i % sectors.length];
  const sectorPrefix = sector.substring(0, 3).toUpperCase();
  const ref = `${sectorPrefix}-2026-${(1000 + i).toString()}`;
  const applicant = random(applicants);
  
  // Exactly 23 are 'Review Required'
  const status: Status = i < 23 ? 'Review Required' : (i % 2 === 0 ? 'Approved' : 'Rejected');
  
  const confidenceScore = 65 + Math.floor(Math.random() * 34);
  const date = new Date(2026, 0, 31 - (i % 31)).toISOString().split('T')[0];
  
  const productPool = realisticProducts[sector];
  const productIndex = i % productPool.en.length;
  
  return {
    id,
    reference: ref,
    sector,
    productNameEn: productPool.en[productIndex],
    productNameAr: productPool.ar[productIndex],
    applicant,
    status,
    confidenceScore,
    date,
    details: generateSubmissionDetails(
      ref, 
      applicant, 
      random(manufacturers), 
      random(origins), 
      random(['Low', 'Medium', 'High']),
      `The AI-Assessment for ${ref} indicates a ${confidenceScore}% match with regulatory requirements. Key validation points include certificate authenticity and ingredient safety thresholds.`
    )
  };
});
