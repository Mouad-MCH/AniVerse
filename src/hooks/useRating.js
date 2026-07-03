import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createRating, editRating } from "../store/ratingsSlice"

const useRating = (id, anime) => {
  const dispatch = useDispatch()
  const ratings  = useSelector(state => state.ratings.items)

  const ratingEntry = ratings.find(r => r.animeId === Number(id)) ?? null

  const [selectedRating, setSelectedRating] = useState(0)
  const [note,           setNote]           = useState("")
  const [hoveredStar,    setHoveredStar]    = useState(0)
  const [saving,         setSaving]         = useState(false)

  
  useEffect(() => {
    if (ratingEntry) {
      setSelectedRating(ratingEntry.score)
      setNote(ratingEntry.note ?? "")
    }
  }, [ratingEntry])

  const handleSave = async () => {
    if (!selectedRating || saving || !anime) return
    setSaving(true)
    const payload = {
      animeId: Number(id),
      title:   anime.title,
      image:   anime.images?.jpg?.large_image_url,
      score:   selectedRating,
      note,
    }
    if (ratingEntry) {
      await dispatch(editRating({ id: ratingEntry.id, data: payload }))
    } else {
      await dispatch(createRating(payload))
    }
    setSaving(false)
  }

  return {
    ratingEntry,
    selectedRating, setSelectedRating,
    note,           setNote,
    hoveredStar,    setHoveredStar,
    saving,
    handleSave,
  }
}

export default useRating
