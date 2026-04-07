import React from "react";
import { useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

const handleCredentialResponse = async (response) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/google`,
      {
        token: response.credential,
      }
    );


    localStorage.setItem("userToken", res.data.token);
    localStorage.setItem("userInfo", JSON.stringify(res.data));

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {
        theme: "outline",
        size: "large",
        width: 300,
      },
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-10 overflow-y-hidden">
      <div className="flex flex-col justify-center items-center gap-8  text-white">
        <div className="flex flex-col justify-center gap-2 items-center">
          <FaSpotify className="text-4xl" />

          <h1 className="font-bold text-center w-100 leading-tight text-5xl ">
            Welcome back
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-4"
          >
            {error && (
              <p className="text-red-500 text-xs text-center font-medium">
                *{error}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-xs">Email address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="p-3 w-75 border border-[#7C7C7C] rounded-sm text-sm font-semibold"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-xs">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="p-3 w-75 border border-[#7C7C7C] rounded-sm text-sm font-semibold"
                required
              />
            </div>
            <div className="flex flex-col mt-2 ">
              <input
                type="submit"
                className="py-2 w-75 hover:bg-[#3BE477] transition-all duration-300 hover:cursor-pointer text-black rounded-3xl bg-[#14d959] text-lg  font-semibold"
                value={loading ? "loading..." : "Login"}
              />
            </div>
          </form>
          <div className=" flex flex-col justify-center gap-3 items-center ">
            <p className="text-sm text-[#9C9C9C]">Don't have an account?</p>
            <Link to="/signup" className="text-sm font-bold  ">
              Sign up
            </Link>
          </div>
        </div>
        <div>
          <div id="googleButton"></div>
        </div>
        <div className="w-70 mt-9">
          <p className="text-xs text-center text-[#9C9C9C]">
            This site is protected by reCAPTCHA and the Google
            <span className="underline"> Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
