import { useModal } from "@/context/modalContext";
import React from "react";

const CorrectAgeConfirm = ({ makeAgeValid }) => {
  const { hideModal } = useModal();
  return (
    <div className="bg-white rounded-lg p-10">
      <p className="mb-5">Êtes-vous sûr de vouloir avancer ?</p>
      <div
        className="flex
    "
      >
        <div className="flex gap-2 ml-auto">
          <button className="text-red-700" onClick={() => hideModal()}>
            Annuler
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-sm"
            onClick={() => makeAgeValid()}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorrectAgeConfirm;
