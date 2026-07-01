import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, UserX } from "lucide-react"
import { getAnimeById, getAnimeCharacters } from "../services/jikan"
import CharacterCard  from "../components/character/CharacterCard"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorMessage   from "../components/ui/ErrorMessage"
import EmptyState     from "../components/ui/EmptyState"

const AnimeCharacters = () => {
  const { id } = useParams()

  const [animeTitle,  setAnimeTitle]  = useState("")
  const [characters,  setCharacters]  = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [anime, chars] = await Promise.all([
          getAnimeById(id),
          getAnimeCharacters(id),
        ])
        setAnimeTitle(anime.title ?? "")
        setCharacters(chars ?? [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  return (
    <main className="pt-32 pb-24 px-5 md:px-16 max-w-360 mx-auto w-full">

      <Link
        to={`/anime/${id}`}
        className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-label text-[11px] uppercase tracking-widest mb-12 group transition-colors"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Anime
      </Link>

      <header className="flex flex-col items-center text-center mb-16">
        {animeTitle && (
          <p className="font-label text-[11px] text-primary/80 mb-4 tracking-widest uppercase">
            {animeTitle}
          </p>
        )}
        <h1 className="font-cinzel text-4xl md:text-6xl text-primary font-bold tracking-wider uppercase mb-8">
          Characters
        </h1>
        <div className="w-full max-w-md ornamental-divider" />
      </header>

      {loading ? (
        <LoadingSpinner variant="skeleton" count={12} />
      ) : error ? (
        <ErrorMessage
          detail={error}
          onRetry={() => window.location.reload()}
        />
      ) : characters.length === 0 ? (
        <EmptyState
          icon={UserX}
          label="No Characters"
          title="No characters found hidden in the shadows"
        />
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {characters.map(({ character, role }) => (
            <CharacterCard
              key={character.mal_id}
              character={character}
              role={role}
            />
          ))}
        </div>

      )}
    </main>
  )
}

export default AnimeCharacters
