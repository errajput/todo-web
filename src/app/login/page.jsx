"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/user.service";
import PasswordField from "@/ui/PasswordField";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("Please fill all fields.");
      return;
    }
    try {
      const data = await loginUser(formData);

      if (data?.data?.token) {
        setMessage("Login successful ✅");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/profile");
      }
    } catch (err) {
      setMessage("Something went wrong 🚨");
    }
  };

  return (
    <div className="flex items-center justify-center pt-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Welcome Back 👋
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <PasswordField value={formData.password} onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-blue-300 text-blue-700 font-semibold py-2.5 rounded-lg shadow-md hover:bg-blue-800 hover:text-white transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("successful") ? "text-blue-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
