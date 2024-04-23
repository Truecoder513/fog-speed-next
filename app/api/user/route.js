import { NextResponse } from "next/server";
import { simpleMiddleware } from "../simpleMiddleware";
import User from "@/models/UserModels";

export const GET = simpleMiddleware(async (req) => {
  const { userConnectedId } = req;
  try {
    const user = await User.findById(userConnectedId);
    if (!user)
      return NextResponse.json(
        { type: "operation", result: "invalid" },
        { status: 401 }
      );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: "operation", result: "invalid" },
      { status: 401 }
    );
  }
});
