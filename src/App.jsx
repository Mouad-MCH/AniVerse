import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Landing from "./pages/Landing"
import AnimeList from "./pages/AnimeList"
import AnimeDetail      from "./pages/AnimeDetail"
import AnimeCharacters  from "./pages/AnimeCharacters"
import CharacterList    from "./pages/CharacterList"
import CharacterProfile from "./pages/CharacterProfile"
import Favorites  from "./pages/Favorites"
import MyRatings  from "./pages/MyRatings"
import MyLibrary  from "./pages/MyLibrary"
import Dashboard  from "./pages/Dashboard"


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
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-ratings" element={<MyRatings />} />
        <Route path="/my-library" element={<MyLibrary />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      <Footer />
    </>

  )
}

export default App
