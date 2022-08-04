import { Link } from 'react-router-dom'

import THUMB_80s from '../../assets/thumbnails/80s.jpg'

export const Links = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <article className="relative overflow-hidden p-4 w-64 aspect-video rounded-md flex flex-col justify-between">
        <h1 className="text-indigo-50 text-2xl font-bold">Lyricle 80s</h1>
        <img
          className="absolute inset-0 h-full w-full object-cover -z-10"
          src={THUMB_80s}
          alt=""
        />
        <Link to="/80s" className="">
          <p className="p-2 bg-indigo-100 rounded-full font-bold mt-3 text-center">
            Play
          </p>
        </Link>
      </article>
      <Link to="/90s">
        <article className="p-4 bg-indigo-600 w-64 aspect-video rounded-md">
          <h1 className="text-indigo-50 text-2xl font-bold">Lyricle 90s</h1>
        </article>
      </Link>
    </div>
  )
}
