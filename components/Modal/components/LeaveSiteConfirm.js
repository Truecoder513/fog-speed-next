import { useModal } from "@/context/modalContext";
import React from "react";

const LeaveSiteConfirm = () => {
  const { hideModal } = useModal();
  return (
    <div className="bg-white rounded-lg p-10">
      <p className="mb-5">Vous êtes sur le point de partir.</p>
      <div
        className="flex
    "
      >
        <div className="flex gap-2 ml-auto">
          <button className="text-red-700" onClick={() => hideModal()}>
            Annuler
          </button>
          <a
            href="https://www.google.com"
            className="bg-blue-500 text-white p-2 rounded-sm"
          >
            Continuer
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeaveSiteConfirm;
