/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { ageValid } = useAuth();

  useEffect(() => {
    redirect("/subscribe");
  }, [ageValid]);

  return <main></main>;
}
