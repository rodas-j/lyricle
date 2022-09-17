import { useEffect, useState } from "react";

export const LyricsLine = ({ lyrics, sliceLyrics }) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      {!isSSR &&
        lyrics.slice(0, sliceLyrics).map((line, index) => (
          <div
            key={index}
            className="line-reveal p-2 md:p-4 md:text-xl text-gray-800 bg-gray-200 border-gray-300 pointer-events-none select-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-100 text-center mb-2"
          >
            {line}
          </div>
        ))}
    </>
  );
};
