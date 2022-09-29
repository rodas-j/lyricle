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
  WIN_MESSAGES,
} from "../../constants/strings";
import { Solution } from "../../../pages/[name]";
import { SongWidget } from "../songwidget/SongWidget";
import React from "react";

type Props = {
  solution: Solution;

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

export const ResultsModal = ({
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
}: Props) => {
  if (isHomePage) return <></>;
  let songSolution = `${solution?.artist} ─ ${solution?.title}`;
  let guessesToBeMapped = [...guesses];
  const winMessage =
    WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
  guessesToBeMapped.length = 6;
  guessesToBeMapped.fill("empty", guesses.length, 6);
  return (
    <>
      <BaseModal title={"Results"} isOpen={isOpen} handleClose={handleClose}>
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          {" "}
          {isGameWon ? winMessage : "Better Luck Next Time!"}
        </h2>
        <SongWidget
          isOpen={isOpen && (isGameWon || isGameLost)}
          solution={solution}
          variant={isGameWon ? "success" : "error"}
        />
        <div className="mt-2">
          <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
            SHARE YOUR SCORE WITH FRIENDS
          </h4>
        </div>
        <div className="flex m-2 justify-center">
          {guessesToBeMapped.map((guess, index) => {
            if (guess === songSolution) {
              return (
                <div key={index} className="bg-emerald-500 w-8 h-2 mx-px"></div>
              );
            } else if (guess === "skip") {
              return (
                <div key={index} className="bg-gray-400 w-8 h-2 mx-px"></div>
              );
            } else if (guess === "empty") {
              return (
                <div key={index} className="bg-slate-700 w-8 h-2 mx-px"></div>
              );
            } else {
              return (
                <div key={index} className="bg-rose-500 w-8 h-2 mx-px"></div>
              );
            }
          })}
        </div>

        {(isGameLost || isGameWon) && (
          <>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                shareStatus(
                  guesses,
                  isDarkMode,
                  isHighContrastMode,
                  handleShareToClipboard,
                  songSolution,
                  "Artist"
                );
              }}
            >
              {SHARE_TEXT}
            </button>
            <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
              <div>
                <h5>{NEW_SONG_TEXT}</h5>
                <Countdown
                  className="text-lg font-medium text-gray-900 dark:text-gray-100"
                  date={tomorrow}
                  daysInHours={true}
                />
              </div>
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

// export default function ShareResults({
//     guesses,
//     isDarkMode,
//     isHighContrastMode,
//   }: Props) {
//     let guessesToBeMapped = [...guesses]
//     guessesToBeMapped.length = 6
//     guessesToBeMapped.fill('empty', guesses.length, 6)

//     const shareButtonText = useRef<HTMLButtonElement>(null)

//     const handleShareToClipboard = () => {
//       const originalInnerHTML = shareButtonText.current!.innerHTML

//       shareButtonText.current!.innerHTML = 'Copied!'

//       setTimeout(() => {
//         shareButtonText.current!.innerHTML = originalInnerHTML
//       }, 1000)
//     }

//     return (
//       <div className="flex flex-col items-center">

//         <button
//           id="share"
//           ref={shareButtonText}
//           className="p-2 self-center bg-indigo-600 uppercase text-gray-50 mt-3 font-bold flex items-center"
//           onClick={() =>
//             shareStatus(
//               guesses,
//               isDarkMode,
//               isHighContrastMode,
//               handleShareToClipboard
//             )
//           }
//         >
//           <strong>Share</strong>
//           <ShareIcon className="w-4 h-4 inline-block ml-1" />
//         </button>
//       </div>
//     )
//   }
