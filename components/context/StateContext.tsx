import { createContext, useState } from "react";

type Link = {
  title: string;
  url: string;
};
type Category = {
  title: string;
  color: string;
  links?: {
    [id: string]: Link;
  };
};
type ContextProps = {
  categories: {
    [id: string]: Category;
  } | null;
  setCategories: any;
};

export const StateContext = createContext<Partial<ContextProps>>({
  categories: null,
});

export const StateProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loadingState, setLoadingState] = useState(true);

  const updateLinks = (links: Data) => {
    const userId = getCurrentUserId();

    database
      .ref(`/users/${userId}`)
      .once("value")
      .then((snapshot) => {
        if (JSON.stringify(links) != JSON.stringify(snapshot.val())) {
          console.log("Firebase updated.");
          database.ref(`/users/${userId}`).set(links);
        }
      });
  };

  const addCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCategory: CategoryType = {
      title: title,
      color: color,
    };
    const uid = uuidv4();

    let newData = { ...data };
    newData.categories[uid] = newCategory;
    setData(newData);
    setAddingCategory(false);
    setTitle("");
    setColor("");
  };

  const updateCategory = (categoryId: string, newCategory: CategoryType) => {
    let newData = { ...data };
    newData.categories[categoryId] = newCategory;

    setData(newData);
  };

  const deleteCategory = (categoryId: string) => {
    let newData = { ...data };
    if (newData.categories) {
      delete newData.categories[categoryId];
    }

    setData(newData);
  };

  return (
    <StateContext.Provider value={{ categories, setCategories }}>
      {children}
    </StateContext.Provider>
  );
};
