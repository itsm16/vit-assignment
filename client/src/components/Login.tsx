import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    axios.post(import.meta.env.VITE_API_URL + "/auth/login", {
      email,
      password
    }, {withCredentials: true})
    .then((response) => {
      alert(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black">
      <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn" 
      onClick={handleLogin}
      >Login</button>
      <p>Don't have an account? <Link className="text-blue-500 font-bold" to="/register">Register</Link></p>
      <Link className="text-blue-500 font-bold" to="/otp">Login with OTP</Link>
    </div>
  )
}
