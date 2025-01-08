import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface attr {
  name:string;
  attrvalueid:number;
  unit:any;
  icon:any;
}

interface FilterState {
  attrValueIds: attr[];
  articleIds: any[];
  categoryName: string;
  found: number;
  categoryIdProduct: string;
  partBrand : string|null;
  attrValueNames: string[]
  // mainCategoryId : number;
}

const initialState: FilterState = {
  attrValueIds: [],
  articleIds: [],
  categoryName: "",
  found: 0,
  categoryIdProduct: "",
  partBrand:null,
  attrValueNames:[]
  // mainCategoryId : 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setAttrValueIds(state, action: PayloadAction<any[]>) {
      state.attrValueIds = action.payload;
    },
    setAttrValueNames(state, action: PayloadAction<any[]>) {
      state.attrValueNames = action.payload;
    },
    setArticleIds(state, action: PayloadAction<any[]>) {
      state.articleIds = action.payload;
    },
    setCategoryName(state, action: PayloadAction<string>) {
      state.categoryName = action.payload;
    },
    setCategoryIdProduct(state, action: PayloadAction<string>) {
      state.categoryIdProduct = action.payload;
    },
    setFound(state, action: PayloadAction<number>) {
      state.found = action.payload;
    },
    setBrands(state, action: PayloadAction<string|null>) {
      state.partBrand = action.payload;
    },
    // setMainCategoryId(state, action: PayloadAction<number>) {
    //   state.mainCategoryId = action.payload;
    // },
    resetFilters(state) {
      state.attrValueIds = [];
      state.articleIds = [];
      state.categoryName = "";
      state.found = 0;
      state.partBrand = "";
      state.attrValueNames=[]
    },
  },
});

export const {
  setAttrValueIds,
  setArticleIds,
  setCategoryName,
  setFound,
  resetFilters,
  setCategoryIdProduct,
  setBrands,
  setAttrValueNames,
  // setMainCategoryId,
} = filterSlice.actions;

export default filterSlice.reducer;
