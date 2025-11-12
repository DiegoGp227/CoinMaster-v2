export const BaseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://api-coinmaster.devdiego.work";

export const LoginURL = new URL("/api/login", BaseURL);
