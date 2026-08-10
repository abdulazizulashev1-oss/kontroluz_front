"use client";

import React, { useState } from "react";
import { ChartDataPoint } from "@/lib/admin/analytics-data";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

interface RevenueChartProps {
  data: ChartDataPoint[];
  totalRevenue: number;
  totalOrders: number;
}

export function RevenueChart({ data, totalRevenue, totalOrders }: RevenueChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <Card className="p-6 bg-white border border-industrial-border shadow-2xs rounded-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-industrial-blue uppercase">
            <BarChart3 className="w-4 h-4 text-industrial-orange" />
            <span>Savdo va Tushum Dinamikasi</span>
          </div>
          <h3 className="text-xl font-black text-industrial-text mt-1">
            {formatPrice(totalRevenue, "UZS")}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 bg-industrial-surface-low px-3 py-1.5 rounded-lg border border-industrial-border-subtle">
            <span className="w-2.5 h-2.5 rounded-full bg-industrial-blue" />
            <span className="font-bold text-industrial-text">Tushum (UZS)</span>
          </div>
          <div className="flex items-center gap-2 bg-industrial-surface-low px-3 py-1.5 rounded-lg border border-industrial-border-subtle">
            <span className="w-2.5 h-2.5 rounded-full bg-industrial-orange" />
            <span className="font-bold text-industrial-text">{totalOrders} ta Buyurtma</span>
          </div>
        </div>
      </div>

      {/* Interactive Bar Chart Visualization */}
      <div className="space-y-2">
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2">
          {data.map((item, idx) => {
            const heightPercent = Math.max(8, Math.round((item.revenue / maxRevenue) * 100));
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
                  <div className="absolute -top-12 z-20 bg-industrial-text text-white text-[11px] font-mono font-bold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                    <div>{item.label}: {formatPrice(item.revenue, "UZS")}</div>
                    <div className="text-[10px] text-industrial-orange font-sans">{item.orders} ta buyurtma</div>
                  </div>
                )}

                {/* Bar Pillar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[48px] rounded-t-lg transition-all duration-300 relative ${
                    isHovered
                      ? "bg-industrial-orange shadow-md scale-y-105"
                      : "bg-industrial-blue hover:bg-industrial-blue-dark"
                  }`}
                >
                  {/* Subtle top indicator */}
                  <div className="w-full h-1 bg-white/40 rounded-t-lg" />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-Axis Labels */}
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
