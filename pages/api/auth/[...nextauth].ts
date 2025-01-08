import NextAuth from "next-auth";
import type {DefaultSession, NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "@/config/firebaseConfig";

import Credentials from "next-auth/providers/credentials";
import { serverAuthRepository } from '@/services/auth_repository';
import {
  RefreshTokenResponse,
  SignUpResponse,
} from "../../../types/signUpResponse";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    token?: string;
    id?: string;
    expiresAt?: number; // Add expiration time for the user
  }

  interface Session {
    user: {
      token?: string;
      accessToken?: string;
      id?: string;
      expiresAt?: number; // Add expiration time for the session
    } & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
    id?: string;
    refreshToken?: string;
    expiresAt?: number; // Add expiration time for the JWT token
  }
}

export const authOptions: NextAuthOptions = {
  // debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "signIn",
      id: "signIn",
      credentials: {
        email: {label: "Email", type: "email", required: true},
        password: {label: "Password", type: "password", required: true},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          if (userCredential.user) {
            const loginResponse: SignUpResponse =
              await serverAuthRepository.login(
                userCredential.user.email!,
                userCredential.user.uid
              );

            // Add expiration date to the response (for example, set it to 1 hour from now)
            const expirationDate = Date.now() / 1000 + 3600 *24 *14; // Assuming token expires in 1 hour

            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              token: loginResponse.data!.token,
              expiresAt: expirationDate, // Store expiration date
            };
          } else {
            return null;
          }
        } catch (e: any) {
          console.error("CredentialsProvider authorize error:", e);
          throw new Error(e.message || "Invalid email or password");
        }
      },
    }),
    Credentials({
      name: "signUp",
      id: "signUp",
      credentials: {
        email: {label: "Email", type: "email", required: true},
        password: {label: "Password", type: "password", required: true},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          if (userCredential.user) {
            const loginResponse: SignUpResponse =
              await serverAuthRepository.signUp({
                email: userCredential.user.email!,
                uuid: userCredential.user.uid,
                name: userCredential.user.displayName,
                provider: userCredential.providerId?.toString(),
                image: userCredential.user.photoURL,
              });

            // Add expiration date to the response
            const expirationDate = Date.now() / 1000 +  3600 *24 *14; // 1 hour expiration

            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              token: loginResponse.data!.token,
              expiresAt: expirationDate, // Store expiration date
            };
          } else {
            return null;
          }
        } catch (e: any) {
          console.error("CredentialsProvider authorize error:", e);
          throw new Error(e.message || "Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({user, account}) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          let credential;

          if (account.provider === "google") {
            credential = GoogleAuthProvider.credential(account.id_token);
          } else if (account.provider === "facebook") {
            credential = FacebookAuthProvider.credential(account.access_token!);
          }

          if (!credential) {
            throw new Error("Unable to create Firebase credential");
          }

          // Sign in with Firebase credential
          const firebaseUserCredential = await signInWithCredential(
            auth,
            credential
          );
          const firebaseToken = await firebaseUserCredential.user.getIdToken();

          const expirationDate = Date.now() / 1000 + 3600 *24 *14; 

          let loginResponse: SignUpResponse;
          if (
            firebaseUserCredential.user.metadata.creationTime ===
            firebaseUserCredential.user.metadata.lastSignInTime
          ) {
            loginResponse = await serverAuthRepository.signUp({
              email: firebaseUserCredential.user.email!,
              uuid: firebaseUserCredential.user.uid,
              name: firebaseUserCredential.user.displayName,
              provider: account.provider,
              image: firebaseUserCredential.user.photoURL,
            });
          } else {
            loginResponse = await serverAuthRepository.login(
              firebaseUserCredential.user.email!,
              firebaseUserCredential.user.uid
            );
          }

          user.token = loginResponse.data!.token;
          user.email = firebaseUserCredential.user.email!;
          user.id = firebaseUserCredential.user.uid;
          user.expiresAt = expirationDate; // Set expiration time

          return true;
        } catch (error) {
          console.error("OAuth sign-in error:", error);
          return false;
        }
      }

      return true; // For other providers
    },
    async jwt({token, user, account}) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.expiresAt = user.expiresAt; // Store expiration time in JWT

        if (user.token) {
          token.refreshToken = user.token as string; // Or store the refresh token separately
        }
      }

      // Check if the access token is expired (you can set expiration time logic)
      const isTokenExpired =
        token?.accessToken &&
        Date.now() / 1000 >
          (typeof token?.expiresAt === "number" ? token.expiresAt : 0);

      if (isTokenExpired && token?.refreshToken) {
        // If token is expired, attempt to refresh it
        try {
          const refreshTokenResponse: RefreshTokenResponse =
            await serverAuthRepository.refreshToken(
              token.refreshToken as string
            );
          if (refreshTokenResponse.token) {
            token.accessToken = refreshTokenResponse.token; // Update access token with the new one
            token.expiresAt =
              Date.now() / 1000 + refreshTokenResponse.data.expiresIn; // Update expiration time
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }

      return token;
    },
    async session({session, token}) {
      if (token?.accessToken) {
        session.user.accessToken = token.accessToken as string;
      }
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.expiresAt) {
        session.user.expiresAt = token.expiresAt as number; // Add expiration date to session
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
