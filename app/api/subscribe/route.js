import User from "@/models/UserModels";
import { mailSetter } from "@/utils/back/mail/mailer.js";
import {
  adminNotificationMail,
  registrationSuccessMail,
} from "@/utils/back/mail/template";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import connectDB from "@/utils/back/database";

import { put } from "@vercel/blob";

export const runtime = { runtime: "edge" };

async function upload(img) {
  const blob = await put(img.name, img, { access: "public" });
  return blob;
}
export async function POST(req) {
  const formData = await req.formData();
  await connectDB();
  try {
    const sondageChoice = formData.get("sondageChoice");
    const name = formData.get("name");
    const email = formData.get("email");
    const whatsappNumber = formData.get("whatsappNumber");
    const img = formData.get("img");
    const password = formData.get("password");

    const existingUser = await User.findOne({
      $or: [{ name }, { email }, { whatsappNumber }],
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email, surnon ou numéro déjà utilisé" },
        { status: 400 }
      );
    }
    if (!img) {
      return NextResponse.json(
        { error: "Pas de photo reçu." },
        { status: 400 }
      );
    }
    const blob = await upload(img);
    const hashPass = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      sondageChoice,
      name,
      email,
      whatsappNumber,
      img: blob,
      password: hashPass,
    });

    mailSetter(registrationSuccessMail(), email);
    mailSetter(
      adminNotificationMail({ name, email }),
      "truecoder513@gmail.com"
    );
    return NextResponse.json(
      {
        message:
          "Inscription éffectué nous vous souhaitons bonne chance pour avoir un match",
      },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json(
      {
        message: "Erreur lors de l'inscription",
      },
      { status: 500 }
    );
  }
}
