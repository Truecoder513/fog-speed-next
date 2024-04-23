/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { withoutAuth } from "@/hocs/withoutAuth";
import FormOne from "@/components/forms/FormOne";
import FormTwo from "@/components/forms/FormTwo";
import Link from "next/link";

const SubscribePage = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    sondageChoice: "",
    password: "",
    confirmPassword: "",
    img: null,
  });

  const handleUploadImg = (e) => {
    setCredentials((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  const [step, setStep] = useState(1);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputNumber = (e) => {
    setCredentials((prev) => ({ ...prev, whatsappNumber: e }));
  };

  const handleChoice = (choice) => {
    setCredentials((prev) => ({ ...prev, sondageChoice: choice }));
  };

  return (
    <div className="appForm flex items-center justify-center  sm:p-2 sm:bg-cover">
      <div className="rounded-lg glassMorphism p-5 w-1/2 md:w-2/3 sm:!w-full">
        <div className="flex flex-col gap-1 items-center text-white">
          <p className="text-3xl font-extrabold text-center sm:text-2xl">
            FOG club otaku speed Dating
          </p>
          <p className="font-thin text-center sm:text-sm">
            Les informations reçues ne seront divulguées à personne.
          </p>
        </div>

        {step === 1 ? (
          <FormOne
            credentials={credentials}
            handleInput={handleInput}
            handleInputNumber={handleInputNumber}
            handleChoice={handleChoice}
            setStep={setStep}
          />
        ) : (
          <FormTwo
            credentials={credentials}
            handleInput={handleInput}
            handleUploadImg={handleUploadImg}
            setStep={setStep}
          />
        )}
        <p className="text-sm text-center mt-5 text-white">
          Vous avez déjà un compte?{" "}
          <Link href={"/login"} className="underline">
            Se connecter
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default withoutAuth(SubscribePage);
