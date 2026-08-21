import { NextRequest, NextResponse } from "next/server";
import { addStoredOrder, getStoredOrders } from "@/lib/admin/data-store";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";
const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.kontrol.uz/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = body.data || body;

    const messageText =
      payload.message ||
      payload.notes ||
      (payload.objectType
        ? `Obyekt: ${payload.objectType}, Maydon: ${payload.areaSqM || 0} m²`
        : "-");

    const leadData = {
      id: payload.id || `LEAD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }),
      type: payload.type || "Lid / So'rov",
      clientName: payload.clientName || payload.name || "Noma'lum Mijoz",
      phone: payload.phone || payload.customerPhone || "",
      company: payload.company || "-",
      category: payload.category || payload.service || "Umumiy Aloqa",
      message: messageText,
      estimatedPrice:
        payload.estimatedPrice ||
        payload.estimatedPriceMax ||
        payload.estimatedPriceMin ||
        payload.totalAmount ||
        0,
      source: payload.source || "Kontrol.uz Veb-sayt",
    };

    const results: { strapi?: any; googleSheets?: any } = {};

    // 1. Send to Strapi API
    try {
      const strapiRes = await fetch(`${STRAPI_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ...payload,
            status: "NEW",
            createdAt: new Date().toISOString(),
          },
        }),
      });
      if (strapiRes.ok) {
        results.strapi = await strapiRes.json().catch(() => ({ ok: true }));
      }
    } catch (strapiErr: any) {
      console.warn("Strapi lead submission note:", strapiErr?.message);
    }

    // 2. Send to Google Sheets Apps Script Webhook
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const gsRes = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
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
      id: leadData.id,
      orderNumber: leadData.id,
      customerName: leadData.clientName,
      phone: leadData.phone,
      company: leadData.company,
      type: "LEAD",
      amount: leadData.estimatedPrice,
      itemsCount: 1,
      status: "NEW",
      date: `Bugun, ${new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}`,
    });

    return NextResponse.json({
      success: true,
      message: "Lid muvaffaqiyatli qabul qilindi",
      data: leadData,
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
  const orders = getStoredOrders().filter((o) => o.type === "LEAD");
  return NextResponse.json({
    success: true,
    data: orders,
  });
}
