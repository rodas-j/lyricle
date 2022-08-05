export const Links = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Link era="70s" />
      <Link era="80s" />
      <Link era="90s" />
    </div>
  )
}

const Link = ({ era }) => {
  const gradientClasses = {
    '70s': 'from-[#f5af19]/95 to-[#f12711]/95',
    '80s': 'from-[#C6426E]/95 to-[#642B73]/95',
    '90s': 'from-[#45a247]/95 to-[#283c86]/95',
  }

  return (
    <a
      href={`https://decades.lyricle.app/${era}`}
      className={`md:hover:scale-110 md:hover:transition-transform flex-grow flex-shrink-0 flex items-center justify-center w-56 h-40 bg-gradient-to-r rounded-md ${gradientClasses[era]}`}
    >
      <h1 className="text-indigo-50 text-2xl font-bold">Lyricle {era}</h1>
    </a>
  )
}
