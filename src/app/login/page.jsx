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
        // localStorage.setItem("user", JSON.stringify(data.user));
        setUser({ isLogin: true });
        setMessage("Login successful ✅");
        setTimeout(() => router.push("/profile"), 1500);
      }
    } catch (err) {
      setMessage("Invalid email or password 🚨");
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex w-[700px] h-[400px] shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Purple Section */}
        <div className="w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center p-10">
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
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-purple-700" />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-purple-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div> */}
            <div className="text-center">
              <Button label={"LOGIN"} className="w-full !h-12" />
            </div>
          </form>

          {message && (
            <p
              className={`mt-4 text-center text-base font-medium ${
                message.toLowerCase().includes("successful")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
