/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import CorrectAgeConfirm from "@/components/Modal/components/CorrectAgeConfirm";
import LeaveSiteConfirm from "@/components/Modal/components/LeaveSiteConfirm";
import { useModal } from "@/context/modalContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { showModal } = useModal();
  const [ageValid, setAgeValid] = useState(
    localStorage.getItem("ageValid") ? localStorage.getItem("ageValid") : null
  );
  const makeAgeValid = () => {
    localStorage.setItem("ageValid", "ageValid");
    toast.success("Age confirmé");
    router.push("/subscribe");
  };

  useEffect(() => {
    if (ageValid) {
      router.push("/subscribe");
    }
  }, [ageValid]);

  return (
    <main>
      {!ageValid && (
        <div className="h-screen w-screen bg-black flex items-center justify-center fixed">
          <div className="w-1/2 bg-white rounded-lg p-10  sm:p-3 sm:w-10/12">
            <p className="text-center font-extrabold">
              Ce sondage est réservé à un public averti. Avant de pouvoir
              continuer, vous devez confirmer avoir au moins 18 ans.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <button
                className="bg-blue-700 text-white rounded-sm p-2"
                onClick={() =>
                  showModal(<CorrectAgeConfirm makeAgeValid={makeAgeValid} />)
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
      )}
    </main>
  );
}
