interface Link {
  category: string;
  title: string;
  url: string;
}
export interface Category {
  title: string;
  color: string;
  id: string;
  links: Link[];
}
export interface Data {
  categories: {
    [id: string]: Category;
  };
}
