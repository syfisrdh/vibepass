"use client";

import axios from 'axios'
import { SignupForm } from "@/components/auth/signup-form"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/auth/useAuthStore";
import { AuroraBackground } from '@/components/ui/aurora-background';

interface User {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login: authLogin } = useAuth();

  const handleLogin = async (user: User) => {
    try {
      const response = await axios.post('http://localhost:4000/auth/signup', user);
      const { accessToken, user: userData } = response.data;
      authLogin(accessToken, userData);
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }

  return (
    <AuroraBackground className="relative w-full h-screen">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 self-center font-medium">
            <div className="text-primary-foreground flex items-center justify-center rounded-md z-50">
              <Image src="/logo-horizontal.webp" alt="Logo" width={180} height={180} />
            </div>
          </Link>
          <SignupForm onSignup={handleLogin} />
        </div>
      </div>
    </AuroraBackground>
  )
}