import { Product, Category } from "@/shared/types";

export type Timeframe = "daily" | "weekly" | "monthly" | "yearly";

export interface KPIMetrics {
  totalProducts: number;
  inStockProducts: number;
  totalLeads: number;
  newLeads: number;
  totalVisitors: number;
  liveVisitors: number;
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  totalCategories: number;
  growth: {
    products: number;
    leads: number;
    visitors: number;
    orders: number;
    revenue: number;
  };
}

export interface ChartDataPoint {
  label: string;
  revenue: number;
  orders: number;
  visitors: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  company?: string;
  type: "ORDER" | "LEAD";
  amount: number;
  itemsCount: number;
  status: "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  date: string;
}

export interface CategoryStat {
  name: string;
  slug: string;
  productCount: number;
  salesVolume: number;
  percentage: number;
  color: string;
}

export function getAnalyticsForTimeframe(
  timeframe: Timeframe,
  liveProducts: Product[] = [],
  liveCategories: Category[] = []
): {
  metrics: KPIMetrics;
  chartData: ChartDataPoint[];
  categoryStats: CategoryStat[];
  recentOrders: OrderItem[];
} {
  const prodCount = liveProducts.length > 0 ? liveProducts.length : 142;
  const inStockCount = liveProducts.length > 0 ? liveProducts.filter((p) => p.inStock).length : 138;
  const catCount = liveCategories.length > 0 ? liveCategories.length : 6;

  // Timeframe based multipliers
  let baseRevenue = 485000000;
  let baseOrders = 38;
  let baseVisitors = 14850;
  let baseLeads = 64;

  let chartData: ChartDataPoint[] = [];

  if (timeframe === "daily") {
    baseRevenue = 18450000;
    baseOrders = 6;
    baseVisitors = 840;
    baseLeads = 5;

    chartData = [
      { label: "00:00", revenue: 0, orders: 0, visitors: 45 },
      { label: "04:00", revenue: 0, orders: 0, visitors: 28 },
      { label: "08:00", revenue: 2400000, orders: 1, visitors: 140 },
      { label: "11:00", revenue: 5800000, orders: 2, visitors: 260 },
      { label: "14:00", revenue: 4250000, orders: 1, visitors: 195 },
      { label: "17:00", revenue: 3900000, orders: 1, visitors: 120 },
      { label: "20:00", revenue: 2100000, orders: 1, visitors: 52 },
    ];
  } else if (timeframe === "weekly") {
    baseRevenue = 124600000;
    baseOrders = 19;
    baseVisitors = 4920;
    baseLeads = 22;

    chartData = [
      { label: "Dushanba", revenue: 14200000, orders: 2, visitors: 680 },
      { label: "Seshanba", revenue: 22800000, orders: 3, visitors: 740 },
      { label: "Chorshanba", revenue: 19500000, orders: 3, visitors: 820 },
      { label: "Payshanba", revenue: 28400000, orders: 4, visitors: 890 },
      { label: "Juma", revenue: 24100000, orders: 4, visitors: 780 },
      { label: "Shanba", revenue: 11200000, orders: 2, visitors: 610 },
      { label: "Yakshanba", revenue: 4400000, orders: 1, visitors: 400 },
    ];
  } else if (timeframe === "monthly") {
    baseRevenue = 485000000;
    baseOrders = 54;
    baseVisitors = 18450;
    baseLeads = 68;

    chartData = [
      { label: "1-Hafta", revenue: 98000000, orders: 12, visitors: 3900 },
      { label: "2-Hafta", revenue: 142000000, orders: 16, visitors: 5100 },
      { label: "3-Hafta", revenue: 128000000, orders: 14, visitors: 4600 },
      { label: "4-Hafta", revenue: 117000000, orders: 12, visitors: 4850 },
    ];
  } else {
    // Yearly
    baseRevenue = 4680000000;
    baseOrders = 480;
    baseVisitors = 185000;
    baseLeads = 740;

    chartData = [
      { label: "Yan", revenue: 280000000, orders: 28, visitors: 11200 },
      { label: "Fev", revenue: 310000000, orders: 32, visitors: 12400 },
      { label: "Mar", revenue: 420000000, orders: 44, visitors: 16800 },
      { label: "Apr", revenue: 390000000, orders: 41, visitors: 15200 },
      { label: "May", revenue: 460000000, orders: 48, visitors: 18400 },
      { label: "Iyun", revenue: 510000000, orders: 52, visitors: 20100 },
      { label: "Iyul", revenue: 485000000, orders: 49, visitors: 19400 },
      { label: "Avg", revenue: 530000000, orders: 54, visitors: 21800 },
    ];
  }

  const metrics: KPIMetrics = {
    totalProducts: prodCount,
    inStockProducts: inStockCount,
    totalLeads: baseLeads,
    newLeads: Math.max(3, Math.round(baseLeads * 0.25)),
    totalVisitors: baseVisitors,
    liveVisitors: 14,
    totalOrders: baseOrders,
    totalRevenue: baseRevenue,
    avgOrderValue: baseOrders > 0 ? Math.round(baseRevenue / baseOrders) : 0,
    totalCategories: catCount,
    growth: {
      products: 8.5,
      leads: 24.2,
      visitors: 18.7,
      orders: 14.3,
      revenue: 29.8,
    },
  };

  const colors = ["#004094", "#FF6B00", "#00A67E", "#009BDF", "#7A8AFF", "#A67AFF"];

  const categoryStats: CategoryStat[] =
    liveCategories.length > 0
      ? liveCategories.map((cat, idx) => ({
          name: cat.name,
          slug: cat.slug,
          productCount: cat.productCount || 12,
          salesVolume: Math.round(baseRevenue * (0.35 / (idx + 1))),
          percentage: Math.max(8, Math.round(100 / (idx + 1.8))),
          color: colors[idx % colors.length],
        }))
      : [
          { name: "Videokuzatuv Tizimlari", slug: "videokuzatuv", productCount: 42, salesVolume: 185000000, percentage: 38, color: "#004094" },
          { name: "Kirishni Boshqarish (SKUD)", slug: "kirishni-boshqarish", productCount: 36, salesVolume: 142000000, percentage: 29, color: "#FF6B00" },
          { name: "Sanoat Avtomatikasi va Nasoslar", slug: "sanoat-avtomatikasi", productCount: 28, salesVolume: 89000000, percentage: 18, color: "#00A67E" },
          { name: "Yong'in Xavfsizligi", slug: "yongin-xavfsizligi", productCount: 22, salesVolume: 44000000, percentage: 9, color: "#009BDF" },
          { name: "Boshqa Uskunalar", slug: "uskunalar", productCount: 14, salesVolume: 25000000, percentage: 6, color: "#7A8AFF" },
        ];

  const recentOrders: OrderItem[] = [
    {
      id: "ord-1",
      orderNumber: "ORD-20260809-9400",
      customerName: "Sardor Rustamov",
      phone: "+998 90 123 45 67",
      company: "PromEnergo Zavod MChJ",
      type: "ORDER",
      amount: 19990000,
      itemsCount: 2,
      status: "NEW",
      date: "10-Avgust, 01:25",
    },
    {
      id: "ord-2",
      orderNumber: "ORD-20260809-8812",
      customerName: "Alisher Navoiy",
      phone: "+998 93 456 78 90",
      company: "Smart Tech LLC",
      type: "ORDER",
      amount: 5936000,
      itemsCount: 3,
      status: "PROCESSING",
      date: "09-Avgust, 18:40",
    },
    {
      id: "lead-1",
      orderNumber: "LEAD-20260809-4102",
      customerName: "Jaloliddin Abdurahmonov",
      phone: "+998 97 789 12 34",
      company: "Orient Industrial Group",
      type: "LEAD",
      amount: 45000000,
      itemsCount: 1,
      status: "NEW",
      date: "09-Avgust, 16:15",
    },
    {
      id: "ord-3",
      orderNumber: "ORD-20260809-7431",
      customerName: "Farrux Qodirov",
      phone: "+998 99 333 22 11",
      company: "Toshkent Neft-Gaz Podstansiya",
      type: "ORDER",
      amount: 28500000,
      itemsCount: 4,
      status: "COMPLETED",
      date: "09-Avgust, 12:30",
    },
    {
      id: "lead-2",
      orderNumber: "LEAD-20260808-3019",
      customerName: "Rustam Inoyatov",
      phone: "+998 90 999 88 77",
      company: "Bekobod Metallurgiya Kombinati",
      type: "LEAD",
      amount: 112000000,
      itemsCount: 1,
      status: "COMPLETED",
      date: "08-Avgust, 17:05",
    },
  ];

  return {
    metrics,
    chartData,
    categoryStats,
    recentOrders,
  };
}
