"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { getWorkingHoursInfo, WorkingHoursInfo } from "@/lib/utils/working-hours";

interface DynamicWorkingHoursProps {
  variant?: "header" | "badge" | "detailed" | "card";
  className?: string;
  showIcon?: boolean;
}

export function DynamicWorkingHours({
  variant = "header",
  className = "",
  showIcon = true,
}: DynamicWorkingHoursProps) {
  const { locale } = useTranslation();
  const [schedule, setSchedule] = useState<WorkingHoursInfo>(() =>
    getWorkingHoursInfo(locale)
  );

  // Update schedule dynamically every minute
  useEffect(() => {
    setSchedule(getWorkingHoursInfo(locale));
    const interval = setInterval(() => {
      setSchedule(getWorkingHoursInfo(locale));
    }, 60000);
    return () => clearInterval(interval);
  }, [locale]);

  // Variant 1: Header Top Bar (e.g. "Dush: 09:00 - 18:00" with live dot)
  if (variant === "header") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 text-xs text-industrial-text-muted hover:text-industrial-blue transition-colors cursor-default ${className}`}
        title={`${schedule.todayLabel} (${schedule.badgeText})`}
      >
        {showIcon && <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
        <span className="font-semibold text-industrial-text">
          {schedule.todayLabel}
        </span>
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            schedule.isOpenNow ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
          }`}
          title={schedule.badgeText}
        />
      </div>
    );
  }

  // Variant 2: Compact Status Badge (e.g. for branch cards or footer)
  if (variant === "badge") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
          schedule.isOpenNow
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
            : "bg-gray-100 text-gray-600 border border-gray-200"
        } ${className}`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            schedule.isOpenNow ? "bg-emerald-500 animate-ping" : "bg-gray-400"
          }`}
        />
        <span>{schedule.badgeText}</span>
        <span className="text-gray-400">•</span>
        <span>{schedule.todayHours}</span>
      </div>
    );
  }

  // Variant 3: Detailed Box (e.g. for /kontaktlar page)
  if (variant === "detailed" || variant === "card") {
    return (
      <div className={`space-y-2 text-xs ${className}`}>
        {/* Today's Live Schedule */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-industrial-border-subtle shadow-2xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                schedule.isOpenNow ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
              }`}
            />
            <span className="font-extrabold text-industrial-blue">
              {schedule.todayLabel}
            </span>
          </div>
          <span
            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
              schedule.isOpenNow
                ? "bg-emerald-100 text-emerald-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {schedule.badgeText}
          </span>
        </div>

        {/* Full Weekly Schedule breakdown */}
        <div className="space-y-1 text-[11px] text-industrial-text-muted px-1">
          <div
            className={`flex items-center justify-between ${
              !schedule.isWeekend ? "font-bold text-industrial-text" : ""
            }`}
          >
            <span>{schedule.weekdayText}</span>
            {!schedule.isWeekend && (
              <span className="text-[10px] text-industrial-blue font-black">
                ({schedule.todayBadgeText})
              </span>
            )}
          </div>
          <div
            className={`flex items-center justify-between ${
              schedule.isWeekend ? "font-bold text-industrial-text" : ""
            }`}
          >
            <span>{schedule.weekendText}</span>
            {schedule.isWeekend && (
              <span className="text-[10px] text-industrial-orange font-black">
                ({schedule.todayBadgeText})
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <span>{schedule.todayLabel}</span>;
}
