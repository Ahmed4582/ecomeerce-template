import Modal from "./Modal";

const ConfirmModal = ({
  open,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger", // "danger" | "primary"
  onConfirm,
  onClose,
  loading,
}) => {
  const confirmClass =
    confirmVariant === "primary"
      ? "bg-brand-primary hover:bg-brand-primary-hover"
      : "bg-red-600 hover:bg-red-700";

  return (
    <Modal open={open} title={title} onClose={onClose} maxWidthClass="max-w-md">
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
    </Modal>
  );
};

export default ConfirmModal;

