"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { Particles } from "@/components/ui/particles"
import { useToast } from "@/components/ui/toast-provider"
import { Hero } from "@/components/landing-page/hero"
import { Features } from "@/components/landing-page/features"
import { HowItWorks } from "@/components/landing-page/howItWorks";
import { EventsShowcase } from "@/components/landing-page/eventShowcase";
import { CallToAction } from "@/components/landing-page/callToAction";
import { Footer } from "@/components/landing-page/footer";

export default function Home() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")
  const { toast } = useToast()

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  return (
    <Particles
      className="relative h-screen w-full"
      quantity={100}
      ease={80}
      color={color}
    >
      <div className="min-h-screen">
        <Hero />
        <Features />
        <HowItWorks />
        <EventsShowcase />
        <CallToAction />
        <Footer />
      </div>
    </Particles>
  )
}