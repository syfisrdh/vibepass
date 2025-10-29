"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import { Particles } from "@/components/ui/particles"
import { useToast } from "@/components/ui/toast-provider"
import { Hero } from "@/components/landing-page/hero"
import { Features } from "@/components/landing-page/features"
import { HowItWorks } from "@/components/landing-page/howItWorks";
import { EventsShowcase } from "@/components/landing-page/eventShowcase";
import { CallToAction } from "@/components/landing-page/callToAction";
import { Footer } from "@/components/landing-page/footer";
import Link from "next/link"
import { navItems } from "@/lib/nav-items"

export default function Home() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")
  const { toast } = useToast()

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Particles
      className="relative h-screen w-full"
      quantity={100}
      ease={80}
      color={color}
    >
      <div className="min-h-screen">
        <Navbar>
          <NavBody>
            <NavbarLogo />
            <NavItems />
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
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