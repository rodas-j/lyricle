import Countdown from "react-countdown";
import { StatBar } from "../stats/StatBar";
import { Histogram } from "../stats/Histogram";
import { GameStats } from "../../lib/localStorage";
import { shareStatus } from "../../lib/share";
import { tomorrow } from "../../lib/songs";
import { BaseModal } from "./BaseModal";

import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_SONG_TEXT,
  SHARE_TEXT,
} from "../../constants/strings";
import { Solution } from "../../../pages/[name]";
import React, { useEffect } from "react";
import { useGa } from "../../context/GAContext";
import { SongWidget } from "../songwidget/SongWidget";
import { useAlert } from "../../context/AlertContext";

type Props = {
  solution: Solution;
  artist: string;
  isHomePage: boolean;
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  gameStats: GameStats;
  isGameLost: boolean;
  isGameWon: boolean;
  handleShareToClipboard: () => void;
  isDarkMode: boolean;
  isHighContrastMode: boolean;
  numberOfGuessesMade: number;
};

export const StatsModal = ({
  solution,
  isHomePage,
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
  artist,
}: Props) => {
  const { showSuccess: showSuccessAlert } = useAlert();
  const ga = useGa();
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
  const [isCopiedToClipboard, setIsCopiedToClipboard] = React.useState(false);
  useEffect(() => {
    if (isCopiedToClipboard) {
      setTimeout(() => {
        setIsCopiedToClipboard(false);
      }, 2000);
    }
  });

  if (isHomePage) return <></>;

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    );
  }

  let songSolution = `${solution.artist} ─ ${solution.title}`;

  return (
    <>
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <SongWidget
          isOpen={isOpen && (isGameWon || isGameLost)}
          solution={solution}
          variant={isGameWon ? "success" : "error"}
        />
        <StatBar gameStats={gameStats} />
        <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          {GUESS_DISTRIBUTION_TEXT}
        </h4>
        <Histogram
          gameStats={gameStats}
          numberOfGuessesMade={numberOfGuessesMade}
        />

        {(isGameLost || isGameWon) && (
          <>
            <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
              <div>
                <h5>{NEW_SONG_TEXT}</h5>
                <Countdown
                  className="text-lg font-medium text-gray-900 dark:text-gray-100"
                  date={tomorrow}
                  daysInHours={true}
                />
              </div>
              <button
                type="button"
                className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={() => {
                  setIsCopiedToClipboard(true);
                  shareStatus(
                    guesses,
                    isDarkMode,
                    isHighContrastMode,
                    handleShareToClipboard,
                    songSolution,
                    artist
                  );
                  sendEvent("share", "social", 1, "share button clicked");
                }}
              >
                {SHARE_TEXT} {isCopiedToClipboard && "✅"}
              </button>
            </div>
            <div className="mt-2">
              <a
                href="https://forms.gle/C8EoeJQ2vzArGVnb7"
                className="cursor-pointer"
              >
                <p className="text-black underline text-sm dark:text-white">
                  📨 Wanna Improve Lyricle?
                </p>
              </a>
            </div>
          </>
        )}
      </BaseModal>
    </>
  );
};
