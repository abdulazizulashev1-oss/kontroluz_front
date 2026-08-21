import { NextRequest, NextResponse } from "next/server";
import { addStoredOrder, getStoredOrders } from "@/lib/admin/data-store";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";
const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.kontrol.uz/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = body.data || body;

    const orderNumber = payload.orderNumber || `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const itemsSummary = Array.isArray(payload.items)
      ? payload.items
          .map(
            (it: any) =>
              `${it.title || it.name} (${it.quantity || 1} dona x ${it.price || 0} UZS)`
          )
          .join("\n")
      : "-";

    const orderData = {
      id: orderNumber,
      createdAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }),
      type: "Buyurtma (Savat)",
      clientName: payload.customerName || payload.clientName || "Noma'lum Mijoz",
      phone: payload.customerPhone || payload.phone || "",
      company: payload.company || "-",
      category: "B2B Xarid / Mahsulotlar",
      message: `Manzil: ${payload.shippingAddress || "-"}\nIzoh: ${payload.notes || "-"}\n\nMahsulotlar:\n${itemsSummary}`,
      estimatedPrice: payload.totalAmount || payload.subtotal || 0,
      source: "Kontrol.uz Savat",
    };

    const results: { strapi?: any; googleSheets?: any } = {};

    // 1. Send to Strapi API
    try {
      const strapiRes = await fetch(`${STRAPI_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ...payload,
            orderNumber,
            status: "NEW",
            createdAt: new Date().toISOString(),
          },
        }),
      });
      if (strapiRes.ok) {
        results.strapi = await strapiRes.json().catch(() => ({ ok: true }));
      }
    } catch (strapiErr: any) {
      console.warn("Strapi order submission note:", strapiErr?.message);
    }

    // 2. Send to Google Sheets Apps Script Webhook
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const gsRes = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
          redirect: "follow",
        });
        results.googleSheets = { ok: gsRes.ok, status: gsRes.status };
      } catch (gsErr: any) {
        console.warn("Google Sheets webhook error:", gsErr?.message);
      }
    } else {
      results.googleSheets = { note: "GOOGLE_SHEETS_WEBHOOK_URL not configured yet in .env" };
    }

    // 3. Register into live admin data store
    addStoredOrder({
      id: orderNumber,
      orderNumber,
      customerName: orderData.clientName,
      phone: orderData.phone,
      company: orderData.company,
      type: "ORDER",
      amount: orderData.estimatedPrice,
      itemsCount: Array.isArray(payload.items) ? payload.items.length : 1,
      status: "NEW",
      date: `Bugun, ${new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}`,
    });

    return NextResponse.json({
      success: true,
      message: "Buyurtma muvaffaqiyatli qabul qilindi",
      data: {
        orderNumber,
        ...orderData,
      },
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const orders = getStoredOrders().filter((o) => o.type === "ORDER");
  return NextResponse.json({
    success: true,
    data: orders,
  });
}
