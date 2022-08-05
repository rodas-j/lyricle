export const Links = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Link era="70s" gradientStart="#C6426E" gradientEnd="#642B73" />
      <Link era="80s" gradientStart="#f5af19" gradientEnd="#f12711" />
      <Link era="90s" gradientStart="#45a247" gradientEnd="#283c86" />
    </div>
  )
}

const Link = ({ era, gradientStart, gradientEnd }) => {
  return (
    <a
      href={`https://decades.lyricle.app/${era}`}
      className="flex-grow md:hover:scale-110 md:hover:transition-transform"
    >
      <article
        className={`flex items-center justify-center p-4 bg-gradient-to-r from-[${gradientStart}]/95 to-[${gradientEnd}]/95 aspect-video rounded-md`}
      >
        <h1 className="text-indigo-50 text-2xl font-bold">Lyricle {era}</h1>
      </article>
    </a>
  )
}
