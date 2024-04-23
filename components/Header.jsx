"use client";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center p-3 justify-between shadow sm:flex-col gap-3">
      <div className="flex items-center gap-3 w-full">
        <Image
          src={user.img.url}
          alt="user photo"
          width={30}
          height={30}
          className="rounded-full !w-12 !h-12"
        />
        <div>
          <p className="font-thin text-sm">{user.name}</p>
          <p className="text-sm font-light">{user.email}</p>
        </div>
      </div>
      <button
        onClick={() => logout()}
        className="p-2 px-4 rounded-md bg-blue-500 text-white text-xs sm:w-full"
      >
        Déconnection
      </button>
    </div>
  );
};

export default Header;
