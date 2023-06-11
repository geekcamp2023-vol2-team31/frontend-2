const requests = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const req = await fetch(input, init);
  return (await req.json()) as unknown as T;
};

export { requests };
