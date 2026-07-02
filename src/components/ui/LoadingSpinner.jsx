// variant="spinner" → centered gold ring  (for detail pages, small fetches)
// variant="skeleton" → shimmer card grid  (for list pages)

const SkeletonCard = () => (
  <div className="flex flex-col aspect-2/3">
    <div className="skeleton flex-1 rounded-sm" />
  </div>
)

const LoadingSpinner = ({ variant = "spinner", count = 8 }) => {
  if (variant === "skeleton") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      <span className="text-on-surface-variant font-label text-sm uppercase tracking-widest">
        Loading...
      </span>
    </div>
  )
}

export default LoadingSpinner
