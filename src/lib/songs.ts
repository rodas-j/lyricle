import { mapArtistToSongs } from "../constants/validGuesses";
import { getToday, setToday } from "./localStorage";

if (!getToday()) {
  const today = new Date();
  const day = today.getDate();
  setToday(day);
}

const handleRefresh = (e) => {
  const today = new Date();
  const todayDate = today.getDate();
  if (getToday() !== String(todayDate)) {
    setToday(String(todayDate));
    window.location.reload();
  }
};
if (typeof document !== "undefined") {
  document.body.addEventListener("click", handleRefresh);
}
export const isWinningSong = (song: string) => {
  return solution.song === song;
};

export const isAValidGuess = (query: string) => {
  return mapArtistToSongs.find((song) => song === query);
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

export const { solutionIndex, tomorrow } = getSongOfTheDay();
