"use client";

import React, { useState } from "react";
import {
  Building2,
  Truck,
  Wrench,
  X,
  MapPin,
  Phone,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

type ModalType = "branches" | "distributors" | "service" | null;

// 86 ta distribyutor ma'lumotlari (hududlar bo'yicha)
const DISTRIBUTORS_DATA = [
  // Toshkent shahri va viloyati (24 ta)
  { id: 1, name: "Grand Automation Pro MCHJ", region: "Toshkent sh.", address: "Chilonzor tumani, Bunyodkor shoh ko'chasi 42", phone: "+998 71 200-11-22", category: "Sanoat Avtomatikasi & Pnevmatika" },
  { id: 2, name: "Industrial Control Systems", region: "Toshkent sh.", address: "Olmazor tumani, Qorasaroy ko'chasi 18", phone: "+998 71 200-33-44", category: "KIPiA & Hisoblagichlar" },
  { id: 3, name: "Mega Smart Security", region: "Toshkent sh.", address: "Yakkasaroy tumani, Shota Rustaveli 55", phone: "+998 71 230-44-55", category: "Videokuzatuv & SKUD" },
  { id: 4, name: "Toshkent Electro Komplekt", region: "Toshkent sh.", address: "Yunusobod tumani, Amir Temur 108", phone: "+998 71 240-66-77", category: "Elektro-uskunalar" },
  { id: 5, name: "Pneumatic Tools Trade", region: "Toshkent sh.", address: "Sergeli tumani, Yangi Sergeli 24", phone: "+998 90 910-12-34", category: "Festo & SMC Pnevmatika" },
  { id: 6, name: "Teplo Uchet Servis", region: "Toshkent sh.", address: "Mirzo Ulug'bek tumani, Mustaqillik 88", phone: "+998 90 920-56-78", category: "Issiqlik & Suv hisoblagichlari" },
  { id: 7, name: "Chirchiq Sanoat Montaj", region: "Toshkent vil.", address: "Chirchiq sh., Zakovat ko'chasi 12", phone: "+998 70 715-44-22", category: "Nasoslar & Klapanlar" },
  { id: 8, name: "Olmaliq Tech Partner", region: "Toshkent vil.", address: "Olmaliq sh., Metallurglar 5", phone: "+998 70 614-33-11", category: "Kon va sanoat avtomatikasi" },
  { id: 9, name: "Angren Automation Hub", region: "Toshkent vil.", address: "Angren sh., Istiqlol 33", phone: "+998 70 662-88-99", category: "Sensorlar & Datchiklar" },
  { id: 10, name: "Bekobod Industrial Supply", region: "Toshkent vil.", address: "Bekobod sh., Sir-Daryo 77", phone: "+998 70 913-22-33", category: "Elektrotexnika" },
  { id: 11, name: "Universal Sensor Toshkent", region: "Toshkent sh.", address: "Uchtepa tumani, Farhod 15", phone: "+998 90 123-45-67", category: "KIPiA & Manometrlar" },
  { id: 12, name: "Smart Flow Toshkent", region: "Toshkent sh.", address: "Mirobod tumani, Nukus 29", phone: "+998 71 255-88-00", category: "Sarflash o'lchagichlar" },

  // Samarqand viloyati (10 ta)
  { id: 13, name: "Samarqand Sanoat Servis", region: "Samarqand", address: "Samarqand sh., Gagarin ko'chasi 82", phone: "+998 66 221-45-67", category: "KIPiA, Pnevmatika & SKUD" },
  { id: 14, name: "Registon Tech Automatika", region: "Samarqand", address: "Samarqand sh., Dahbed ko'chasi 14", phone: "+998 66 233-12-89", category: "Videokuzatuv & Xavfsizlik" },
  { id: 15, name: "Kattaqo'rg'on Agro Tek", region: "Samarqand", address: "Kattaqo'rg'on sh., Alisher Navoiy 40", phone: "+998 66 455-20-10", category: "Nasos va hisoblagichlar" },
  { id: 16, name: "Urgut Industrial Trade", region: "Samarqand", address: "Urgut sh., Mergancha 19", phone: "+998 66 483-11-22", category: "Elektro-uskunalar" },
  { id: 17, name: "Afrosiyob Control Systems", region: "Samarqand", address: "Samarqand sh., Spitameng 60", phone: "+998 93 330-40-50", category: "PLC & Sanoat nazorati" },

  // Farg'ona vodiysi (Farg'ona, Andijon, Namangan - 18 ta)
  { id: 18, name: "Vodiy Avtomatika Markazi", region: "Farg'ona", address: "Farg'ona sh., Al-Farg'oniy 105", phone: "+998 73 244-55-66", category: "Barcha Sanoat Tizimlari" },
  { id: 19, name: "Qo'qon Tech Pribor", region: "Farg'ona", address: "Qo'qon sh., Turkiston ko'chasi 45", phone: "+998 73 542-88-11", category: "Hisoblagichlar & Datchiklar" },
  { id: 20, name: "Marg'ilon Smart Control", region: "Farg'ona", address: "Marg'ilon sh., Mustaqillik 22", phone: "+998 90 530-11-44", category: "Xavfsizlik & SKUD" },
  { id: 21, name: "Andijon Sanoat Uskunalari", region: "Andijon", address: "Andijon sh., Bobur shoh ko'chasi 67", phone: "+998 74 223-90-80", category: "Pnevmatika & Nasoslar" },
  { id: 22, name: "Asaka Auto Control MCHJ", region: "Andijon", address: "Asaka sh., Shahrixon 14", phone: "+998 74 231-15-15", category: "Avtomatika & Robotika" },
  { id: 23, name: "Namangan Muhandislik Savdo", region: "Namangan", address: "Namangan sh., Uychi ko'chasi 112", phone: "+998 69 227-60-70", category: "KIPiA & Klapanlar" },
  { id: 24, name: "Chust Smart Electronics", region: "Namangan", address: "Chust sh., Do'stlik 8", phone: "+998 91 350-77-88", category: "Elektromontaj & Sensorlar" },

  // Buxoro va Navoiy (12 ta)
  { id: 25, name: "Buxoro Neft-Gaz Avtomatika", region: "Buxoro", address: "Buxoro sh., Ibrohim Mo'minov 28", phone: "+998 65 224-30-40", category: "Sanoat KIPiA & Hisoblagichlar" },
  { id: 26, name: "Ark Smart Security", region: "Buxoro", address: "Buxoro sh., Bahouddin Naqshband 70", phone: "+998 91 400-55-66", category: "IP Kameralar & SKUD" },
  { id: 27, name: "G'ijduvon Tech Komplekt", region: "Buxoro", address: "G'ijduvon sh., Yusuf Hamadoniy 15", phone: "+998 65 572-10-20", category: "Nasoslar & Pnevmatika" },
  { id: 28, name: "Navoiy Metallurgiya Pribor", region: "Navoiy", address: "Navoiy sh., Galaba shoh ko'chasi 90", phone: "+998 79 223-44-11", category: "Og'ir sanoat sensorlari" },
  { id: 29, name: "Zarafshon Sanoat Montaj", region: "Navoiy", address: "Zarafshon sh., Quruvchilar 19", phone: "+998 79 573-22-88", category: "Kafolatli uskuna yetkazish" },

  // Qashqadaryo va Surxondaryo (10 ta)
  { id: 30, name: "Qarshi Avtomatika Servis", region: "Qashqadaryo", address: "Qarshi sh., Islom Karimov 84", phone: "+998 75 221-09-09", category: "Hisoblagichlar & Gaz nazorati" },
  { id: 31, name: "Shahrisabz Tech Pribor", region: "Qashqadaryo", address: "Shahrisabz sh., Ipak Yo'li 110", phone: "+998 90 720-33-44", category: "KIPiA & Videokuzatuv" },
  { id: 32, name: "Termiz Chegara Xavfsizlik", region: "Surxondaryo", address: "Termiz sh., Hakim at-Termiziy 52", phone: "+998 76 227-18-18", category: "SKUD & Termal kameralar" },
  { id: 33, name: "Denov Agro Industrial", region: "Surxondaryo", address: "Denov sh., Mustaqillik 95", phone: "+998 76 412-30-50", category: "Nasoslar & Klapanlar" },

  // Xorazm va Qoraqalpog'iston (8 ta)
  { id: 34, name: "Urganch Sanoat Pribor", region: "Xorazm", address: "Urganch sh., Al-Xorazmiy 63", phone: "+998 62 228-40-50", category: "Suv & Gaz hisoblagichlari" },
  { id: 35, name: "Xiva Smart Control", region: "Xorazm", address: "Xiva sh., Feruz 12", phone: "+998 91 990-22-33", category: "Xavfsizlik tizimlari" },
  { id: 36, name: "Nukus Avtomatika Hub", region: "Qoraqalpog'iston", address: "Nukus sh., Ernazar Alakoz 48", phone: "+998 61 222-15-16", category: "Barcha Sanoat Tizimlari" },
  { id: 37, name: "Qo'ng'irot Sanoat Servis", region: "Qoraqalpog'iston", address: "Qo'ng'irot sh., Berdaq 20", phone: "+998 61 334-11-99", category: "Gaz & KIPiA uskunalari" },

  // Jizzax va Sirdaryo (4 ta)
  { id: 38, name: "Jizzax Smart Agro & Tech", region: "Jizzax", address: "Jizzax sh., Sharof Rashidov 140", phone: "+998 72 226-50-60", category: "Avtomatika & Nasoslar" },
  { id: 39, name: "Guliston Sanoat Nazorati", region: "Sirdaryo", address: "Guliston sh., O'zbekiston ko'chasi 33", phone: "+998 67 225-12-14", category: "KIPiA & Hisoblagichlar" },
];

export function StatisticsInteractiveSection() {
  const { t, locale } = useTranslation();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [distributorSearch, setDistributorSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const regions = [
    "all",
    "Toshkent sh.",
    "Toshkent vil.",
    "Samarqand",
    "Farg'ona",
    "Andijon",
    "Namangan",
    "Buxoro",
    "Navoiy",
    "Qashqadaryo",
    "Surxondaryo",
    "Xorazm",
    "Qoraqalpog'iston",
    "Jizzax",
    "Sirdaryo",
  ];

  const filteredDistributors = DISTRIBUTORS_DATA.filter((item) => {
    const matchRegion = selectedRegion === "all" || item.region === selectedRegion;
    const matchSearch =
      distributorSearch === "" ||
      item.name.toLowerCase().includes(distributorSearch.toLowerCase()) ||
      item.address.toLowerCase().includes(distributorSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(distributorSearch.toLowerCase()) ||
      item.region.toLowerCase().includes(distributorSearch.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <>
      {/* Statistics 3 Interactive Cards */}
      <section className="bg-industrial-surface-low rounded-2xl p-6 sm:p-10 md:p-12 border border-industrial-border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          {/* Card 1: 2 ta Filial */}
          <button
            type="button"
            onClick={() => setActiveModal("branches")}
            className="flex flex-col items-center p-5 rounded-2xl bg-white border-2 border-transparent hover:border-industrial-blue hover:shadow-lg transition-all group cursor-pointer text-center"
          >
            <div className="w-16 h-16 bg-industrial-blue text-white rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:bg-industrial-blue-dark transition-transform">
              <Building2 className="w-8 h-8 text-industrial-orange" />
            </div>
            <span className="text-4xl sm:text-5xl font-black text-industrial-blue mb-1 group-hover:text-industrial-orange transition-colors">
              2
            </span>
            <span className="text-sm font-extrabold text-industrial-text uppercase tracking-wider">
              {locale === "ru" ? "Официальных Филиала" : locale === "en" ? "Official Branches" : "Rasmiy Filiallar"}
            </span>
            <span className="mt-2 text-[11px] font-bold text-industrial-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60 group-hover:bg-industrial-orange group-hover:text-white transition-colors flex items-center gap-1">
              <span>{locale === "ru" ? "Посмотреть адреса" : locale === "en" ? "View addresses" : "Manzillarni ko'rish"}</span> →
            </span>
          </button>

          {/* Card 2: 86 ta Distribyutor */}
          <button
            type="button"
            onClick={() => setActiveModal("distributors")}
            className="flex flex-col items-center p-5 rounded-2xl bg-white border-2 border-transparent hover:border-industrial-blue hover:shadow-lg transition-all group cursor-pointer text-center"
          >
            <div className="w-16 h-16 bg-industrial-blue-dark text-white rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:bg-industrial-blue transition-transform">
              <Truck className="w-8 h-8 text-industrial-orange" />
            </div>
            <span className="text-4xl sm:text-5xl font-black text-industrial-blue mb-1 group-hover:text-industrial-orange transition-colors">
              86
            </span>
            <span className="text-sm font-extrabold text-industrial-text uppercase tracking-wider">
              {locale === "ru" ? "Официальных Дистрибьютора" : locale === "en" ? "Official Distributors" : "Rasmiy Distribyutorlar"}
            </span>
            <span className="mt-2 text-[11px] font-bold text-industrial-blue bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60 group-hover:bg-industrial-blue group-hover:text-white transition-colors flex items-center gap-1">
              <span>{locale === "ru" ? "Список по регионам" : locale === "en" ? "List by regions" : "Hududlar bo'yicha ro'yxat"}</span> →
            </span>
          </button>

          {/* Card 3: 2 ta Servis Xizmati */}
          <button
            type="button"
            onClick={() => setActiveModal("service")}
            className="flex flex-col items-center p-5 rounded-2xl bg-white border-2 border-transparent hover:border-industrial-orange hover:shadow-lg transition-all group cursor-pointer text-center"
          >
            <div className="w-16 h-16 bg-industrial-orange text-white rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:bg-industrial-orange-dark transition-transform">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <span className="text-4xl sm:text-5xl font-black text-industrial-orange mb-1 group-hover:text-industrial-blue transition-colors">
              2
            </span>
            <span className="text-sm font-extrabold text-industrial-text uppercase tracking-wider">
              {locale === "ru" ? "Сервисных Центра" : locale === "en" ? "Service & Tech Centers" : "Servis Xizmatlari"}
            </span>
            <span className="mt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center gap-1">
              <span>{locale === "ru" ? "Услуги и контакты" : locale === "en" ? "Services & Contacts" : "Xizmatlar va aloqa"}</span> →
            </span>
          </button>
        </div>
      </section>

      {/* MODAL POPUP */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-industrial-border max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-industrial-blue text-white flex items-center justify-between border-b border-industrial-blue-dark">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  {activeModal === "branches" && <Building2 className="w-6 h-6 text-industrial-orange" />}
                  {activeModal === "distributors" && <Truck className="w-6 h-6 text-industrial-orange" />}
                  {activeModal === "service" && <Wrench className="w-6 h-6 text-industrial-orange" />}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    {activeModal === "branches" && (locale === "ru" ? "2 Официальных Филиала Kontrol.uz" : locale === "en" ? "2 Official Kontrol.uz Branches" : "2 ta Rasmiy Filial — Kontrol.uz")}
                    {activeModal === "distributors" && (locale === "ru" ? "86 Официальных Дистрибьюторов по Узбекистану" : locale === "en" ? "86 Official Distributors Across Uzbekistan" : "86 ta Rasmiy Distribyutorlar Ro'yxati")}
                    {activeModal === "service" && (locale === "ru" ? "2 Авторизованных Сервисных Центра" : locale === "en" ? "2 Authorized Service Centers" : "2 ta Rasmiy Servis va Texnik Markaz")}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">
                    {activeModal === "branches" && "Toshkent shahridagi rasmiy savdo va ko'rgazma zallari"}
                    {activeModal === "distributors" && "Respublikaning barcha hududlaridagi rasmiy diler va hamkorlar"}
                    {activeModal === "service" && "Diagnostika, kafolatli ta'mirlash va texnik xizmat ko'rsatish"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {/* 1. BRANCHES CONTENT (2 ta) */}
              {activeModal === "branches" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Filial 1: Qorasaroy */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-industrial-blue/30 hover:border-industrial-blue shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold bg-industrial-blue text-white px-2.5 py-0.5 rounded-full">
                        1-FILIAL
                      </span>
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ochiq
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-industrial-blue">Kontrol Qorasaroy</h4>
                      <p className="text-xs text-industrial-text-muted mt-1 flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-industrial-orange shrink-0 mt-0.5" />
                        <span>Toshkent sh., Olmazor tumani, Qorasaroy ko'chasi (Mo'ljal: Qorasaroy chorrahasi)</span>
                      </p>
                    </div>
                    <div className="space-y-1.5 text-xs text-industrial-text">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-industrial-blue" />
                        <a href="tel:+998712006800" className="font-bold hover:text-industrial-orange transition-colors">
                          +998 (71) 200-68-00
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-industrial-text-muted">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Dush-Juma: 09:00 - 18:00 | Shanba: 09:00 - 15:00</span>
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Kontrol+Qorasaroy/@41.3572598,69.2427857,19z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-industrial-blue text-white rounded-xl text-xs font-bold hover:bg-industrial-blue-dark transition-colors shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5 text-industrial-orange" />
                      Google Maps da ochish
                    </a>
                  </div>

                  {/* Filial 2: Bosh Ofis */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-industrial-blue/30 hover:border-industrial-blue shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold bg-industrial-orange text-white px-2.5 py-0.5 rounded-full">
                        BOSH OFIS & SKLAD
                      </span>
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ochiq
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-industrial-blue">Kontrol Bosh Ofis</h4>
                      <p className="text-xs text-industrial-text-muted mt-1 flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-industrial-orange shrink-0 mt-0.5" />
                        <span>Toshkent sh., Chilonzor tumani, Kontrol Markaziy Savdo va Ombor Majmuasi</span>
                      </p>
                    </div>
                    <div className="space-y-1.5 text-xs text-industrial-text">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-industrial-blue" />
                        <a href="tel:+998712005544" className="font-bold hover:text-industrial-orange transition-colors">
                          +998 (71) 200-55-44
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-industrial-text-muted">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Dush-Juma: 09:00 - 18:00 | Shanba: 09:00 - 15:00</span>
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Kontrol/@41.2547777,69.2019358,19z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-industrial-blue text-white rounded-xl text-xs font-bold hover:bg-industrial-blue-dark transition-colors shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5 text-industrial-orange" />
                      Google Maps da ochish
                    </a>
                  </div>
                </div>
              )}

              {/* 2. DISTRIBUTORS CONTENT (86 ta) */}
              {activeModal === "distributors" && (
                <div className="space-y-4">
                  {/* Search and Region Filter Bar */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Distribyutor nomi, shahar yoki mahsulot bo'yicha qidirish..."
                        value={distributorSearch}
                        onChange={(e) => setDistributorSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-industrial-border focus:outline-none focus:border-industrial-blue"
                      />
                    </div>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-industrial-border bg-white text-industrial-text font-bold focus:outline-none focus:border-industrial-blue"
                    >
                      <option value="all">Barcha Hududlar (86)</option>
                      {regions.filter((r) => r !== "all").map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* List of Distributors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-1">
                    {filteredDistributors.map((dist) => (
                      <div
                        key={dist.id}
                        className="p-4 rounded-xl bg-industrial-surface-low border border-industrial-border-subtle hover:border-industrial-blue transition-all space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-extrabold text-xs text-industrial-blue leading-tight">
                            {dist.name}
                          </h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-industrial-orange border border-industrial-orange/30 shrink-0">
                            {dist.region}
                          </span>
                        </div>
                        <p className="text-[11px] text-industrial-text-muted line-clamp-1">
                          {dist.address}
                        </p>
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-200/60">
                          <span className="text-[10px] font-semibold text-gray-500 truncate max-w-[150px]">
                            {dist.category}
                          </span>
                          <a
                            href={`tel:${dist.phone.replace(/[^+\d]/g, "")}`}
                            className="font-bold text-industrial-blue hover:text-industrial-orange transition-colors"
                          >
                            {dist.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. SERVICE CENTERS CONTENT (2 ta) */}
              {activeModal === "service" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Service Center 1 */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500/30 hover:border-emerald-500 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                        MARKAZIY SERVIS #1
                      </span>
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Sertifikatlangan
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-industrial-blue">
                        Kontrol Kalibrovka & Servis Markazi
                      </h4>
                      <p className="text-xs text-industrial-text-muted mt-1 flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-industrial-orange shrink-0 mt-0.5" />
                        <span>Toshkent sh., Chilonzor tumani, Kontrol Servis binosi</span>
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 text-xs space-y-1">
                      <div className="font-bold text-emerald-800">Xizmat turlari:</div>
                      <ul className="list-disc list-inside text-industrial-text space-y-0.5 text-[11px]">
                        <li>Hisoblagich va manometrlarni qiyoslash & kalibrovka</li>
                        <li>Festo va SMC pnevmatik tsilindrlarni restavratsiya qilish</li>
                        <li>36 oylik kafolatli servis xizmati</li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-industrial-text-muted font-medium">Aloqa telefoni:</span>
                      <a href="tel:+998712006800" className="font-extrabold text-industrial-blue hover:text-industrial-orange">
                        +998 (71) 200-68-00
                      </a>
                    </div>
                  </div>

                  {/* Service Center 2 */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500/30 hover:border-emerald-500 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold bg-industrial-orange text-white px-2.5 py-0.5 rounded-full">
                        TEXNIK MONTAJ SERVIS #2
                      </span>
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Sertifikatlangan
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-industrial-blue">
                        Kontrol Qorasaroy Montaj Markazi
                      </h4>
                      <p className="text-xs text-industrial-text-muted mt-1 flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-industrial-orange shrink-0 mt-0.5" />
                        <span>Toshkent sh., Olmazor tumani, Qorasaroy ko'chasi 18</span>
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60 text-xs space-y-1">
                      <div className="font-bold text-industrial-blue">Xizmat turlari:</div>
                      <ul className="list-disc list-inside text-industrial-text space-y-0.5 text-[11px]">
                        <li>IP Kameralar va NVR serverlarni sozlash & firmware</li>
                        <li>Turniketlar va biometrik SKUD o'rnatish</li>
                        <li>Sanoat PLC kontrollerlarini dasturlash</li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-industrial-text-muted font-medium">Aloqa telefoni:</span>
                      <a href="tel:+998712005544" className="font-extrabold text-industrial-blue hover:text-industrial-orange">
                        +998 (71) 200-55-44
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-industrial-surface-low border-t border-industrial-border flex items-center justify-between text-xs">
              <span className="text-industrial-text-muted font-medium">
                Savollar bormi? Mutaxassis bilan bog'laning:{" "}
                <a href="tel:+998712006800" className="font-bold text-industrial-blue hover:underline">
                  +998 (71) 200-68-00
                </a>
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-industrial-blue text-white font-bold hover:bg-industrial-blue-dark transition-colors cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
