import { BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/login-page/Login"
import Register from "./pages/register-page/Register"
import Setup from "./pages/setup/Setup"
import Dashboard from "./pages/dashboard/Dashboard"
import Sidebar from "./components/Sidebar"

import { LoadingProvider } from "./provider/Loading/loading-provider"
import { LoggedInProvider } from "./provider/Logged/loggedin-provider"
import TestComp from "./pages/TestComp"

function App() {
  return (
    <BrowserRouter>
      <LoggedInProvider>
        <LoadingProvider>
        <Sidebar />
          <Routes>
            <Route path="/test" element={<TestComp />} />
            <Route path="/" element={<div>Landing</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<div>explore</div>} />
            <Route path="/project" element={<div>projects</div>} />
            <Route path="/notification" element={<div>notification</div>} />
            <Route path="/profile" element={<div>profile</div>} />
          </Routes>
        </LoadingProvider>
      </LoggedInProvider>
    </BrowserRouter>
  )
}

export default App
