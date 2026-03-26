import React from 'react'

const achievements = [
  {
    title: "Tejaswin Shankar wins Gold",
    desc: "India's first gold medal in Asian Indoor Athletics Championship 2026.",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc"
  },
  {
    title: "India dominates Shooting",
    desc: "India secured 94 medals including 51 gold in Asian Rifle/Pistol Championship.",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
  },
  {
    title: "Women's Cricket Global Recognition",
    desc: "Indian women's cricket team nominated for Laureus World Team Award.",
    img: "https://images.unsplash.com/photo-1593766788306-28561086694e"
  },
  {
    title: "BCCI Naman Awards 2026",
    desc: "Rahul Dravid and Mithali Raj honored for lifetime achievements.",
    img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d"
  },
  {
    title: "Khelo India Tribal Games",
    desc: "3000+ athletes participated showcasing India's grassroots talent.",
    img: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf"
  }
]

const Achievements = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold text-center mb-8">
        🇮🇳 India Achievements 2026
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        
        {achievements.map((item, index) => (
          
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

            <img 
              src={item.img} 
              alt="" 
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-2">
                {item.desc}
              </p>
            </div>

          </div>

        ))}

      </div>
    </div>
  )
}

export default Achievements