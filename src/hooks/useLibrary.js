import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToLibrary, updateLibraryEntry } from "../store/librarySlice"

const useLibrary = (id, anime) => {
  const dispatch = useDispatch()
  const library  = useSelector(state => state.library.items)

  const libraryEntry = library.find(l => l.animeId === Number(id)) ?? null

  const [toggling, setToggling] = useState(false)

  const handleSetStatus = async (status) => {
    if (toggling || !anime || libraryEntry?.status === status) return
    setToggling(true)
    const payload = {
      animeId:  Number(id),
      title:    anime.title,
      image:    anime.images?.jpg?.large_image_url,
      status,
      episodes: anime.episodes,
    }
    if (libraryEntry) {
      await dispatch(updateLibraryEntry({ id: libraryEntry.id, data: payload }))
    } else {
      await dispatch(addToLibrary(payload))
    }
    setToggling(false)
  }

  return { libraryEntry, toggling, handleSetStatus }
}

export default useLibrary
