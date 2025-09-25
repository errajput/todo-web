"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordField from "@/ui/PasswordField";
import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import EmailField from "@/ui/EmailField";
import Link from "next/link";

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
    <div className="flex items-center justify-center mt-12">
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-10 animate-fadeIn">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8 tracking-wide">
          Join the Magic ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <TextField
              label={"Name"}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <EmailField value={formData.email} onChange={handleChange} />
          </div>

          <PasswordField value={formData.password} onChange={handleChange} />

          <Button label={"Create Account"} className={"w-full"} />
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              message.toLowerCase().includes("success")
                ? "text-purple-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Login Link */}
        <p className="mt-8 text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
