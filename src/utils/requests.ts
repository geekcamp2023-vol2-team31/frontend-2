// 環境変数 NEXT_PUBLIC_BACKEND_BASE_URL が設定されている必要がある
let baseURL = "";
if (process.env && process.env["NEXT_PUBLIC_BACKEND_BASE_URL"]) {
  baseURL = process.env["NEXT_PUBLIC_BACKEND_BASE_URL"];
}

const requests = async <T = unknown>(
  path: string, // リクエストのパス 例: "/users/me"
  init?: RequestInit | undefined
) => {
  if (
    init?.method &&
    ["POST", "PUT", "PATCH", "DELETE"].includes(init.method)
  ) {
    init.headers = { ...init.headers, "Content-Type": "application/json" };
  }
  const req = await fetch(`${baseURL}${path}`, {
    credentials: "include",
    ...(init ?? {}),
  });
  return (await req.json()) as unknown as T;
};

export { requests };
