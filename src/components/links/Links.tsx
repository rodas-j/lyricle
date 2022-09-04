import { decadesConfig } from '../../lib/config'
import { ReactComponent as RedditIcon } from '../../assets/reddit.svg'
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg'

export const Links = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Link era="arianagrande" />
        <Link era="beatles" />
        <Link era="edsheeran" />
        <Link era="prince" />
        <Link era="taylorswift" />
      </div>
      {JoinOurCommunities()}
    </>
  )
}

const JoinOurCommunities = () => {
  return (
    <div className="flex my-3 items-center bg-indigo-200 outline-dashed outline-2 outline-indigo-900 md:hover:outline-offset-2 dark:bg-indigo-600/20 dark:outline-indigo-400 p-2">
      <p className="dark:text-white text-sm md:text-base">
        Join our communities to request for more artists!
      </p>
      <div className="flex ml-auto">
        <a
          href="https://www.reddit.com/r/lyricle_official/"
          target="_blank"
          rel="noreferrer"
          className="focus-visible:outline-none"
        >
          <RedditIcon className="w-6 h-6 mx-1 fill-gray-700 hover:fill-gray-900 dark:fill-gray-100 dark:hover:fill-white" />
        </a>
        <a
          href="https://discord.gg/84WNMqAT"
          target="_blank"
          rel="noreferrer"
          className="focus-visible:outline-none"
        >
          <DiscordIcon className="w-6 h-6 mx-1 fill-gray-700 hover:fill-gray-900 dark:fill-gray-100 dark:hover:fill-white" />
        </a>
        <a
          href="https://www.facebook.com/groups/1730611307275095"
          target="_blank"
          rel="noreferrer"
          className="focus-visible:outline-none"
        >
          <FacebookIcon className="w-6 h-6 mx-1 fill-gray-700 hover:fill-gray-900 dark:fill-gray-100 dark:hover:fill-white" />
        </a>
      </div>
    </div>
  )
}

const Link = ({ era }) => {
  const gradientClasses = {
    taylorswift: 'from-[#f5af19]/95 to-[#f12711]/95',
    beatles: 'from-[#C6426E]/95 to-[#642B73]/95',
    prince: 'from-[#45a247]/95 to-[#283c86]/95',
    arianagrande: 'from-[#00d2ff]/95 to-[#928dab]/95',
    edsheeran: 'from-[#F09819]/95 to-[#EDDE5D]/95',
  }

  return (
    <>
      <a
        href={`https://artists.lyricle.app/${era}`}
        className={`md:hover:scale-110 md:hover:transition-transform flex-grow flex-shrink-0 flex items-center justify-center w-56 h-40 bg-gradient-to-r rounded-md ${gradientClasses[era]}`}
      >
        <h1 className="text-indigo-50 text-2xl font-bold">
          {decadesConfig.selections[era]}
        </h1>
      </a>
    </>
  )
}
