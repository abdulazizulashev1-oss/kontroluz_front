"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  growth?: number;
  icon: React.ReactNode;
  color?: "blue" | "orange" | "green" | "purple" | "indigo";
}

export function MetricCard({
  title,
  value,
  subtext,
  growth,
  icon,
  color = "blue",
}: MetricCardProps) {
  const isPositive = growth !== undefined ? growth >= 0 : true;

  const colorStyles = {
    blue: "bg-blue-50 text-industrial-blue border-blue-100",
    orange: "bg-orange-50 text-industrial-orange border-orange-100",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  };

  return (
    <Card className="p-5 sm:p-6 bg-white border border-industrial-border shadow-2xs rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <span className="text-xs font-bold text-industrial-text-muted uppercase tracking-wider">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-industrial-text tracking-tight">
            {value}
          </div>
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorStyles[color]} shadow-2xs group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-industrial-border-subtle/50 flex items-center justify-between text-xs">
        {growth !== undefined && (
          <div
            className={`flex items-center gap-1 font-extrabold font-mono ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {growth}%
            </span>
          </div>
        )}

        {subtext && (
          <span className="text-[11px] text-industrial-text-muted font-medium">
            {subtext}
          </span>
        )}
      </div>
    </Card>
  );
}
