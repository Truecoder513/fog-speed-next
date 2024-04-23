import * as jose from "jose";
export function getJwtSecret() {

    const secret = new TextEncoder().encode(process.env.jwtSecret);
    return secret;
}