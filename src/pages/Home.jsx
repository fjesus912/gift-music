import { useEffect, useState } from "react"
import { SearchIcon } from "../components/icons/Svgs"
import { axiosMusic } from "../utils/configAxios"
import TrackList from "../components/shared/TrackList"
import PrincipalLayout from "../components/layouts/PrincipalLayout"

const Home = () => {

  const [tracksRecommendations, setTracksRecommendations] = useState([])

  const [searchTracks, setSearchTracks] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const query = (formData.get("query"))
    const limit = (formData.get("limit"))

    axiosMusic
      .get(`/api/tracks?limit=${limit}&q=${query}`)
      .then(({ data }) => setSearchTracks(data.tracks.items))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axiosMusic
      .get("/api/tracks/recommendations?seed_genres=rock,romance")
      .then(({ data }) => setTracksRecommendations(data.tracks))
      .catch((err) => console.log(err))
  }, [])

  return (
    <PrincipalLayout>
      <form onSubmit={handleSubmit} className="bg-white/20 p-4 px-4 rounded-md flex gap-4 items-center">
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
        <select name="limit" className="bg-transparent [&>option]:text-black outline-none">
          <option>5</option>
          <option>7</option>
          <option>10</option>
          <option>12</option>
        </select>
      </form>
      <TrackList tracks={searchTracks.length === 0 ? tracksRecommendations : searchTracks} />
    </PrincipalLayout>
  )
}
export default Home