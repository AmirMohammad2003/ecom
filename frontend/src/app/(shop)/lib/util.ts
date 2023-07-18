export const API_URL = process.env.NEXT_PUBLIC_HOST_URL;
export const fetcher = (input: string) =>
  _fetcher({ input: input, credentials: "include" });

export const fetcherPost = (input: string) => _fetcher({input: input, credentials: "include", method: "post"});

const _fetcher = ({
  input,
  ...args
}: {
  input: string;
  args: { method: string; credentials: string };
}) => {
  return fetch(API_URL + input, { ...args }).then((_res) => _res.json());
};
