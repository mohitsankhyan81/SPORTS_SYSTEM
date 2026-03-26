import React from 'react'
import { useAuth } from '../auth/AuthProvider.jsx'
import {Link} from "react-router-dom"
const SportsGames = () => {
  const { item } = useAuth();
  console.log(item)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">All Sports</h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {item?.data?.map((sport) => (
          <Link to={`/details/${sport._id}`} key={sport._id}>
          <div key={sport._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

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
            </div>

          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SportsGames