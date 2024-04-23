/* eslint-disable react/no-unescaped-entities */
"use client";
import axiosInstance from "@/axios.config";
import { useAuth } from "@/context/authContext";
import { withoutAuth } from "@/hocs/withoutAuth";
import { Spinner } from "@/uiKits/icon";
import {
  MaterialSymbolsVisibilityOffRounded,
  MaterialSymbolsVisibilityRounded,
} from "@/utils/front/icon";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";

const LoginPage = () => {
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { value, name } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const [errors, setErrors] = useState({
    password: "",
    email: "",
  });
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required("Mot de passe requis")
      .min(8, "Le mot de passe doit comporter au moins 8 caractères"),
    email: yup
      .string()
      .email("Adresse email invalide")
      .required("L'email est requis"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await validationSchema.validate(credentials, { abortEarly: false });
      const response = await axiosInstance.post("/login", credentials);
      if (response.data) {
        setLoading(false);
        login(response.data.token);
      }
    } catch (error) {
      setLoading(false);
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  return (
    <div className="appForm flex items-center justify-center  sm:p-2 sm:bg-cover">
      <div className="rounded-lg glassMorphism p-5 w-1/2 md:w-2/3 sm:!w-full">
        <div className="flex flex-col gap-1 items-center text-white">
          <p className="text-3xl font-extrabold text-center sm:text-2xl">
            FOG club otaku speed Dating
          </p>
        </div>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="text-white"
        >
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            className="w-full bg-transparent rounded-lg px-2 py-1 mt-1 mb-3 font-thin"
            placeholder="Email"
            value={credentials.name}
            onChange={(e) => handleInput(e)}
          />
          {errors.email && (
            <div className="text-red-500 text-sm -mt-3">{errors.email}</div>
          )}

          <label htmlFor="password" className="mb-5">
            Mot de passe
          </label>
          <div className="border border-white rounded-lg p-0 flex items-center mb-3">
            <input
              type={type}
              name={"password"}
              className="w-full bg-transparent  px-2 py-1   font-thin border-none"
              placeholder={"Mot de passe"}
              value={credentials.password}
              onChange={(e) => handleInput(e)}
            />
            <span
              className="pr-2 cursor-pointer"
              onClick={() => setType(type === "password" ? "text" : "password")}
            >
              {type == "text" ? (
                <MaterialSymbolsVisibilityRounded />
              ) : (
                <MaterialSymbolsVisibilityOffRounded />
              )}
            </span>
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm -mt-3 mb-2">
              {errors.password}
            </div>
          )}
          <button
            disabled={loading}
            type="submit"
            className=" text-white flex justify-center w-full  bg-blue-700 p-2 rounded-md"
          >
            {loading ? <Spinner /> : "S'inscrire"}
          </button>
        </form>
        <p className="text-sm text-center mt-5 text-white">
          Vous n'avez pas de compte?{" "}
          <Link href={"/subscribe"} className="underline">
            Se connecter
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default withoutAuth(LoginPage);
