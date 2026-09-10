export const PROPERTIES = [
  { id: 1,  slug: "ruko-sudirman-no-12",        name: "Ruko Sudirman No. 12",         type: "Ruko",      city: "Jakarta Pusat",   price: "Rp 3,2 M",  img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { id: 2,  slug: "gudang-cakung-500m2",         name: "Gudang Cakung 500m²",          type: "Gudang",    city: "Jakarta Timur",   price: "Rp 5,5 M",  img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { id: 3,  slug: "apartemen-kuningan-lt-8",     name: "Apartemen Kuningan Lt. 8",     type: "Apartemen", city: "Jakarta Selatan", price: "Rp 1,8 M",  img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80" },
  { id: 4,  slug: "ruko-bsd-blok-c-no-3",        name: "Ruko BSD Blok C No. 3",        type: "Ruko",      city: "Tangerang",       price: "Rp 2,9 M",  img: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80" },
  { id: 5,  slug: "kios-tanah-abang-a-12",       name: "Kios Tanah Abang A-12",        type: "Kios",      city: "Jakarta Pusat",   price: "Rp 900 Jt", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { id: 6,  slug: "vila-puncak-bogor",           name: "Vila Puncak Bogor",            type: "Vila",      city: "Bogor",           price: "Rp 4,1 M",  img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { id: 7,  slug: "ruko-kelapa-gading-b5",       name: "Ruko Kelapa Gading B5",        type: "Ruko",      city: "Jakarta Utara",   price: "Rp 3,7 M",  img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80" },
  { id: 8,  slug: "kantor-sudirman-tower-lt-12", name: "Kantor Sudirman Tower Lt. 12", type: "Kantor",    city: "Jakarta Pusat",   price: "Rp 8,2 M",  img: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80" },
];

export const TYPES = ["Semua", "Ruko", "Gudang", "Apartemen", "Kios", "Vila", "Kantor"];
export const CITIES = ["Semua Kota", "Jakarta Pusat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara", "Tangerang", "Bogor"];

export type Property = typeof PROPERTIES[number];
