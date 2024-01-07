import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/pages/LoginPage/Login';
import HomeLayout from './components/pages/HomeLayout/HomeLayout';
import { SidebarProvider } from './context/SidebarContext';
import ProfileSetup from './components/pages/ProfileSetup/ProfileSetup';
import ProjectLayout from './components/pages/ProjectLayout/ProjectLayout';
import LandingLayout from './components/pages/LandingPage/LandingLayout';
import ExploreLayout from './components/pages/ExploreLayout/ExploreLayout';
import NotificationLayout from './components/pages/NotificationLayout/NotificationLayout';
import Profile from './components/pages/Profile/Profile';
import { NavigationProvider } from './context/NavigationContext';
function App() {
  
  return (
    <NavigationProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingLayout />}/>
            <Route path='/profile-setup' element={<ProfileSetup />} />
            <Route path='/home' element={<HomeLayout/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/explore' element={<ExploreLayout />} />
            <Route path='/project/:uuid' element={<ProjectLayout />} />
            <Route path='/notifications' element={<NotificationLayout />}/>
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </NavigationProvider>
 
  )
}

export default App
