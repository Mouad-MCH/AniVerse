import { useState, useEffect, useCallback } from "react"
import { Search } from "lucide-react"
import AnimeCard from "../components/anime/AnimeCard"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"
import Pagination from "../components/ui/Pagination"
import { getAnimeList } from "../services/jikan"
import { SearchX } from "lucide-react"
import AnimeGrid from "../components/anime/AnimeGrid"

const GENRES = [
  { id: "",  name: "All Genres" },
  { id: "1",  name: "Action" },
  { id: "2",  name: "Adventure" },
  { id: "4",  name: "Comedy" },
  { id: "8",  name: "Drama" },
  { id: "10", name: "Fantasy" },
  { id: "14", name: "Horror" },
  { id: "7",  name: "Mystery" },
  { id: "22", name: "Romance" },
  { id: "24", name: "Sci-Fi" },
  { id: "36", name: "Slice of Life" },
  { id: "37", name: "Supernatural" },
]

const TYPES = [
  { id: "",      name: "All Types" },
  { id: "tv",    name: "TV Series" },
  { id: "movie", name: "Movie" },
  { id: "ova",   name: "OVA" },
]

const AnimeList = () => {

    
    const [inputValue, setInputValue] = useState("");
    const [genre, setGenre] = useState("")
    const [type, setType] = useState("")
    const [query, setQuery] = useState("")
    
    const [animes, setAnimes] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    


    const handleGenreChange = (e) => { setGenre(e.target.value); setPage(1) };
    const handleTypeChange = (e) => { setType(e.target.value); setPage(1) }
    const handleClear = () => { setInputValue(""); setPage(1); setGenre(""); setType(""); setQuery("") }

  return (
    <main className="pt-32 pb-24 px-5 md:px-16 max-w-360 mx-auto w-full">

      <header className="text-center mb-16 space-y-4">
        <h1 className="font-cinzel text-5xl md:text-6xl text-primary font-bold tracking-wider uppercase">
          Anime Catalog
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
          Explore thousands of anime series and movies within the grand archive.
        </p>
        <div className="ornamental-divider w-1/2 mx-auto mt-8" />
      </header>

      {/* Search & Filters */}
      <section className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className='relative w-full md:w-1/2'>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search the archives..."
              className=" w-full border border-primary/50 bg-background text-on-surface pl-12 pr-4 py-3
                          focus:outline-none foucs:border-primary font-body transition-colors placeholder:text-on-surface-variant/50"
            />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
            <select 
              value={genre}
              onChange={handleGenreChange}
              className="custom-select bg-background border border-primary/50 text-on-surface
                         py-3 pl-4 pr-10 focus:outline-none focus:border-primary 
                         font-label uppercase tracking-widest cursor-pointer w-full md:w-49"
            >
                {
                    GENRES.map(g => <option key={g.id} value={g.id}>{g.name}</option>)
                }
            </select>
            
            <select 
              value={type}
              onChange={handleTypeChange}
              className="custom-select bg-background border border-primary/50 text-on-surface
                       py-3 pl-4 pr-10 focus:outline-none focus:border-primary
                       font-label uppercase tracking-widest cursor-pointer w-full md:w-48"
            >
                {
                    TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)
                }
            </select>
        </div>
      </section>

      {
        loading ? (
            <LoadingSpinner variant="skeleton" count={20} />
        ): error ? (
            <ErrorMessage detail={error.message} />
        ): animes.length === 0 ? (
            <EmptyState 
              icon={ SearchX }
              label="No Results Found"
              title="No anime matched your search"
              query={ query || undefined}
              desctription={!query ? "Try adjusting your filters." : undefined}
              action={{ label: "Browse All anime", to:"/anime" }}
              onClear={handleClear}
            />
        ) : (
            <>
             <div className="mb-10">
                <AnimeGrid animes={animes}/>
             </div>
             <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
        )
      }

    </main>
  )
}

export default AnimeList
