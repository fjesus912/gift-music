import { Link } from "react-router-dom"
import { AddIcon, MinusIcon, PlayIcon } from "../icons/Svgs"
import { addTrack, removeTrack } from "../../store/slices/playlistCart.slice"
import { useDispatch } from "react-redux"

const TrackCard = ({
  track,
  showPlayBtn,
  showAddBtn,
  imageSize = "base",
  showMinusBtn,
  deleteBtn,
  playTrack,
}) => {
  const dispatch = useDispatch()

  const handleAddTrack = () => {
    dispatch(addTrack(track))
  }

  const handleRemoveTrack = () => {
    dispatch(removeTrack(track.id))
  }

  const imageSizes = {
    base: "w-[58px] h-[58px]",
    sm: "w-[48px] h-[48px]",
    xsm: "w-[43px] h-[43px]",
  }

  return (
    <article className="flex gap-4 items-center hover:bg-white/20 transition-colors rounded-2xl p-1">
      {/* Img de la canción */}
      <div className={`w-[58px] h-[58px] rounded-2xl overflow-hidden ${imageSizes[imageSize]}`}>
        <img src={track.album.images[2].url} alt="" />
      </div>

      {/* Detalle de la canción */}
      <div className="flex-1 text-sm grid gap-1">
        <Link to={`/tracks/${track.id}`} className="font-semibold line-clamp-1 hover:text-secondary transition-colors">{track.name}</Link>
        {/* <h5 className="text-slate-400 line-clamp-1">{track.artists[0].name}</h5> */}
        <ul className="flex gap-2">
          {track.artists.slice(0, 2).map((artist, index, array) => (
            <li key={artist.id}>
              <Link className="hover:text-secondary transition-colors line-clamp-1" to={`/artists/${artist.id}`}>
                {artist.name} {array.length - 1 !== index && ","}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Botones */}
      <div className="flex gap-2 pr-1">
        {showPlayBtn && (
          <button>
            <PlayIcon />
          </button>
        )}
        {showAddBtn && (
          <button onClick={handleAddTrack}>
            <AddIcon />
          </button>
        )}

        {
          showMinusBtn && (
            <button onClick={handleRemoveTrack}>
              <MinusIcon />
            </button>
          )}

        {
          deleteBtn && (
          <button onClick={() => deleteBtn(track.id)}>
            <MinusIcon />
          </button>
        )} 
        
        {
          playTrack && (
            <button onClick={() => playTrack(track.spotifyId)}>
            <PlayIcon />
          </button>
          )
        }
      </div>
    </article>
  )
}
export default TrackCard