"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import EmailField from "@/ui/EmailField";
import PasswordField from "@/ui/PasswordField";
import Button from "@/ui/Button";
import { loginUser } from "@/services/api";
import { UserContext } from "@/providers";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { setUser } = useContext(UserContext);

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
        localStorage.setItem("token", data.data.token);
        setUser({ isLogin: true });
        setMessage("Login successful ✅");
        setTimeout(() => router.push("/profile"), 1500);
      }
    } catch (err) {
      setMessage("Invalid email or password 🚨");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col md:flex-row w-full max-w-2xl shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Purple Section - hidden on mobile */}
        <div className="hidden md:flex w-1/2 bg-purple-700 text-white flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold mb-4">Welcome</h2>
          <p className="text-center mb-6">
            Join Our Unique Platform, Explore a New Experience with Adding your
            Daily Todos.
          </p>
          <Link
            href="/register"
            className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-purple-700 transition"
          >
            REGISTER
          </Link>
        </div>

        {/* Right White Section */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <EmailField value={formData.email} onChange={handleChange} />

            <PasswordField value={formData.password} onChange={handleChange} />

            <div className="text-center">
              <Button label={"LOGIN"} />
            </div>
          </form>

          {message && (
            <p
              className={`mt-3 text-center text-sm md:text-base font-medium ${
                message.toLowerCase().includes("successful")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          {/* Show register link only on mobile */}
          <p className="mt-6 text-center text-gray-700 text-sm block md:hidden">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
