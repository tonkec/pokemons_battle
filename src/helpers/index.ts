export const getIdFromUrl = (url: string) => {
  return url.match(/\/(\d+)\/$/)?.[1];
};
