/* eslint-disable react/display-name */
"use client";

import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, userLoading } = useAuth();

    // const router = useRouter();

    if (userLoading) return "chargement";

    if (!user) {
      return redirect("/");
      // return;
    }

    return <WrappedComponent {...props} user={user} />;
  };
};
