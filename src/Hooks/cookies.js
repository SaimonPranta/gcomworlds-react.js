import Cookies from "js-cookie";
const setCookie = (cookieName, value) => {
  Cookies.set(cookieName, value, { expires: 3, path: "/" });
};
const getCookie = () => {
  return Cookies.get("gcom-user-token");
};

const removeCookie = () => {
  Cookies.remove("gcom-user-token");
};

export { setCookie, getCookie, removeCookie };
