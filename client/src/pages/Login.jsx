import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-[150px] sm:w-[210px] md:w-[250px] cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up"
            ? "Create your Account"
            : "Login to your Account"}
        </h2>
        <p className="text-center text-sm mb-6">
          {" "}
          {state === "Sign Up" ? "Create Account" : "Login "}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-2xl bg-[#333A5C] mb-5">
              <img src={assets.person_icon} alt="personimg" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full bg-transparent outline-none text-white"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-2xl bg-[#333A5C] mb-5">
            <img src={assets.mail_icon} alt="personimg" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full bg-transparent outline-none text-white"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-2xl bg-[#333A5C] mb-5">
            <img src={assets.lock_icon} alt="personimg" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full bg-transparent outline-none text-white"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer hover:text-indigo-300"
          >
            Forgot Password?
          </p>
          <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium hover:from-indigo-600 hover:to-indigo-900 transition-all text-white py-2.5 rounded-2xl">
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="mt-4 text-gray-400 text-center text-xs">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-gray-400 text-center text-xs">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
