import { BaseModal } from "./BaseModal";
import { ToolTip } from "../progressbar/ProgressBar";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const HowToPlayModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to Play" isOpen={isOpen} handleClose={handleClose}>
      <div className="wrapper flex justify-between items-center my-6">
        <p className="w-[45ch] text-justify text-sm dark:text-gray-200">
          1. Guess the song from the lyrics in as few tries as possible.
        </p>
      </div>
      <div className="wrapper flex justify-between items-center mb-6">
        <p className="w-[45ch] text-justify text-sm dark:text-gray-200">
          2. Each guess will reveal more lines. Click the small boxes on top of
          the search bar to see your previous attempts.
        </p>
      </div>
      <div className="flex w-1/2 mx-auto mt-16 mb-6 space-x-1">
        <div
          className="flex-grow bg-gray-300 dark:bg-gray-800 h-2 relative cursor-pointer group"
          data-check="skipped"
        ></div>
        <div
          className="flex-grow bg-gray-300 dark:bg-gray-800 h-2 relative cursor-pointer group"
          data-check="wrong"
        ></div>
        <div
          className="demo flex-grow bg-gray-300 dark:bg-gray-800 h-2 relative cursor-pointer group"
          data-check="correct"
        >
          <ToolTip guess="Michael Jackson ─ Billie Jean" />
        </div>
      </div>
      <div className="wrapper flex justify-between items-center mb-10">
        <p className="w-[45ch] text-justify text-sm dark:text-gray-200">
          3. Share your results and come back tomorrow for the next lyricle!
        </p>
      </div>
      <button
        className="bg-indigo-600 px-10 py-1 text-gray-100 border-none outline-none"
        onClick={handleClose}
      >
        Start
      </button>
    </BaseModal>
  );
};
