interface Data {
  allUserCategories: {
    edges: [];
  };
  allUserLinks: {
    edges: [];
  };
}

export interface Link {
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

export default function formatFirebaseData(data: Data) {
  let userCategories: { [id: string]: Category } = {};
  data.allUserCategories.edges.map((edge: { node: Category }) => {
    const id = edge.node.id;
    userCategories[id] = edge.node;
    userCategories[id].links = [];
  });

  data.allUserLinks.edges.map((edge: { node: Link }) => {
    const link = edge.node;

    userCategories[link.category].links.push(link);
  });

  return userCategories;
}
