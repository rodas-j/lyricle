import { useState, useEffect } from "react";
import Head from "next/head";
import { GAME_TITLE } from "../src/constants/strings";
import {
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
  getUUID,
  setUUID,
} from "../src/lib/localStorage";

import { AlertContainer } from "../src/components/alerts/AlertContainer";
import { Navbar } from "../src/components/navbar/Navbar";
import { useAlert } from "../src/context/AlertContext";
import Artists from "../src/components/links/Artists";
import { InfoModal } from "../src/components/modals/InfoModal";
import { HowToPlayModal } from "../src/components/modals/HowToPlayModal";
import { SettingsModal } from "../src/components/modals/SettingsModal";
import React from "react";
import { WELCOME_INFO_MODAL_MS } from "../src/constants/settings";
import { JoinOurCommunities } from "../src/components/banners/Community";

type Props = {
  showHome?: boolean;
};

function App({ showHome = true }: Props) {
  let prefersDarkMode = true;
  let prefersReducedMotion = true;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();

  const [isDarkMode, setIsDarkMode] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("theme")
        ? localStorage.getItem("theme") === "dark"
        : prefersDarkMode
        ? true
        : false
      : false
  );
  const [isReducedMotionMode, setIsReducedMotionMode] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("reducedMotion")
        ? localStorage.getItem("reducedMotion") === "reduce"
        : prefersReducedMotion
        ? true
        : false
      : false
  );
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  );

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast);
    setStoredIsHighContrastMode(isHighContrast);
  };

  const handleReducedMotionMode = (isReducedMotion: boolean) => {
    setIsReducedMotionMode(isReducedMotion);
    localStorage.setItem(
      "reducedMotion",
      isReducedMotion ? "reduce" : "no-preference"
    );
  };
  useEffect(() => {
    if (!getUUID()) {
      setTimeout(() => {
        setIsHowToPlayModalOpen(true);
        setUUID();
      }, WELCOME_INFO_MODAL_MS);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }

    if (isReducedMotionMode) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
  }, [isDarkMode, isHighContrastMode, isReducedMotionMode]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="game, lyric guessing, music, lyricle" />
        <meta
          name="description"
          content="Guess the Artist's Song from Their Lyrics."
        />
        <meta property="og:title" content={GAME_TITLE} />
        <title>{GAME_TITLE}</title>
      </Head>
      <div className="absolute inset-0 flex flex-col">
        <Navbar
          gameTitle={GAME_TITLE}
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsHowToPlayModalOpen={setIsHowToPlayModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
          shouldHideStatsModalButton={showHome}
        />
        <div className="pt-2 px-2 pb-2 md:pb-8 w-full max-w-[800px] mx-auto sm:px-6 lg:px-8 flex flex-col grow">
          <JoinOurCommunities />
          <Artists />

          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <HowToPlayModal
            isOpen={isHowToPlayModalOpen}
            handleClose={() => setIsHowToPlayModalOpen(false)}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isHighContrastMode={isHighContrastMode}
            handleHighContrastMode={handleHighContrastMode}
            isReducedMotionMode={isReducedMotionMode}
            handleReducedMotionMode={handleReducedMotionMode}
          />

          <AlertContainer />
        </div>
      </div>
    </>
  );
}

export default App;
