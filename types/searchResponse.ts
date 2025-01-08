export interface SearchResponse {
  success: boolean;
  data: Data;
  message: string;
}

export interface Data {
  categories: any[];
  parts: Part[];
  oemnumbers: OemNumber[];
  partbrands: any[];
}

export interface Part {
  articleid: number;
  genericarticlename: string;
  brandname: string;
  articleno: string;
  categoryname: string;
  name: string;
  imgurl: string;
}
export interface Category {
  categoryid: number;
  name: string;
  image: Images;
  categoryname: string;
  imgurl: string;
}
export interface Images {
  imgurl200: string;
  imgurl400: string;
}

export interface OemNumber {
  oemnumber: string;
  articleid: number;
  brandname: string;
}
