export const API_URL = process.env.NEXT_PUBLIC_HOST_URL;
export const fetcher = (input: string) => {
  return fetch(API_URL + input, { credentials: "include" }).then((_res) => {
    return _res.json();
  });
};
