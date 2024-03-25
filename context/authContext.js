"use client";
import axiosInstance from "@/axios.config";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

function getConnectedUser(successCb, erroCb, finalyCb) {
  return axiosInstance
    .get("user")
    .then((res) => successCb(res.data))
    .catch((err) => erroCb())
    .finally(() => finalyCb());
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(Cookies.get("user-token"));
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();
  const [refetchUser, setRefetchUser] = useState(false);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (userToken) {
      if (!axiosInstance.defaults.headers["Authorization"]) {
        axiosInstance.defaults.headers = {
          authorization: "Bearer " + userToken,
        };
      }
      getConnectedUser(
        (userData) => {
          setUser(userData);
          setUserLoading(false);
        },
        () => {
          logout();
        },
        () => {}
      );
    } else {
      setUserLoading(false);
    }
  }, [userToken, refetchUser]);

  const login = (token) => {
    setUserLoading(true);
    setUserToken(token);
    Cookies.set("user-token", token);
  };

  const updateLogin = (token) => {
    Cookies.set("user-token", token);
    axiosInstance.defaults.headers = {
      Authorization: "Bearer " + token,
    };
    refetchUserLoggedData();
  };

  const refetchUserLoggedData = () => {
    setRefetchUser((prev) => !prev);
  };

  const logout = () => {
    console.log("lougout");
    setUserLoading(true);
    // router.push('/auth/login')
    setUser(null);
    setUserToken(null);
    Cookies.remove("user-token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        login,
        updateLogin,
        logout,
        refetchUserLoggedData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
