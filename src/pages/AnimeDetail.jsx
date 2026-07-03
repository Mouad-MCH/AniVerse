import { useParams, Link } from "react-router-dom"
import { ArrowRight, Star, Heart } from "lucide-react"
import useAnimeDetail from "../hooks/useAnimeDetail"
import useFavorite    from "../hooks/useFavorite"
import useRating      from "../hooks/useRating"
import useLibrary     from "../hooks/useLibrary"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorMessage   from "../components/ui/ErrorMessage"
import { LIBRARY_STATUSES } from "../utils/constent.js"


const AnimeDetail = () => {
  const { id } = useParams()

  const { anime, loading, error }                                         = useAnimeDetail(id)
  const { isFavorited, toggling: togglingFav, handleToggle }              = useFavorite(id, anime)
  const { ratingEntry, selectedRating, setSelectedRating, note, setNote,
          hoveredStar, setHoveredStar, saving, handleSave }               = useRating(id, anime)
  const { libraryEntry, toggling: togglingLib, handleSetStatus }          = useLibrary(id, anime)


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

  if (!anime) return null

  const genres      = anime.genres  ?? []
  const studios     = anime.studios ?? []
  const bgImage     = anime.images?.jpg?.large_image_url
  const trailerUrl  = anime.trailer?.embed_url
  const releaseYear = anime.aired?.prop?.from?.year


  return (
    <main className="grow flex flex-col">

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden pt-[88px]">

        {/* Blurred background */}
        <div className="absolute inset-0 z-0">
          {bgImage && <img src={bgImage} alt="" className="w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-360 mx-auto px-5 md:px-16 w-full py-16">
          <div className="flex flex-col md:flex-row gap-6 items-start">

            {/* Poster */}
            <div className="w-full md:w-1/3 shrink-0">
              <div className="relative w-full aspect-2/3 overflow-hidden border-4 border-primary-container shadow-[0_0_40px_rgba(201,168,76,0.15)] group">
                <img
                  src={anime.images?.jpg?.large_image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-2/3 flex flex-col space-y-8 pt-8 md:pt-0">

              {/* Genre badges + Title + Meta */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {genres.map(g => (
                    <span key={g.mal_id} className="px-3 py-1 border border-primary-container text-on-surface font-label text-[11px] uppercase bg-surface/50 backdrop-blur-sm tracking-widest">
                      {g.name}
                    </span>
                  ))}
                </div>

                <h1 className="font-cinzel text-3xl md:text-5xl text-primary-container uppercase tracking-widest drop-shadow-lg">
                  {anime.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-on-surface-variant font-label text-[11px] uppercase tracking-wider">
                  <div className="flex items-center gap-1 text-primary-container">
                    <span className="text-lg">★</span>
                    <span className="text-base font-bold">{anime.score ?? "N/A"}</span>
                  </div>
                  {studios.length > 0 && (
                    <><span className="w-1 h-1 rounded-full bg-outline-variant" /><span>{studios.map(s => s.name).join(", ")}</span></>
                  )}
                  {anime.episodes && (
                    <><span className="w-1 h-1 rounded-full bg-outline-variant" /><span>{anime.episodes} EP</span></>
                  )}
                  {releaseYear && (
                    <><span className="w-1 h-1 rounded-full bg-outline-variant" /><span>{releaseYear}</span></>
                  )}
                  {anime.status && (
                    <><span className="w-1 h-1 rounded-full bg-outline-variant" /><span className="text-primary-fixed">{anime.status}</span></>
                  )}
                </div>
              </div>

              {/* Synopsis */}
              <p className="text-on-surface/80 leading-relaxed max-w-3xl font-body text-base">
                {anime.synopsis ?? "No synopsis available."}
              </p>

              {/* ── Action panel ──────────────────────────────────────────── */}
              <div className="p-6 border border-primary-container bg-surface-container/30 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                  {/* Col 1 — Favorite */}
                  <div className="flex flex-col space-y-4">
                    <span className="font-label text-[11px] text-primary-container uppercase tracking-widest">Favorite</span>
                    <button
                      onClick={handleToggle}
                      disabled={togglingFav}
                      className={`font-label text-[11px] uppercase px-6 py-3 flex items-center justify-center gap-2 w-full transition-colors disabled:opacity-60
                        ${isFavorited
                          ? "bg-primary-container text-on-primary hover:bg-primary"
                          : "border border-primary-container text-primary-container hover:bg-primary-container/20"
                        }`}
                    >
                      <Heart size={15} fill={isFavorited ? "currentColor" : "none"} />
                      {isFavorited ? "In Favorites" : "Add to Favorites"}
                    </button>
                  </div>

                  {/* Col 2 — Rating 1–10 + note */}
                  <div className="flex flex-col space-y-4">
                    <span className="font-label text-[11px] text-primary-container uppercase tracking-widest">Rating</span>
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                        <button
                          key={n}
                          onClick={() => setSelectedRating(n)}
                          className={`w-8 h-8 flex items-center justify-center text-xs font-label transition-colors
                            ${selectedRating === n
                              ? "border border-primary-container bg-primary-container text-on-primary"
                              : "border border-primary-container/30 bg-surface-container text-on-surface hover:bg-primary-container/20"
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      placeholder="Personal Note"
                      className="w-full bg-transparent border-0 border-b border-primary-container/50 text-on-surface font-body text-sm focus:ring-0 focus:border-primary placeholder:text-on-surface-variant/50 py-1 px-0 outline-none"
                    />
                  </div>

                  {/* Col 3 — Library status */}
                  <div className="flex flex-col space-y-4">
                    <span className="font-label text-[11px] text-primary-container uppercase tracking-widest">Collection Status</span>
                    <div className="flex flex-col gap-2">
                      {LIBRARY_STATUSES.map(status => (
                        <button
                          key={status}
                          onClick={() => handleSetStatus(status)}
                          disabled={togglingLib}
                          className={`font-label text-[10px] uppercase py-2 px-4 text-left transition-colors disabled:opacity-60
                            ${libraryEntry?.status === status
                              ? "bg-primary-container text-on-primary border border-primary-container"
                              : "border border-primary-container/50 text-primary-container hover:bg-primary-container/10"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* View Characters */}
              <div className="pt-2">
                <Link
                  to={`/anime/${id}/characters`}
                  className="inline-flex items-center text-primary-container hover:text-primary font-label text-[11px] uppercase tracking-wider group transition-colors"
                >
                  View Characters
                  <ArrowRight size={15} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      
      <div className="max-w-360 mx-auto w-full px-5 md:px-16 my-8">
        <div className="ornamental-divider" />
      </div>

      {/* ── Trailer ── */}
      {trailerUrl && (
        <>
          <section className="py-8 px-5 md:px-16 max-w-360 mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="font-cinzel text-xl text-primary-container uppercase tracking-[0.2em]">— Trailer —</h2>
            </div>
            <div className="relative w-full max-w-5xl mx-auto aspect-video overflow-hidden border border-primary-container/50 shadow-[0_0_30px_rgba(201,168,76,0.1)]">
              <iframe src={trailerUrl} title="Anime Trailer" allowFullScreen className="w-full h-full" />
            </div>
          </section>
          <div className="max-w-360 mx-auto w-full px-5 md:px-16 my-8">
            <div className="ornamental-divider" />
          </div>
        </>
      )}

      {/* ── My Rating section ── */}
      <section className="py-8 px-5 md:px-16 max-w-360 mx-auto w-full mb-24">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-xl text-primary-container uppercase tracking-[0.2em]">— My Rating —</h2>
        </div>

        <div
          className="max-w-2xl mx-auto bg-surface-container p-8 border border-outline-variant/30"
          style={{ boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.2)" }}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8" onMouseLeave={() => setHoveredStar(0)}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setSelectedRating(n)}
                onMouseEnter={() => setHoveredStar(n)}
                className="transition-colors focus:outline-none"
              >
                <Star
                  size={26}
                  className={(hoveredStar || selectedRating) >= n ? "text-primary-container" : "text-outline-variant hover:text-primary-container"}
                  fill={(hoveredStar || selectedRating) >= n ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>

          {selectedRating > 0 && (
            <p className="text-center font-label text-[11px] text-primary-container uppercase tracking-widest mb-6">
              Your rating: {selectedRating} / 10
            </p>
          )}

          {/* Notes */}
          <div className="mb-6">
            <label className="block font-label text-[11px] text-primary-container uppercase mb-2 tracking-widest">
              Personal Notes
            </label>
            <textarea
              rows={4}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add a personal note..."
              className="w-full bg-background border-0 border-b border-primary-container text-on-surface font-body text-base focus:ring-0 focus:border-primary placeholder:text-on-surface-variant/50 resize-none p-3 outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || !selectedRating}
              className="bg-primary-container text-on-primary font-label text-[11px] uppercase px-8 py-3 hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving…" : ratingEntry ? "Update Rating" : "Save Rating"}
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}

export default AnimeDetail
