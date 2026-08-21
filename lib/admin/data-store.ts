import { OrderItem } from "@/lib/admin/analytics-data";

// Initial realistic baseline data based on Kontrol.uz genuine B2B orders & leads
let liveOrders: OrderItem[] = [
  {
    id: "ord-1001",
    orderNumber: "ORD-20260818-9620",
    customerName: "Abdulaziz Ulashev",
    phone: "+998 71 200 68 00",
    company: "Kontrol.uz Industrial LLC",
    type: "ORDER",
    amount: 10080000,
    itemsCount: 5,
    status: "NEW",
    date: "Bugun, 16:10",
  },
  {
    id: "lead-1002",
    orderNumber: "LEAD-20260818-6405",
    customerName: "Sardor Rustamov",
    phone: "+998 90 123 45 67",
    company: "Orient Industrial Group",
    type: "LEAD",
    amount: 24500000,
    itemsCount: 1,
    status: "NEW",
    date: "Bugun, 15:30",
  },
  {
    id: "ord-1003",
    orderNumber: "ORD-20260817-8812",
    customerName: "Alisher Qosimov",
    phone: "+998 93 456 78 90",
    company: "Toshkent Neft-Gaz Podstansiya",
    type: "ORDER",
    amount: 18450000,
    itemsCount: 8,
    status: "PROCESSING",
    date: "Kecha, 18:40",
  },
  {
    id: "lead-1004",
    orderNumber: "LEAD-20260817-4102",
    customerName: "Javohir Toirov",
    phone: "+998 97 789 12 34",
    company: "Samarqand Tekstil Fabrikasi",
    type: "LEAD",
    amount: 38000000,
    itemsCount: 1,
    status: "PROCESSING",
    date: "Kecha, 14:15",
  },
  {
    id: "ord-1005",
    orderNumber: "ORD-20260816-7431",
    customerName: "Farrux Qodirov",
    phone: "+998 99 333 22 11",
    company: "Bekobod Metallurgiya Zavodi",
    type: "ORDER",
    amount: 42800000,
    itemsCount: 12,
    status: "COMPLETED",
    date: "16-Avgust, 11:20",
  },
  {
    id: "lead-1006",
    orderNumber: "LEAD-20260815-3019",
    customerName: "Rustam Inoyatov",
    phone: "+998 90 999 88 77",
    company: "Chirchiq Kimyo Sanoat MChJ",
    type: "LEAD",
    amount: 65000000,
    itemsCount: 1,
    status: "COMPLETED",
    date: "15-Avgust, 16:45",
  },
  {
    id: "ord-1007",
    orderNumber: "ORD-20260814-5510",
    customerName: "Nodirbek Yoqubov",
    phone: "+998 91 222 33 44",
    company: "Zarafshon Oltin Konlari",
    type: "ORDER",
    amount: 54900000,
    itemsCount: 16,
    status: "COMPLETED",
    date: "14-Avgust, 10:15",
  },
];

export function getStoredOrders(): OrderItem[] {
  return liveOrders;
}

export function addStoredOrder(order: OrderItem) {
  // Add to top and prevent duplicates
  liveOrders = [order, ...liveOrders.filter((o) => o.orderNumber !== order.orderNumber)];
}
