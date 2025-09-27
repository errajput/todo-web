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
    <div className="flex items-center justify-center mt-20">
      <div className="flex w-[700px] h-[450px] shadow-2xl rounded-2xl overflow-hidden">
        {/* Left White Section */}
        <div className="w-1/2 bg-white p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="relative">
              <EmailField
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <PasswordField
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full"
            />

            <Button label="Register" className="w-full h-12" />
          </form>

          {message && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          {/* <p className="mt-8 text-center text-gray-700 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p> */}
        </div>

        {/* Right Purple Section */}
        <div className="w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold mb-4">Welcome Back 👋</h2>
          <p className="text-center mb-6">
            Sign in and continue your amazing journey with us To Adding your
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
