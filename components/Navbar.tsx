"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link";

const NAV_LINKS = ["Tools", "Features", "Why Choose", "Pricing", "FAQ"] as const

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070b16]/95 backdrop-blur supports-[backdrop-filter]:bg-[#070b16]/80">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3" aria-label="RYNOVIX home">
          <Image
            src="/logo.png"
            alt="RYNOVIX Logo"
            width={60}
            height={60}
            priority
            className="h-[60px] w-[60px]"
          />

          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-[0.18em] text-white">
              RYNOVIX
            </span>

            <span className="mt-1 text-[11px] font-medium tracking-wide text-white/45">
              AI Creator Platform
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[15px] font-medium text-white/75 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}

          <button
            type="button"
            className="flex items-center gap-1 text-[15px] font-medium text-white/75 transition-colors hover:text-white"
          >
            Resources
            <ChevronDown className="h-4 w-4 text-white/50" />
          </button>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
  href="/login"
  className="rounded-lg border border-white/15 px-5 py-2.5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
>
  Login
</Link>

          <Link
  href="/signup"
  className="rounded-lg bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] px-5 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-[#4338ca] hover:to-[#2563eb] hover:shadow-blue-600/40"
>
  Get Started Free
</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/80 transition-colors hover:bg-white/5 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#070b16] px-4 py-4 sm:px-6 lg:hidden">
          <nav className="flex flex-col gap-1">

            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="rounded-md px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link}
              </a>
            ))}

            <button
              type="button"
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              Resources
              <ChevronDown className="h-4 w-4 text-white/50" />
            </button>

          </nav>

          <div className="mt-4 flex flex-col gap-3">

            <button
              type="button"
              className="w-full rounded-lg border border-white/15 px-5 py-2.5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full rounded-lg bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] px-5 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-[#4338ca] hover:to-[#2563eb]"
            >
              Get Started Free
            </button>

          </div>
        </div>
      )}
    </header>
  )
}