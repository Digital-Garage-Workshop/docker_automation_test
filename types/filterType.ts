// src/types/index.ts

export interface Option {
  attrvalueid: number;
  name: string;
}

export interface FilterCategory {
  name: string;
  options: Option[];
}

export interface Product {
  articleid: number;
  category: string;
  // Add other relevant fields based on your data structure
}

export interface CarState {
  carId: number;
  // Add other relevant fields if necessary
}
