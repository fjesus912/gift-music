import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/configAxios";

const initialState = {
  name: "",
  email: "",
  token: "",
}

const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : initialState,
  reducers: {
    login: (state, action) => {
      const data = action.payload
      const newState = { ...state, ...data}
      localStorage.setItem("userInfo", JSON.stringify(newState))
      return{...state, ...data}
    },
    logOut: () => {
      localStorage.removeItem("userInfo")
      return initialState
    }
  }
})

export const { login, logOut } = userSlice.actions

export default userSlice.reducer

export const loginThunk = (data) => (dispatch) => {
  axiosMusic
    .post("/api/auth/login", data)
    .then(({ data }) => dispatch(login(data)))
    .catch((err) => console.log(err))
}