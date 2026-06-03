import type { LoginPayload, LoginResponse } from "../types/authTypes";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    await new Promise((reslove) => setTimeout(reslove, 500));

    if (payload.email === "admin@test.com" && payload.password === "123456") {
      return {
        user: {
          id: "1",
          name: "Admin",
          email: payload.email,
          role: "admin",
        },
        token: "fake-access-token",
        refreshToken: "fake-refresh-token",
      };
    }
    throw "Invalid email or password";
  },

  refreshToken: async (): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return "new-fake-access-token";
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};
