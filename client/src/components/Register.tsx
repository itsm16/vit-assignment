import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleMobileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setMobile(value);
    }

    if (value.length > 0 && value.length < 10) {
      setError("Mobile number must be 10 digits");
    } else {
      setError("");
    }
  };
  
  const handleSubmit = () => {
    axios.post(import.meta.env.VITE_API_URL + "/auth/register", {
      name,
      email,
      mobile
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black">
      <input
        className="input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="flex flex-col">
        <input
          className="input"
          type="text"
          placeholder="Phone Number"
          value={mobile}
          onChange={handleMobileChange}
        />

        {error && (
          <p className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>

      <button
        className="btn"
        disabled={mobile.length !== 10 || !name || !email}
        onClick={handleSubmit}
      >
        Register
      </button>

      <p>
        Already have an account?{" "}
        <Link
          className="text-blue-500 font-bold"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};