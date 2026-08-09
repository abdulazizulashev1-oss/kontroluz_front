"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-extrabold text-industrial-text">
        Texnik Xatolik Yuz Berdi
      </h2>
      <p className="text-sm text-industrial-text-muted max-w-md mt-2 mb-6">
        Server bilan bog'lanishda muammo vujudga keldi. Iltimos, sahifani qayta yuklang yoki keyinroq urinib ko'ring.
      </p>
      <Button variant="cta" onClick={() => reset()} className="gap-2">
        <RefreshCw className="w-4 h-4" />
        Sahifani Qayta Yuklash
      </Button>
    </div>
  );
}
