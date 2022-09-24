import CookieConsent from "../banners/CookieConsent";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import Script from "next/script";

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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-B55DZ451GN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B55DZ451GN');`}
      </Script>

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
