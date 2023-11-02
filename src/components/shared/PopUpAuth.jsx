import { Link } from "react-router-dom"
import { LogOutIcon, NavPlayIcon } from "../icons/Svgs"
import { logOut } from "../../store/slices/user.slice"
import { useDispatch } from "react-redux"

const PopUpAuth = ({ isShowAuth }) => {
  const dispatch = useDispatch()

  const handleLogOut = () => dispatch(logOut())

  return (
    <nav className={`fixed top-24 bg-primary-light uppercase grid p-4 gap-1 rounded-md justify-start font-semibold border border-secondary ${isShowAuth ? "right-10" : "-right-full"} transition-all`}
    >
      <Link className="flex gap-2 hover:text-[#3E14B5] items-center group transition-colors" to="/playlist">
        <NavPlayIcon /> Mis grabaciones
      </Link>
      <button onClick={handleLogOut} className="uppercase flex gap-2 hover:text-[#3E14B5] items-center group transition-colors">
        <LogOutIcon /> Cerrar sesión
      </button>
    </nav>
  )
}
export default PopUpAuth