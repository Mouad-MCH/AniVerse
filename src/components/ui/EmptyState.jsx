import { Star, BookOpen, SearchX, Compass } from "lucide-react"
import { Link } from "react-router-dom"

// icon        — lucide icon component to display
// label       — small uppercase label above title  e.g. "No Favorites Yet"
// title       — h3 heading                         e.g. "Your favorites list is empty"
// description — paragraph text
// query       — if passed, highlights the search term inside the description
// action      — primary CTA  { label, to }         (Link)
// onClear     — if passed, shows "Clear Filters" secondary button

const EmptyState = ({ icon: Icon = BookOpen, label, title, description, query, action, onClear }) => {
  return (
    <div className="flex flex-col items-center text-center py-24 px-8">

      <div className="empty-icon-wrap mb-8">
        <div className="corner tl" /><div className="corner tr" />
        <div className="corner bl" /><div className="corner br" />
        <Icon size={48} className="text-primary-container" strokeWidth={1} />
      </div>

      {label && (
        <p className="font-label text-primary/50 uppercase tracking-widest text-xs mb-4">
          {label}
        </p>
      )}

      <h3 className="font-headline text-on-surface text-2xl mb-4">
        {title}
      </h3>

      <div className="ornamental-divider w-32 mb-6" />

      <p className="font-body text-on-surface-variant mb-10 max-w-sm leading-relaxed">
        {description}
        {query && (
          <>
            {" "}We couldn't find any anime matching{" "}
            <strong className="text-primary">"{query}"</strong>.
            {" "}Try a different keyword or reset your filters.
          </>
        )}
      </p>

      <div className="flex gap-4">
        {onClear && (
          <button className="btn-secondary" onClick={onClear}>
            Clear Filters
          </button>
        )}
        {action && (
          <Link to={action.to} className="btn-primary">
            {action.label}
          </Link>
        )}
      </div>

    </div>
  )
}

export default EmptyState
