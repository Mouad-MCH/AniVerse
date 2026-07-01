import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAnimeById } from "../services/jikan"
import { fetchFavorites } from "../store/favoritesSlice"
import { fetchRatings }   from "../store/ratingsSlice"
import { fetchLibrary }   from "../store/librarySlice"

const useAnimeDetail = (id) => {
  const dispatch = useDispatch()

  const [anime,   setAnime]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      setError(null)
      try {
        const animeData = await getAnimeById(id)
        setAnime(animeData)
        await Promise.all([
          dispatch(fetchFavorites()),
          dispatch(fetchRatings()),
          dispatch(fetchLibrary()),
        ])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [id, dispatch])

  return { anime, loading, error }
}

export default useAnimeDetail
