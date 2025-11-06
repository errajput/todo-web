"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getProfile, isUserLogin } from "@/services/api";

// Define the shape of your context data
interface UserContextType {
  isLogin: boolean;
  setUser: React.Dispatch<React.SetStateAction<{ isLogin: boolean }>>;
}

// Define the props for Providers component
interface ProvidersProps {
  children: ReactNode;
}

// ✅ Create context with default value (casted to avoid undefined issues)
export const UserContext = createContext<UserContextType>({
  isLogin: false,
  setUser: () => {},
});

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [user, setUser] = useState<{ isLogin: boolean }>({ isLogin: false });

  useEffect(() => {
    const loginStatus = isUserLogin();

    if (loginStatus) {
      getProfile()
        .then(() => {
          setUser({ isLogin: true });
        })
        .catch((err: Error) => {
          console.error("Error fetching profile in Provider:", err.message);
          setUser({ isLogin: false });
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ isLogin: user.isLogin, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Providers;
