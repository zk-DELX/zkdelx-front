import { randomBytes } from "crypto";

export default function generateRandomString(length) {
  return randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .substr(0, length);
}
