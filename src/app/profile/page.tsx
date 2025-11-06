"use client";

import { JSX, useContext, useEffect, useState } from "react";
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

// 👤 Define types for user and context
interface User {
  name: string;
  email: string;
  _id?: string;
}

interface UserContextType {
  setUser: (user: { isLogin: boolean }) => void;
}

export default function ProfilePage(): JSX.Element {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");

  const { setUser: setUserInContext } = useContext(
    UserContext
  ) as UserContextType;

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const profile = await getProfile();
        const userData = profile?.data?.user as User | undefined;
        setUser(userData || null);
        setNewName(userData?.name || "");
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdateName = async (): Promise<void> => {
    const token = getToken();
    if (!token || !user) return;

    try {
      const updated = await updateProfile({ name: newName });
      setUser((prev) => (prev ? { ...prev, name: updated.user.name } : prev));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating name:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-purple-700">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">No user found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-1 py-10 sm:py-20">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 text-center">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-700 mb-6">
          Profile 👤
        </h1>

        {/* User Info */}
        <div className="space-y-4 text-gray-700 text-sm sm:text-base text-left sm:text-center">
          <p className="break-words">
            <span className="font-semibold">Name:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border px-3 py-2 rounded w-full mt-2 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              user.name
            )}
          </p>
          <p className="break-words">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>

        {/* Action Buttons */}
        {isEditing ? (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              label="Save"
              onClick={handleUpdateName}
              className="w-full sm:flex-1"
            />
            <Button
              onClick={() => {
                setIsEditing(false);
                setNewName(user.name);
              }}
              label="Cancel"
              className="w-full sm:flex-1"
            />
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            label="Edit Name"
            className="mt-6 w-full !py-2"
          />
        )}

        {/* Add Todo Link */}
        <Link
          href="/"
          className="block py-2.5 sm:py-3 mt-5 bg-purple-500 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm sm:text-base w-full"
        >
          Add Your Todo
        </Link>

        {/* Logout */}
        <Button
          onClick={() => {
            removeToken();
            setUserInContext({ isLogin: false });
            router.push("/login");
          }}
          label="Logout"
          className="mt-5 w-full"
        />
      </div>
    </div>
  );
}
