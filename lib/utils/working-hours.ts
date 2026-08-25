import { Language } from "@/lib/i18n/translations";

export interface DaySchedule {
  dayIndex: number; // 0: Sunday, 1: Monday, ..., 6: Saturday
  dayName: string;
  dayShort: string;
  isWeekend: boolean;
  hours: string;
  openTime: number; // in minutes from midnight (e.g. 9 * 60 = 540)
  closeTime: number; // in minutes from midnight (e.g. 18 * 60 = 1080)
}

export interface WorkingHoursInfo {
  currentDayName: string;
  currentDayShort: string;
  isWeekend: boolean;
  todayHours: string;
  todayLabel: string;
  headerText: string;
  badgeText: string;
  isOpenNow: boolean;
  statusText: string;
  weekdayText: string;
  weekendText: string;
  todayBadgeText: string;
}

const DAY_NAMES: Record<Language, { full: string[]; short: string[]; today: string; open: string; closed: string; weekdayLabel: string; weekendLabel: string }> = {
  uz: {
    full: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
    short: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"],
    today: "Bugun",
    open: "Ochiq",
    closed: "Yopiq",
    weekdayLabel: "Dushanba - Juma: 09:00 - 18:00",
    weekendLabel: "Shanba - Yakshanba: 10:00 - 16:00",
  },
  ru: {
    full: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    today: "Сегодня",
    open: "Открыто",
    closed: "Закрыто",
    weekdayLabel: "Понедельник - Пятница: 09:00 - 18:00",
    weekendLabel: "Суббота - Воскресенье: 10:00 - 16:00",
  },
  en: {
    full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "Today",
    open: "Open now",
    closed: "Closed",
    weekdayLabel: "Monday - Friday: 09:00 - 18:00",
    weekendLabel: "Saturday - Sunday: 10:00 - 16:00",
  },
};

/**
 * Calculates current working schedule and open/closed status
 * based on current Tashkent time.
 *
 * Rules:
 * - Monday - Friday: 09:00 - 18:00
 * - Saturday - Sunday: 10:00 - 16:00
 */
export function getWorkingHoursInfo(locale: Language = "uz", customDate?: Date): WorkingHoursInfo {
  const langConfig = DAY_NAMES[locale] || DAY_NAMES.uz;
  
  // Calculate Tashkent date/time
  const now = customDate || new Date();
  
  // Convert to Tashkent Time (UTC+5)
  const tashkentTimeString = now.toLocaleString("en-US", { timeZone: "Asia/Tashkent" });
  const tashkentDate = new Date(tashkentTimeString);

  const dayOfWeek = tashkentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = tashkentDate.getHours();
  const minutes = tashkentDate.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Saturday or Sunday

  // Define schedules
  // Weekday: 09:00 (540 min) to 18:00 (1080 min)
  // Weekend: 10:00 (600 min) to 16:00 (960 min)
  const openMin = isWeekend ? 10 * 60 : 9 * 60;
  const closeMin = isWeekend ? 16 * 60 : 18 * 60;

  const isOpenNow = currentMinutes >= openMin && currentMinutes < closeMin;

  const todayHours = isWeekend ? "10:00 - 16:00" : "09:00 - 18:00";
  const currentDayName = langConfig.full[dayOfWeek];
  const currentDayShort = langConfig.short[dayOfWeek];

  const todayLabel = `${langConfig.today} (${currentDayName}): ${todayHours}`;
  const headerText = `${currentDayShort}: ${todayHours}`;
  const badgeText = isOpenNow ? langConfig.open : langConfig.closed;
  const statusText = `${badgeText} • ${todayLabel}`;

  return {
    currentDayName,
    currentDayShort,
    isWeekend,
    todayHours,
    todayLabel,
    headerText,
    badgeText,
    isOpenNow,
    statusText,
    weekdayText: langConfig.weekdayLabel,
    weekendText: langConfig.weekendLabel,
    todayBadgeText: langConfig.today,
  };
}
