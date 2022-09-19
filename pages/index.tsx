import { useState, useEffect } from "react";

import {
  WIN_MESSAGES,
  CORRECT_SONG_MESSAGE,
  GAME_COPIED_MESSAGE,
} from "../src/constants/strings";
import {
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
  // WELCOME_INFO_MODAL_MS,
} from "../src/constants/settings";

import { addStatsForCompletedGame, loadStats } from "../src/lib/stats";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
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

type Props = {
  showHome?: boolean;
};

function App({ showHome = true }: Props) {
  if (!getUUID()) {
    setUUID();
  }

  let prefersDarkMode = true;
  let prefersReducedMotion = true;

  useEffect(() => {
    prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

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
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
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
    <div className="absolute inset-0 flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsHowToPlayModalOpen={setIsHowToPlayModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        shouldHideStatsModalButton={showHome}
      />
      <div className="pt-2 px-2 pb-2 md:pb-8 w-full max-w-[800px] mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <Artists />

        {InfoModal({
          isOpen: isInfoModalOpen,
          handleClose: () => setIsInfoModalOpen(false),
        })}

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
  );
}

export default App;
