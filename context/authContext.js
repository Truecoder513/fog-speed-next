"use client";
import axiosInstance from "@/axios.config";
import { lsGet, lsSet } from "@/utils/front/storage";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

function getConnectedUser(successCb, erroCb, finalyCb) {
  return axiosInstance
    .get("user")
    .then((res) => successCb(res.data))
    .catch((err) => erroCb())
    .finally(() => finalyCb());
}

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(Cookies.get("user-token"));
  const [userLoading, setUserLoading] = useState(true);
  const [refetchUser, setRefetchUser] = useState(false);
  const [userError, setUserError] = useState(null);
  const [ageValid, setAgeValid] = useState(lsGet() ? lsGet() : false);
  const makeAgeValid = () => {
    lsSet("ageValid", true);
    toast.success("Age confirmé");
    router.push("/subscribe");
  };

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
        ageValid,
        makeAgeValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
