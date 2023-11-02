import { Link } from "react-router-dom"
import { PencilIcon } from "../icons/Svgs"

const PlaylistCard = ({ playlist, index }) => {

  const top = `${index * 47}px`

  return (
    <li className="absolute text-black font-bold hover:rotate-6 hover:-translate-y-4 transition-transform" style={{top: top}}>
      <Link to={`/playlist/${playlist.id}`}>
      <div>
        <img src="/images/cassette.png" alt="" />
      </div>
      <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[15px] left-[20px] gap-1 text-sm">
        <h4 className="flex-1 line-clamp-1">{playlist.title}</h4>
        <PencilIcon />
      </div>
      </Link>
    </li>
  )
}
export default PlaylistCard