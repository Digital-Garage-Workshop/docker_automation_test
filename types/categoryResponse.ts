export interface Image {
  imgurl400: string;
  imgurl800: string;
}

export interface Category {
  categoryid: number;
  name: string;
  image: Image;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
  message: string;
}
