import Cookies from "js-cookie";

export const setInterview = (res: string) => {
  Cookies.set("interview", res, { expires: 30 });
};

export const getInterview = () => {
  const interview = Cookies.get("interview");
  return interview ? interview : null;
};
