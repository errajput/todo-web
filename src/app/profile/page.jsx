"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/ui/Button";
import { UserContext } from "@/providers";
import {
  getProfile,
  getToken,
  removeToken,
  updateProfile,
} from "@/services/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const { setUser: setUserInContext } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
        setUser(profile.data.user);
        setNewName(profile.data.user.name);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdateName = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const updated = await updateProfile();

      // update state with new user info
      setUser((prev) => ({ ...prev, name: updated.user.name }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating name:", err);
    }
  };

  if (loading) {
    return (
      <div>
        <p className="text-lg font-semibold text-purple-700">
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
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6">
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
            <Button
              label={"Save"}
              onClick={handleUpdateName}
              className={"w-full"}
            />

            <Button
              onClick={() => {
                setIsEditing(false);
                setNewName(user.name);
              }}
              label={"Cancel"}
              className={"w-full"}
            />
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            label={"Edit Name"}
            className={"mt-3 w-full"}
          />
        )}

        <Link
          href="/"
          className="block py-3 bg-purple-500 text-white font-semibold  rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 mt-3 cursor-pointer"
        >
          Add Your Todo
        </Link>

        <Button
          onClick={() => {
            removeToken();
            setUserInContext({ isLogin: false });
            router.push("/login");
          }}
          label={"Logout"}
          className={"mt-6 "}
        />
      </div>
    </div>
  );
}
