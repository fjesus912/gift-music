import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PlaylistPublic from './pages/PlaylistPublic'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import PlaylistDetail from './pages/PlaylistDetail'
import TrackDetail from './pages/TrackDetail'
import ArtistDetail from './pages/ArtistDetail'
import Page404 from './pages/Page404'
import PrivateRoutes from './components/auth/PrivateRoutes'

function App() {

  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/paylist/public/:id' element={<PlaylistPublic />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/playlist' element={<Playlist />} />
          <Route path='/playlist/:id' element={<PlaylistDetail />} />
          <Route path='/tracks/:id' element={<TrackDetail />} />
          <Route path='/artists/:id' element={<ArtistDetail />} />
        </Route>

        {/* 404 */}
        <Route path='*' element={<Page404 />} />

      </Routes>
    </>
  )
}

export default App
