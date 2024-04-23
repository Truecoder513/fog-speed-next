/* eslint-disable react/display-name */
"use client";

import { useAuth } from "../context/authContext";
import { redirect } from "next/navigation";

export const withoutAuth = (WrappedComponent) => {
  return (props) => {
    const { user, userLoading, ageValid } = useAuth();

    if (userLoading) return "......";
    if (!ageValid) return redirect("/verifyAge");
    if (user) {
      return redirect("/dashboard");
    }

    return <WrappedComponent {...props} />;
  };
};
