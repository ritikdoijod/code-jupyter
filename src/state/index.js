import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  user: null,
  token: null,
  files: [],
  editorText: "",
  editor: {
    text: "",
    lang: { name: "Python", elang: "python", clang: "python" },
    openedFile: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.files = [];
      state.editorText = "";
    },

    setFiles: (state, action) => {
      state.files = action.payload.files;
    },

    setEditorText: (state, action) => {
      state.editor.text = action.payload.text;
    },

    setEditorLang: (state, action) => {
      state.editor.lang = action.payload.lang;
    },

    setOpenedFile: (state, action) => {
      state.editor.openedFile = action.payload.file;
    },
  },
});

export const {
  setTheme,
  login,
  logout,
  setFiles,
  setEditorText,
  setEditorLang,
  setOpenedFile
} = authSlice.actions;
export default authSlice.reducer;
