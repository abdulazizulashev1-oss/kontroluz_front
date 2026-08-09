"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Star,
  CheckCircle,
  Phone,
  ShieldCheck,
  Award,
  BookOpen,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { Product } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

interface ProductDetailTabsProps {
  product: Product;
}

type TabType = "specs" | "description" | "documents" | "reviews";

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("specs");

  // Reviews state
  const [reviewsList, setReviewsList] = useState([
    {
      id: "rev-1",
      author: "Farrux Qodirov",
      company: "Toshkent Neft-Gaz Zavodi",
      rating: 5,
      date: "14-Iyun, 2026",
      comment:
        "Uskuna zavodimiz podstansiyasiga o'rnatildi. Sifati a'lo darajada, pasport va barcha GOST sertifikatlari to'liq taqdim etildi. Yetkazib berish ham tezkor bo'ldi.",
    },
    {
      id: "rev-2",
      author: "Rustam Inoyatov",
      company: "Orient Industrial MChJ",
      rating: 5,
      date: "28-May, 2026",
      comment:
        "Kontrol.uz muhandislari o'rnatish va dastlabki kalibrovka jarayonida katta yordam berishdi. 3 yillik rasmiy kafolat berilgani korporativ xaridor uchun katta ustunlik.",
    },
    {
      id: "rev-3",
      author: "Shavkat Mahmudov",
      company: "Bekobod Metallurgiya Kombinati",
      rating: 4.8,
      date: "02-May, 2026",
      comment:
        "Sanoat sharoitida 24/7 yuklamada mukammal ishlamoqda. Texnik parametrlari e'lon qilingan ko'rsatkichlarga 100% javob beradi.",
    },
  ]);

  const [newAuthor, setNewAuthor] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    setReviewsList([
      {
        id: `rev-${Date.now()}`,
        author: newAuthor,
        company: newCompany || "Mustaqil Mutaxassis",
        rating: newRating,
        date: "Hozirgina",
        comment: newComment,
      },
      ...reviewsList,
    ]);

    setNewAuthor("");
    setNewCompany("");
    setNewComment("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const documents = [
    {
      id: "doc-1",
      title: `${product.title} — Rasmiy Texnik Pasport (Datasheet)`,
      size: "2.8 MB",
      format: "PDF",
      code: `PASSPORT-${product.sku}`,
    },
    {
      id: "doc-2",
      title: "Muvofiqlik va Sanoat Xavfsizligi Sertifikati (ISO 9001 / GOST)",
      size: "1.4 MB",
      format: "PDF",
      code: "CERT-UZ-2026",
    },
    {
      id: "doc-3",
      title: "O'rnatish, Montaj va Foydalanish Bo'yicha Qo'llanma",
      size: "4.2 MB",
      format: "PDF",
      code: "MANUAL-V2",
    },
  ];

  return (
    <div className="bg-white border border-industrial-border rounded-xl p-6 space-y-6 shadow-xs">
      {/* Tab Navigation Header Bar */}
      <div className="border-b border-industrial-border flex flex-wrap items-center gap-2 sm:gap-6 text-xs sm:text-sm font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`pb-3 px-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "specs"
              ? "text-industrial-blue border-b-2 border-industrial-blue font-black"
              : "text-industrial-text-muted hover:text-industrial-blue"
          }`}
        >
          <span>Texnik Xususiyatlar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`pb-3 px-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "description"
              ? "text-industrial-blue border-b-2 border-industrial-blue font-black"
              : "text-industrial-text-muted hover:text-industrial-blue"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Tavsif va Qo'llanma</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("documents")}
          className={`pb-3 px-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "documents"
              ? "text-industrial-blue border-b-2 border-industrial-blue font-black"
              : "text-industrial-text-muted hover:text-industrial-blue"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Hujjatlar (PDF)</span>
          <span className="bg-industrial-surface-low text-industrial-blue px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold border border-industrial-border-subtle">
            {documents.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 px-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "reviews"
              ? "text-industrial-blue border-b-2 border-industrial-blue font-black"
              : "text-industrial-text-muted hover:text-industrial-blue"
          }`}
        >
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Sharhlar ({reviewsList.length})</span>
        </button>
      </div>

      {/* 1. Tab Content: Texnik Xususiyatlar (Specifications) */}
      {activeTab === "specs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
          <div className="lg:col-span-7">
            <div className="border border-industrial-border-subtle rounded-lg overflow-hidden shadow-xs">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? "bg-industrial-surface-low" : "bg-white"}
                    >
                      <td className="p-3.5 font-extrabold text-industrial-text border-b border-industrial-border-subtle w-1/2">
                        {key}
                      </td>
                      <td className="p-3.5 text-industrial-text-muted border-b border-industrial-border-subtle w-1/2 font-semibold font-mono">
                        {val}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-white">
                    <td className="p-3.5 font-extrabold text-industrial-text w-1/2">
                      Sertifikatlash
                    </td>
                    <td className="p-3.5 text-emerald-600 font-bold w-1/2 flex items-center gap-1">
                      <Award className="w-4 h-4 text-emerald-600" /> ISO 9001 / GOST Sertifikatlangan
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-black text-base text-industrial-text">Batafsil Mahsulot Tavsifi</h3>
            <p className="text-xs text-industrial-text-muted leading-relaxed">
              {product.fullDescription}
            </p>

            <div className="p-5 bg-industrial-blue/10 border border-industrial-blue/20 rounded-xl text-xs space-y-2">
              <div className="font-extrabold text-industrial-blue text-sm">
                O'rnatish va Loyihalash bo'yicha Savollaringiz bormi?
              </div>
              <p className="text-industrial-text-muted leading-relaxed">
                Mutaxassisimiz bilan bevosita bog'laning va muhandislik konsultatsiyasini oling.
              </p>
              <a
                href="tel:+998712006800"
                className="inline-flex items-center gap-1.5 font-black text-industrial-orange hover:underline pt-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                +998 (71) 200-68-00
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Tab Content: Tavsif va Qo'llanma (Description & Installation Guide) */}
      {activeTab === "description" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="prose prose-sm max-w-none text-industrial-text leading-relaxed">
            <h3 className="text-lg font-black text-industrial-blue mb-2">
              Mahsulot haqida to'liq ma'lumot
            </h3>
            <p className="text-xs text-industrial-text-muted leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-industrial-border">
            <div className="p-5 bg-industrial-surface-low border border-industrial-border rounded-xl space-y-3">
              <h4 className="font-black text-sm text-industrial-text flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                O'rnatish va Montaj Qoidalari
              </h4>
              <ul className="text-xs text-industrial-text-muted space-y-2 list-disc list-inside">
                <li>Montaj ishlarini boshlashdan oldin asosiy elektr tarmoq ta'minotini uzing.</li>
                <li>Uskunani faqat sertifikatlangan muhandis-texnik mutaxassislar o'rnatsin.</li>
                <li>Barcha ulanish simlarini texnik pasportdagi elektr sxemaga muvofiq bajaring.</li>
                <li>Yerga ulash (zazemleniye) konturini qat'iy standartlarga asosan tekshiring.</li>
              </ul>
            </div>

            <div className="p-5 bg-industrial-surface-low border border-industrial-border rounded-xl space-y-3">
              <h4 className="font-black text-sm text-industrial-text flex items-center gap-2">
                <Award className="w-5 h-5 text-industrial-blue" />
                Ekspluatatsiya va Ishchi Sharoitlar
              </h4>
              <ul className="text-xs text-industrial-text-muted space-y-2 list-disc list-inside">
                <li>Ishchi harorat diapazoni: -30°C dan +60°C gacha.</li>
                <li>Nisbiy namlik: 95% gacha (kondensat hosil bo'lmaydigan muhitda).</li>
                <li>Chang va suvdan himoya: Yuqori sanoat himoya toifasi (IP65 / IP67).</li>
                <li>Rejali texnik ko'rik davriyligi: Har 12 oyda 1 marotaba.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tab Content: Hujjatlar (PDF) (Datasheets & Certifications) */}
      {activeTab === "documents" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="text-xs text-industrial-text-muted">
            Ushbu uskunaga tegishli barcha rasmiy texnik hujjatlar va sertifikatlar:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-5 bg-industrial-surface-low border border-industrial-border rounded-xl flex flex-col justify-between space-y-4 hover:border-industrial-blue transition-colors group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded border border-rose-200 uppercase">
                      {doc.format}
                    </span>
                    <span className="text-[11px] font-mono text-industrial-text-muted">
                      {doc.size}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-industrial-text group-hover:text-industrial-blue transition-colors leading-snug">
                    {doc.title}
                  </h4>
                  <div className="text-[10px] font-mono text-industrial-text-muted">
                    Kod: {doc.code}
                  </div>
                </div>

                <a
                  href={`#download-${doc.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${doc.title} fayli yuklab olinmoqda...`);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-industrial-blue text-industrial-blue font-extrabold text-xs hover:bg-industrial-blue hover:text-white transition-all shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Yuklab olish (PDF)</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Tab Content: Sharhlar (Reviews & Leave Review Form) */}
      {activeTab === "reviews" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Reviews Summary Header */}
          <div className="p-6 bg-industrial-surface-low border border-industrial-border rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="text-4xl font-black text-industrial-blue">
                {product.rating}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <div className="text-xs text-industrial-text-muted">
                  Barcha <span className="font-bold text-industrial-text">{reviewsList.length} ta</span> tasdiqlangan sanoat sharhlari
                </div>
              </div>
            </div>

            <div className="text-xs text-industrial-text-muted flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>100% Haqiqiy xaridorlar bahosi</span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-5 bg-white border border-industrial-border rounded-xl space-y-2.5 shadow-2xs"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-industrial-blue/10 text-industrial-blue flex items-center justify-center font-bold text-xs">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-industrial-text">
                        {rev.author}
                      </div>
                      <div className="text-[11px] text-industrial-text-muted font-medium">
                        {rev.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(Math.floor(rev.rating))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] text-industrial-text-muted font-mono">
                      {rev.date}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-industrial-text leading-relaxed pl-10">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className="p-6 bg-industrial-surface-low border border-industrial-border rounded-xl space-y-4">
            <h4 className="font-black text-sm text-industrial-blue flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-industrial-orange" />
              Fikr va Sharh Qoldirish
            </h4>

            {reviewSubmitted && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Sharhingiz muvaffaqiyatli qabul qilindi va ro'yxatga qo'shildi!</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-industrial-text block mb-1">
                    Ism-familiyangiz *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor Rustamov"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full p-2.5 bg-white border border-industrial-border rounded font-semibold focus:outline-none focus:border-industrial-blue"
                  />
                </div>

                <div>
                  <label className="font-bold text-industrial-text block mb-1">
                    Kompaniya / Korxona nomi
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Techno Invest MChJ"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full p-2.5 bg-white border border-industrial-border rounded font-semibold focus:outline-none focus:border-industrial-blue"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-industrial-text block mb-1">
                  Bahoingiz (Yulduzlar)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newRating
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono font-bold text-industrial-blue ml-2">
                    {newRating} / 5
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold text-industrial-text block mb-1">
                  Sharh va Tajribangiz *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Uskunaning ishlashi, yetkazilishi va sifati haqidagi xolis fikringiz..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2.5 bg-white border border-industrial-border rounded font-semibold focus:outline-none focus:border-industrial-blue"
                />
              </div>

              <Button
                type="submit"
                variant="cta"
                className="gap-2 font-extrabold text-xs py-2.5 px-6"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Sharhni Chop Etish</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
