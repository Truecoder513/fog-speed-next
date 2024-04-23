/* eslint-disable react/display-name */
"use client";

import LoveLoader from "@/components/LoveLoader";
import { useAuth } from "../context/authContext";
import { redirect } from "next/navigation";

export const withoutAuth = (WrappedComponent) => {
  return (props) => {
    const { user, userLoading, ageValid } = useAuth();

    if (userLoading) return <LoveLoader />;
    if (!ageValid) return redirect("/verifyAge");
    if (user) {
      return redirect("/dashboard");
    }

    return <WrappedComponent {...props} />;
  };
};
