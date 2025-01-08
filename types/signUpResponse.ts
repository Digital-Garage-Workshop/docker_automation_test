// models/SignUpResponse.ts

export interface SignUpResponse {
  success: boolean;
  message?: string;
  data?: {
    userId: string;
    name?: string;
    token: string;
    refreshtoken?: string;
  };
}
export interface RefreshTokenResponse {
  token: unknown;
  success: boolean;
  data: {
    token: string;
    expiresIn: number;
  };
  message: string;
}
