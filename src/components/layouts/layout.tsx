import CookieConsent from "../banners/CookieConsent";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export default function Layout({ children }: Props) {
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(false);
  useEffect(() => {
    setShowCookieConsent(!Cookies.get("cookieConsent") ? true : false);
  }, []);

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
