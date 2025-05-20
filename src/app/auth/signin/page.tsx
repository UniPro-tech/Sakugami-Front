"use client";
import * as React from "react";
import { SignInPage } from "@toolpad/core/SignInPage";
import { signIn as webauthnSignIn } from "next-auth/webauthn";
import { providerMap } from "@/auth";
import type { AuthProvider } from "@toolpad/core";
import serverSignIn from "./actions";

import type { AuthResponse } from "@toolpad/core";

const signIn = async (
  provider: AuthProvider,
  formData: FormData,
  callbackUrl?: string
): Promise<AuthResponse> => {
  if (provider.id === "passkey") {
    try {
      const result = await webauthnSignIn("passkey", {
        email: formData.get("email"),
        callbackUrl: callbackUrl || "/",
      });
      // resultがAuthResponse型でなければエラーを返す
      if (!result || typeof result !== "object" || !("ok" in result || "error" in result)) {
        return {
          error: "Invalid response from WebAuthn signIn",
        };
      }
      return result as AuthResponse;
    } catch (error) {
      console.error(error);
      return {
        error: (error as Error)?.message || "Something went wrong",
      };
    }
  }
  // Use server action for other providers
  const result = await serverSignIn(provider, formData, callbackUrl);
  // serverSignInがundefined返す可能性があるので、必ずAuthResponse返すようにする
  if (!result || typeof result !== "object" || !("ok" in result || "error" in result)) {
    return {
      error: "Invalid response from server signIn",
    };
  }
  return result as AuthResponse;
};

export default function SignIn() {
  return (
    <SignInPage
      providers={providerMap}
      signIn={signIn}
    />
  );
}
