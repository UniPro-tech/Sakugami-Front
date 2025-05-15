"use client";
import * as React from "react";
import { SignInPage } from "@toolpad/core/SignInPage";
import { signIn as webauthnSignIn } from "next-auth/webauthn";
import { providerMap } from "@/auth";
import type { AuthProvider } from "@toolpad/core";
import serverSignIn from "./actions";

const signIn = async (provider: AuthProvider, formData: FormData, callbackUrl?: string) => {
  if (provider.id === "passkey") {
    try {
      return await webauthnSignIn("passkey", {
        email: formData.get("email"),
        callbackUrl: callbackUrl || "/",
      });
    } catch (error) {
      console.error(error);
      return {
        error: (error as Error)?.message || "Something went wrong",
        type: "WebAuthnError",
      };
    }
  }
  // Use server action for other providers
  return serverSignIn(provider, formData, callbackUrl);
};

export default function SignIn() {
  return (
    <SignInPage
      providers={providerMap}
      signIn={signIn}
    />
  );
}
