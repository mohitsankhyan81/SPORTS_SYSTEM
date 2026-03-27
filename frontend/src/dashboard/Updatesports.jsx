import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Updatesports = () => {
  const { id } = useParams();
  const navigateto=useNavigate()

  const [title, settitle] = useState("");
  const [game, setgame] = useState("");
  const [totalcount, settotalcount] = useState("");
  const token = JSON.parse(localStorage.getItem("token")) || "";

  useEffect(() => {
    const fetchblog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3455/api/sport/getsinglesports/${id}`,
          {
            withCredentials: true,
            headers: { authorization: `Bearer ${token}` }
          }
        );

        settitle(data.sports.title);
        setgame(data.sports.game);
        settotalcount(data.sports.totalcount);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchblog();
  }, [id, token]);

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `http://localhost:3455/api/sport/updateSports/${id}`,
      {
        title,
        game,
        totalcount: Number(totalcount)
      },
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Sport updated successfully");
    navigateto("/dashboard");
  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error("Fail to update");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-lg shadow-md w-[500px]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Blog
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <textarea
          placeholder="about"
          value={game}
          onChange={(e) => setgame(e.target.value)}
          rows="4"
          className="w-full border p-2 rounded mb-4"
        ></textarea>
      <input
          type="number"
          placeholder="Total games"
          value={totalcount}
          onChange={(e) => settotalcount(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default Updatesports