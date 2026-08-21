/**
 * ==============================================================================
 * KONTROL.UZ — GOOGLE SHEETS & AMOCRM INTEGRATION SCRIPT
 * ==============================================================================
 * 
 * Ushbu script Kontrol.uz veb-saytidan keladigan barcha yangi lidlar va 
 * buyurtmalarni avtomatik Google Sheets jadvaliga yozadi va to'g'ridan-to'g'ri 
 * AmoCRM (sipunikontrol.amocrm.ru) tizimiga "Сделка" + "Контакт" sifatida yuklaydi.
 * 
 * Jadval ID: 1Bxo7YKT9KmKabmN1cEEx2RiV09CWVHv-CUUb--DHKNE
 * ==============================================================================
 */

// ==========================================
// 1. SOZLAMALAR (CONFIGURATION)
// ==========================================
const CONFIG = {
  // Google Sheets jadval ID raqami
  SPREADSHEET_ID: "1Bxo7YKT9KmKabmN1cEEx2RiV09CWVHv-CUUb--DHKNE",

  // Google Sheets varaq nomi
  SHEET_NAME: "Lidlar va Buyurtmalar",

  // Sizning AmoCRM Subdomeningiz: sipunikontrol.amocrm.ru
  AMOCRM_SUBDOMAIN: "sipunikontrol",

  // AmoCRM Uzoq muddatli Access Token (Долгосрочный токен)
  AMOCRM_ACCESS_TOKEN: "YOUR_AMOCRM_ACCESS_TOKEN",

  // (Ixtiyoriy) Voronka va Status ID lari
  AMOCRM_PIPELINE_ID: null, 
  AMOCRM_STATUS_ID: null, 
};

// ==========================================
// 2. HTTP POST HANDLER (NEXT.JS WEBHOOK)
// ==========================================
function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    // Sheetni olish yoki yaratish
    const sheet = getOrCreateSheet();
    
    // Ma'lumotlarni tartibga solish
    const leadData = {
      id: payload.id || `LEAD-${Date.now().toString().slice(-6)}`,
      timestamp: payload.timestamp || Utilities.formatDate(new Date(), "Asia/Tashkent", "yyyy-MM-dd HH:mm:ss"),
      type: payload.type || "Lid / So'rov",
      clientName: payload.clientName || payload.customerName || "Noma'lum Mijoz",
      phone: payload.phone || payload.customerPhone || "",
      company: payload.company || "-",
      category: payload.category || "Umumiy",
      message: payload.message || "-",
      estimatedPrice: Number(payload.estimatedPrice || payload.totalAmount || 0),
      status: "YANGI",
      source: payload.source || "Kontrol.uz Veb-sayt",
    };

    // 1. Google Sheets ga yozish
    const rowNumber = appendLeadToSheet(sheet, leadData);

    // 2. AmoCRM ga yuborish
    let amoResult = { success: false, message: "AmoCRM token kiritilmagan" };
    if (CONFIG.AMOCRM_ACCESS_TOKEN && CONFIG.AMOCRM_ACCESS_TOKEN !== "YOUR_AMOCRM_ACCESS_TOKEN") {
      amoResult = sendLeadToAmoCRM(leadData);
      
      // Jadvaldagi AmoCRM statusini yangilash
      if (amoResult.success) {
        sheet.getRange(rowNumber, 11).setValue("Yuborildi");
        sheet.getRange(rowNumber, 12).setValue(amoResult.leadId || "-");
      } else {
        sheet.getRange(rowNumber, 11).setValue(`Xatolik: ${amoResult.error || ""}`);
      }
    } else {
      sheet.getRange(rowNumber, 11).setValue("Token kiritilmagan");
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Lid Google Sheets ga saqlandi",
        row: rowNumber,
        amoCRM: amoResult,
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// HTTP GET HANDLER (Status tekshirish uchun)
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "ACTIVE",
        subdomain: CONFIG.AMOCRM_SUBDOMAIN,
        message: "Kontrol.uz Google Sheets & AmoCRM Webhook xizmati faol ishlamoqda.",
        sheetName: sheet ? sheet.getName() : "Lidlar va Buyurtmalar",
        time: new Date().toISOString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "ERROR",
        error: err.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 3. GOOGLE SHEETS BILAN ISHLASH
// ==========================================
function getOrCreateSheet() {
  let ss = null;

  // 1. Standalone rejimda ID orqali ochish
  if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID !== "YOUR_SPREADSHEET_ID") {
    try {
      ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    } catch (e) {
      Logger.log("openById error: " + e.toString());
    }
  }

  // 2. Agar active spreadsheet bo'lsa (container-bound rejim)
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {
      Logger.log("getActiveSpreadsheet error: " + e.toString());
    }
  }

  if (!ss) {
    throw new Error(
      "Google Sheets jadvali topilmadi. SPREADSHEET_ID to'g'riligini va jadvalga kirish huquqi (Редактор) berilganini tekshiring."
    );
  }

  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    setupSheetHeader(sheet);
  }
  return sheet;
}

