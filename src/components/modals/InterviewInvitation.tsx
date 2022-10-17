import { BaseModal } from "./BaseModal";

import {
  PhoneIcon,
  CalendarIcon,
  ClipboardListIcon,
} from "@heroicons/react/solid";
import React from "react";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleReject: () => void;
  handleAccept: () => void;
  handleSurvey: () => void;
};

export const InverviewInvitationModal = ({
  isOpen,
  handleClose,
  handleAccept,
  handleReject,
  handleSurvey,
}: Props) => {
  return (
    <BaseModal
      title="We want YOUR input on Lyricle!"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div>
        <PhoneIcon className="w-10 h-10 my-8 mx-auto fill-green-600" />
        <p className="text-sm dark:text-gray-200  my-9">
          Thank you for supporting us for so long. As one of our daily players,
          we wanted to make Lyricle better for you. Would you be open for a 5
          min chat?
        </p>
      </div>

      <div className="mt-5 sm:mt-6 flex flex-col dark:text-white">
        <div>
          <button
            onClick={handleAccept}
            type="button"
            className="mt-2 w-full flex flex-row justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            <CalendarIcon className="w-4 h-4 mx-2 mt-0.5" /> Sign Me Up!
          </button>
        </div>
        <div>
          <button
            onClick={handleSurvey}
            type="button"
            className="mt-2 w-full flex flex-row justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            <ClipboardListIcon className="w-4 h-4 mx-2 mt-0.5" /> Take Survey
          </button>
        </div>
        <div>
          <button
            onClick={handleReject}
            type="button"
            className="mt-2 w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Not Interested
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
