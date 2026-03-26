import React from 'react'
import {Routes,Route, useLocation} from "react-router-dom"
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Contact from './pages/Contact.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Announcement from './pages/Announcement.jsx';
import Home from './components/Home.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import SportsItem from './pages/SportsItem.jsx';
import Verify from './pages/Verify.jsx';
import Verifyemail from './pages/Verifyemail.jsx';
import NotFound from './pages/NotFound.jsx';
import Profile from './pages/Profile.jsx';
import Details from './pages/Details.jsx';
import IssueSports from './feature/IssueSports.jsx';
import ReturnSports from './feature/ReturnSports.jsx';
import AnnDetails from './pages/AnnDetails.jsx';
const App = () => {
  const location = useLocation();

  const hiddeNavbarFooter = ["/login","/register","/dashboard","/verify","/verifyemail","/myprofile","/issueSports"].includes(
    location.pathname
  )  || location.pathname.startsWith("/issueSports")||location.pathname.startsWith("/returnSport")

  return (
    <div>
      <div>
        {!hiddeNavbarFooter && <Nav/>}

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/myprofile' element={<Profile/>}/>
          <Route path='/sportsitem' element={<SportsItem/>} />
          <Route path='/announcement' element={<Announcement/>}/>
          <Route path='/verify' element={<Verify/>}/> 
          <Route path='/verifyemail/:token' element={<Verifyemail/>}/>
          <Route path='*' element={<NotFound/>}/>

          {/* details */}
          <Route path='/details/:id' element={<Details/>}/>

          {/* IssueSportsItem */}
          <Route path='/issueSports/:id' element={<IssueSports/>}/>

          {/* ReturnSprotsItem */}
          <Route path='/returnSport/:id' element={<ReturnSports/>}/>

          {/* Annauncement Details */}
          <Route path='/annucment/:id' element={<AnnDetails/>}/>
        </Routes>
        {!hiddeNavbarFooter && <Footer/>}
      </div>

    </div>
  )
}
export default App
