"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Trash2,
  Lock,
  ShieldCheck,
  Headphones,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle,
  X,
  Phone,
  User,
  Building2,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { MOCK_PRODUCTS, createLead, submitOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/cart-context";

export default function CartPage() {
  const { t } = useTranslation();
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, totalCount } = useCart();

  const vat = Math.round(subtotal * 0.12);
  const shipping = subtotal > 10000000 || subtotal === 0 ? 0 : 150000;
  const total = subtotal + vat + shipping;

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) return;

    setIsSubmitting(true);
    const newOrderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const res = await submitOrder({
      customerName: clientName,
      customerPhone: phone,
      company,
      shippingAddress: address,
      items: items.map((it) => ({
        productId: it.product.id,
        slug: it.product.slug,
        title: it.product.title,
        quantity: it.quantity,
        price: it.product.price,
        image: it.product.image,
      })),
      subtotal,
      tax: vat,
      shippingFee: shipping,
      totalAmount: total,
      notes: `Buyurtma manzil: ${address}`,
    });

    setIsSubmitting(false);
    const generatedOrderNum = res.data?.attributes?.orderNumber || res.data?.orderNumber || newOrderId;
    setOrderId(generatedOrderNum);
    setOrderConfirmed(true);
    clearCart();
  };

  return (
    <div className="bg-industrial-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-industrial-text-muted flex items-center gap-2">
          <Link href="/" className="hover:underline">
            {t("nav.home")}
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:underline">
            {t("nav.catalog")}
          </Link>
          <span>/</span>
          <span className="font-bold text-industrial-blue">{t("cartPage.title")}</span>
        </nav>

        {items.length === 0 && !orderConfirmed ? (
          <Card className="p-12 text-center bg-white border border-industrial-border space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-industrial-surface-low rounded-full flex items-center justify-center mx-auto text-industrial-blue">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-industrial-text">
              {t("cartPage.emptyTitle")}
            </h2>
            <p className="text-sm text-industrial-text-muted">
              {t("cartPage.emptyDesc")}
            </p>
            <Link href="/katalog" className="inline-block pt-2">
              <Button variant="cta" size="lg" className="gap-2 font-extrabold px-6">
                <ArrowLeft className="w-4 h-4" />
                <span>{t("cartPage.backToCatalog")}</span>
              </Button>
            </Link>
          </Card>
        ) : (
          /* Main Cart Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Cart Section */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between border-b border-industrial-border pb-3">
                <h1 className="text-2xl sm:text-3xl font-black text-industrial-text flex items-center gap-3">
                  <span>{t("cartPage.title")}</span>
                  <span className="text-xs font-bold text-industrial-blue bg-industrial-blue/10 px-2.5 py-1 rounded">
                    {totalCount} {t("categories.itemsCount")}
                  </span>
                </h1>
                <button
                  onClick={clearCart}
                  className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t("cartPage.clearCart")}</span>
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <Card
                    key={item.product.id}
                    className="p-5 bg-white border border-industrial-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative w-24 h-24 bg-industrial-surface-low rounded border border-industrial-border-subtle p-2 flex items-center justify-center shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                          unoptimized
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold bg-industrial-surface-low px-2 py-0.5 rounded text-industrial-text-muted">
                          SKU: {item.product.sku}
                        </span>
                        <h3 className="font-bold text-sm text-industrial-text line-clamp-2">
                          <Link
                            href={`/katalog/${item.product.categorySlug}/${item.product.slug}`}
                            className="hover:text-industrial-blue transition-colors"
                          >
                            {item.product.title}
                          </Link>
                        </h3>
                        <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> {t("products.inStock")} ({item.product.stockCount})
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Price Box */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-industrial-border-subtle pt-4 sm:pt-0 gap-3">
                      <div className="text-right">
                        <div className="text-lg font-black text-industrial-blue">
                          {formatPrice(item.product.price * item.quantity, item.product.currency)}
                        </div>
                        <div className="text-[11px] text-industrial-text-muted">
                          {formatPrice(item.product.price, item.product.currency)}
                        </div>
                      </div>

                      <div className="flex items-center border border-industrial-border rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-500 hover:bg-industrial-surface-low font-bold cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-500 hover:bg-industrial-surface-low font-bold cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/katalog"
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-industrial-blue hover:text-industrial-orange transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("cartPage.backToCatalog")}
                </Link>
              </div>
            </div>

            {/* Right Order Summary Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <Card className="p-6 bg-white border border-industrial-border shadow-sm space-y-5 sticky top-24">
                <h2 className="text-lg font-black text-industrial-text border-b border-industrial-border pb-3">
                  {t("cartPage.summaryTitle")}
                </h2>

                <div className="space-y-3 text-xs border-b border-industrial-border pb-4">
                  <div className="flex justify-between items-center text-industrial-text-muted">
                    <span>{t("cartPage.itemsTotal")}:</span>
                    <span className="font-bold text-industrial-text">{formatPrice(subtotal, "UZS")}</span>
                  </div>

                  <div className="flex justify-between items-center text-industrial-text-muted">
                    <span>{t("cartPage.delivery")}:</span>
                    <span className="font-bold text-industrial-text">
                      {shipping === 0 ? t("cartPage.freeDelivery") : formatPrice(shipping, "UZS")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-industrial-text-muted">
                    <span>QQS (12%):</span>
                    <span className="font-bold text-industrial-text">{formatPrice(vat, "UZS")}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline py-1">
                  <span className="text-base font-black text-industrial-text">{t("cartPage.grandTotal")}:</span>
                  <span className="text-2xl font-black text-industrial-blue">{formatPrice(total, "UZS")}</span>
                </div>

                <Button
                  onClick={() => setIsCheckoutOpen(true)}
                  variant="cta"
                  size="lg"
                  className="w-full gap-2 font-extrabold text-sm py-3.5 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>{t("cartPage.checkoutBtn")}</span>
                </Button>

                {/* Trust Badges */}
                <div className="space-y-2 text-[11px] text-industrial-text-muted pt-2">
                  <div className="flex items-center gap-2.5 p-2.5 bg-industrial-surface-low rounded border border-industrial-border-subtle">
                    <ShieldCheck className="w-4 h-4 text-industrial-blue shrink-0" />
                    <span>256-bit SSL Shifrlash & Kafolat</span>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 bg-industrial-surface-low rounded border border-industrial-border-subtle">
                    <Headphones className="w-4 h-4 text-industrial-blue shrink-0" />
                    <span>24/7 Muhandislik & Servis Ko'magi</span>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        )}
      </div>

      {/* B2B Checkout Order Modal */}
      {isCheckoutOpen && (
        <div
          onClick={() => setIsCheckoutOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-industrial-border relative space-y-5"
          >
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-industrial-text p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {orderConfirmed ? (
              <div className="text-center space-y-4 py-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                    Buyurtma Raqami: {orderId}
                  </span>
                  <h3 className="text-xl font-black text-industrial-blue pt-2">
                    Buyurtmangiz Muvaffaqiyatli Rasmiylashtirildi!
                  </h3>
                </div>
                <p className="text-xs text-industrial-text-muted leading-relaxed max-w-sm mx-auto">
                  Hurmatli <span className="font-bold text-industrial-text">{clientName}</span>, buyurtma tafsilotlari va rasmiy invoys hisob-faktura tayyorlanmoqda. Menejerimiz <span className="font-bold text-industrial-blue">{phone}</span> raqami orqali bog'lanadi.
                </p>
                <Button
                  variant="cta"
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderConfirmed(false);
                  }}
                  className="w-full font-bold text-xs"
                >
                  Tushundim
                </Button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-industrial-orange uppercase">
                    B2B & Korporativ Xarid
                  </span>
                  <h3 className="text-lg font-black text-industrial-text mt-0.5">
                    Buyurtmani Rasmiylashtirish
                  </h3>
                  <p className="text-xs text-industrial-text-muted mt-1">
                    Jami to'lov: <span className="font-black text-industrial-blue">{formatPrice(total, "UZS")}</span> (QQS 12% hisoblangan)
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-industrial-text flex items-center gap-1.5 mb-1">
                      <User className="w-3.5 h-3.5 text-industrial-orange" /> Mas'ul shaxs (Ism-familiya) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Sardor Rustamov"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full p-2.5 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-industrial-text flex items-center gap-1.5 mb-1">
                      <Phone className="w-3.5 h-3.5 text-industrial-orange" /> Telefon raqam *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-industrial-text flex items-center gap-1.5 mb-1">
                        <Building2 className="w-3.5 h-3.5 text-industrial-blue" /> Tashkilot / Korxona
                      </label>
                      <input
                        type="text"
                        placeholder="MChJ yoki Zavod"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-2.5 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-industrial-text flex items-center gap-1.5 mb-1">
                        <FileText className="w-3.5 h-3.5 text-industrial-blue" /> Yetkazish manzili
                      </label>
                      <input
                        type="text"
                        placeholder="Toshkent sh., Chilonzor..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2.5 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-xs font-extrabold gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isSubmitting ? "Rasmiylashtirilmoqda..." : "Buyurtmani Tasdiqlash"}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
