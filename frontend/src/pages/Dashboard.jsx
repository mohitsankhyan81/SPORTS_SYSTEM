import React, { useState } from 'react'
import Sidebar from '../dashboard/Sidebar.jsx'
import CreateAnnucements from '../dashboard/CreateAnnucements.jsx'
import ContactForm from '../dashboard/ContactForm.jsx'
import Sports from '../dashboard/Sports.jsx'
import Announcement from '../dashboard/Annuncements.jsx'
import SportsCreate from '../dashboard/SportsCreate.jsx'
import ItemDashboard from '../dashboard/ItemDashboard.jsx'

const Dashboard = () => {
  const [component, setcomponent] = useState("my created sports")

  return (
    <div className="bg-[url('/download-16.jpg')] bg-cover bg-center h-screen p-6 flex gap-6">
      <Sidebar component={component} setcomponent={setcomponent} />

      <div className="flex-1">
        {component === "create sports" ? (
          <SportsCreate/>
        ) : component === "create announcement" ? (
          <CreateAnnucements />
        ) : component === "contact forms" ? (
          <ContactForm />
        ) : component === "announcement" ? (
          <Announcement />
        ):component==="itemissuedashboard"?(
          <ItemDashboard/>
        ) : (
          <Sports />
        )}
      </div>
    </div>
  )
}

export default Dashboard