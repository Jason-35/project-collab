import './App.css'
// import firebase from './firebase/firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import { SidebarProvider } from './context/SidebarContext';
import Explore from './components/pages/Explore';
import Issues from './components/pages/Issues';
import ProfileSetup from './components/pages/ProfileSetup';
function App() {
  
  return (
   <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div>Hello <a href='http://localhost:3000/login'>start</a></div>}/>
          <Route path='/landingPage' element={<div>Greetings</div>} />
          <Route path='/profile-setup' element={<ProfileSetup />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/issues' element={<Issues />} />
          <Route path='/project/:randomString' element={<div>project details here!</div>} />
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
 
  )
}

export default App
