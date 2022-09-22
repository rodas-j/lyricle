import CookieConsent from "../banners/CookieConsent";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
export default function Layout({ children }) {
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(false);
  useEffect(() => {
    console.log(Cookies.get("cookieConsent"));
    setShowCookieConsent(!Cookies.get("cookieConsent") ? true : false);
  }, []);

  console.log("showCookieConsent", showCookieConsent);

  return (
    <>
      {children}

      {showCookieConsent ? (
        <CookieConsent
          onAccept={() => {
            Cookies.set("cookieConsent", "true");
            setShowCookieConsent(false);
          }}
        />
      ) : null}
    </>
  );
}
