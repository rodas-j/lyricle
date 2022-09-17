import Link from "next/link";
export const Artists = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Artist name="arianagrande" />
        <Artist name="beatles" />
        <Artist name="edsheeran" />
        <Artist name="prince" />
        <Artist name="taylorswift" />
      </div>
    </>
  );
};

const Artist = ({ name }) => {
  const gradientClasses = {
    taylorswift: "from-[#f5af19]/95 to-[#f12711]/95",
    beatles: "from-[#C6426E]/95 to-[#642B73]/95",
    prince: "from-[#45a247]/95 to-[#283c86]/95",
    arianagrande: "from-[#00d2ff]/95 to-[#928dab]/95",
    edsheeran: "from-[#F09819]/95 to-[#EDDE5D]/95",
  };

  return (
    <>
      <Link href={`/${name}`}>
        <a
          href={`https://artists.lyricle.app/${name}`}
          className={`md:hover:scale-110 md:hover:transition-transform flex-grow flex-shrink-0 flex items-center justify-center w-56 h-40 bg-gradient-to-r rounded-md ${gradientClasses[name]}`}
        >
          <h1 className="text-indigo-50 text-2xl font-bold">{name}</h1>
        </a>
      </Link>
    </>
  );
};

export default Artists;
