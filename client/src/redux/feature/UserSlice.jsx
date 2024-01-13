import { createSlice } from "@reduxjs/toolkit";



const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const saveInLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState = {
  user: localStorage.getItem("user") ? getFromLocalStorage("user") : null,
  isRegister: localStorage.getItem("isRegister")
    ? localStorage.getItem("isRegister")
    : false,
  page: localStorage.getItem("page") ? getFromLocalStorage("page") : 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegister: (state, action) => {
      state.isRegister = action.payload;
      saveInLocalStorage("isRegister", state.isRegister);
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
      saveInLocalStorage("user", state.user);
    },
    logout: (state, action) => {
      state.user = null;
      saveInLocalStorage("user", null);
    },
    updatePage: (state, action) => {
      if (action.payload == "next" && state.page != 3) {
        state.page += 1;
      } else if (action.payload == "back" && state.page != 1) {
        state.page -= 1;
      }
      saveInLocalStorage("page", state.page);
    },
  },
});

export const { userRegister, setUserInfo, logout, updatePage } =
  userSlice.actions;

export default userSlice.reducer;
