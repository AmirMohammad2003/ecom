export const API_URL = process.env.NEXT_PUBLIC_HOST_URL;
export const fetcher = (input: string) =>
  _fetcher({ input: input, credentials: "include" });

export const fetcherPost = (input: string) =>
  _fetcher({ input: input, credentials: "include", method: "post" });

export const fetcherPostJson = ({
  input,
  body,
}: {
  input: string;
  body: Object;
}) =>
  _fetcher({
    input: input,
    credentials: "include",
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

const _fetcher = ({
  input,
  ...args
}: {
  input: string;
  args: { method: string; credentials: string; body?: string; headers?: any };
}) => {
  return fetch(API_URL + input, { ...args }).then((_res) => _res.json());
};
