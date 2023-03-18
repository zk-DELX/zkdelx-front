import { randomBytes } from "crypto";

export default function generateRandomString(length) {
  return randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .substr(0, length);
}
