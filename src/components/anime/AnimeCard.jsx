import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

// const fakeAnime = {
//   mal_id: 1,
//   title: "Fullmetal Alchemist: Brotherhood",
//   images: {
//     jpg: {
//       image_url: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
//       large_image_url: "https://cdn.myanimelist.net/images/anime/1223/96541l.jpg",
//     },
//   },
//   score: 9.1,
//   episodes: 64,
//   year: 2009,
//   type: "TV",
//   genres: [{ mal_id: 1, name: "Action" }, { mal_id: 2, name: "Adventure" }],
// }

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate()

  const {
    mal_id,
    title,
    images,
    score,
    episodes,
    year,
    genres,
    type,
  } = anime

  const imageUrl = images?.jpg?.large_image_url || images?.jpg?.image_url
  const firstGenre = genres?.[0]?.name
  const displayEpisodes = type === "Movie" ? "Movie" : episodes ? `${episodes} Eps` : "?"

  return (
    <article
      className="anime-card group relative aspect-[2/3] rounded-sm overflow-hidden bg-[#1a1a2e] cursor-pointer"
      onClick={() => navigate(`/anime/${mal_id}`)}
    >
      {/* Gold border glow on hover */}
      <div className="anime-card-inner absolute inset-0 z-20 pointer-events-none rounded-sm" />

      {/* Cover image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent z-10" />

      {/* Card content */}
      <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col justify-end">
        {firstGenre && (
          <div className="mb-2">
            <span className="bg-[#1a1a2e] text-white font-label text-[10px] px-2 py-1 uppercase border border-white/10 rounded-sm">
              {firstGenre}
            </span>
          </div>
        )}

        <h3 className="font-headline text-white text-base mb-2 line-clamp-2 leading-snug">
          {title}
        </h3>

        <div className="flex items-center justify-between text-xs text-on-surface-variant font-body">
          <div className="flex items-center gap-1 text-primary">
            <Star size={12} fill="currentColor" />
            <span className="font-bold">{score ?? "N/A"}</span>
          </div>
          <span>{displayEpisodes}</span>
          <span>{year ?? "—"}</span>
        </div>
      </div>
    </article>
  )
}

export default AnimeCard
