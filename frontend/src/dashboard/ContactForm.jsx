import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ContactForm = () => {
  const [contact, setcontact] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchcontact = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3455/api/cont/getcontactreport",
          {
            withCredentials: true,
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );

        setcontact(data.contacts); // ✅ fix
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchcontact();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Contact Problems
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {contact.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No messages found
          </p>
        ) : (
          contact.map((item) => (

            <div
              key={item._id}
              className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border"
            >

              {/* User Info */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-gray-800">
                  {item.name}
                </h2>
                <span className="text-xs text-gray-400">
                  {item.studid}
                </span>
              </div>

              {/* Email */}
              <p className="text-sm text-blue-600 mb-2">
                {item.email}
              </p>

              {/* Message */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.message}
              </p>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default ContactForm;