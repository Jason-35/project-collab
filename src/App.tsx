import './App.css'
// import firebase from './firebase/firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Hello</div>}/>
        <Route path='/Login' element={<Login />} />
        <Route path='/LandingPage' element={<div>Greetings</div>} />
        <Route path='/Home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
