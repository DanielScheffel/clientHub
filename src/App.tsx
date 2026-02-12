// import Test from "./pages/Test"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./routes/ProtectedRoute"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
