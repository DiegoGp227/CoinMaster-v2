export const BaseURL =
  process.env.NEXT_PUBLIC_API_URL || "";

export const LoginURL = new URL("/api/login", BaseURL);
