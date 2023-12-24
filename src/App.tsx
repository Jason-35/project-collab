import './App.css'
// import firebase from './firebase/firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/pages/LoginPage/Login';
// import Home from './components/page/Home';
import HomeLayout from './components/pages/HomeLayout/HomeLayout';
import { SidebarProvider } from './context/SidebarContext';
// import Explore from './components/page/Explore';
import Issues from './components/page/Issues';
import ProfileSetup from './components/pages/ProfileSetup/ProfileSetup';
import ProjectLayout from './components/pages/ProjectLayout/ProjectLayout';
// import Notification from './components/page/Notification';
// import LandingLayout from './components/page/LandingPage/LandingLayout';
import LandingLayout from './components/pages/LandingPage/LandingLayout';
import ExploreLayout from './components/pages/ExploreLayout/ExploreLayout';
import NotificationLayout from './components/pages/NotificationLayout/NotificationLayout';
function App() {
  
  return (
   <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingLayout />}/>
          <Route path='/profile-setup' element={<ProfileSetup />} />
          <Route path='/home' element={<HomeLayout/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/explore' element={<ExploreLayout />} />
          <Route path='/issues' element={<Issues />} />
          <Route path='/project/:uuid' element={<ProjectLayout />} />
          <Route path='/notifications' element={<NotificationLayout />}/>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
 
  )
}

export default App
