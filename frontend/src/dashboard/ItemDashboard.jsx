import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';

const ItemDashboard = () => {
  const { item } = useAuth();
  const [selectedGame, setSelectedGame] = useState(null);
  console.log(item)
  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Sports Dashboard</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        {item?.data && item?.data?.length > 0 ? (
          item?.data?.map((game) => (
            <button
              key={game._id}
              onClick={() => setSelectedGame(game)}
              className={`px-4 py-2 rounded font-semibold
                ${selectedGame?._id === game._id
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-300 text-gray-900 hover:bg-blue-400'}`}
            >
              {game.title}
            </button>
          ))
        ) : (
          <p>No sports available</p>
        )}
      </div>
      <div>
        {selectedGame ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedGame.title} Players</h2>

            {selectedGame.issuedto && selectedGame.issuedto.length > 0 ? (
            <ul className="space-y-4">
            {selectedGame.issuedto.map((stud, index) => (
                <li
                key={index}
                className="flex items-center justify-between gap-4 p-2 bg-white rounded shadow"
                >
                <div className="flex items-center gap-4">
                    <img
                    src={selectedGame.photo?.url}
                    alt={stud}
                    className="w-12 h-12 rounded-full border border-gray-300"
                    />
                    <span className="font-medium">{stud}</span>
                </div>
                <p className="text-gray-500">Playing..</p>
                </li>
            ))}
            </ul>
            ) : (
              <p>No students issued yet for {selectedGame.title}</p>
            )}
          </div>
        ) : (
          <p>Select a sport to see issued students</p>
        )}
      </div>
    </div>
  );
};

export default ItemDashboard;