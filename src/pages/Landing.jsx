import { useNavigate } from "react-router-dom"
import { ArrowDown, ArrowRight } from "lucide-react"
import AnimeCard from "../components/anime/AnimeCard"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorMessage from "../components/ui/ErrorMessage"
import { Element, Link } from "react-scroll"
import { useLanding } from "../hooks/useLanding"


const Landing = () => {

  const navigate = useNavigate();
  const { 
    trending, 
    seasonal, 
    loadingTrending, 
    loadingSeasonal, 
    errorTrending, 
    errorSeasonal, 
    fetchTrending, 
    fetchSeasonal } = useLanding();


  return (
    <main>
      <section className="relative w-full h-screen min-h-200 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-surface-variant via-surface to-surface-container-lowest" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/50 z-10" />
        </div>
        <div className="relative z-20 text-center px-5 md:px-16 max-w-360 mx-auto flex flex-col items-center">
          <h1 className="font-cinzel text-primary text-7xl md:text-8xl font-bold mb-6 drop-shadow-[0_0_15px_rgba(201,168,76,0.5)]">
            AniVerse
          </h1>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto mb-12 text-xl leading-relaxed">
            Your anime universe starts here. Discover cinematic worlds, ancient relics, and stories that transcend time.
          </p>
          <button
            onClick={() => navigate("/anime")}
            className="group px-8 py-4 bg-transparent border border-primary text-primary font-label uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-on-primary flex items-center gap-2"
          >
            Explore Anime
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <Link to='top_section' smooth={true} duration={500} className="arrow_down_hero animate-bounce transition-all duration-75 text-primary absolute bottom-30 left-[50%] translate-x-[-50%] cursor-pointer">
          <ArrowDown size={26}/>
        </Link>
      </section>
      
      <Element name="top_section">
      <section className="py-24 px-5 md:px-16 max-w-360 mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-primary tracking-[0.2em] uppercase text-2xl mb-4">
            Trending Anime
          </h2>
          <div className="ornamental-divider w-1/2 mx-auto" />
        </div>
        {loadingTrending ? (
          <LoadingSpinner variant="skeleton" count={6} />
        ) : errorTrending ? (
          <ErrorMessage detail={errorTrending.message} onRetry={fetchTrending} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trending.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
          </div>
        )}
      </section>
      </Element>
      
      <section className="py-24 px-5 md:px-16 max-w-360 mx-auto bg-surface/30">
        <div className="text-center mb-16">
          <h2 className="font-headline text-primary tracking-[0.2em] uppercase text-2xl mb-4">
            This Season
          </h2>
          <div className="ornamental-divider w-1/2 mx-auto" />
        </div>
        {loadingSeasonal ? (
          <LoadingSpinner variant="skeleton" count={6} />
        ) : errorSeasonal ? (
          <ErrorMessage detail={errorSeasonal.message} onRetry={fetchSeasonal} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {seasonal.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
          </div>
        )}
      </section>
    </main>
  )
}
export default Landing
