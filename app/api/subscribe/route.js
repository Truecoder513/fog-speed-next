import connectDB from "@/utils/back/database";
import User from "@/models/UserModels";
import { mailSetter } from "@/utils/back/mail/mailer.js";
import {
  adminNotificationMail,
  registrationSuccessMail,
} from "@/utils/back/mail/template";
import { NextResponse } from "next/server";

exports.createNewSondageRow = async (req) => {
  const body = await req.json();
  await connectDB();
  try {
    const { sondageChoice, name, email, whatsappNumber } = body;
    const existingSondage = await User.findOne({
      $or: [{ name }, { email }, { whatsappNumber }],
    });
    if (existingSondage) {
      return NextResponse.json(
        { message: "Email ou surnon déjà utilisé" },
        { status: 400 }
      );
    }

    const newUser = new User({
      sondageChoice,
      name,
      email,
      whatsappNumber,
    });
    const userdata = {
      sondageChoice,
      name,
      email,
    };
    await newUser.save();
    mailSetter(registrationSuccessMail(), email);
    mailSetter(adminNotificationMail(userdata), [
      "truecoder513@gmail.com",
      "fresnelaglossi@gmail.com",
    ]);
    NextResponse.json(
      {
        message:
          "Inscription éffectué nous vous souhaitons bonne chance pour avoir match",
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
};
