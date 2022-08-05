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
    '70s': 'from-[#C6426E]/95 to-[#642B73]/95',
    '80s': 'from-[#f5af19]/95 to-[#f12711]/95',
    '90s': 'from-[#45a247]/95 to-[#283c86]/95',
  }

  return (
    <a
      href={`https://decades.lyricle.app/${era}`}
      className="flex-grow md:hover:scale-110 md:hover:transition-transform"
    >
      <article
        className={`flex items-center justify-center p-4 bg-gradient-to-r aspect-video rounded-md ${gradientClasses[era]}`}
      >
        <h1 className="text-indigo-50 text-2xl font-bold">Lyricle {era}</h1>
      </article>
    </a>
  )
}
