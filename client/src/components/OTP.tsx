import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

export const OTP = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState("");

  const validateOtp = (value: string) => {
    if (!value) {
      setOtpError("OTP is required");
      return false;
    }

    if (value.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return false;
    }

    setOtpError("");
    return true;
  };

  const getOtp = async () => {
    try {
      await axios.post(import.meta.env.VITE_API_URL + "/auth/send-otp", {
        email,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      })

    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    const isOtpValid = validateOtp(otp);

    if (!isOtpValid) {
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/auth/verify-otp", {
        otp,
        email,
      }, {withCredentials: true});

      alert("OTP verified successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // numbers only
    const value = e.target.value.replace(/\D/g, "");

    // max 6 digits
    if (value.length <= 6) {
      setOtp(value);
    }

    validateOtp(value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black">
      <h1 className="text-white text-2xl font-bold">
        OTP Login
      </h1>

      <div className="flex gap-2">
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          className="btn"
          onClick={getOtp}
        >
          Get OTP
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <input
          className="input"
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={handleOtpChange}
        />

        {otpError && (
          <p className="text-red-500 text-sm">
            {otpError}
          </p>
        )}
      </div>

      <button
        className="btn"
        onClick={verifyOtp}
        disabled={otp.length !== 6}
      >
        Verify
      </button>
      <p>Don't have an account? <Link className="text-blue-500 font-bold" to="/register">Register</Link></p>

    </div>
  );
};