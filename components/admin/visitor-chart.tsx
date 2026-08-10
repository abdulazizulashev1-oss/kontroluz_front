"use client";

import React, { useState } from "react";
import { ChartDataPoint } from "@/lib/admin/analytics-data";
import { Card } from "@/components/ui/card";
import { Users, Activity } from "lucide-react";

interface VisitorChartProps {
  data: ChartDataPoint[];
  totalVisitors: number;
  liveVisitors: number;
}

export function VisitorChart({ data, totalVisitors, liveVisitors }: VisitorChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVisitors = Math.max(...data.map((d) => d.visitors), 1);

  return (
    <Card className="p-6 bg-white border border-industrial-border shadow-2xs rounded-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Tashriflar & Foydalanuvchilar Oqimi</span>
          </div>
          <h3 className="text-xl font-black text-industrial-text mt-1">
            {totalVisitors.toLocaleString()} <span className="text-xs font-semibold text-industrial-text-muted">tashrif</span>
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold font-mono animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{liveVisitors} ta Jonli Faol Sessiya</span>
        </div>
      </div>

      {/* Interactive Visitors Traffic Chart */}
      <div className="space-y-2">
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2">
          {data.map((item, idx) => {
            const heightPercent = Math.max(10, Math.round((item.visitors / maxVisitors) * 100));
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-10 z-20 bg-industrial-text text-white text-[11px] font-mono font-bold px-2 py-1 rounded-md shadow-xl whitespace-nowrap animate-in fade-in duration-150">
                    {item.label}: {item.visitors} tashrif
                  </div>
                )}

                {/* Pillar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[36px] rounded-t-md transition-all duration-300 ${
                    isHovered
                      ? "bg-emerald-500 shadow-md scale-y-105"
                      : "bg-emerald-600/80 hover:bg-emerald-600"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* X-Axis */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 border-t border-industrial-border-subtle pt-2 px-2 text-[11px] font-bold text-industrial-text-muted font-mono">
          {data.map((item, idx) => (
            <div key={idx} className="flex-1 text-center truncate">
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
