"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Users,
  ShoppingCart,
  UserCheck,
  FolderTree,
  DollarSign,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { Timeframe, getAnalyticsForTimeframe } from "@/lib/admin/analytics-data";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { Product, Category } from "@/shared/types";
import { formatPrice } from "@/lib/utils";
import { AdminHeader } from "@/components/admin/admin-header";
import { MetricCard } from "@/components/admin/metric-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { VisitorChart } from "@/components/admin/visitor-chart";
import { CategoryDistribution } from "@/components/admin/category-distribution";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState("admin@kontrol.uz");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Check authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.user?.email) setUserEmail(data.user.email);
        setIsLoadingAuth(false);
      } catch (err) {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  // Fetch live backend data
  const loadData = async () => {
    setIsDataLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (e) {
      // Fallback handled in lib/api.ts
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoadingAuth) {
      loadData();
    }
  }, [isLoadingAuth]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-industrial-surface flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-industrial-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-xs font-mono font-bold text-industrial-blue uppercase tracking-wider">
            Super Admin Tekshirilmoqda...
          </div>
        </div>
      </div>
    );
  }

  const analytics = getAnalyticsForTimeframe(timeframe, products, categories);

  return (
    <div className="min-h-screen bg-industrial-surface pb-16">
      {/* Super Admin Top Navigation */}
      <AdminHeader
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        userEmail={userEmail}
      />

      <main className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
        {/* Page Title & Live Sync Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-border pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-industrial-text tracking-tight">
              Boshqaruv va Analitika Paneli
            </h1>
            <p className="text-xs text-industrial-text-muted mt-1">
              Kontrol.uz savdo, tashriflar, B2B arizalar va ombor ko'rsatkichlarining real-time tahlili
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={isDataLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-industrial-border text-xs font-bold text-industrial-blue hover:bg-industrial-surface-low hover:border-industrial-blue transition-all shadow-2xs cursor-pointer w-fit"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDataLoading ? "animate-spin" : ""}`} />
            <span>{isDataLoading ? "Yangilanmoqda..." : "Jonli Yangilash"}</span>
          </button>
        </div>

        {/* 1. Key Performance Indicators (5 Main KPI Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Revenue & Orders */}
          <MetricCard
            title="Umumiy Tushum"
            value={formatPrice(analytics.metrics.totalRevenue, "UZS")}
            subtext={`${analytics.metrics.totalOrders} ta rasmiy buyurtma`}
            growth={analytics.metrics.growth.revenue}
            color="blue"
            icon={<DollarSign className="w-6 h-6 text-industrial-blue" />}
          />

          {/* Card 2: B2B Leads */}
          <MetricCard
            title="B2B Lead & Arizalar"
            value={`${analytics.metrics.totalLeads} ta`}
            subtext={`${analytics.metrics.newLeads} ta yangi ariza`}
            growth={analytics.metrics.growth.leads}
            color="orange"
            icon={<UserCheck className="w-6 h-6 text-industrial-orange" />}
          />

          {/* Card 3: Products */}
          <MetricCard
            title="Uskunalar Soni"
            value={`${analytics.metrics.totalProducts} ta`}
            subtext={`Omborda: ${analytics.metrics.inStockProducts} ta`}
            growth={analytics.metrics.growth.products}
            color="indigo"
            icon={<Package className="w-6 h-6 text-indigo-600" />}
          />

          {/* Card 4: Visitors */}
          <MetricCard
            title="Sayt Tashriflari"
            value={analytics.metrics.totalVisitors.toLocaleString()}
            subtext={`Faol: ${analytics.metrics.liveVisitors} ta sessiya`}
            growth={analytics.metrics.growth.visitors}
            color="green"
            icon={<Users className="w-6 h-6 text-emerald-600" />}
          />

          {/* Card 5: Categories */}
          <MetricCard
            title="Kategoriyalar"
            value={`${analytics.metrics.totalCategories} ta`}
            subtext="Barcha asosiy yo'nalishlar"
            color="purple"
            icon={<FolderTree className="w-6 h-6 text-purple-600" />}
          />
        </div>

        {/* 2. Visual Graphs & Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Revenue & Orders Chart */}
          <div className="lg:col-span-8 space-y-8">
            <RevenueChart
              data={analytics.chartData}
              totalRevenue={analytics.metrics.totalRevenue}
              totalOrders={analytics.metrics.totalOrders}
            />

            <VisitorChart
              data={analytics.chartData}
              totalVisitors={analytics.metrics.totalVisitors}
              liveVisitors={analytics.metrics.liveVisitors}
            />
          </div>

          {/* Right Column: Category Distribution */}
          <div className="lg:col-span-4">
            <CategoryDistribution categories={analytics.categoryStats} />
          </div>
        </div>

        {/* 3. Recent Orders & B2B Leads Table with CSV Export */}
        <RecentOrdersTable orders={analytics.recentOrders} />
      </main>
    </div>
  );
}
