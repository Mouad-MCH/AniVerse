# AniVerse

A React SPA for exploring and managing a personal anime collection. Browse anime and characters from the Jikan API (MyAnimeList), and manage your favorites, ratings, and library with a local JSON Server.

## Tech Stack

- **React 19** + **React Router v7**
- **Tailwind CSS v4**
- **Jikan API v4** — anime & character data
- **JSON Server** — local REST API for user data
- **Redux Toolkit** + **React-Redux** — global state management

## Pages

| Route | Page |
|---|---|
| `/` | Landing Page |
| `/anime` | Anime List |
| `/anime/:id` | Anime Detail |
| `/anime/:id/characters` | Anime Characters |
| `/characters` | Character List |
| `/characters/:id` | Character Profile |
| `/favorites` | Favorites |
| `/my-ratings` | Personal Ratings |
| `/my-library` | Personal Library |
| `/dashboard` | Dashboard |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the React app

```bash
npm run dev
```

### 3. Start JSON Server (in a separate terminal)

```bash
npm run server
```

The app runs on `http://localhost:5173` and the JSON Server on `http://localhost:3001`.

## Project Structure

```
src/
├── main.jsx              # Entry point — BrowserRouter + Redux Provider
├── App.jsx               # Route definitions
├── index.css             # Global styles + Tailwind theme
├── store/                # Redux Toolkit
│   ├── store.js          # configureStore — anime, favorites, ratings, library
│   ├── animeSlice.js
│   ├── favoritesSlice.js
│   ├── ratingsSlice.js
│   └── librarySlice.js
├── services/
│   ├── jikan.js          # Jikan API calls
│   └── localDb.js        # JSON Server CRUD helpers
├── pages/                # One component per route (incl. Dashboard.jsx)
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── anime/            # AnimeCard, AnimeGrid
│   ├── character/        # CharacterCard
│   └── ui/                # LoadingSpinner, ErrorMessage, EmptyState, Pagination, StatCard, ...
└── hooks/                # Custom hooks (useAnime, useFavorite, useRating, useLibrary, useDashboard, ...)
```

## Links

- **Figma Design** — [AniVerse Figma](https://www.figma.com/design/BoYE1eHoUENFRyjwVy4IJs/AniVerse?node-id=0-1&t=oZaULp4zP4hLRxM3-1)
- **Trello Board** — [AniVerse Trello](https://trello.com/invite/b/690353f6587087fc68510a6a/ATTI080cdd47a2f603e93bb28e0222aae51352DDB9D9/aniverse)
