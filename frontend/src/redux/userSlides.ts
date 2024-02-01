import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'sofi',
  email: 'sofi@bonita.com'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, email } = action.payload

      state.name = name
      state.email = email
    },
    changeEmail: (state, action) => {
      state.email = action.payload
    }
  }
})

export const { addUser, changeEmail } = userSlice.actions
export default userSlice.reducer
