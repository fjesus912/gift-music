import { createSlice } from "@reduxjs/toolkit";

const playlistCartSlice = createSlice({
  name: "playlistCart",
  initialState: {
    tracks: [],
  },
  reducers: {
    addTrack: (state, action) => {
      const newTrack = action.payload
      const indexTrack = state.tracks.findIndex((track) => track.id === newTrack.id)
      if (indexTrack === -1) {
        state.tracks.push(newTrack)
      } else {
        return state
      }
    },
    removeTrack: (state, action) => {
      const idTrackToDelete = action.payload
      const newTracks = state.tracks.filter((track) => track.id !== idTrackToDelete)
      state.tracks = newTracks
    },
    clearTracks: (state) => {
      state.tracks = []
    }
  }
})

export const { addTrack, removeTrack, clearTracks } = playlistCartSlice.actions

export default playlistCartSlice.reducer