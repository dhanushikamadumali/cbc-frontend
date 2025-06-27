import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleRegister() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
        email,
        firstName,
        lastName,
        password,
        phone,
        role: "user",
      })
      .then((response) => {
        toast.success("Registration successful!");
        navigate("/login");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Registration failed", error.response?.data);
        toast.error(error.response?.data?.message || "Registration failed");
        setLoading(false);
      });
  }

  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="border w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-auto p-6 backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
          />
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
          />
          <button
            onClick={handleRegister}
            className="w-[400px] h-[50px] bg-blue-500 text-white rounded-xl cursor-pointer mt-[10px]"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-gray-600 text-center m-[10px]">
            Already have an account?
            &nbsp;
            <span className="text-red-500 cursor-pointer hover:text-green-700">
              <Link to="/login">Login Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
