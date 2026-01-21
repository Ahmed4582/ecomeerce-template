const Pagination = ({ page, pageCount, onChange }) => {
  const current = Number(page || 1);
  const total = Number(pageCount || 1);
  if (total <= 1) return null;

  const go = (p) => {
    const next = Math.min(total, Math.max(1, p));
    if (next !== current) onChange?.(next);
  };

  const buildPages = () => {
    const pages = new Set([1, total, current, current - 1, current + 1]);
    const list = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    const out = [];
    for (let i = 0; i < list.length; i++) {
      out.push(list[i]);
      if (i < list.length - 1 && list[i + 1] - list[i] > 1) out.push("…");
    }
    return out;
  };

  const pages = buildPages();

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        type="button"
        onClick={() => go(1)}
        className="w-8 h-8 rounded-md border border-border-light bg-background-white hover:bg-background-primary"
        aria-label="First page"
      >
        «
      </button>
      <button
        type="button"
        onClick={() => go(current - 1)}
        className="w-8 h-8 rounded-md border border-border-light bg-background-white hover:bg-background-primary"
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, idx) =>
        p === "…" ? (
          <span key={`dots-${idx}`} className="px-2 text-text-secondary">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            className={`w-8 h-8 rounded-md border transition-colors ${
              p === current
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-background-white border-border-light hover:bg-background-primary"
            }`}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => go(current + 1)}
        className="w-8 h-8 rounded-md border border-border-light bg-background-white hover:bg-background-primary"
        aria-label="Next page"
      >
        ›
      </button>
      <button
        type="button"
        onClick={() => go(total)}
        className="w-8 h-8 rounded-md border border-border-light bg-background-white hover:bg-background-primary"
        aria-label="Last page"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;

