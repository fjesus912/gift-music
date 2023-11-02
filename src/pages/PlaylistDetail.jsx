import { useEffect, useRef, useState } from "react"
import { PencilIcon, SaveIcon, ShareIcon, TrashIcon } from "../components/icons/Svgs"
import PrincipalLayout from "../components/layouts/PrincipalLayout"
import { Link, useNavigate, useParams } from "react-router-dom"
import { axiosMusic } from "../utils/configAxios"
import TrackCard from "../components/shared/TrackCard"

const PlaylistDetail = () => {
  const [isShowFront, setIsShowFront] = useState(true)
  const [playlist, setPlaylist] = useState(null)

  const { id } = useParams()
  const formRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      title: e.target.title.value,
      to: e.target.to.value,
      message: e.target.message.value,
    }
    axiosMusic
      .patch(`/api/playlists/${id}`, data)
      .then(() => {
        window.alert("Playlist actualizada")
      })
      .catch((err) => console.log(err))
  }

  const deleteTrack = (idTrack) => {
    axiosMusic
      .delete(`/api/playlists/${playlist.id}/tracks/${idTrack}`)
      .then(() => {
        const playlistCopy = structuredClone(playlist)
        playlistCopy.tracks = playlistCopy.tracks.filter(
          (track) => track.id !== idTrack
        )
        setPlaylist(playlistCopy)
      })
      .catch((err) => console.log(err))
  }

  const deletePlaylist = (playlist) => {
    axiosMusic
      .delete(`/api/playlists/${playlist.id}`)
      .then(() => {
        window.alert("Playlist eliminada correctamente")
        navigate("/playlist")
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({ data }) => {
        setPlaylist(data)
        formRef.current.message.value = data.message
        formRef.current.title.value = data.title
        formRef.current.to.value = data.to
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <PrincipalLayout>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="top-24 uppercase grid justify-center gap-1 rounded-md font-semibold transition-all"
      >
        <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
          {/* Frontal */}
          <div className="front">
            <img src="/images/cassette.png" alt="" />
            <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[15px] left-[20px] gap-1 text-sm">
              <input
                className="bg-transparent flex-1 outline-none text-black"
                placeholder="Título"
                id="title"
                type="text"
                size={15}
              />
              <label htmlFor="title">
                <PencilIcon />
              </label>
            </div>
            <button
              type="submit"
              className="absolute bottom-4 left-5 border-2 rounded-full p-[3px]">
              <SaveIcon />
            </button>
            <button
              onClick={deletePlaylist}
              type="button"
              className="absolute bottom-4 left-[60px] border-2 rounded-full p-[3px]">
              <TrashIcon />
            </button>
            <Link
            to={`/paylist/public/${playlist?.id}`}
            target="_blank"
              type="button"
              className="absolute bottom-4 right-5 border-2 rounded-full p-[3px]">
              <ShareIcon />
            </Link>
          </div>

          {/* Trasera */}
          <div className="absolute top-0 back">
            <img src="/images/cassette.png" alt="" />
            <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[15px] left-[20px] gap-1 text-sm">
              <input
                className="bg-transparent flex-1 outline-none text-black"
                placeholder="Destinatario"
                id="to"
                type="text"
                size={15}
              />
              <label htmlFor="to">
                <PencilIcon />
              </label>
            </div>

            <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[50px] left-[20px] gap-1 text-sm">
              <textarea
                name="message"
                rows={5}
                className="resize-none outline-none text-black" placeholder="Mensaje"
              />
            </div>
          </div>
        </div>

        <button
          className="border-2 border-white uppercase p-2 px-8 rounded-full max-w-max mx-auto hover:text-secondary hover:border-secondary transition-colors text-sm"
          type="button" onClick={() => setIsShowFront(!isShowFront)}>
          {isShowFront ? "Lado B" : "Lado A"}
        </button>
      </form>

      <section className="mt-6">
        {
          playlist?.tracks.map((track) => (
            <TrackCard key={track.id} track={track} deleteBtn={deleteTrack} />
          )
          )}
      </section>
    </PrincipalLayout>
  )
}
export default PlaylistDetail