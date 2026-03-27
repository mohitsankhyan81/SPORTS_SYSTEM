import axios from 'axios';
import React, { useState } from 'react';

const CreateAnnuncements = () => {
  const [title, settitle] = useState("");
  const [text, settext] = useState("");
  const [link, setlink] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://sports-system-9e99.onrender.com/api/note/createnotification",
        {title,text,link},
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
            Create Annuncements
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
              placeholder="Enter message"
              value={text}
              onChange={(e) => settext(e.target.value)}
              className="w-full mb-3 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setlink(e.target.value)}
              className="w-full mb-3 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Annuncements
          </button>

        </form>
      </div>

    </div>
  );
};

export default CreateAnnuncements;