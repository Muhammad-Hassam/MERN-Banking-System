import { SidebarSlice } from "./slice/slidebarSlice";
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    [SidebarSlice.name]: SidebarSlice.reducer
  }
});
