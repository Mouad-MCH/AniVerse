import AnimeCard from "./AnimeCard"


// const fakeAnimes = [
//   {
//     mal_id: 1,
//     title: "Fullmetal Alchemist: Brotherhood",
//     images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/1223/96541l.jpg" } },
//     score: 9.1, episodes: 64, year: 2009, type: "TV",
//     genres: [{ mal_id: 1, name: "Action" }],
//   },
//   {
//     mal_id: 5114,
//     title: "Attack on Titan",
//     images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg" } },
//     score: 8.5, episodes: 25, year: 2013, type: "TV",
//     genres: [{ mal_id: 1, name: "Action" }],
//   },
//   {
//     mal_id: 11061,
//     title: "Hunter x Hunter (2011)",
//     images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/11/33657l.jpg" } },
//     score: 9.0, episodes: 148, year: 2011, type: "TV",
//     genres: [{ mal_id: 2, name: "Adventure" }],
//   },
//   {
//     mal_id: 2904,
//     title: "Code Geass: Lelouch of the Rebellion R2",
//     images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/1438/108611l.jpg" } },
//     score: 8.9, episodes: 25, year: 2008, type: "TV",
//     genres: [{ mal_id: 8, name: "Drama" }],
//   },
//   {
//     mal_id: 199,
//     title: "Sen to Chihiro no Kamikakushi",
//     images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/6/79597l.jpg" } },
//     score: 8.9, episodes: null, year: 2001, type: "Movie",
//     genres: [{ mal_id: 10, name: "Fantasy" }],
//   },
//   {
//     mal_id: 820,
//     title: "Ginga Eiyuu Densetsu",
//     images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/11/6455l.jpg" } },
//     score: null, episodes: 110, year: 1988, type: "TV",
//     genres: [],
//   },
// ]

const AnimeGrid = ({ animes }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  )
}

export default AnimeGrid
