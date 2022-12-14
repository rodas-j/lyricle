import React from "react";
import { useEffect, useState } from "react";

interface Props {
  song: string;
  guesses: string[];
}
export const ProgressBar = ({ song, guesses }: Props) => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <div className="flex w-full mb-3 space-x-1">
      {!isSSR &&
        [...new Array(6)].map((line, index) => {
          return (
            <div
              key={index}
              data-check={
                guesses[index]
                  ? guesses[index] === song // Correct guess
                    ? "correct"
                    : guesses[index].split("─")[0] === song.split("─")[0] // Correct artist, wrong song
                    ? "close"
                    : guesses[index] === "skip" // Skipped
                    ? "skipped"
                    : "wrong" //incorrect guess
                  : ""
              }
              className="flex-grow bg-gray-300 dark:bg-gray-800 h-2 relative cursor-pointer group"
            >
              <ToolTip guess={guesses[index]} />
            </div>
          );
        })}
    </div>
  );
};

interface ToolTipProps {
  guess: string;
}

export const ToolTip = ({ guess }: ToolTipProps) => {
  if (!guess) return <></>;

  return (
    <div className="tooltip absolute right-[50%] translate-x-1/2 w-max mb-3 bottom-full p-2 rounded-md invisible group-hover:visible text-sm md:text-md bg-slate-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100">
      {guess}
    </div>
  );
};
