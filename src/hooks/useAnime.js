import { useCallback, useEffect, useState } from "react";
import { getAnimeList } from "../services/jikan";


export const useAnime = () => {
  const [inputValue, setInputValue] = useState("");
  const [genre, setGenre] = useState("")
  const [type, setType] = useState("")
  const [query, setQuery] = useState("")

  const [animes, setAnimes] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(inputValue)
      setPage(1)
    }, 600)
    return () => clearTimeout(timer)
  }, [inputValue])

  const fetchAnimes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, totalPages: tp } = await getAnimeList({ query, genre, type, page })
      setAnimes(data)
      setTotalPages(tp)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [query, genre, type, page])


  const handleGenreChange = (e) => { setGenre(e.target.value); setPage(1) }
  const handleTypeChange  = (e) => { setType(e.target.value);  setPage(1) }
  const handleClear = () => { setInputValue(""); setGenre(""); setType(""); setQuery(""); setPage(1) }

  return {
    animes, loading, error,
    page, setPage, totalPages,
    inputValue, setInputValue,
    genre, type, query,
    handleGenreChange, handleTypeChange, handleClear,
    retry: fetchAnimes,
  }
}