import { Product, Category } from "@/shared/types";
import { getStoredOrders } from "@/lib/admin/data-store";

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
  liveCategories: Category[] = [],
  customOrders: OrderItem[] = []
): {
  metrics: KPIMetrics;
  chartData: ChartDataPoint[];
  categoryStats: CategoryStat[];
  recentOrders: OrderItem[];
} {
  const prodCount = liveProducts.length;
  const inStockCount = liveProducts.filter((p) => p.inStock).length;
  const catCount = liveCategories.length;

  const ordersPool = customOrders.length > 0 ? customOrders : getStoredOrders();
  const realOrdersCount = ordersPool.filter((o) => o.type === "ORDER").length;
  const realLeadsCount = ordersPool.filter((o) => o.type === "LEAD").length;
  const realNewLeads = ordersPool.filter((o) => o.status === "NEW").length;
  const realTotalRevenue = ordersPool.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Timeframe based multipliers
  let baseRevenue = realTotalRevenue;
  let baseOrders = realOrdersCount;
  let baseVisitors = 14850;
  let baseLeads = realLeadsCount;

  let chartData: ChartDataPoint[] = [];

  if (timeframe === "daily") {
    baseRevenue = Math.round(realTotalRevenue * 0.15);
    baseOrders = Math.max(1, Math.round(realOrdersCount * 0.2));
    baseVisitors = 840;
    baseLeads = Math.max(1, Math.round(realLeadsCount * 0.2));

    chartData = [
      { label: "00:00", revenue: 0, orders: 0, visitors: 45 },
      { label: "04:00", revenue: 0, orders: 0, visitors: 28 },
      { label: "08:00", revenue: Math.round(baseRevenue * 0.15), orders: 1, visitors: 140 },
      { label: "11:00", revenue: Math.round(baseRevenue * 0.35), orders: 1, visitors: 260 },
      { label: "14:00", revenue: Math.round(baseRevenue * 0.25), orders: 1, visitors: 195 },
      { label: "17:00", revenue: Math.round(baseRevenue * 0.15), orders: 1, visitors: 120 },
      { label: "20:00", revenue: Math.round(baseRevenue * 0.10), orders: 1, visitors: 52 },
    ];
  } else if (timeframe === "weekly") {
    baseRevenue = Math.round(realTotalRevenue * 0.45);
    baseOrders = Math.max(2, Math.round(realOrdersCount * 0.5));
    baseVisitors = 4920;
    baseLeads = Math.max(2, Math.round(realLeadsCount * 0.5));

    chartData = [
      { label: "Dushanba", revenue: Math.round(baseRevenue * 0.14), orders: 1, visitors: 680 },
      { label: "Seshanba", revenue: Math.round(baseRevenue * 0.22), orders: 1, visitors: 740 },
      { label: "Chorshanba", revenue: Math.round(baseRevenue * 0.18), orders: 1, visitors: 820 },
      { label: "Payshanba", revenue: Math.round(baseRevenue * 0.24), orders: 2, visitors: 890 },
      { label: "Juma", revenue: Math.round(baseRevenue * 0.12), orders: 1, visitors: 780 },
      { label: "Shanba", revenue: Math.round(baseRevenue * 0.07), orders: 1, visitors: 610 },
      { label: "Yakshanba", revenue: Math.round(baseRevenue * 0.03), orders: 0, visitors: 400 },
    ];
  } else if (timeframe === "monthly") {
    baseRevenue = realTotalRevenue;
    baseOrders = realOrdersCount;
    baseVisitors = 18450;
    baseLeads = realLeadsCount;

    chartData = [
      { label: "1-Hafta", revenue: Math.round(baseRevenue * 0.22), orders: Math.max(1, Math.round(baseOrders * 0.2)), visitors: 3900 },
      { label: "2-Hafta", revenue: Math.round(baseRevenue * 0.32), orders: Math.max(1, Math.round(baseOrders * 0.3)), visitors: 5100 },
      { label: "3-Hafta", revenue: Math.round(baseRevenue * 0.28), orders: Math.max(1, Math.round(baseOrders * 0.3)), visitors: 4600 },
      { label: "4-Hafta", revenue: Math.round(baseRevenue * 0.18), orders: Math.max(1, Math.round(baseOrders * 0.2)), visitors: 4850 },
    ];
  } else {
    // Yearly
    baseRevenue = realTotalRevenue * 10;
    baseOrders = realOrdersCount * 12;
    baseVisitors = 185000;
    baseLeads = realLeadsCount * 10;

    chartData = [
      { label: "Yan", revenue: Math.round(baseRevenue * 0.06), orders: Math.round(baseOrders * 0.06), visitors: 11200 },
      { label: "Fev", revenue: Math.round(baseRevenue * 0.07), orders: Math.round(baseOrders * 0.07), visitors: 12400 },
      { label: "Mar", revenue: Math.round(baseRevenue * 0.09), orders: Math.round(baseOrders * 0.09), visitors: 16800 },
      { label: "Apr", revenue: Math.round(baseRevenue * 0.08), orders: Math.round(baseOrders * 0.08), visitors: 15200 },
      { label: "May", revenue: Math.round(baseRevenue * 0.10), orders: Math.round(baseOrders * 0.10), visitors: 18400 },
      { label: "Iyun", revenue: Math.round(baseRevenue * 0.11), orders: Math.round(baseOrders * 0.11), visitors: 20100 },
      { label: "Iyul", revenue: Math.round(baseRevenue * 0.12), orders: Math.round(baseOrders * 0.12), visitors: 19400 },
      { label: "Avg", revenue: Math.round(baseRevenue * 0.14), orders: Math.round(baseOrders * 0.14), visitors: 21800 },
    ];
  }

  const metrics: KPIMetrics = {
    totalProducts: prodCount,
    inStockProducts: inStockCount,
    totalLeads: baseLeads,
    newLeads: realNewLeads,
    totalVisitors: baseVisitors,
    liveVisitors: 14,
    totalOrders: baseOrders,
    totalRevenue: baseRevenue,
    avgOrderValue: baseOrders > 0 ? Math.round(baseRevenue / baseOrders) : 0,
    totalCategories: catCount,
    growth: {
      products: 12.0,
      leads: 18.5,
      visitors: 24.2,
      orders: 16.8,
      revenue: 22.4,
    },
  };

  const colors = ["#004094", "#FF6B00", "#00A67E", "#009BDF", "#7A8AFF", "#A67AFF"];

  // Calculate actual product count per category
  const categoryStats: CategoryStat[] =
    liveCategories.length > 0
      ? liveCategories.map((cat, idx) => {
          const categoryProducts = liveProducts.filter(
            (p) => p.categorySlug === cat.slug || p.categoryName === cat.name
          );
          const count = categoryProducts.length > 0 ? categoryProducts.length : cat.productCount || 1;
          const totalProds = Math.max(1, liveProducts.length);
          const percent = Math.round((count / totalProds) * 100);

          return {
            name: cat.name,
            slug: cat.slug,
            productCount: count,
            salesVolume: Math.round(baseRevenue * (percent / 100)),
            percentage: percent,
            color: colors[idx % colors.length],
          };
        })
      : [];

  return {
    metrics,
    chartData,
    categoryStats,
    recentOrders: ordersPool,
  };
}
