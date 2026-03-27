import React from 'react'
import { useAuth } from '../auth/AuthProvider.jsx'
import { Link } from 'react-router-dom'

const Announcement = () => {
  const { announcement } = useAuth();

  const list = announcement?.alldata || [];

  return (
    <div className="min-h-screen bg-slate-500 p-6">

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Announcements
      </h1>

      <div className="max-w-4xl mx-auto grid gap-5">

        {list.length === 0 ? (
          <p className="text-center text-gray-500">
            No announcements
          </p>
        ) : (
          list.map((item) => (
            <Link to={`/annucment/${item._id}`} key={item._id}>

              <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer group">

                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {item.text}
                </p>
                <div className="mt-4 flex justify-between items-center text-xs text-gray-400 group-hover:text-blue-500">
                  <span>more</span>
                </div>

              </div>

            </Link>
          ))
        )}

      </div>

    </div>
  )
}

export default Announcement