/**
 * Telegram Notification Service for Kontrol.uz
 * Sends leads, smeta inquiries, and cart orders directly to Telegram Group / Channel.
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

function escapeHtml(text: string | number | null | undefined): string {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("uz-UZ").format(amount) + " UZS";
}

/**
 * Low-level Telegram sendMessage API caller
 */
export async function sendTelegramMessage(htmlText: string): Promise<{ success: boolean; messageId?: number; error?: string }> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("[Telegram Notification] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in environment variables.");
    return { success: false, error: "Telegram credentials not configured" };
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: htmlText,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error("[Telegram Notification Error]", data);
      return { success: false, error: data.description || "Failed to send message to Telegram" };
    }

    return { success: true, messageId: data.result?.message_id };
  } catch (err: any) {
    console.error("[Telegram Notification Network Error]", err);
    return { success: false, error: err.message || "Network error" };
  }
}

export interface LeadNotificationPayload {
  id: string;
  clientName: string;
  phone: string;
  company?: string;
  category?: string;
  type?: string;
  message?: string;
  estimatedPrice?: number;
  source?: string;
  timestamp?: string;
}

/**
 * Format and send Lead / Inquiry to Telegram Group
 */
export async function notifyTelegramLead(lead: LeadNotificationPayload) {
  const timeStr = lead.timestamp || new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kontrol.uz";
  
  const lines: string[] = [
    `🌐 <b>[ KONTROL.UZ VEB-SAYTI ]</b>`,
    `🔔 <b>YANGI MUROJAAT / LID (${escapeHtml(lead.type || "So'rov")})</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `🆔 <b>ID:</b> <code>${escapeHtml(lead.id)}</code>`,
    `👤 <b>Mijoz:</b> <b>${escapeHtml(lead.clientName)}</b>`,
    `📞 <b>Telefon:</b> <a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a>`,
  ];

  if (lead.company && lead.company !== "-") {
    lines.push(`🏢 <b>Kompaniya:</b> ${escapeHtml(lead.company)}`);
  }

  if (lead.category && lead.category !== "-") {
    lines.push(`🏷 <b>Kategoriya / Xizmat:</b> ${escapeHtml(lead.category)}`);
  }

  if (lead.estimatedPrice && lead.estimatedPrice > 0) {
    lines.push(`💰 <b>Taxminiy Byudjet / Smeta:</b> <b>${formatPrice(lead.estimatedPrice)}</b>`);
  }

  if (lead.message && lead.message !== "-") {
    lines.push(`📝 <b>Xabar / Tafsilot:</b>\n<i>${escapeHtml(lead.message)}</i>`);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━`);
  lines.push(`🌐 <b>Manba:</b> <a href="${siteUrl}">kontrol.uz</a> veb-sayti orqali`);
  lines.push(`⏱ <b>Vaqt:</b> ${escapeHtml(timeStr)}`);

  return sendTelegramMessage(lines.join("\n"));
}

export interface OrderNotificationPayload {
  orderNumber: string;
  clientName: string;
  phone: string;
  company?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  totalAmount: number;
  notes?: string;
  items?: Array<{
    title?: string;
    name?: string;
    quantity?: number;
    price?: number;
  }>;
  timestamp?: string;
}

/**
 * Format and send Cart Order to Telegram Group
 */
export async function notifyTelegramOrder(order: OrderNotificationPayload) {
  const timeStr = order.timestamp || new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kontrol.uz";
  
  const lines: string[] = [
    `🌐 <b>[ KONTROL.UZ VEB-SAYTI ]</b>`,
    `🛒 <b>YANGI ONLAYN BUYURTMA (SAVAT)</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `📦 <b>Buyurtma raqami:</b> <code>${escapeHtml(order.orderNumber)}</code>`,
    `👤 <b>Xaridor:</b> <b>${escapeHtml(order.clientName)}</b>`,
    `📞 <b>Telefon:</b> <a href="tel:${escapeHtml(order.phone)}">${escapeHtml(order.phone)}</a>`,
  ];

  if (order.company && order.company !== "-") {
    lines.push(`🏢 <b>Kompaniya:</b> ${escapeHtml(order.company)}`);
  }

  if (order.shippingAddress && order.shippingAddress !== "-") {
    lines.push(`📍 <b>Yetkazish manzili:</b> ${escapeHtml(order.shippingAddress)}`);
  }

  if (order.paymentMethod) {
    lines.push(`💳 <b>To'lov turi:</b> ${escapeHtml(order.paymentMethod)}`);
  }

  lines.push(`💵 <b>Jami summa:</b> <b>${formatPrice(order.totalAmount)}</b> (QQS bilan)`);

  if (order.items && order.items.length > 0) {
    lines.push(`\n📋 <b>Buyurtma tarkibi (${order.items.length} ta):</b>`);
    order.items.forEach((item, idx) => {
      const itemTitle = item.title || item.name || "Mahsulot";
      const itemQty = item.quantity || 1;
      const itemPrice = item.price ? formatPrice(item.price) : "-";
      lines.push(`${idx + 1}. <b>${escapeHtml(itemTitle)}</b> — ${itemQty} dona x ${itemPrice}`);
    });
  }

  if (order.notes && order.notes !== "-") {
    lines.push(`\n📝 <b>Mijoz izohi:</b> <i>${escapeHtml(order.notes)}</i>`);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━`);
  lines.push(`🌐 <b>Manba:</b> <a href="${siteUrl}/savat">kontrol.uz onlayn do'koni</a> orqali`);
  lines.push(`⏱ <b>Vaqt:</b> ${escapeHtml(timeStr)}`);

  return sendTelegramMessage(lines.join("\n"));
}
