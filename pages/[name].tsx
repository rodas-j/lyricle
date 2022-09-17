import React from "react";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { LyricsLine } from "../src/components/lyrics/LyricsLine";
import { SearchSong } from "../src/components/input/SearchSong";
import { ProgressBar } from "../src/components/progressbar/ProgressBar";

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

import getSolution, { listArtists } from "./api";
import { InfoModal } from "../src/components/modals/InfoModal";
import { HowToPlayModal } from "../src/components/modals/HowToPlayModal";
import { SettingsModal } from "../src/components/modals/SettingsModal";
import { StatsModal } from "../src/components/modals/StatsModal";

export type Solution = {
  id: number;
  title: string;
  artist: string;
  lyrics: string[];
  songLink: string;
  artworkLink: string;
  song: string;
};

export type ValidGuess = {
  artist: string;
  songs: string[];
};

const LyricleArtist = (data) => {
  if (!getUUID()) {
    setUUID();
  }

  let solution = data.solution;
  let validGuesses = data.validGuesses;

  let lyrics = solution.lyrics;
  let artist = solution.artist;
  let songSolution = `${solution.artist} ─ ${solution.title}`;

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

  const [stats, setStats] = useState(() => loadStats());

  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.song !== songSolution) {
      return [];
    }
    const gameWasWon = loaded.guesses.includes(songSolution);
    if (gameWasWon) {
      setIsGameWon(true);
    }

    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true);
      showErrorAlert(CORRECT_SONG_MESSAGE(songSolution), {
        persist: false,
      });
    }

    return loaded.guesses;
  });

  const [sliceLyrics, setSliceLyrics] = useState(
    guesses.length ? guesses.length + 1 : 1
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

  const revealNextLine = () => {
    setSliceLyrics(sliceLyrics + 1);
  };

  const revealAllLines = () => {
    setSliceLyrics(lyrics.length);
  };

  const onSubmit = (e: {
    preventDefault: () => void;
    target: { search: { value: string } };
  }) => {
    console.log("onSubmit");
    e.preventDefault();
    if (isGameWon || isGameLost) {
      return;
    }
    const isAValidGuess = (query: string) => {
      return validGuesses.validGuesses.find((song) => song === query);
    };

    if (!isAValidGuess(e.target.search.value)) {
      return;
    }

    setGuesses([...guesses, e.target.search.value]);

    const isWinningSong = (song: string) => {
      console.log(songSolution, song);
      return songSolution === song;
    };

    if (isWinningSong(e.target.search.value)) {
      setStats(addStatsForCompletedGame(stats, guesses.length));

      setIsGameWon(true);
      return;
    } else {
      revealNextLine();
      e.target.search.value = "";
    }
    if (guesses.length === MAX_CHALLENGES - 1) {
      setIsGameLost(true);

      showErrorAlert(CORRECT_SONG_MESSAGE(songSolution), {
        persist: false,
      });

      return;
    }
  };

  const onSkip = () => {
    if (isGameWon || isGameLost) {
      return;
    }

    setGuesses([...guesses, "skip"]);
    revealNextLine();

    if (guesses.length === MAX_CHALLENGES - 1) {
      setStats(addStatsForCompletedGame(stats, guesses.length + 1));
      setIsGameLost(true);

      showErrorAlert(CORRECT_SONG_MESSAGE(songSolution), {
        persist: false,
      });
    }
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

  useEffect(() => {
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsHowToPlayModalOpen(true);
      }, WELCOME_INFO_MODAL_MS);
    }
  }, []);

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, song: songSolution });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
      const delayMs = REVEAL_TIME_MS;

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      });
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, REVEAL_TIME_MS);
    }

    if (isGameWon || isGameLost) {
      revealAllLines();
    }
  }, [isGameWon, isGameLost, showSuccessAlert]);

  return (
    <div className="absolute inset-0 flex flex-col">
      <Navbar
        gameTitle={artist}
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsHowToPlayModalOpen={setIsHowToPlayModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        shouldHideStatsModalButton={false}
      />
      <div className="pt-2 px-2 pb-2 md:pb-8 w-full max-w-[800px] mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <LyricsLine lyrics={lyrics} sliceLyrics={sliceLyrics} />
        </div>
        <ProgressBar song={songSolution as string} guesses={guesses} />
        <SearchSong
          solution={solution}
          validGuesses={validGuesses}
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          guesses={guesses}
          handleSubmit={onSubmit}
          handleSkip={onSkip}
        />
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
        <StatsModal
          solution={solution}
          isHomePage={false}
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
          isDarkMode={isDarkMode}
          isHighContrastMode={isHighContrastMode}
          numberOfGuessesMade={guesses.length}
        />
      </div>
    </div>
  );
};

export const getSongOfTheDay = () => {
  const epochMs = new Date("August 31, 2022").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  const nextDay = (index + 1) * msInDay + epochMs;

  return {
    solutionIndex: index,
    tomorrow: nextDay,
  };
};

export async function getStaticPaths() {
  let dirList = await listArtists();

  return {
    paths: dirList.map((name) => ({
      params: {
        name: name,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let solution: Solution = {
    id: 0,
    title: "",
    artist: "",
    lyrics: [],
    songLink: "",
    artworkLink: "",
    song: "",
  };
  let validGuesses;
  if (params) {
    let x = (await getSolution(params.name as string, 1)) as unknown as {
      songChoice: Solution;
      validGuesses: ValidGuess[];
    };
    solution = x.songChoice;
    validGuesses = x.validGuesses;
  }
  return {
    props: {
      solution,
      validGuesses,
    },
  };
}

export default LyricleArtist;
