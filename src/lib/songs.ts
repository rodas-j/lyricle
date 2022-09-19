import { getToday, setToday } from "./localStorage";

if (!getToday()) {
  const today = new Date();
  const day = today.getDate();
  setToday(day);
}

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
