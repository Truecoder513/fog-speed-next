"use client";
import { useAuth } from "@/context/authContext";
import { withAuth } from "@/hocs/withAuth";
import React from "react";

const Dashboard = () => {
  const { user } = useAuth();
  return <div>{user.name}</div>;
};

export default withAuth(Dashboard);
