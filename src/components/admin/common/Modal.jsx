import { useEffect } from "react";

const Modal = ({ open, title, onClose, children, maxWidthClass = "max-w-lg" }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal"}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidthClass} bg-background-white rounded-2xl shadow-card overflow-hidden`}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
            <h3 className="text-text-primary font-semibold">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

