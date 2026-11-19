import type {
  ChecklistItem,
  DrinkMenuItem,
  StockItem,
} from '../types/portfolio';

export const SIMULATION_DISCLAIMER =
  'Simulasi interaktif ini dibuat untuk mendemonstrasikan pemahaman SOP barista, pencatatan penjualan, dan kontrol stok outlet. Menu dan harga bersifat generik sebagai contoh alur kerja.';

export const MENU_ITEMS: DrinkMenuItem[] = [
  {
    id: 'teh-original',
    name: 'Teh Original',
    category: 'Classic Tea',
    price: { reg: 5000, large: 7000 },
    description: 'Seduhan daun teh pilihan yang segar dengan keseimbangan manis yang pas.',
    sop: {
      reg: {
        teh: '180 ml seduhan teh pekat',
        gula: '25 ml simple syrup',
        es: 'Es batu 3/4 cup Reguler',
        catatan: 'Aduk merata sebelum disegel.',
      },
      large: {
        teh: '240 ml seduhan teh pekat',
        gula: '35 ml simple syrup',
        es: 'Es batu 3/4 cup Large',
        catatan: 'Pastikan suhu teh sudah turun agar es tidak cepat mencair.',
      },
    },
    stockUsage: {
      teh: 1,
      gula: 1,
      sedotan: 1,
    },
  },
  {
    id: 'lemon-tea',
    name: 'Lemon Tea',
    category: 'Fruit & Citrus',
    price: { reg: 8000, large: 11000 },
    description: 'Perpaduan teh klasik dan sirup lemon segar dengan aroma citrus yang ringan.',
    sop: {
      reg: {
        teh: '160 ml seduhan teh',
        gula: '20 ml simple syrup',
        tambahan: '25 ml sirup lemon + 1 irisan lemon',
        es: 'Es batu penuh cup Reguler',
        catatan: 'Kocok perlahan 5 kali agar aroma lemon menyatu.',
      },
      large: {
        teh: '210 ml seduhan teh',
        gula: '25 ml simple syrup',
        tambahan: '35 ml sirup lemon + 1 irisan lemon',
        es: 'Es batu penuh cup Large',
        catatan: 'Kocok perlahan 5 kali agar aroma lemon menyatu.',
      },
    },
    stockUsage: {
      teh: 1,
      gula: 1,
      'lemon-sirup': 1,
      sedotan: 1,
    },
  },
  {
    id: 'milk-tea',
    name: 'Milk Tea',
    category: 'Creamy Milk',
    price: { reg: 10000, large: 13000 },
    description: 'Teh hitam berkarakter kuat dipadukan dengan susu creamy yang lembut.',
    sop: {
      reg: {
        teh: '130 ml teh hitam pekat',
        gula: '20 ml simple syrup',
        tambahan: '70 ml susu UHT full cream',
        es: 'Es batu 3/4 cup Reguler',
        catatan: 'Tuang susu setelah teh dan gula terlarut rata.',
      },
      large: {
        teh: '170 ml teh hitam pekat',
        gula: '30 ml simple syrup',
        tambahan: '95 ml susu UHT full cream',
        es: 'Es batu 3/4 cup Large',
        catatan: 'Tuang susu setelah teh dan gula terlarut rata.',
      },
    },
    stockUsage: {
      teh: 1,
      gula: 1,
      susu: 1,
      sedotan: 1,
    },
  },
  {
    id: 'lychee-tea',
    name: 'Lychee Tea',
    category: 'Fruit & Citrus',
    price: { reg: 10000, large: 13000 },
    description: 'Kesegaran teh dengan manis harum buah leci yang digemari pelanggan.',
    sop: {
      reg: {
        teh: '160 ml seduhan teh',
        gula: '15 ml simple syrup',
        tambahan: '25 ml sirup leci + 1 buah leci',
        es: 'Es batu penuh cup Reguler',
        catatan: 'Tambahkan buah leci di bagian atas sebelum ditutup.',
      },
      large: {
        teh: '210 ml seduhan teh',
        gula: '20 ml simple syrup',
        tambahan: '35 ml sirup leci + 2 buah leci',
        es: 'Es batu penuh cup Large',
        catatan: 'Tambahkan buah leci di bagian atas sebelum ditutup.',
      },
    },
    stockUsage: {
      teh: 1,
      gula: 1,
      'lemon-sirup': 1,
      sedotan: 1,
    },
  },
  {
    id: 'thai-tea',
    name: 'Thai Tea',
    category: 'Creamy Milk',
    price: { reg: 11000, large: 14000 },
    description: 'Racikan teh Thailand autentik dengan rasa manis gurih dan warna khas.',
    sop: {
      reg: {
        teh: '140 ml seduhan Thai tea',
        gula: '20 ml simple syrup',
        tambahan: '65 ml susu evaporasi & full cream',
        es: 'Es batu 3/4 cup Reguler',
        catatan: 'Aduk dengan shaker selama 4 detik untuk tekstur berbusa ringan.',
      },
      large: {
        teh: '185 ml seduhan Thai tea',
        gula: '25 ml simple syrup',
        tambahan: '85 ml susu evaporasi & full cream',
        es: 'Es batu 3/4 cup Large',
        catatan: 'Aduk dengan shaker selama 4 detik untuk tekstur berbusa ringan.',
      },
    },
    stockUsage: {
      teh: 1,
      gula: 1,
      susu: 1,
      sedotan: 1,
    },
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'Creamy Milk',
    price: { reg: 12000, large: 15000 },
    description: 'Bubuk matcha lembut berpadu susu segar dengan rasa seimbang.',
    sop: {
      reg: {
        teh: '5 gr bubuk matcha + 40 ml air hangat',
        gula: '20 ml simple syrup',
        tambahan: '120 ml susu UHT',
        es: 'Es batu 3/4 cup Reguler',
        catatan: 'Larutkan matcha tanpa gumpalan sebelum dituang ke atas es & susu.',
      },
      large: {
        teh: '7 gr bubuk matcha + 50 ml air hangat',
        gula: '25 ml simple syrup',
        tambahan: '160 ml susu UHT',
        es: 'Es batu 3/4 cup Large',
        catatan: 'Larutkan matcha tanpa gumpalan sebelum dituang ke atas es & susu.',
      },
    },
    stockUsage: {
      teh: 1,
      gula: 1,
      susu: 2,
      sedotan: 1,
    },
  },
];

