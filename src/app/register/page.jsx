"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordField from "@/ui/PasswordField";
import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import EmailField from "@/ui/EmailField";
import Link from "next/link";
import { registerUser } from "@/services/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
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

    try {
      await registerUser(formData);
      setMessage("Registration successful ✅");
      router.push("/login");
    } catch (err) {
      setMessage("Something went wrong 🚨");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden">
        {/* Left White Section */}
        <div className="w-full md:w-1/2 bg-white p-6 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <EmailField
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <PasswordField
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button label="Register" />
          </form>

          {message && (
            <p
              className={`mt-3 text-center text-sm font-medium ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <p className=" mt-6 text-center text-gray-700 text-sm block md:hidden">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right Purple Section - Hidden on mobile */}
        <div className="hidden md:flex w-1/2 bg-purple-700 text-white flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-center mb-6">
            Sign in and continue your amazing journey with us to adding your
            daily Todos.
          </p>
          <Link
            href="/login"
            className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-purple-700 transition"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
