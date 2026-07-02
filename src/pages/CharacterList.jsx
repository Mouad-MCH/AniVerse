import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, UserX } from "lucide-react"
import { getCharacters } from "../services/jikan"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorMessage   from "../components/ui/ErrorMessage"
import EmptyState     from "../components/ui/EmptyState"
import Pagination     from "../components/ui/Pagination"

const CharacterList = () => {
  const [characters,  setCharacters]  = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [inputValue,  setInputValue]  = useState("")
  const [query,       setQuery]       = useState("")
  const [page,        setPage]        = useState(1)
  const [totalPages,  setTotalPages]  = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(inputValue)
      setPage(1)
    }, 600)
    return () => clearTimeout(timer)
  }, [inputValue])


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await getCharacters({ query, page })
        setCharacters(result.data)
        setTotalPages(result.totalPages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [query, page])

  return (
    <main className="grow pt-25">

      {/* ── Header & Search ───────────────────────────────────────────────── */}
      <section className="max-w-360 mx-auto px-5 md:px-16 py-16 flex flex-col items-center text-center">
        <h1 className="font-cinzel text-4xl md:text-6xl text-primary font-bold tracking-wider uppercase mb-6">
          Characters
        </h1>
        <div className="w-full max-w-md ornamental-divider mb-10" />

        {/* Search */}
        <div className="w-full max-w-2xl relative group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-container z-10"
          />
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search character by name..."
            className="w-full bg-surface border border-primary-container text-on-surface font-body py-4 pl-12 pr-4
                       focus:outline-none focus:ring-1 focus:ring-primary-container
                       focus:shadow-[0_0_15px_rgba(201,168,76,0.1)] transition-all
                       placeholder:text-outline-variant"
          />
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <section className="max-w-360 mx-auto px-5 md:px-16 pb-24">
        {loading ? (
          <LoadingSpinner variant="skeleton" count={24} />
        ) : error ? (
          <ErrorMessage detail={error} onRetry={() => window.location.reload()} />
        ) : characters.length === 0 ? (
          <EmptyState
            icon={UserX}
            label="No Characters"
            title="No characters matched your search"
            query={query || undefined}
            onClear={() => { setInputValue(""); setQuery("") }}
          />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {characters.map(({ mal_id, name, images }) => (
                <Link
                  key={mal_id}
                  to={`/characters/${mal_id}`}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="bg-surface border border-[rgba(201,168,76,0.2)] group-hover:border-primary-container group-hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-all duration-500 h-full flex flex-col">

                    {/* Image */}
                    <div className="aspect-3/4 w-full overflow-hidden relative">
                      {images?.jpg?.image_url
                        ? <img
                            src={images.jpg.image_url}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        : <div className="w-full h-full bg-surface-container flex items-center justify-center text-on-surface-variant font-label text-xs uppercase tracking-widest">
                            No image
                          </div>
                      }
                      <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent opacity-60 pointer-events-none" />
                    </div>

                    {/* Name */}
                    <div className="p-4 text-center bg-surface grow flex items-center justify-center border-t border-[rgba(201,168,76,0.1)]">
                      <h2 className="font-headline text-on-surface group-hover:text-primary transition-colors font-bold uppercase text-base leading-snug">
                        {name}
                      </h2>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16">
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}
      </section>

    </main>
  )
}

export default CharacterList
