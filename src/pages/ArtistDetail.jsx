import { useEffect } from "react"
import PrincipalLayout from "../components/layouts/PrincipalLayout"
import { axiosMusic } from "../utils/configAxios"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState } from "react"
import "swiper/css"
import TrackCard from "../components/shared/TrackCard"

const ArtistDetail = () => {
  const [artistInfo, setArtistInfo] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    axiosMusic
      .get(`/api/artists/${id}`)
      .then(({ data }) => setArtistInfo(data)
      )
      .catch((err) => console.log(err))
  }, [id])

  console.log(artistInfo)

  return (
    <PrincipalLayout>
      <header className="grid gap-4 mb-8 sm:grid-cols-2 sm:items-center">
        <div>
          <img
            className="block mx-auto rounded-full"
            src={artistInfo?.images[1].url}
            alt="" />
        </div>
        <ul className="grid gap-1">
          <li>
            <h3 className="text-lg font-semibold">{artistInfo?.name}</h3>
          </li>
          <li>
            <h3 className="text-sm font-semibold">Seguidores: <span className="text-slate-400">{artistInfo?.followers.total}</span></h3>
          </li>
          <li className="text-sm">
            <h3 className="font-semibold">Popularidad: <span className="text-slate-400">{artistInfo?.popularity}</span></h3>
          </li>
          <h3 className="text-sm font-semibold">Géneros:</h3>
          {
            artistInfo?.genres.map((genre) => (
              <li key={genre} className="text-xs border border-[#886AE2] rounded-full mx-auto px-4 font-semibold uppercase">
                {genre}
              </li>
            ))
          }
        </ul>
      </header>


      <h3 className="uppercase font-bold text-sm mb-4">Otros discos del artista:</h3>
      <section className="mb-4">
        <Swiper
          className="mySwiper" breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            500: {
              slidesPerView: 3,
              spaceBetween: 15,
            }
          }}
        >
          {
            artistInfo?.albums.map((album) => (
              <SwiperSlide key={album.id}>
                <article className="text-sm grid gap-[2px]">
                  <header className="rounded-xl overflow-hidden">
                    <img src={album.images[1].url} alt="" />
                  </header>
                  <h5 className="line-clamp-1 font-semibold">{album.name}</h5>
                  <span className="line-clamp-1 text-slate-400">{album.artists[0].name}</span>
                </article>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </section>

      <section>
        <h4 className="uppercase font-bold text-sm mb-4">Top 10 canciones:</h4>
        <div>
          {
            artistInfo?.songsTop.map((song) => <TrackCard key={song.id} track={song} showAddBtn />)
          }
        </div>
      </section>
    </PrincipalLayout>
  )
}
export default ArtistDetail