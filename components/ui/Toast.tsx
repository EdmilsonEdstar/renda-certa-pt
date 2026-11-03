"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, X } from "lucide-react";

type ToastProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  duration?: number;
};

/**
 * Notificação de sucesso reutilizável.
 * Aparece no canto superior direito, fecha manualmente ou após `duration`.
 */
export default function Toast({
  open,
  onClose,
  title,
  description,
  duration = 3500,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;

    const timeoutId = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timeoutId);
  }, [open, onClose, duration]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      <style>{`
        @keyframes rendaCertaToastFade {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          8% {
            opacity: 1;
            transform: translateY(0);
          }
          88% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-6px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .renda-certa-profile-toast {
            animation: none !important;
          }
        }
      `}</style>

      <div
        role="status"
        aria-live="polite"
        className="renda-certa-profile-toast fixed right-4 top-4 z-[2000] w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-[#48DC98]/40 bg-[#0B1D30]/98 p-4 shadow-2xl shadow-black/30 backdrop-blur"
        style={{ animation: `rendaCertaToastFade ${duration}ms ease-in-out both` }}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#48DC98]" />

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#48DC98]">{title}</p>
            {description && (
              <p className="mt-1 text-xs leading-relaxed text-[#B8D4C9]">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar notificação"
            className="-mr-1 -mt-1 rounded-lg p-2 text-[#9BB2C5] transition hover:bg-[#10283D] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
