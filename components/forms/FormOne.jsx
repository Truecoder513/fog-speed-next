/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import * as Yup from "yup";

const FormOne = ({
  credentials,
  handleInput,
  handleInputNumber,
  handleChoice,
  setStep,
}) => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    sondageChoice: "",
    whatsappNumber: "",
  });
  const sondageChoice = [
    "Touver vôtre moitié",
    "Un rdv et laissé le reste à cupidon",
    "Des câlins récurrents sans pépins",
    "Un coup du soir",
  ];
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le surnom est requis"),
    whatsappNumber: Yup.string().required("Le numéro est requis"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est requis"),
    sondageChoice: Yup.string().required("Veuillez sélectionner un choix"),
  });

  const handleSubmitUn = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(credentials, { abortEarly: false });
      setStep(2);
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <form action="" onSubmit={(e) => handleSubmitUn(e)}>
      <div className="mt-5 text-white">
        <label htmlFor="name">Surnom </label>
        <input
          type="text"
          name="name"
          className="w-full bg-transparent rounded-lg px-2 py-1 mt-1 mb-3 font-thin"
          placeholder="Veuillez fournir un surnom"
          value={credentials.name}
          onChange={(e) => handleInput(e)}
        />
        {errors.name && (
          <div className="text-red-500 text-sm -mt-3">{errors.name}</div>
        )}
        <label htmlFor="whatsappNumber">
          Numero Whatsapp
          <span className="font-thin text-sm">
            {" "}
            (Pour être contacter par d'autres utilsateur rechant la même chose
            que vous)
          </span>
        </label>

        <div className="w-full bg-transparent inputBorder rounded-lg px-2 py-1 mt-1 mb-3 font-thin">
          <PhoneInput
            placeholder="Enter phone number"
            value={credentials.whatsappNumber}
            onChange={(e) => handleInputNumber(e)}
            name="whatsappNumber"
            defaultCountry="BJ"
          />
        </div>
        {errors.whatsappNumber && (
          <div className="text-red-500 text-sm -mt-3">
            {errors.whatsappNumber}
          </div>
        )}
        <label htmlFor="name">
          Mail{" "}
          <span className="font-thin text-sm">
            (pour recevoir des notifications)
          </span>
        </label>
        <input
          type="text"
          name="email"
          className="w-full bg-transparent rounded-lg px-2 py-1 mt-1 font-thin"
          placeholder="Veuillez fournir un email"
          value={credentials.email}
          onChange={(e) => handleInput(e)}
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <p className="mt-3 mb-3">Quel type de relation recherchez-vous ?</p>
        {sondageChoice.map((item, index) => (
          <div
            key={index}
            className={`mt-2 mb-2 p-1 font-thin cursor-pointer border transition-all ${
              credentials.sondageChoice === item
                ? "border-green-500 text-green-500"
                : "border-white font-bold"
            } `}
            onClick={() => handleChoice(item)}
          >
            {item}
          </div>
        ))}
        {errors.sondageChoice && (
          <div className="text-red-500 text-sm -mt-1">
            {errors.sondageChoice}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 text-white flex justify-center w-full bg-blue-700 p-2 rounded-md"
      >
        {"Suivant"}
      </button>
    </form>
  );
};

export default FormOne;
