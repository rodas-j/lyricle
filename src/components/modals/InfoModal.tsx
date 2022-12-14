import { BaseModal } from "./BaseModal";

import { HeartIcon } from "@heroicons/react/solid";
import Instagram from "../../../public/assets/instagram.svg";
import Twitter from "../../../public/assets/twitter.svg";
import React from "react";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm dark:text-gray-200 mb-6">
        We&apos;re sure you&apos;re all familiar with the &quot;-le&quot; type
        games by now. We were{" "}
        <span className="decoration-double line-through">heavily</span> inspired
        by both{" "}
        <a
          className="underline decoration-dashed decoration-green-400 dark:decoration-green-200 decoration-2 hover:bg-green-200 hover:text-gray-900 px-1"
          href="https://heardle.app"
          target="_blank"
          rel="noreferrer"
        >
          Heardle
        </a>{" "}
        and{" "}
        <a
          className="underline decoration-dashed decoration-green-400 dark:decoration-green-200 decoration-2 hover:bg-green-200 hover:text-gray-900 pl-1"
          href="https://www.nytimes.com/games/wordle/index.html"
          target="_blank"
          rel="noreferrer"
        >
          Wordle
        </a>
        , we wanted to shed light on the often unappreciated part of a song -
        the lyrics.
      </p>

      <p className="flex justify-center text-sm dark:text-gray-200 mb-6">
        <span>We hope you</span>
        <HeartIcon className="w-6 h-6 fill-red-500 mx-1" />
        <span>it!</span>
      </p>

      <div className="flex justify-center ">
        <div className="icon flex items-center mr-3">
          <a href="https://twitter.com/lyricle_app">
            <Twitter className="w-6 h-6 mx-1 fill-gray-500 hover:fill-gray-900 dark:fill-gray-300 dark:hover:fill-gray-100" />
          </a>
          <a href="https://www.instagram.com/lyricle_app/">
            <Instagram className="w-6 h-6 mx-1 fill-gray-500 hover:fill-gray-900 dark:fill-gray-300 dark:hover:fill-gray-100" />
          </a>
        </div>
        <p className="dark:text-gray-200">@lyricle_app</p>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
        Lyricle was built on top of an open-source project on github, check it
        out at&nbsp;
        <a
          className="underline text-gray-800 dark:text-gray-300"
          href="https://github.com/cwackerfuss/react-wordle"
          target="_blank"
          rel="noreferrer"
        >
          react-wordle.
        </a>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
        &nbsp; All lyrics are provided by &nbsp;
        <a
          className="underline text-gray-800 dark:text-gray-300"
          href="https://www.lyrics.com/"
          target="_blank"
          rel="noreferrer"
        >
          Lyrics.com
        </a>
      </p>
    </BaseModal>
  );
};
