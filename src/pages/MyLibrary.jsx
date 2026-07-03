import { useEffect, useMemo, useState } from "react"
import { LIBRARY_STATUSES } from "../utils/constent.js"
import { useDispatch, useSelector } from "react-redux"
import { fetchLibrary } from "../store/librarySlice.js"
import ErrorMessage from "../components/ui/ErrorMessage.jsx"
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx"
import EmptyState from "../components/ui/EmptyState.jsx"
import { BookOpen } from "lucide-react"
import AnimeGrid from "../components/anime/AnimeGrid.jsx"

const LIBRARY_STATUSES_LIBRARY = ["ALL", ...LIBRARY_STATUSES]

const MyLibrary = () => {
  const [activeStatus, setActiveStatus] = useState(LIBRARY_STATUSES_LIBRARY[0])
  const { items, loading, error } = useSelector((state) => state.library);
  
// filter
  const filtredAnimes = useMemo(() => {
    if (activeStatus === "ALL") return items
    return items.filter((item) => item.status === activeStatus)
  }, [activeStatus, items])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLibrary())
  }, [dispatch])

  if (error) return (
    <ErrorMessage
      message="Failed to load your Library."
      detail={error}
      onRetry={() => dispatch(fetchLibrary())}
    />
  )

  return (
    <div className="pt-32 pb-16 px-5 md:px-16 max-w-360 mx-auto w-full"> 
      <header className="text-center mb-16">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-primary mb-4 drop-shadow-[0_0_15px_rgba(201,168,76,0.2)]">
          My Library
        </h1>
        <p className="font-body text-on-surface-variant">
          Your personal anime collection
        </p>
        <div className="ornamental-divider max-w-xs mx-auto mt-8 mb-10" />

        <div className="flex flex-wrap justify-center gap-4">
          {LIBRARY_STATUSES_LIBRARY.map((status) => {
            const isActive = status === activeStatus
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={
                  isActive
                    ? "px-4 py-2 border border-primary bg-primary text-on-secondary-fixed uppercase font-body font-bold cursor-pointer transition-colors"
                    : "px-4 py-2 border border-primary-container text-on-surface uppercase font-body font-bold hover:bg-primary/30 cursor-pointer transition-colors"
                }
              >
                {status}
              </button>
            )
          })}
        </div>
      </header>

      <section>
        {
          loading ? (
            <LoadingSpinner variant="skeleton" />
          ) : filtredAnimes.length === 0 ? (
            <EmptyState 
              icon={BookOpen}
              label={activeStatus === "ALL" ? "No Library Yet" : `No ${activeStatus} Anime`}
              title="Your library is empty"
              description={
                activeStatus === "ALL"
                 ? "Start adding anime to your library to keep track of what you're watching."
                 : `You haven't added any anime with the "${activeStatus}" status yet.` 
              }
              action={{ label: "Browse Anime", to: "/anime" }}
              onClear={activeStatus != "ALL" ? () => setActiveStatus("ALL") : undefined} 
            />
          ) : (
            <AnimeGrid animes={filtredAnimes} isLibrary />
          )
        }
      </section>

    </div>
  )
}

export default MyLibrary
