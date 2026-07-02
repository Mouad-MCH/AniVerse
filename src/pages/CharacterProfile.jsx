import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getCharacterById } from "../services/jikan"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorMessage   from "../components/ui/ErrorMessage"

const CharacterProfile = () => {
  const { id } = useParams()

  const [character, setCharacter] = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCharacterById(id)
        setCharacter(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])


  if (loading) return (
    <main className="pt-32 pb-24 px-5 md:px-16 max-w-360 mx-auto w-full">
      <LoadingSpinner variant="skeleton" count={6} />
    </main>
  )

  if (error) return (
    <main className="pt-32 pb-24 px-5 md:px-16 max-w-360 mx-auto w-full">
      <ErrorMessage detail={error} onRetry={() => window.location.reload()} />
    </main>
  )

  if (!character) return null

  const image     = character.images?.jpg?.image_url
  const nicknames = character.nicknames ?? []
  const animes    = character.anime     ?? []

  const paragraphs = (character.about ?? "No description available.")
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)
    .slice(0, 4)   

  return (
    <main className="min-h-screen flex flex-col bg-background text-on-surface">

      <header className="w-full px-5 md:px-16 py-6 max-w-360 mx-auto border-b border-outline-variant/30 pt-24">
        <Link
          to="/characters"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-body text-base group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Characters
        </Link>
      </header>

      <div className="grow px-5 md:px-16 py-12 md:py-24 max-w-360 mx-auto w-full flex flex-col gap-16 relative">

        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

        
        <section className="flex flex-col lg:flex-row gap-6 md:gap-16 items-start relative z-10 w-full">

          {/* Portrait */}
          <div className="w-full lg:w-5/12 shrink-0 group">
            <div className="relative w-full aspect-2/3 bg-surface-container overflow-hidden gold-glow">
              {image
                ? <img
                    src={image}
                    alt={character.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                : <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-label text-xs uppercase tracking-widest">
                    No image
                  </div>
              }
              <div className="absolute inset-0 border-2 border-primary-container/20 pointer-events-none" />
            </div>
          </div>

          {/* Details */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6 pt-4 lg:pt-8">

            
            <div>
              <h1 className="font-cinzel text-3xl md:text-5xl text-primary-container mb-2 uppercase tracking-widest">
                {character.name}
              </h1>
              {nicknames.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {nicknames.map(nick => (
                    <span
                      key={nick}
                      className="px-3 py-1 bg-surface-container border border-primary-container/30 text-on-surface font-label text-[10px] uppercase tracking-widest"
                    >
                      {nick}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="ornamental-divider w-full max-w-md" />

           
            <div className="flex flex-col gap-4 max-w-3xl">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-on-surface-variant font-body text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            
            <div className="mt-2 flex gap-4">
              <button className="bg-primary-container text-on-primary font-label text-[11px] uppercase px-6 py-3 hover:bg-primary transition-colors flex items-center gap-2">
                Add to Favorites
              </button>
              <button className="bg-transparent border border-primary-container text-primary-container font-label text-[11px] uppercase px-6 py-3 hover:bg-primary-container/10 transition-colors">
                View Gallery
              </button>
            </div>

          </div>
        </section>

       
        {animes.length > 0 && (
          <section className="flex flex-col gap-8 relative z-10 w-full">
            <h2 className="font-headline text-xl text-on-surface border-b border-primary-container/20 pb-2 inline-block max-w-fit uppercase tracking-widest">
              Appears In
            </h2>

            <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory hide-scrollbar">
              {animes.map(({ anime, role }) => (
                <Link
                  key={anime.mal_id}
                  to={`/anime/${anime.mal_id}`}
                  className="shrink-0 w-50 flex flex-col gap-3 snap-start group cursor-pointer"
                >
                  <div
                    className="w-full aspect-2/3 overflow-hidden bg-surface-container relative"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.2)", transition: "box-shadow 0.3s" }}
                  >
                    {anime.images?.jpg?.large_image_url
                      ? <img
                          src={anime.images.jpg.large_image_url}
                          alt={anime.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      : <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-label text-xs uppercase">
                          No image
                        </div>
                    }
                  </div>
                  <div>
                    <h3 className="font-body text-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                      {anime.title}
                    </h3>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                      {role}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </main>
  )
}

export default CharacterProfile
