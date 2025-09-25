"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/user.service";
import PasswordField from "@/ui/PasswordField";
import EmailField from "@/ui/EmailField";
import Button from "@/ui/Button";

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
    <div className="flex items-center justify-center mt-12">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8 tracking-wide">
          Welcome Back 👋
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <EmailField
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <PasswordField
            value={formData.password}
            onChange={handleChange}
            className="w-full"
          />
          <Button label={"Login"} className={"w-full"} />
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              message.toLowerCase().includes("successful")
                ? "text-purple-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Register Link */}
        <p className="mt-8 text-center text-gray-700 text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-purple-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
