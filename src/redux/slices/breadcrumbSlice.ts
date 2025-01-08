// slices/breadcrumbSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types/breadcrumb.ts

export interface BreadcrumbItemType {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}
interface BreadcrumbState {
  breadcrumbLabels: { [key: string]: string };
}

const initialState: BreadcrumbState = {
  breadcrumbLabels: {},
};

const breadcrumbSlice = createSlice({
  name: "breadcrumbs",
  initialState,
  reducers: {
    setBreadcrumbLabel: (
      state,
      action: PayloadAction<{ path: string; label: string }>
    ) => {
      const { path, label } = action.payload;
      state.breadcrumbLabels[path] = label;
    },
    clearBreadcrumbs: (state) => {
      state.breadcrumbLabels = {};
    },
  },
});

export const { setBreadcrumbLabel, clearBreadcrumbs } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
