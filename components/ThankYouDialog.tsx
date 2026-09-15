"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ThankYouDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  durationSec?: number;
};

export default function ThankYouDialog({
  open,
  onClose,
  title = "Thank you!",
  message = "We've received your request and will be in touch shortly.",
  durationSec = 5,
}: ThankYouDialogProps) {
  const [remaining, setRemaining] = useState(durationSec);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const messageId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    let left = durationSec;
    setRemaining(left);

    const focusId = window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    const intervalId = window.setInterval(() => {
      left -= 1;
      setRemaining(left);
      if (left <= 0) {
        window.clearInterval(intervalId);
        onCloseRef.current();
      }
    }, 1000);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(focusId);
      window.clearInterval(intervalId);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, durationSec]);

  if (!mounted || !open) return null;

  const progress = Math.max(0, remaining / durationSec);

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md rounded-2xl border border-[#E8E4F4] bg-white p-6 shadow-[0_20px_60px_rgba(23,18,65,0.2)] outline-none sm:p-8"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-[#5A4B7C] transition hover:bg-[#F4EFFF] hover:text-[#1B1033]"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>

        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "rgba(110, 44, 244, 0.12)" }}
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17l-5-5"
              stroke="#6E2CF4"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2
          id={titleId}
          className="pr-8 text-xl font-semibold tracking-tight text-[#1B1033] sm:text-2xl"
        >
          {title}
        </h2>
        <p
          id={messageId}
          className="mt-2 text-sm leading-relaxed text-[#5A4B7C] sm:text-base"
        >
          {message}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div
            className="relative flex h-10 w-10 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#E8E4F4"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#6E2CF4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 15.5}`}
                strokeDashoffset={`${2 * Math.PI * 15.5 * (1 - progress)}`}
                style={{ transition: "stroke-dashoffset 0.9s linear" }}
              />
            </svg>
            <span className="text-sm font-semibold text-[#6E2CF4]">{remaining}</span>
          </div>
          <p className="text-sm font-medium text-[#5A4B7C]" aria-live="polite">
            Closing in {remaining} second{remaining === 1 ? "" : "s"}…
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
