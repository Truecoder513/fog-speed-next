/* eslint-disable react/no-unescaped-entities */
"use client";
import * as yup from "yup";
import {
  MaterialSymbolsVisibilityOffRounded,
  MaterialSymbolsVisibilityRounded,
} from "@/utils/front/icon";
import React, { Fragment, useState } from "react";
import { Spinner } from "@/uiKits/icon";
import axiosInstance from "@/axios.config";
import { toast } from "sonner";

const FILE_SIZE_LIMIT_MB = 5;
const SUPPORTED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/heic",
];
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Mot de passe requis")
    .min(8, "Le mot de passe doit comporter au moins 8 caractères"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("Confirmation du mot de passe requise"),
  img: yup
    .mixed()
    .required("Image requise")
    .test(
      "fileType",
      "Format d'image non pris en charge. Utilisez seulement jpeg, png gif, heic",
      (value) => value && SUPPORTED_IMAGE_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      `L'image doit être inférieure à ${FILE_SIZE_LIMIT_MB} MB`,
      (value) => value && value.size / (1024 * 1024) <= FILE_SIZE_LIMIT_MB
    ),
});

const FormTwo = ({ credentials, handleInput, handleUploadImg, setStep }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("whatsappNumber", credentials.whatsappNumber);
    formData.append("sondageChoice", credentials.sondageChoice);
    formData.append("img", credentials.img);
    formData.append("password", credentials.password);
    try {
      await validationSchema.validate(credentials, { abortEarly: false });
      const response = await axiosInstance.post("/subscribe", formData);
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
  const [type, setType] = useState("password");
  return (
    <div>
      <form action="" className="text-white" onSubmit={(e) => handleSubmit(e)}>
        {inputs.map((item, i) => (
          <Fragment key={i}>
            <label htmlFor="name" className="mb-5">
              {item.label}
            </label>
            <div className="border border-white rounded-lg p-0 flex items-center mb-3">
              <input
                type={type}
                name={item.name}
                className="w-full bg-transparent  px-2 py-1   font-thin border-none"
                placeholder={item.placeholder}
                value={credentials[item.name]}
                onChange={(e) => handleInput(e)}
              />
              <span
                className="pr-2 cursor-pointer"
                onClick={() =>
                  setType(type === "password" ? "text" : "password")
                }
              >
                {type == "text" ? (
                  <MaterialSymbolsVisibilityRounded />
                ) : (
                  <MaterialSymbolsVisibilityOffRounded />
                )}
              </span>
            </div>
            {errors[item.name] && (
              <div className="text-red-500 text-sm -mt-3 mb-2">
                {errors[item.name]}
              </div>
            )}
          </Fragment>
        ))}
        <label className="mt-5">Uploader une photo de vous</label>

        <div className="docFileField">
          <section>
            <input
              type="file"
              name={"img"}
              id={"img"}
              onChange={(e) => handleUploadImg(e)}
              accept="image/jpeg image/png image/gif image/heic image/jpg"
            />
            <label
              htmlFor={"img"}
              className={credentials.name ? "fileSelected" : ""}
            >
              <span className="text-xs">Choisir un fichier</span>
              {credentials.img && <p>{credentials.img.name} </p>}
            </label>
          </section>
        </div>
        {errors.img && <div className="text-red-500 text-sm">{errors.img}</div>}

        <div className="flex mt-4">
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setStep(1)}
              disabled={loading}
              className="bg-white text-black rounded-md p-2"
            >
              Précédent
            </button>
            <button
              disabled={loading}
              type="submit"
              className=" text-white flex justify-center  bg-blue-700 p-2 rounded-md"
            >
              {loading ? <Spinner /> : "S'inscrire"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormTwo;

const inputs = [
  {
    label: "Mot de passe",
    name: "password",
    type: "password",
    placeholder: "Mot de passe",
  },
  {
    label: "Confirmez le mot de passe",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirmez le mot de passe",
  },
];
