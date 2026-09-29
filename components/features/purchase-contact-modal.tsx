"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Send,
} from "lucide-react";
import { Instagram } from "@/components/ui/brand-icons";
import { useTranslation } from "@/lib/i18n/context";
import { Product } from "@/shared/types";

export interface PurchaseContactModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  product?: Product | null;
}

export function PurchaseContactModal({
  isOpen: propIsOpen,
  onClose,
}: PurchaseContactModalProps) {
  const { t } = useTranslation();
  const [internalOpen, setInternalOpen] = useState(false);

  // Sync prop changes
  useEffect(() => {
    if (propIsOpen !== undefined) {
      setInternalOpen(propIsOpen);
    }
  }, [propIsOpen]);

  // Global window event listener
  useEffect(() => {
    const handleOpen = () => {
      setInternalOpen(true);
    };

    const handleClose = () => {
      setInternalOpen(false);
      onClose?.();
    };

    window.addEventListener("open-purchase-modal", handleOpen);
    window.addEventListener("close-purchase-modal", handleClose);

    return () => {
      window.removeEventListener("open-purchase-modal", handleOpen);
      window.removeEventListener("close-purchase-modal", handleClose);
    };
  }, [onClose]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && internalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [internalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (internalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [internalOpen]);

  const handleCloseModal = () => {
    setInternalOpen(false);
    onClose?.();
  };

  if (!internalOpen) return null;

  const contacts = [
    {
      name: "Telefon",
      href: "tel:+998781137027",
      icon: Phone,
      bgColor: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20",
      ariaLabel: "Telefon orqali bog'lanish: +998 (78) 113-70-27",
    },
    {
      name: "Telegram",
      href: "https://t.me/kontroluzn1bot",
      icon: Send,
      bgColor: "bg-[#0088cc] hover:bg-[#0077b5] text-white shadow-[#0088cc]/20",
      ariaLabel: "Telegram orqali bog'lanish: @kontroluzn1bot",
      isExternal: true,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/kontroluz/?hl=en",
      icon: Instagram,
      bgColor: "bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] hover:opacity-90 text-white shadow-pink-500/20",
      ariaLabel: "Instagram orqali bog'lanish: @kontroluz",
      isExternal: true,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0"
        onClick={handleCloseModal}
        aria-hidden="true"
      />

      {/* Compact Clean Modal Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl border border-industrial-border shadow-2xl overflow-hidden z-10 p-6 sm:p-7 text-center animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          type="button"
          onClick={handleCloseModal}
          aria-label="Yopish"
          className="absolute top-4 right-4 p-2 rounded-full text-industrial-text-muted hover:text-industrial-text hover:bg-industrial-surface-low transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1.5 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-industrial-blue tracking-tight">
            {t("productDetail.purchaseModal.modalTitle")}
          </h2>
          <p className="text-xs text-industrial-text-muted font-medium">
            {t("productDetail.purchaseModal.modalSubtitle")}
          </p>
        </div>

        {/* Contact Logos Row */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 mt-7 mb-2">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.name}
                href={contact.href}
                target={contact.isExternal ? "_blank" : undefined}
                rel={contact.isExternal ? "noopener noreferrer" : undefined}
                aria-label={contact.ariaLabel}
                title={contact.name}
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg ${contact.bgColor} group`}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-105" />
                <span className="text-[10px] font-bold mt-1 opacity-90">
                  {contact.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
