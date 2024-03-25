"use client";
import { useModal } from "@/context/modalContext";
import React from "react";

const ModalContainer = () => {
  const { modalVisible, modalContent } = useModal();

  if (!modalVisible) return null;
  return (
    <div
      className={
        "bg-tranparentBlack flex h-screen w-screen fixed  items-center justify-center"
      }
    >
      {modalContent}
    </div>
  );
};

export default ModalContainer;
