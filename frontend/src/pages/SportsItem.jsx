import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider.jsx'
import { Link } from "react-router-dom"

const SportsGames = () => {
  const { item } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState("All");

  const sports = item?.data || [];

  const filteredSports = sports.filter((sport) => {
    const matchSearch = sport.title.toLowerCase().includes(search.toLowerCase());
    const matchGame = selectedGame === "All" || sport.title === selectedGame;
    return matchSearch && matchGame;
  });
  return (
    <div className="min-h-screen bg-slate-600 p-6">
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search game..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border w-full sm:w-1/2"
        />

      </div>
        <div className="max-w-6xl mx-auto mb-6">
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="px-4 py-2 rounded-lg border"
        >
          <option value="All">All Games</option>
          <option value="Cricket">Cricket</option>
          <option value="Football">Football</option>
          <option value="Badminton">Badminton</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Carrom board">Carrom board</option>
        </select>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredSports.map((sport) => (
          <Link to={`/details/${sport._id}`} key={sport._id}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

              <img
                src={sport?.photo?.url}
                alt={sport.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">{sport.title}</h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {sport.game}
                </p>

                <p className="text-xs mt-2 text-blue-600">
                  Players: {sport.totalcount}
                </p>
              </div>
            </div>
          </Link>
        ))}

      </div>

    </div>
  )
}

export default SportsGames