import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isMobileMenuOpen: boolean;
  activeTab: string;
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  activeTab: "overview",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleMobileMenu, setMobileMenuOpen, setActiveTab } =
  uiSlice.actions;
export default uiSlice.reducer;
