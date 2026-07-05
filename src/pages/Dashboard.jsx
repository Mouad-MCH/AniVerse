import { Heart, CheckCircle2, Star, Tag, Film, LayoutDashboard } from "lucide-react"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"
import StatCard from "../components/ui/StatCard"
import { useDashboard } from "../hooks/useDashboard"

const Dashboard = () => {

  const { loading, error, stats, retryAll, hasAnyData } = useDashboard()

  if (error) return (
    <ErrorMessage
      message="Failed to load your dashboard."
      detail={error}
      onRetry={retryAll}
    />
  )

  return (
    <div className="pt-32 pb-24 px-5 md:px-16 max-w-360 mx-auto w-full">
      <header className="text-center mb-16">
        <LayoutDashboard size={40} className="text-primary mx-auto mb-4" strokeWidth={1.2} />
        <h1 className="font-display text-primary uppercase tracking-wide text-4xl mb-2 md:text-5xl">Dashboard</h1>
        <p className="font-body text-on-surface-variant opacity-80">Your anime journey at a glance</p>
        <div className="ornamental-divider max-w-xs mx-auto mt-8" />
      </header>

      {loading ? (
        <LoadingSpinner variant="spinner" />
      ) : !hasAnyData ? (
        <EmptyState
          icon={LayoutDashboard}
          label="No Stats Yet"
          title="Your dashboard is empty"
          description="Add favorites, rate anime, and build your library to see stats here."
          action={{ label: "Explore Anime", to: "/anime" }}
        />
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard icon={Heart} label="Favorites" value={stats.totalFavorites} />
          <StatCard icon={CheckCircle2} label="Completed" value={stats.completedCount} />
          <StatCard
            icon={Star}
            label="Average Rating"
            value={stats.averageRating !== null ? `${stats.averageRating}/10` : "—"}
            sub="View my ratings →"
            to="/my-ratings"
          />
          <StatCard
            icon={Tag}
            label="Top Genre"
            value={stats.topGenre ?? "—"}
            sub={stats.topGenre ? "Most common in your favorites" : undefined}
          />
          <StatCard
            icon={Film}
            label="Episodes Watched"
            value={stats.totalEpisodesWatched}
            sub="From completed anime"
          />
        </section>
      )}
    </div>
  )
}

export default Dashboard