function setupSheetHeader(sheet) {
  const headers = [
    "ID",
    "Sana / Vaqt",
    "Tur",
    "Mijoz Ismi",
    "Telefon Raqami",
    "Kompaniya",
    "Kategoriya / Xizmat",
    "Xabar / Buyurtma Tafsilotlari",
    "Summa (UZS)",
    "Status",
    "AmoCRM Status",
    "AmoCRM Lead ID",
    "Manba"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Sarlavha dizayni (Kontrol.uz Industrial Blue)
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#004094");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 35);
  sheet.setFrozenRows(1);
}

function appendLeadToSheet(sheet, data) {
  const nextRow = sheet.getLastRow() + 1;
  const rowData = [
    data.id,
    data.timestamp,
    data.type,
    data.clientName,
    data.phone,
    data.company,
    data.category,
    data.message,
    data.estimatedPrice,
    data.status,
    "Kutilmoqda...",
    "-",
    data.source
  ];

  sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);

  // Formatlash
  sheet.getRange(nextRow, 1).setFontWeight("bold");
  sheet.getRange(nextRow, 5).setNumberFormat("@"); // Telefon string sifatida
  sheet.getRange(nextRow, 9).setNumberFormat("#,##0 UZS"); // Pul formati
  sheet.getRange(nextRow, 10).setBackground("#e6f4ea").setFontColor("#137333").setFontWeight("bold"); // Status

  return nextRow;
}

// ==========================================
// 4. AMOCRM REST API v4 INTEGRATION
// ==========================================
function sendLeadToAmoCRM(data) {
  try {
    const subdomain = CONFIG.AMOCRM_SUBDOMAIN.trim();
    const token = CONFIG.AMOCRM_ACCESS_TOKEN.trim();

    if (!subdomain || !token || token === "YOUR_AMOCRM_ACCESS_TOKEN") {
      return { success: false, error: "AmoCRM Token kiritilmagan" };
    }

    const apiUrl = `https://${subdomain}.amocrm.ru/api/v4/leads/complex`;

    // 1. AmoCRM Complex Lead Payload yaratish
    const leadPayload = [
      {
        name: `${data.type}: ${data.clientName} (${data.category})`,
        price: data.estimatedPrice || 0,
        pipeline_id: CONFIG.AMOCRM_PIPELINE_ID || undefined,
        status_id: CONFIG.AMOCRM_STATUS_ID || undefined,
        _embedded: {
          contacts: [
            {
              name: data.clientName,
              custom_fields_values: [
                {
                  field_code: "PHONE",
                  values: [
                    {
                      value: data.phone,
                      enum_code: "WORK"
                    }
                  ]
                }
              ]
            }
          ],
          companies: data.company && data.company !== "-" ? [
            {
              name: data.company
            }
          ] : []
        }
      }
    ];

    const options = {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: JSON.stringify(leadPayload),
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(apiUrl, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();

    if (responseCode === 200 || responseCode === 201) {
      const resJson = JSON.parse(responseText);
      const leadId = resJson[0]?.id;

      // 2. Lid ichiga batafsil ma'lumot eslatmasi (Note) qo'shish
      if (leadId) {
        addAmoCRMNote(subdomain, token, leadId, data);
      }

      return {
        success: true,
        leadId: leadId,
        message: "AmoCRM ga muvaffaqiyatli yuklandi",
      };
    } else {
      return {
        success: false,
        error: `AmoCRM HTTP ${responseCode}: ${responseText}`,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

// Lidga batafsil eslatma (Note) qo'shish
function addAmoCRMNote(subdomain, token, leadId, data) {
  try {
    const noteUrl = `https://${subdomain}.amocrm.ru/api/v4/leads/${leadId}/notes`;
    const noteText = 
      `📌 KONTROL.UZ SAYTIDAN YANGI MUROJAAT\n\n` +
      `👤 Mijoz: ${data.clientName}\n` +
      `📞 Telefon: ${data.phone}\n` +
      `🏢 Kompaniya: ${data.company}\n` +
      `📦 Kategoriya: ${data.category}\n` +
      `💰 Summa: ${data.estimatedPrice ? data.estimatedPrice.toLocaleString() + ' UZS' : 'Kelishiladi'}\n\n` +
      `📝 Xabar / Tafsilotlar:\n${data.message}\n\n` +
      `⏰ Vaqt: ${data.timestamp}\n` +
      `🌐 Manba: ${data.source}`;

    const notePayload = [
      {
        note_type: "common",
        params: {
          text: noteText,
        },
      },
    ];

    UrlFetchApp.fetch(noteUrl, {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: `Bearer ${token}` },
      payload: JSON.stringify(notePayload),
      muteHttpExceptions: true,
    });
  } catch (e) {
    Logger.log("AmoCRM note error: " + e.toString());
  }
}

// ==========================================
// 5. TEST VA SOZLASH FUNKSIYALARI
// ==========================================
function setupSheet() {
  const sheet = getOrCreateSheet();
  setupSheetHeader(sheet);
  SpreadsheetApp.getUi().alert("Muvaffaqiyatli sozlandi!", "Jadval sarlavhalari yaratildi va dizayn berildi.", SpreadsheetApp.getUi().ButtonSet.OK);
}

function testWebhookLocal() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        id: "TEST-001",
        timestamp: "2026-08-18 10:30:00",
        type: "Lid / So'rov",
        clientName: "Sardor Rustamov",
        phone: "+998901234567",
        company: "Orient Industrial LLC",
        category: "Videokuzatuv",
        message: "Test so'rov: 10 ta kamera va NVR uskunalari kerak",
        estimatedPrice: 15000000,
        source: "Kontrol.uz Veb-sayt",
      }),
    },
  };

  const res = doPost(fakeEvent);
  Logger.log("Natija: " + res.getContent());
}
