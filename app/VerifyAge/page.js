/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CorrectAgeConfirm from "@/components/Modal/components/CorrectAgeConfirm";
import LeaveSiteConfirm from "@/components/Modal/components/LeaveSiteConfirm";
import { withoutAuth } from "@/hocs/withoutAuth";

import React, { useEffect, useState } from "react";
import { useModal } from "@/context/modalContext";
import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";

const VerifyAgePage = () => {
  const { showModal } = useModal();
  const { makeAgeValid, ageValid } = useAuth();
  const [loading, setLoading] = useState(ageValid ? true : false);

  useEffect(() => {
    if (ageValid) redirect("/subscribe");
  }, [ageValid]);

  return !loading ? (
    <div>.....</div>
  ) : (
    <div className="h-screen w-screen bg-black flex items-center justify-center fixed">
      <div className="w-1/2 bg-white rounded-lg p-10  sm:p-3 sm:w-10/12">
        <p className="text-center font-extrabold">
          Ce site est réservé à un public averti. Avant de pouvoir continuer,
          vous devez confirmer avoir au moins 18 ans.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <button
            className="bg-blue-700 text-white rounded-sm p-2"
            onClick={() =>
              showModal(
                <CorrectAgeConfirm makeAgeValid={() => makeAgeValid()} />
              )
            }
          >
            J'ai au moins 18 ans (Continuer)
          </button>
          <button
            className="bg-black text-white rounded-sm p-2"
            onClick={() => showModal(<LeaveSiteConfirm />)}
          >
            Je n'ai pas l'âge requis. (Quitter le site)
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAgePage;
