import RedditIcon from "../../../public/assets/reddit.svg";
import DiscordIcon from "../../../public/assets/discord.svg";
import FacebookIcon from "../../../public/assets/facebook.svg";

export const JoinOurCommunities = () => {
  return (
    <div className="flex my-3 items-center bg-indigo-200 outline-dashed outline-2 outline-indigo-900 md:hover:outline-offset-2 dark:bg-indigo-600/20 dark:outline-indigo-400 p-2">
      <p className="dark:text-white text-sm md:text-base">
        Join the Lyricle community!
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
          href="https://discord.gg/Ga2rTGSqbA"
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
  );
};
