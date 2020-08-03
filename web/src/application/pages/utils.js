import * as pages from ".";

export const convertPageToMenu = (page) => {
  return {
    ...(page.menu || {}),
    key: page.key,
    path: !!page.menu && page.menu.link ? page.menu.link : page.path,
    isAnonymousPage: page.isAnonymousPage || false,
  };
};

export const convertConfigToPage = (config) => {
  const { menu, ...page } = config;
  return {
    ...page,
  };
};

export const getPublicMenus = () => {
  return Object.keys(pages)
    .filter((pageKey) => {
      const page = pages[pageKey];
      return (!page.auth && !!page.menu) || page.auth === "*";
    })
    .map((pageKey) => convertPageToMenu(pages[pageKey]));
};

export const getPrivateMenus = () => {
  const list = Object.keys(pages)
    .filter((pageKey) => {
      const page = pages[pageKey];

      return !!page.auth && page.auth === true && !!page.menu;
    })
    .map((pageKey) => convertPageToMenu(pages[pageKey]));

  return list;
};

export const getPublicPages = () => {
  return Object.keys(pages)
    .filter((pageKey) => {
      const page = pages[pageKey];
      return !page.auth || page.auth === false || page.auth === "*";
    })
    .map((pageKey) => convertConfigToPage(pages[pageKey]));
};

export const getPrivatePages = () => {
  return Object.keys(pages)
    .filter((pageKey) => {
      const page = pages[pageKey];
      return (!!page.auth && page.auth === true) || page.auth === "*";
    })
    .map((pageKey) => convertConfigToPage(pages[pageKey]));
};
