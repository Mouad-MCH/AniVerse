import { Check, X } from "lucide-react"
import { useState } from "react"


const EditForm = ({ entry, onSave, onCancel }) => {
  const [score, setScore] = useState(entry.score)
  const [note, setNote]   = useState(entry.note ?? "")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!score || saving) return
    setSaving(true)
    await onSave(entry.id, { ...entry, score, note })
    setSaving(false)
  }

  return (
    <div className="flex-1 flex flex-col gap-4 relative z-10">
      {/* Score picker */}
      <div>
        <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2">
          Your Score
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setScore(n)}
              className={`w-9 h-9 font-label text-sm border transition-colors
                ${score === n
                  ? "bg-primary text-on-primary border-primary"
                  : "border-outline/40 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Note textarea */}
      <div>
        <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2">
          Personal Note
        </p>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={3}
          placeholder="Write your thoughts…"
          className="w-full bg-surface-dim border border-outline/30 text-on-surface font-body text-sm p-3 resize-none focus:outline-none focus:border-primary/60 placeholder:text-on-surface-variant/40 transition-colors"
        />
      </div>

      {/* Save / Cancel */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <Check size={14} />
          {saving ? "Saving…" : "Save"}
        </button>
        <button onClick={onCancel} className="btn-secondary flex items-center gap-2">
          <X size={14} />
          Cancel
        </button>
      </div>
    </div>
  )
}

export default EditForm