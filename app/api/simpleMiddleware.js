import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import DB_CONNEXION from "@/utils/back/database";
import { getJwtSecret } from "@/utils/back/jwt";

// This function can be marked `async` if using `await` inside
export function simpleMiddleware(handler, role = null) {
  return async (request) => {
    await DB_CONNEXION();
    let authAuthHeader = request.headers.has("authorization");
    if (authAuthHeader) {
      const authHeadersSplit = request.headers
        .get("authorization")
        .split("Bearer ");
      const authorization = authHeadersSplit[1];

      const decoded = jwt.verify(authorization, getJwtSecret());
      request.userConnectedId = decoded.userId;

      // console.log(decoded);

      return handler(request);
    }
    // console.log(request.headers.get('authorization'));
    return NextResponse.json(
      { type: "operation", result: "invalid" },
      { status: 400 }
    );
  };
}
