import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8080", // API Gateway URL
});

export const { signIn, signUp, signOut, useSession } = authClient;
