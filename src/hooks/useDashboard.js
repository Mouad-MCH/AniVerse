import { useDispatch, useSelector } from "react-redux"
import { fetchLibrary } from "../store/librarySlice"
import { fetchFavorites } from "../store/favoritesSlice"
import { fetchRatings } from "../store/ratingsSlice"
import { useEffect, useMemo } from "react"


export const useDashboard = () => {
  const dispatch = useDispatch()

  const favorites = useSelector(state => state.favorites)
  const ratings   = useSelector(state => state.ratings)
  const library   = useSelector(state => state.library)

  useEffect(() => {
    dispatch(fetchFavorites())
    dispatch(fetchRatings())
    dispatch(fetchLibrary())
  }, [dispatch])

  const loading = favorites.loading || ratings.loading || library.loading
  const error   = favorites.error || ratings.error || library.error

  const stats = useMemo(() => {
    const totalFavorites = favorites.items.length

    const completed = library.items.filter(i => i.status === "Completed")
    const completedCount = completed.length
    const totalEpisodesWatched = completed.reduce((sum, i) => sum + (i.episodes || 0), 0)

    const averageRating = ratings.items.length
      ? (ratings.items.reduce((sum, r) => sum + r.score, 0) / ratings.items.length).toFixed(1)
      : null

    const genreCounts = {}
    favorites.items.forEach(f => {
      (f.genres || []).forEach(g => { genreCounts[g] = (genreCounts[g] || 0) + 1 })
    })
    const topGenre = Object.keys(genreCounts).length
      ? Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0]
      : null

    return { totalFavorites, completedCount, totalEpisodesWatched, averageRating, topGenre }
  }, [favorites.items, ratings.items, library.items])

  const retryAll = () => {
    dispatch(fetchFavorites())
    dispatch(fetchRatings())
    dispatch(fetchLibrary())
  }

  const hasAnyData = stats.totalFavorites > 0 || ratings.items.length > 0 || library.items.length > 0

    return { loading, error, stats, retryAll, hasAnyData }
}