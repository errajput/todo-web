"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login"); // redirect if not logged in
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/user/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="">
        <p className="text-lg font-semibold text-blue-700">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p className="text-lg font-semibold text-red-600">No user found</p>
      </div>
    );
  }

  return (
    <div className="h-100 flex items-center justify-center m-12">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6">
          Profile 👤
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
        <Link
          href="/"
          className="block w-full bg-blue-700 text-white font-semibold p-2 rounded-lg hover:bg-blue-800 transition mt-6"
        >
          Add Your Todo
        </Link>
        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white hover:text-gray-200 rounded-lg cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
