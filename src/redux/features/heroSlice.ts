import { heroStats, type HeroStatItem } from "@/data/HeroData";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HeroState {
  stats: HeroStatItem[];
}

const initialState: HeroState = {
  stats: heroStats,
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<HeroStatItem[]>) => {
      state.stats = action.payload;
    },
    updateStat: (
      state,
      action: PayloadAction<{ id: string; value?: string; label?: string }>
    ) => {
      const index = state.stats.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        if (action.payload.value !== undefined) {
          state.stats[index].value = action.payload.value;
        }
        if (action.payload.label !== undefined) {
          state.stats[index].label = action.payload.label;
        }
      }
    },
  },
});

export const { setStats, updateStat } = heroSlice.actions;
export default heroSlice.reducer;
