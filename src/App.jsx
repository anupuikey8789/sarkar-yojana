import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Assessment from "./pages/Assessment"
import Schemes from "./pages/Schemes"
import Recommendations from "./pages/Recommendations"
import SchemeDetails from "./pages/SchemeDetails"
import About from "./pages/About"
import { AuthProvider } from "./auth/AuthProvider.jsx"

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/assessment" element={<Assessment />} />

        <Route path="/schemes" element={<Schemes />} />

        <Route
  path="/recommendations"
  element={<Recommendations />}
/>   
    <Route
  path="/scheme-details/:schemeId"
  element={<SchemeDetails />}
/>
<Route path="/about" element={<About />} />

      </Routes>

    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
