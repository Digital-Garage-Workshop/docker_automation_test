
import axios from "axios";
import { RefreshTokenResponse, SignUpResponse } from "../../types/signUpResponse";

const API_BASE_URL = process.env.NEXT_PUBLIC_URL_API;
// const API_BASE_URL = process.env.NEXT_PUBLIC_TEST_URL_API;

export const serverAuthRepository = {
  login: async (email: string, uuid: string): Promise<SignUpResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/social/login`, {
        email,
        uuid,
      });
      return response.data;
    } catch (error: any) {
      console.error("Login API error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  },

  signUp: async (userData: {
    email: string;
    uuid: string;
    name: string | null;
    provider?: string;
    image?: string | null;
  }): Promise<SignUpResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/social/signup`,
        userData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Refresh token error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || error.message || "Token refresh failed"
      );
    }
  },
};