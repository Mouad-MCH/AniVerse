import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import StarRow from "./StarRow"
import EditForm from "./EditForm"
import { Link } from "react-router-dom"


const RatingCard = ({ entry, onEdit, onDelete, index }) => {
  const [editing, setEditing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()   // animate once, then stop observing
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSave = async (id, data) => {
    await onEdit(id, data)
    setEditing(false)
  }

  return (
    <article
      ref={cardRef}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`bg-surface-container-low border-l-4 border-primary flex flex-col sm:flex-row p-6 gap-6 relative overflow-hidden group
        transition-all duration-700 hover:shadow-[0_0_30px_rgba(201,168,76,0.05)]
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Inner hover border */}
      <div className="absolute inset-0 border border-primary/10 border-l-0 pointer-events-none group-hover:border-primary/30 group-hover:bg-primary/2 transition-colors duration-500" />

      {/* Poster */}
      <Link
        to={`/anime/${entry.animeId}`}
        className="w-full sm:w-28 shrink-0 overflow-hidden border border-outline/20 relative z-10 self-start"
        style={{ aspectRatio: "2/3" }}
      >
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </Link>

      {/* Content */}
      {editing ? (
        <EditForm
          entry={entry}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="flex-1 flex flex-col justify-between relative z-10 min-w-0">
          <div>
            <Link to={`/anime/${entry.animeId}`}>
              <h2 className="font-headline text-on-surface text-xl mb-3 group-hover:text-primary transition-colors duration-300 truncate">
                {entry.title}
              </h2>
            </Link>
            {entry.note && (
              <p className="font-body text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                {entry.note}
              </p>
            )}
          </div>

  
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setEditing(true)}
              className="font-label text-xs border border-primary text-primary px-5 py-2 hover:bg-primary hover:text-on-primary transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              <Pencil size={13} /> Edit
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="font-label text-xs border border-outline/40 text-error hover:border-error hover:bg-error/10 transition-colors px-5 py-2 uppercase tracking-widest flex items-center gap-2"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>
      )}

      {!editing && (
        <div className="flex flex-col items-start sm:items-end shrink-0 relative z-10 mt-2 sm:mt-0">
          <StarRow score={entry.score} />
          <span className="font-label text-xs text-primary mt-2 tracking-widest">
            {entry.score} / 10
          </span>
        </div>
      )}
    </article>
  )
}


export default RatingCard;