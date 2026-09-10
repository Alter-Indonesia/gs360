export const STATS = [
  { value: "10+", label: "Tahun Berdiri" },
  { value: "1.200+", label: "Member Aktif" },
  { value: "24/7", label: "Jam Operasional" },
  { value: "30+", label: "Expert Trainer" },
];

export const SERVICES = [
  {
    id: "personal-training",
    title: "Personal Training",
    desc: "Sesi 1-on-1 dengan trainer bersertifikat untuk hasil maksimal sesuai target kamu.",
    img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=80",
  },
  {
    id: "group-class",
    title: "Group Class",
    desc: "Kelas energik bersama instruktur profesional — Zumba, Yoga, HIIT, dan lebih banyak lagi.",
    img: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&q=80",
  },
  {
    id: "strength",
    title: "Strength Training",
    desc: "Fasilitas barbel, rack, dan mesin kelas dunia untuk latihan kekuatan yang optimal.",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  },
  {
    id: "cardio",
    title: "Cardio Zone",
    desc: "Ratusan mesin cardio premium — treadmill, sepeda statis, elliptical, rowing machine.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
];

export const TRAINERS = [
  {
    id: "1",
    name: "Rizky Aditya",
    specialty: "Strength & Hypertrophy",
    exp: "7 tahun",
    cert: "ACE Certified",
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80",
    rating: 4.9,
    clients: 120,
  },
  {
    id: "2",
    name: "Sari Dewi",
    specialty: "Yoga & Functional Training",
    exp: "5 tahun",
    cert: "NASM Certified",
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
    rating: 4.8,
    clients: 95,
  },
  {
    id: "3",
    name: "Bagas Pratama",
    specialty: "Fat Loss & Cardio",
    exp: "6 tahun",
    cert: "ISSA Certified",
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
    rating: 4.9,
    clients: 108,
  },
  {
    id: "4",
    name: "Nadia Putri",
    specialty: "HIIT & Group Fitness",
    exp: "4 tahun",
    cert: "Les Mills Certified",
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
    rating: 4.7,
    clients: 87,
  },
];

export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 299_000,
    duration: "/ bulan",
    highlight: false,
    features: [
      "Akses gym unlimited",
      "1 group class / minggu",
      "Locker & shower",
      "Member card digital",
    ],
    cta: "Mulai Sekarang",
  },
  {
    id: "standard",
    name: "Standard",
    price: 499_000,
    duration: "/ bulan",
    highlight: true,
    badge: "Paling Populer",
    features: [
      "Akses gym unlimited",
      "Group class unlimited",
      "2 sesi PT / bulan",
      "Locker & shower",
      "Member card digital",
      "Akses nutrition guide",
    ],
    cta: "Pilih Standard",
  },
  {
    id: "premium",
    name: "Premium",
    price: 799_000,
    duration: "/ bulan",
    highlight: false,
    features: [
      "Akses gym unlimited",
      "Group class unlimited",
      "8 sesi PT / bulan",
      "Locker & shower premium",
      "Member card digital",
      "Nutrition consultation",
      "Body assessment bulanan",
      "Priority booking PT",
    ],
    cta: "Pilih Premium",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Andi Kurniawan",
    role: "Member Standard · 8 bulan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    text: "Fasilitas top banget, trainernya juga profesional. Turun 12kg dalam 6 bulan berkat program dari Kak Rizky. Highly recommended!",
    rating: 5,
  },
  {
    id: "2",
    name: "Mega Rahayu",
    role: "Member Premium · 1 tahun",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "Golden Sport beda dari gym lain. Bersih, nyaman, dan trainernya beneran care sama progress kita. Udah rekomendasiin ke semua teman!",
    rating: 5,
  },
  {
    id: "3",
    name: "Doni Setiawan",
    role: "Member Basic · 3 bulan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "Harga terjangkau tapi kualitas premium. Mesin cardio-nya lengkap banget, nggak pernah nunggu antrian. Worth it banget!",
    rating: 5,
  },
];

export const FACILITIES: { label: string; icon: string }[] = [
  { label: "Area Beban Bebas", icon: "dumbbell" },
  { label: "Cardio Zone", icon: "activity" },
  { label: "Group Class Studio", icon: "users" },
  { label: "Loker & Kamar Mandi", icon: "shower" },
  { label: "Parkir Gratis", icon: "parking" },
  { label: "WiFi Cepat", icon: "wifi" },
  { label: "Bar Nutrisi", icon: "coffee" },
  { label: "AC Sentral", icon: "wind" },
];
