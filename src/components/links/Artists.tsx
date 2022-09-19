import Link from "next/link";
import React from "react";
import ARTIST_INFO from "../../constants/artists.json";

export const Artists = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {ARTIST_INFO.map((artist, index) => (
          <Artist key={index} name={artist.name} id={artist.id} />
        ))}
      </div>
    </>
  );
};

const Artist = ({ name, id }) => {
  const gradientClasses = {
    taylorswift: "from-[#f5af19]/95 to-[#f12711]/95",
    beatles: "from-[#C6426E]/95 to-[#642B73]/95",
    prince: "from-[#45a247]/95 to-[#283c86]/95",
    arianagrande: "from-[#00d2ff]/95 to-[#928dab]/95",
    edsheeran: "from-[#F09819]/95 to-[#EDDE5D]/95",
  };
  const randomGradient = () =>
    [
      "from-[#f5af19]/95 to-[#f12711]/95",
      "from-[#C6426E]/95 to-[#642B73]/95",
      "from-[#45a247]/95 to-[#283c86]/95",
      "from-[#00d2ff]/95 to-[#928dab]/95",
      "from-[#F09819]/95 to-[#EDDE5D]/95",
    ][Math.floor(Math.random() * 5)];

  return (
    <>
      <Link href={`/${id}`}>
        <a
          className={`md:hover:scale-110 md:hover:transition-transform flex-grow flex-shrink-0 flex items-center justify-center w-56 h-40 bg-gradient-to-r rounded-md ${gradientClasses[id]}`}
        >
          <h1 className="text-indigo-50 text-2xl font-bold">{name}</h1>
        </a>
      </Link>
    </>
  );
};

export default Artists;
