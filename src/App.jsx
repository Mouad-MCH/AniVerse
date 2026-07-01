import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Landing from "./pages/Landing"
import AnimeList from "./pages/AnimeList"
import AnimeDetail      from "./pages/AnimeDetail"
import AnimeCharacters  from "./pages/AnimeCharacters"
import CharacterList    from "./pages/CharacterList"
import CharacterProfile from "./pages/CharacterProfile"


const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/anime" element={<AnimeList />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/anime/:id/characters" element={<AnimeCharacters />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/characters/:id" element={<CharacterProfile />} />
        <Route path="/favorites" element={<h1 className="mt-20">Favorites</h1>} />
        <Route path="/my-ratings" element={<h1>My Ratings</h1>} />
        <Route path="/my-library" element={<h1 className="mt-20">My Library</h1>} />
        <Route path="/dashboard" element={<h1 className="mt-20">Dashboard</h1>} />

      </Routes>
      
    </>

  )
}

export default App