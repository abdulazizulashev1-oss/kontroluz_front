"use client";

import React from "react";
import { CategoryStat } from "@/lib/admin/analytics-data";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { PieChart, FolderTree } from "lucide-react";

interface CategoryDistributionProps {
  categories: CategoryStat[];
}

export function CategoryDistribution({ categories }: CategoryDistributionProps) {
  return (
    <Card className="p-6 bg-white border border-industrial-border shadow-2xs rounded-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-industrial-border pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-industrial-blue uppercase">
          <FolderTree className="w-4 h-4 text-industrial-orange" />
          <span>Kategoriyalar va Yo'nalishlar Ulushi</span>
        </div>
        <span className="text-xs font-mono font-bold text-industrial-text-muted bg-industrial-surface-low px-2.5 py-1 rounded-md">
          {categories.length} ta Asosiy Bo'lim
        </span>
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-industrial-text line-clamp-1">
                {cat.name}
              </span>
              <div className="flex items-center gap-2 font-mono font-bold shrink-0">
                <span className="text-industrial-text-muted">
                  {cat.productCount} ta mahsulot
                </span>
                <span className="text-industrial-blue">{cat.percentage}%</span>
              </div>
            </div>

            {/* Progress Track */}
            <div className="w-full h-2.5 bg-industrial-surface-low rounded-full overflow-hidden border border-industrial-border-subtle/50">
              <div
                style={{
                  width: `${cat.percentage}%`,
                  backgroundColor: cat.color,
                }}
                className="h-full rounded-full transition-all duration-500"
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-industrial-text-muted font-mono pt-0.5">
              <span>Sotuv aylanmasi:</span>
              <span className="font-bold text-industrial-text">
                {formatPrice(cat.salesVolume, "UZS")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
