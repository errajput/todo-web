"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
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
        setNewName(data.data.user.name);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdateName = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) {
        throw new Error("Failed to update name");
      }

      const data = await res.json();

      // update state with new user info
      setUser((prev) => ({ ...prev, name: data.user.name }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating name:", err);
    }
  };

  if (loading) {
    return (
      <div>
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
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6">
          Profile 👤
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border px-2 py-1 rounded ml-2"
              />
            ) : (
              user.name
            )}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>

        {isEditing ? (
          <div className="mt-4 flex gap-3 justify-center">
            <button
              onClick={handleUpdateName}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewName(user.name);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Edit Name
          </button>
        )}

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
