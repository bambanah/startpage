export interface Link {
  title: string;
  url: string;
}
export interface Category {
  title: string;
  color: string;
  links?: {
    [id: string]: Link;
  };
}
export interface Data {
  categories: {
    [id: string]: Category;
  };
}
