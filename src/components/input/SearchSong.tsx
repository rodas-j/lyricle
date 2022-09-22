import { useState, useRef, useEffect } from "react";

// import VALID_GUESSES from '../../constants/all_validGuesses.json'
import { Solution, ValidGuess } from "../../../pages/[name]";
import { ChevronDoubleRightIcon, XIcon } from "@heroicons/react/outline";

type SearchSongProps = {
  solution: Solution;
  validGuesses: ValidGuess[];
  isAValidGuess: (current: string) => boolean;
  isGameWon: boolean;
  isGameLost: boolean;
  handleSubmit: (e: any) => void;
  handleSkip: () => void;
  guesses: string[];
};

export const SearchSong = ({
  solution,
  validGuesses,
  isAValidGuess,
  isGameWon,
  isGameLost,
  handleSubmit,
  handleSkip,
  guesses,
}: SearchSongProps) => {
  const [matchInput, setMatchInput] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const mapArtistToSongs: string[] = [];

  validGuesses.forEach(({ artist, songs }) => {
    for (let song of songs) {
      mapArtistToSongs.push(`${artist} ─ ${song}`);
    }
  });

  useEffect(() => {
    if (currentGuess && !isAValidGuess(currentGuess)) {
      setMatchInput(
        mapArtistToSongs
          .filter((song) =>
            song
              .split("─")
              .join("")
              .replace("  ", " ")
              .toLowerCase()
              .includes(currentGuess.toLowerCase())
          )
          .slice(0, 5)
      );
    } else {
      setMatchInput([]);
    }
  }, [currentGuess]);

  const changeInput = (e: any): void => {
    setCurrentGuess(e.target.textContent);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    setMatchInput([]);
  };

  useEffect(() => {
    if (!isGameWon) setCurrentGuess("");
  }, [handleSubmit, isGameWon]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={
          isGameWon || isGameLost
            ? "pointer-events-none cursor-not-allowed"
            : ""
        }
      >
        <div className="relative bg-gray-200 dark:bg-gray-700">
          <input
            ref={inputRef}
            className="lyrics-input relative p-2 md:p-4 w-full md:text-xl text-gray-800 dark:text-gray-200 bg-transparent group focus:outline-indigo-400"
            name="search"
            type="search"
            value={isGameWon ? solution.song : currentGuess}
            required
            spellCheck="false"
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            placeholder="Know it? Search artist or the song."
            onChange={(e) => setCurrentGuess(e.target.value)}
          />
          <SongOptions
            solution={solution}
            matchInput={matchInput}
            guesses={guesses}
            changeInput={changeInput}
          />
          <XIcon
            className="w-4 h-4 md:w-4 md:h-4 absolute top-[50%] translate-y-[-40%] right-2 md:right-4 stroke-gray-400 cursor-pointer"
            onClick={() => setCurrentGuess("")}
          />
        </div>
        <ActionBar
          isAValidGuess={isAValidGuess}
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          currentGuess={currentGuess}
          handleSkip={handleSkip}
          inputRef={inputRef}
        />
      </form>
    </>
  );
};

type SongOptionsProps = {
  solution: Solution;
  matchInput: string[];
  guesses: string[];
  changeInput: (e: any) => void;
};

function SongOptions({
  matchInput,
  guesses,
  changeInput,
  solution,
}: SongOptionsProps) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <ul className="absolute bottom-full left-0 flex flex-col divide-y-2  mb-3 w-full formide-y divide-gray-500 cursor-pointer">
      {!isSSR &&
        matchInput.map((song, index) => {
          let classes =
            "flex items-center p-2 md:p-4 bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700";

          classes +=
            guesses.includes(song) && song !== solution.song
              ? " pointer-events-none bg-rose-200 text-rose-800 dark:bg-rose-300 dark:text-rose-800"
              : "";

          return (
            <li key={index} className={classes} onClick={changeInput}>
              {guesses.includes(song) && song !== solution.song ? (
                <XIcon className="h-4 w-4 dark:stroke-rose-800 mr-3" />
              ) : (
                ""
              )}
              {song}
            </li>
          );
        })}
    </ul>
  );
}
type ActionBarProps = {
  isAValidGuess: (current: string) => boolean;
  isGameWon: boolean;
  isGameLost: boolean;
  currentGuess: string;
  handleSkip: () => void;
  inputRef: any;
};

export const ActionBar = ({
  isAValidGuess,
  isGameWon,
  isGameLost,
  currentGuess,
  handleSkip,
  inputRef,
}: ActionBarProps) => {
  return (
    <div className="flex justify-end mt-3">
      <button
        type="submit"
        className="py-1 md:py-2 px-4 md:px-10 md:text-l font-bold text-gray-100 bg-indigo-600 tracking-widest hover:bg-indigo-700 order-1 disabled:bg-indigo-900 disabled:opacity-60"
        disabled={!isAValidGuess(currentGuess) || isGameWon || isGameLost}
      >
        SUBMIT
      </button>
      <button
        type="button"
        className="py-1 md:py-2 px-4 md:px-10 md:text-l font-bold tracking-widest text-gray-800 dark:text-gray-100 flex items-center mr-0.5 md:mr-2 hover:outline hover:outline-offset-[-1px] hover:outline-1 hover:outline-gray-400 disabled:opacity-60"
        onClick={() => {
          handleSkip();
          inputRef.current.value = "";
        }}
        disabled={isGameWon || isGameLost}
      >
        SKIP
        <ChevronDoubleRightIcon className="w-3 h-3 ml-1" />
      </button>
    </div>
  );
};
