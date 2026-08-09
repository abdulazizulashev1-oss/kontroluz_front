import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-industrial-blue/10 text-industrial-blue rounded-full flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8 text-industrial-orange" />
      </div>
      <h1 className="text-4xl font-extrabold text-industrial-text">404</h1>
      <h2 className="text-xl font-bold text-industrial-text mt-1">Sahifa Topilmadi</h2>
      <p className="text-sm text-industrial-text-muted max-w-md mt-2 mb-6">
        Siz qidirgan sahifa o'chirilgan yoki manzili o'zgargan bo'lishi mumkin.
      </p>
      <Link href="/">
        <Button variant="primary" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Bosh Sahifaga Qaytish
        </Button>
      </Link>
    </div>
  );
}
