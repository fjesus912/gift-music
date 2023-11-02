import { Link, useNavigate } from "react-router-dom"
import ContainerAuth from "../components/layouts/ContainerAuth"
import { axiosMusic } from "../utils/configAxios"

const Register = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log(data)

    axiosMusic
      .post("/api/auth/register", data)
      .then(() => {
        window.alert("Usuario registrado correctamente, ingresa en el login")
        navigate("/login")
      })
      .catch((err) => console.log(err))
  }

  return (
    <ContainerAuth>
      {/* Banner imagen */}
      <div className="pl-6 hidden md:block">
        <img className="max-w-[350px]" src="/images/banner-register.png" alt="" />
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="grid gap-9 w-[min(100%,_300px)] mx-auto items-center">
        <h1 className="text-3xl font-semibold">CUENTA NUEVA</h1>

        <label className="grid gap-5">
          <span className="text-white/50 text-sm">E-mail</span>
          <input
            className="bg-transparent border-b border-secondary outline-none"
            type="email"
            name="email"
          />
        </label>

        <label className="grid gap-5">
          <span className="text-white/50 text-sm">Nombre de usuario</span>
          <input
            className="bg-transparent border-b border-secondary outline-none"
            type="text"
            name="name"
          />
        </label>

        <label className="grid gap-5">
          <span className="text-white/50 text-sm">Contraseña</span>
          <input
            className="bg-transparent border-b border-secondary outline-none"
            type="password"
            name="password"
          />
        </label>

        <button
          className="bg-primary-light rounded-full py-1 px-10 max-w-max mx-auto uppercase text-sm font-semibold shadow-lg shadow-purple-400/40 hover:tracking-widest transition-all mt-6" type="submit">Crear</button>
        <Link className="text-center underline" to="/login">O iniciar sesión</Link>
      </form>
    </ContainerAuth>
  )
}
export default Register