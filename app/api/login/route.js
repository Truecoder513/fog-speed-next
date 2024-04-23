import User from "@/models/UserModels";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import connectDB from "@/utils/back/database";
import { SignJWT } from "jose";
import { getJwtSecret } from "@/utils/back/jwt";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;
  await connectDB();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id) {
      const comparePwds = await bcrypt.compare(password, existingUser.password);
      if (comparePwds) {
        const token = await new SignJWT({
          userId: existingUser._id,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .sign(getJwtSecret());
        return NextResponse.json(
          {
            token,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { messaye: "Mot de passe incorrect" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "Utilisateur inconnu",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    NextResponse.json(
      {
        message: "Erreur lors de la connexion",
      },
      { status: 500 }
    );
  }
}
