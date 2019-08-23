function resolveOptions(options?: RequestInit): RequestInit {
  const opts = options || {};
  const headers =
    opts.headers ||
    (opts.body instanceof FormData
      ? {}
      : { Accept: 'application/json', 'Content-Type': 'application/json' });

  return { ...opts, headers };
}

export default async function fetchFromServer(
  url: string,
  options?: RequestInit
) {
  const opts = resolveOptions(options);

  try {
    const response = await fetch(`/api${url}`, {
      method: 'GET',
      ...opts
    });

    const data = await response.json();

    return data;
  } catch (error) {
    const errorMessage = error.message as string;

    return { success: false, data: null, errorMessage };
  }
}
