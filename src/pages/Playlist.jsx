import { useEffect, useState } from "react"
import { SearchIcon } from "../components/icons/Svgs"
import PrincipalLayout from "../components/layouts/PrincipalLayout"
import { axiosMusic } from "../utils/configAxios"
import PlaylistList from "../components/playlist/PlaylistList"

const Playlist = () => {
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    axiosMusic
      .get("/api/playlists/me")
      .then(({ data }) => setPlaylists(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <PrincipalLayout>
      <form className="bg-white/20 p-4 px-4 rounded-md flex gap-4 items-center">
        <button>
          <SearchIcon />
        </button>
        <input
          className="bg-transparent outline-none flex-1" placeholder="Buscar"
          type="text"
          name="query"
          required
          autoComplete="off"
          size={8}
        />
      </form>
      <PlaylistList playlists={playlists} />
    </PrincipalLayout>
  )
}
export default Playlist