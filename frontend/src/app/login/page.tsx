"use client";

import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import Image from "next/image"
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function LoginPage() {
  return (
    <AuroraBackground className="relative w-full h-screen">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm flex-col gap-3 flex">
          <Link href="/" className="flex items-center gap-2 self-center font-medium">
            <div className="text-primary-foreground flex items-center justify-center rounded-md">
              <Image src="/logo-horizontal.webp" alt="Logo" width={180} height={180} className="z-50" />
            </div>
          </Link>
          <LoginForm />
        </div>
      </div>
    </AuroraBackground>
  )
}
