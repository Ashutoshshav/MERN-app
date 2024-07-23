import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import UrlAnalytics from "./components/URL_Analysis/UrlAnalytics";
import Navbar from "./components/Navbar/Navbar";
import ResetPassword from "./components/Reset_Password/ResetPassword"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/analitics/:id" element={ <UrlAnalytics/> } />
          <Route path="/resetPassword" element={ <ResetPassword/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
