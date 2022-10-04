import CookieConsent from "../banners/CookieConsent";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import Script from "next/script";
import { GaProvider } from "../../context/GAContext";

function throwIfSSR() {
  throw new Error("Using GA during SSR is not allowed");
}

function gaHandler(actionType: string, hitType: string, eventProps: any) {
  console.log(actionType, hitType, eventProps);
  if ("gtag" in window) {
    (window as any).gtag(actionType, hitType, eventProps);
  }
}
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export default function Layout({ children }: Props) {
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(false);
  const ga = typeof window === "undefined" ? throwIfSSR : gaHandler;
  const sendEvent = (
    hitType: string,
    eventCategory: string,
    eventValue: number,
    eventLabel: string
  ) => {
    const event = {
      event_category: eventCategory,
      event_label: eventLabel,
      event_value: eventValue,
    };
    ga("event", hitType, event);
  };
  useEffect(() => {
    setShowCookieConsent(!Cookies.get("cookieConsent") ? true : false);
  }, []);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-69K8HLVWRE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-69K8HLVWRE');`}
      </Script>
      <GaProvider value={{ ga, sendEvent }}>{children}</GaProvider>

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
