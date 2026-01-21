import Modal from "./Modal";
import { Trash2 } from "lucide-react";

const ConfirmModal = ({
  open,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger", // "danger" | "primary"
  layout = "inline", // "inline" | "stacked"
  showIcon = false,
  onConfirm,
  onClose,
  loading,
}) => {
  const confirmClass =
    confirmVariant === "primary"
      ? "bg-brand-primary hover:bg-brand-primary-hover"
      : "bg-red-600 hover:bg-red-700";

  return (
    <Modal
      open={open}
      title={layout === "stacked" ? null : title}
      onClose={onClose}
      maxWidthClass="max-w-md"
    >
      {layout === "stacked" ? (
        <div className="flex flex-col items-center text-center gap-4">
          {showIcon && (
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
              <Trash2 className="w-9 h-9 text-red-600" />
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-text-primary">
              {title}
            </h3>
            {message && (
              <p className="text-sm text-text-secondary leading-relaxed">
                {message}
              </p>
            )}
          </div>

          <div className="w-full space-y-3 pt-2">
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`${confirmClass} w-full text-white px-5 py-3 rounded-xl font-semibold transition-colors disabled:opacity-60`}
            >
              {loading ? "Loading..." : confirmText}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full bg-gray-200 hover:bg-gray-300 text-text-primary px-5 py-3 rounded-xl font-semibold transition-colors disabled:opacity-60"
            >
              {cancelText}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {message && <p className="text-text-secondary text-sm">{message}</p>}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-text-primary px-5 py-2.5 rounded-lg font-semibold transition-colors"
              disabled={loading}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`${confirmClass} text-white px-5 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-60`}
              disabled={loading}
            >
              {loading ? "Loading..." : confirmText}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ConfirmModal;

