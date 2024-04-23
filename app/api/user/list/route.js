import { NextResponse } from "next/server";
import User from "@/models/UserModels";
import connectDB from "@/utils/back/database";

export const GET = async (req) => {
  await connectDB();
  const category = req.nextUrl.searchParams.get("category");
  const id = req.nextUrl.searchParams.get("id");

  try {
    const users = await User.find(
      {
        sondageChoice: category,
        _id: { $ne: id },
      },
      "name img whatsappNumber"
    );
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { type: "operation", result: "invalid" },
      { status: 401 }
    );
  }
};
