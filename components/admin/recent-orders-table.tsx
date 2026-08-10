"use client";

import React, { useState } from "react";
import { OrderItem } from "@/lib/admin/analytics-data";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileSpreadsheet,
  Printer,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  Building2,
  ShoppingCart,
  UserCheck,
} from "lucide-react";

interface RecentOrdersTableProps {
  orders: OrderItem[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const filteredOrders = orders.filter((order) => {
    if (selectedStatus !== "ALL" && order.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.phone.includes(q) ||
        (order.company && order.company.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const exportCSV = () => {
    const headers = "Buyurtma ID,Mijoz Ismi,Telefon,Kompaniya,Turi,Summa (UZS),Status,Sana\n";
    const rows = filteredOrders
      .map(
        (o) =>
          `"${o.orderNumber}","${o.customerName}","${o.phone}","${o.company || ""}","${o.type}","${o.amount}","${o.status}","${o.date}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `kontrol_hisobot_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <Card className="p-6 bg-white border border-industrial-border shadow-2xs rounded-2xl space-y-6">
      {/* Table Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-industrial-border pb-4">
        <div>
          <h3 className="text-lg font-black text-industrial-text">
            So'nggi Buyurtmalar va B2B Arizalar
          </h3>
          <p className="text-xs text-industrial-text-muted mt-0.5">
            Real-time rejimda yangilanadigan mijoz arizalari va savat xaridlari
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            className="gap-2 text-xs font-bold border-industrial-blue text-industrial-blue hover:bg-industrial-blue hover:text-white"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel / CSV</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={printReport}
            className="gap-2 text-xs font-bold border-industrial-border text-industrial-text hover:bg-industrial-surface-low"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Chop Etish</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
          {[
            { id: "ALL", label: "Barchasi" },
            { id: "NEW", label: "Yangi" },
            { id: "PROCESSING", label: "Jarayonda" },
            { id: "COMPLETED", label: "Tugallangan" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatus === tab.id
                  ? "bg-industrial-blue text-white shadow-2xs"
                  : "bg-industrial-surface-low text-industrial-text-muted hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ID, ism yoki telefon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-industrial-border rounded-lg text-xs bg-industrial-surface-low focus:outline-none focus:border-industrial-blue"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto border border-industrial-border-subtle rounded-xl shadow-2xs">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-industrial-surface-low text-industrial-text font-black uppercase text-[10px] tracking-wider border-b border-industrial-border-subtle">
            <tr>
              <th className="p-3.5">Buyurtma ID</th>
              <th className="p-3.5">Mijoz & Korxona</th>
              <th className="p-3.5">Telefon</th>
              <th className="p-3.5">Turi</th>
              <th className="p-3.5">Summa</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Sana</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-industrial-border-subtle">
            {filteredOrders.map((order) => {
              const isLead = order.type === "LEAD";

              const statusBadges = {
                NEW: "bg-blue-100 text-industrial-blue border-blue-200",
                PROCESSING: "bg-amber-100 text-amber-700 border-amber-200",
                COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
                CANCELLED: "bg-rose-100 text-rose-700 border-rose-200",
              };

              const statusLabels = {
                NEW: "Yangi",
                PROCESSING: "Jarayonda",
                COMPLETED: "Tugallandi",
                CANCELLED: "Bekor",
              };

              return (
                <tr
                  key={order.id}
                  className="bg-white hover:bg-industrial-surface-low/60 transition-colors"
                >
                  <td className="p-3.5 font-mono font-bold text-industrial-blue">
                    {order.orderNumber}
                  </td>

                  <td className="p-3.5">
                    <div className="font-extrabold text-industrial-text">
                      {order.customerName}
                    </div>
                    {order.company && (
                      <div className="text-[11px] text-industrial-text-muted flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-gray-400" />
                        <span>{order.company}</span>
                      </div>
                    )}
                  </td>

                  <td className="p-3.5 font-mono font-semibold text-industrial-text">
                    <a
                      href={`tel:${order.phone}`}
                      className="hover:text-industrial-orange transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-industrial-orange" />
                      <span>{order.phone}</span>
                    </a>
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isLead
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-blue-50 text-industrial-blue border-blue-200"
                      }`}
                    >
                      {isLead ? (
                        <UserCheck className="w-3 h-3" />
                      ) : (
                        <ShoppingCart className="w-3 h-3" />
                      )}
                      <span>{isLead ? "Smeta Lead" : "Savat Buyurtma"}</span>
                    </span>
                  </td>

                  <td className="p-3.5 font-black text-industrial-blue font-mono text-xs">
                    {formatPrice(order.amount, "UZS")}
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        statusBadges[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>

                  <td className="p-3.5 text-industrial-text-muted font-mono text-[11px]">
                    {order.date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
