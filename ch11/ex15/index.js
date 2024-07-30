export function modifyUrl({ base, addQuery = [], path = "" }) {
  if (!base.startsWith("http://") && !base.startsWith("https://")) {
    throw new Error();
  }

  const url = new URL(base);

  if (path) {
    if (path.startsWith("/")) {
      url.pathname = path;
    } else {
      url.pathname = `/${path}`;
    }
  }

  for (const [key, value] of addQuery) {
    url.searchParams.append(key, value);
  }
  return url.toString();
}
