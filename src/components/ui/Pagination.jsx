import { ChevronLeft, ChevronRight } from "lucide-react"



const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    const delta = 1 // pages around current

    const range = []
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i)
    }

    // Always show page 1
    pages.push(1)

    // Gap after 1
    if (range[0] > 2) pages.push("...")

    pages.push(...range)

    // Gap before last
    if (range[range.length - 1] < totalPages - 1) pages.push("...")

    // Always show last page
    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  return (
    <div className="flex justify-center items-center gap-2 font-label">

      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-4 py-2 text-on-surface-variant hover:text-primary
                   transition-colors uppercase border border-transparent hover:border-primary/50
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-on-surface-variant
                   disabled:hover:border-transparent"
      >
        <ChevronLeft size={14} />
        Prev
      </button>

      {/* Page numbers */}
      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="text-on-surface-variant px-2">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={
              p === page
                ? "w-10 h-10 flex items-center justify-center bg-primary text-on-primary font-bold"
                : "w-10 h-10 flex items-center justify-center bg-on-secondary-fixed text-white border border-transparent hover:border-primary/50 transition-colors"
            }
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1 px-4 py-2 text-on-surface-variant hover:text-primary
                   transition-colors uppercase border border-transparent hover:border-primary/50
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-on-surface-variant
                   disabled:hover:border-transparent"
      >
        Next
        <ChevronRight size={14} />
      </button>

    </div>
  )
}

export default Pagination
