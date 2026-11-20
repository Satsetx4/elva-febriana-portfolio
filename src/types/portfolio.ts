export type ThemeMode = 'light' | 'dark';

export type RoutePath =
  | '/'
  | '/tentang'
  | '/pengalaman'
  | '/pendidikan'
  | '/kontak';

export interface ProfileData {
  name: string;
  headline: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
  summaryShort: string;
  summary: string;
  cvUrl?: string;
}

export interface ProofPhoto {
  id: string;
  src: string;
  srcSmall?: string;
  alt: string;
  caption: string;
  context: 'outlet' | 'osis' | 'teater' | 'lainnya';
  width: number;
  height: number;
}

export interface WorkSample {
  id: string;
  title: string;
  purpose: string;
  image: string;
  alt: string;
  tool: string;
  year: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  consent: true;
}

export interface Metric {
  id: string;
  value: string;
  label: string;
  source: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  file?: string;
}

export interface EducationData {
  school: string;
  period: string;
  major: string;
  electives: string[];
  description: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

export interface OrgExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  highlights: string[];
}

export interface SkillItem {
  id: string;
  label: string;
  category: 'soft' | 'operational' | 'digital';
  context: string;
}

export interface WorkPillar {
  id: string;
  title: string;
  description: string;
  iconName: 'Clock' | 'ShieldCheck' | 'Users' | 'Sparkles';
}

export type DrinkSize = 'reg' | 'large';
export type SugarLevel = 'less' | 'normal' | 'extra';

export interface DrinkSopStep {
  teh: string;
  gula: string;
  tambahan?: string;
  es: string;
  catatan: string;
}

export interface DrinkMenuItem {
  id: string;
  name: string;
  category: 'Classic Tea' | 'Fruit & Citrus' | 'Creamy Milk';
  price: Record<DrinkSize, number>;
  description: string;
  sop: Record<DrinkSize, DrinkSopStep>;
  stockUsage: Record<string, number>;
}

export interface CartItem {
  id: string;
  drinkId: string;
  name: string;
  size: DrinkSize;
  sugar: SugarLevel;
  qty: number;
  unitPrice: number;
}

export interface SaleTransaction {
  id: string;
  timestamp: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'Tunai' | 'QRIS';
}

export interface StockItem {
  id: string;
  name: string;
  unit: string;
  qty: number;
  minStock: number;
}

export type ShiftType = 'buka' | 'tutup';

export interface ChecklistItem {
  id: string;
  shift: ShiftType;
  label: string;
  checked: boolean;
}

export type AnalyticsEventName = 'wa_click' | 'cta_click' | 'form_submit';

export interface AnalyticsEvent {
  id: string;
  name: AnalyticsEventName;
  label: string;
  timestamp: string;
}
