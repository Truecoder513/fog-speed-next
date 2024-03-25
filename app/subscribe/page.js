/* eslint-disable react/no-unescaped-entities */
"use client";
import { Spinner } from "@/uiKits/icon";
import axiosInstance from "@/axios.config";
import React, { useState } from "react";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";

const SubscribePage = () => {
  const sondageChoice = [
    "Touver vôtre moitié",
    "Un rdv et laissé le reste à cupidon",
    "Des câlins récurrents sans pépins",
    "Un coup du soir",
  ];
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    sondageChoice: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    sondageChoice: "",
    whatsappNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputNumber = (e) => {
    setCredentials((prev) => ({ ...prev, whatsappNumber: e }));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le surnom est requis"),
    whatsappNumber: Yup.string().required("Le numéro est requis"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est requis"),
    sondageChoice: Yup.string().required("Veuillez sélectionner un choix"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await validationSchema.validate(credentials, { abortEarly: false });
      const response = await axiosInstance.post("/subscribe", credentials);
      if (response.data) {
        setLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error.name === "AxiosError") {
        toast.error(error.response.data.message);
      } else {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChoice = (choice) => {
    setCredentials((prev) => ({ ...prev, sondageChoice: choice }));
  };

  return (
    <div className="appForm flex items-center justify-center  sm:p-2 sm:bg-cover">
      <form
        action=""
        className="rounded-lg glassMorphism p-5 w-1/2 md:w-2/3 sm:!w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-1 items-center text-white">
          <p className="text-3xl font-extrabold text-center sm:text-2xl">
            FOG club otaku speed Dating
          </p>
          <p className="font-thin text-center sm:text-sm">
            Les informations reçues ne seront divulguées à personne, sauf aux
            administrateurs du groupe.
          </p>
        </div>
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
            <div className="text-red-500 text-sm -mt-4">{errors.name}</div>
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
            <div className="text-red-500 text-sm -mt-4">
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
            <div className="text-red-500 text-sm">{errors.sondageChoice}</div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 text-white flex justify-center w-full bg-blue-700 p-2 rounded-md"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Soumettre"}
        </button>
      </form>
    </div>
  );
};

export default SubscribePage;
