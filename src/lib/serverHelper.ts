import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/lib/keys";

export const setAccessTokenCookie = (accessToken: string) => {
  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    expires: 7, // 7 days
    sameSite: "strict",
  });
};

export const getAccessTokenCookie = (): string | undefined => {
  return Cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
};

export const clearAccessTokenCookie = () => {
  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
};
