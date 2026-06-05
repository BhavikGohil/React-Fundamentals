import { supabase } from "./supabaseClient";
import type { LoginPayload, LoginResponse } from "../types/authTypes";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error || !data.session || !data.user.email) {
      throw error?.message || "Invalid email or password";
    }

    return {
      user: {
        id: data.user.id,
        name: data.user.email.split("@")[0],
        email: data.user.email,
        role: "admin",
      },
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  },

  refreshToken: async (): Promise<string> => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error || !data.session) throw "Session expired. Please login again.";
    return data.session.access_token;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },
};