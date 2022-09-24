import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { useAlert } from "../../context/AlertContext";
import { LISTEN_TO_TITLE, REGION_NOT_SUPPORTED } from "../../constants/strings";
import ReactPlayer from "react-player/soundcloud";
import { PauseIcon, PlayIcon } from "@heroicons/react/solid";
import Image from "next/image";
import SoundCloudLogo from "../../../public/assets/soundcloud.svg";
import ArrowLeft from "../../../public/assets/arrowleft.svg";
import { Solution } from "../../../pages/[name]";

type Props = {
  isOpen: boolean;
  solution: Solution;
  variant?: "success" | "error";
  topMost?: boolean;
};

export const SongWidget = ({
  isOpen,
  solution,
  variant = "error",
  topMost = false,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const { showError: showErrorAlert } = useAlert();
  let songSolution = `${solution.artist} ─ ${solution.title}`;
  useEffect(() => {
    if (isOpen) {
      setIsWidgetOpen(true);
    }
  }, [isOpen]);
  let mediaButton;
  if (isPlaying) {
    mediaButton = (
      <PauseIcon
        onClick={() => setIsPlaying(false)}
        className="w-7 h-7 mx-1 cursor-pointer"
      ></PauseIcon>
    );
  } else {
    mediaButton = (
      <PlayIcon
        onClick={() => setIsPlaying(true)}
        className="w-7 h-7 mx-1 size cursor-pointer"
      ></PlayIcon>
    );
  }
  const classes = classNames(
    " z-20 p-2 mt-5 left-0 right-0 max-w-sm mx-auto shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 ",
    {
      "bg-rose-500 text-white": variant === "error",
      "bg-blue-500 text-white": variant === "success",
    }
  );
  var artwork_url = "";
  if (solution?.artworkLink !== undefined) {
    artwork_url = solution.artworkLink;
  }
  return (
    <Transition
      show={isWidgetOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="absolute right-2 top-2"></div>
        <div>
          {/* <p className="text-sm text-center font-medium">{message}</p> */}
          <div className="invisible">
            <ReactPlayer
              height="1px"
              width="1px"
              url={solution.songLink}
              playing={isPlaying}
              onEnded={() => setIsPlaying(false)}
              onError={() => showErrorAlert(REGION_NOT_SUPPORTED)}
            />
          </div>
          <div className="pb-0 flex-col items-evenly">
            <div className="flex items-stretch rounded-md overflow-hidden bg-custom-positive">
              {artwork_url ? (
                <div
                  style={{
                    backgroundImage: `url(${artwork_url})`,
                  }}
                  className="w-20 bg-cover bg-center"
                ></div>
              ) : null}{" "}
              {solution.songLink ? (
                <div className=" pl-1 pt-5 flex-col items-evenly">
                  {mediaButton}
                </div>
              ) : null}
              <div className="flex-1 m-2 text-white truncate ">
                <p className="text-left">{songSolution.split("─")[0]}</p>{" "}
                <p className="text-left text-sm  overflow-x-auto webkit opacity-75">
                  {songSolution.split("─")[1]}
                </p>{" "}
                <div className="flex overflow-hidden justify-between items-center w-full mt-1 ">
                  <span className="text-xs uppercase opacity-50 font-bold "></span>{" "}
                  <a
                    href={solution.songLink}
                    title={LISTEN_TO_TITLE(songSolution)}
                    className="no-underline focus-visible:outline-none"
                  >
                    <span className="flex focus:outline-none ">
                      <Image src={SoundCloudLogo} alt="SoundCloud Logo" />
                      <Image src={ArrowLeft} alt="arrow left" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <p className="text-sm text-center font-medium">{message}</p> */}
      </div>
    </Transition>
  );
};
