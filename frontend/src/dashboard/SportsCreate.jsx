import axios from 'axios';
import React, { useState } from 'react';

const SportsCreate = () => {
  const [title, settitle] = useState("");
  const [game, setgames] = useState("");
  const [totalcount, settotalcount] = useState("");
  const [photo, setphoto] = useState(null);

  const token = JSON.parse(localStorage.getItem("token"));

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("game", game);
    formdata.append("totalcount", totalcount);
    formdata.append("photo", photo);

    try {
      const { data } = await axios.post(
        "http://localhost:3455/api/sport/sports-creation",
        formdata,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md w-80">
        <form onSubmit={handlesubmit}>
          
          <h1 className="text-xl font-bold mb-4 text-center">
            Create Sports
          </h1>

          <div>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="w-full mb-3 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter About Game"
              value={game}
              onChange={(e) => setgames(e.target.value)}
              className="w-full mb-3 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Enter Total Games"
              value={totalcount}
              onChange={(e) => settotalcount(e.target.value)}
              className="w-full mb-3 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="file"
              onChange={(e) => setphoto(e.target.files[0])}
              className="w-full mb-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Sports
          </button>

        </form>
      </div>

    </div>
  );
};

export default SportsCreate;