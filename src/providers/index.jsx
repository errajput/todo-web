"use client";

import { getProfile, isUserLogin } from "@/services/api";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({ isLogin: false });

const Providers = ({ children }) => {
  const [user, setUser] = useState({ isLogin: false });

  useEffect(() => {
    const isLogin = isUserLogin();

    if (isLogin) {
      getProfile()
        .then((profile) => {
          setUser({ isLogin: true });
        })
        .catch((err) => {
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
