import { jwtDecode } from "jwt-decode";
import SecureStorageService from "./SecureStorageService";

const TOKEN_KEY = "authToken";

type JwtPayload = {
  sub: string;
  exp: number;
  iat?: number;
  email: string;
  UserId: string;
  unique_name: string;
};

class TokenService {
  static async saveToken(token: string): Promise<void> {
    console.log("Saving token: ", token);
    try {
      await SecureStorageService.setItem<string>(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving token:", error);
    }

    console.log("Token saved:");
    await this.saveUserFromToken();
  }

  static async saveUserFromToken(): Promise<void> {
    console.log("Saving user from token:");
    const claims = await this.getClaims();
    if (claims) {
      const { unique_name, email, UserId } = claims;
      const userProfile = { unique_name, email, UserId };
      console.log("User Profile:", userProfile);
      await SecureStorageService.setItem("userProfile", userProfile);
    }
  }

  static async getToken(): Promise<string | null> {
    return await SecureStorageService.getItem<string>(TOKEN_KEY);
  }

  static async deleteToken(): Promise<void> {
    await SecureStorageService.removeItem(TOKEN_KEY);
  }

  static async hasToken(): Promise<boolean> {
    return await SecureStorageService.hasItem(TOKEN_KEY);
  }

  static async isExpired(): Promise<boolean> {
    const token = await this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000;
      return decoded.exp < now;
    } catch (e) {
      console.error("Invalid JWT token", e);
      return true;
    }
  }

  static async getClaims(): Promise<JwtPayload | null> {
    const token = await this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (e) {
      console.error("Failed to decode JWT claims", e);
      return null;
    }
  }
}

export default TokenService;
