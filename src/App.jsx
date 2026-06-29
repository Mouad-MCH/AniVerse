import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"


const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
      
        <Route path="/" element={<h1 className="mt-20">Landing page</h1>} />
        <Route path="/anime" element={<h1 className="mt-20"> Anime list </h1>} />
        <Route path="/anime/:id" element={<h1 className="mt-20">Anime detail</h1>} />
        <Route path="/anime/:id/characters" element={<h1>Anime characters</h1>} />
        <Route path="/characters" element={<h1 className="mt-20">Characters list</h1>} />
        <Route path="/characters/:id" element={<h1>character Profile</h1>} />
        <Route path="/favorites" element={<h1 className="mt-20">Favorites</h1>} />
        <Route path="/my-ratings" element={<h1>My Ratings</h1>} />
        <Route path="/my-library" element={<h1 className="mt-20">My Library</h1>} />
        <Route path="/dashboard" element={<h1 className="mt-20">Dashboard</h1>} />

      </Routes>
      
    </>

  )
}

export default App