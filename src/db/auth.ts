
import {Brand} from "utils/common"
import {nanoid} from 'nanoid';

const second = 1000;
const PASSWORD_LIVING_TIME = 24 * 60 * 60 * second

const brand_username = Symbol();
export type UserName = Brand<typeof brand_username, string>;
export const createUserName = (name: string): null | UserName => {
  if (/^[a-zA-Z0-9_\-]+$/.test(name)) return name as UserName;
  return null;
}

type ShortLivedPassword = string
const db: Record<string, null | [Date, ShortLivedPassword]> = {};

type AuthToken = string;
export type AuthTokenPayload = {
  username: UserName;
  password: ShortLivedPassword;
}
export const decodeAuthToken = (token?: AuthToken): null | AuthTokenPayload => {
  const [user, password] = (token || '').split('@');
  const username = createUserName(user);
  return username && {username, password};
}
const encodeAuthToken = (payload: AuthTokenPayload): AuthToken => {
  const {username, password} = payload;
  return username + '@' + password;
}

export const login = (username: UserName): null | AuthToken => {
  const current_time = new Date();
  const existing_user = db[username];
  if (existing_user) {
    const [expired_at] = existing_user;
    if (current_time < expired_at) return null;
  };
  const expired_at = new Date(+current_time + PASSWORD_LIVING_TIME)
  const password = nanoid();
  db[username] = [expired_at, password];
  return encodeAuthToken({username, password})
}

export const checkAuth = (payload: AuthTokenPayload): boolean => {
  const {username, password} = payload;
  const user = db[username];
  if (!user) return false;
  const [expired_at, saved_password] = user;
  const current_time = new Date();
  return current_time < expired_at && password === saved_password;
}

export const logout = (payload: AuthTokenPayload): boolean => {
  if (checkAuth(payload)) {
    const {username} = payload;
    delete db[username];
    return true;
  }
  return false
}
