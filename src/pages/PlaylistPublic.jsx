import { useEffect, useState } from "react"
import PublicLayout from "../components/layouts/PublicLayout"
import { PlusIcon, ShareIcon } from "../components/icons/Svgs"
import { axiosMusic } from "../utils/configAxios"
import { useParams } from "react-router-dom"
import TrackCard from "../components/shared/TrackCard"
import SpotifySong from "../components/shared/SpotifySong"

const PlaylistPublic = () => {
  const [playlist, setPlaylist] = useState(null)
  const [currentSong, setCurrentSong] = useState(null)
  const { id } = useParams()

  const playTrack = (idTrack) => {
    setCurrentSong(idTrack)
  }

  const handleCopyUrl = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL).then(() => window.alert("Copiado en el portapapeles")) 
  }

  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({ data }) => setPlaylist(data)
      )
      .catch((err) => console.log(err))
  }, [])

  const [isShowFront, setIsShowFront] = useState(true)

  return (
    <PublicLayout>
      <article
        className="top-24 grid justify-center gap-1 rounded-md font-semibold transition-all"
      >
        <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
          {/* Frontal */}
          <div className="front">
            <img src="/images/cassette.png" alt="" />
            <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[15px] left-[20px] gap-1 text-sm">
              <h3 className="bg-transparent flex-1 outline-none text-black">
                {playlist?.title}
              </h3>
            </div>
            <button
              onClick={handleCopyUrl}
              type="button"
              className="absolute bottom-4 right-14 border-2 rounded-full p-[3px]">
              <ShareIcon />
            </button>

            <button
              type="button"
              className="absolute bottom-4 right-4 border-2 rounded-full p-[3px]">
              <PlusIcon />
            </button>
          </div>

          {/* Trasera */}
          <div className="absolute top-0 back">
            <img src="/images/cassette.png" alt="" />
            <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[15px] left-[20px] gap-1 text-sm">
              <span className="bg-transparent flex-1 outline-none text-black">
                {playlist?.to}
              </span>
            </div>

            <div className="bg-white p-1 rounded-md w-[198px] absolute top-[50px] left-[20px] gap-1 text-sm text-black h-[100px] overflow-y-auto">
              <p>
                {playlist?.message}
              </p>
            </div>
          </div>
        </div>

        <button
          className="border-2 border-white uppercase p-2 px-8 rounded-full max-w-max mx-auto hover:text-secondary hover:border-secondary transition-colors text-sm"
          type="button" onClick={() => setIsShowFront(!isShowFront)}>
          {isShowFront ? "Lado B" : "Lado A"}
        </button>
      </article>

      {currentSong && <SpotifySong idTrack={currentSong} />}

      <section className="mt-6">
        {
          playlist?.tracks.map((track) => (
            <TrackCard key={track.id} track={track} playTrack={playTrack} />
          )
          )}
      </section>
    </PublicLayout>
  )
}
export default PlaylistPublic