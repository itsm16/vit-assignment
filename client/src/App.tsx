import { Route, Routes } from "react-router"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { OTP } from "./components/OTP"

function App() {
 return(
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/otp" element={<OTP/>}/>
  </Routes>
 )
}

export default App
