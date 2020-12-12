import { AuthTokenPayload } from "db/auth";
import { Request } from "./express";

export const useUserInfo = (req: Request): AuthTokenPayload => {
  const user = req.user;
  if (!user) throw new Error('getting user info from anauthorized route');
  return user;
}