export const INITIAL_STOCK: StockItem[] = [
  { id: 'teh', name: 'Biang / Daun Teh', unit: 'porsi', qty: 40, minStock: 10 },
  { id: 'gula', name: 'Simple Syrup (Gula)', unit: 'porsi', qty: 45, minStock: 10 },
  { id: 'lemon-sirup', name: 'Sirup Buah (Lemon/Leci)', unit: 'porsi', qty: 24, minStock: 6 },
  { id: 'susu', name: 'Susu UHT & Evaporasi', unit: 'porsi', qty: 30, minStock: 8 },
  { id: 'cup-reg', name: 'Cup Reguler (16 oz)', unit: 'pcs', qty: 35, minStock: 10 },
  { id: 'cup-large', name: 'Cup Large (22 oz)', unit: 'pcs', qty: 25, minStock: 8 },
  { id: 'sedotan', name: 'Sedotan Higienis', unit: 'pcs', qty: 60, minStock: 15 },
  { id: 'es', name: 'Es Batu Kristal', unit: 'porsi', qty: 50, minStock: 12 },
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'buka-1',
    shift: 'buka',
    label: 'Cek kebersihan meja bar, mesin sealer, dan area display',
    checked: false,
  },
  {
    id: 'buka-2',
    shift: 'buka',
    label: 'Siapkan seduhan biang teh dan simple syrup sesuai takaran SOP',
    checked: false,
  },
  {
    id: 'buka-3',
    shift: 'buka',
    label: 'Pastikan stok cup Reguler, Large, sedotan, dan es batu mencukupi',
    checked: false,
  },
  {
    id: 'buka-4',
    shift: 'buka',
    label: 'Siapkan uang kembalian kasir dan uji QRIS outlet',
    checked: false,
  },
  {
    id: 'tutup-1',
    shift: 'tutup',
    label: 'Rekap seluruh transaksi penjualan tunai dan QRIS harian',
    checked: false,
  },
  {
    id: 'tutup-2',
    shift: 'tutup',
    label: 'Catat sisa stok bahan baku untuk laporan belanja besok',
    checked: false,
  },
  {
    id: 'tutup-3',
    shift: 'tutup',
    label: 'Cuci bersih shaker, jigger, teko, dan lap meja kerja',
    checked: false,
  },
  {
    id: 'tutup-4',
    shift: 'tutup',
    label: 'Matikan peralatan listrik non-kulkas dan kunci area outlet',
    checked: false,
  },
];
