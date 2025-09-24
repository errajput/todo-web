"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordField from "@/ui/PasswordField";

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
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Login successful ");
        router.push("/login");
      }

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Create Account ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-medium text-blue-800 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
            required
          />
          <label className="block text-sm font-medium text-blue-800 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
            required
          />
          <PasswordField value={formData.password} onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-blue-200 text-blue-700 font-semibold py-2.5 rounded-lg shadow-md hover:bg-blue-800 hover:text-white hover:shadow-lg transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-700 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
