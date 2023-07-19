import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const API_URL = process.env.NEXT_PUBLIC_HOST_URL;
export const fetcher = async (input: string) =>
  _fetcher({ input: input, credentials: "include" });

export const fetcherPost = async (input: string) =>
  _fetcher({ input: input, credentials: "include", method: "post" });

export const fetcherPostJson = async ({
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

const _fetcher = async ({
  input,
  ...args
}: {
  input: string;
  args: { method: string; credentials: string; body?: string; headers?: any };
}) => {
  const _res = await fetch(API_URL + input, { ...args });
  if (!_res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await _res.json();
    error.status = _res.status;
    throw error;
  }
  return _res.json();
};

export const makeCookies = (cookies: ReadonlyRequestCookies) => {
  return cookies
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};
