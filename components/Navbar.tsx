"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"

const NAV_LINKS = [
  { label: "Tools", href: "/#all-tools" },
  { label: "Features", href: "/#features" },
  { label: "Why Choose", href: "/#why-choose" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/#faq" },
] as const

const RESOURCE_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Help Center", href: "/help" },
  { label: "Community", href: "/community" },
  { label: "Updates", href: "/updates" },
] as const

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  const resourcesRef = useRef<HTMLDivElement>(null)

  // Close Resources dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(event.target as Node)
      ) {
        setResourcesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070b16]/95 backdrop-blur supports-[backdrop-filter]:bg-[#070b16]/80">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="RYNOVIX home"
          onClick={() => {
            setMobileOpen(false)
            setResourcesOpen(false)
          }}
        >
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
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setResourcesOpen(false)}
              className="text-[15px] font-medium text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          {/* Resources Dropdown */}
          <div
            ref={resourcesRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              className="flex items-center gap-1 text-[15px] font-medium text-white/75 transition-colors hover:text-white"
              aria-expanded={resourcesOpen}
              aria-haspopup="menu"
            >
              Resources

              <ChevronDown
                className={`h-4 w-4 text-white/50 transition-transform duration-200 ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {resourcesOpen && (
              <div
                className="absolute right-0 top-full mt-4 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#080d1f]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
                role="menu"
              >
                {RESOURCE_LINKS.map((resource) => (
                  <Link
                    key={resource.label}
                    href={resource.href}
                    onClick={() => setResourcesOpen(false)}
                    className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                    role="menuitem"
                  >
                    <span>{resource.label}</span>

                    <ChevronDown className="h-4 w-4 -rotate-90 text-white/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            onClick={() => setResourcesOpen(false)}
            className="rounded-lg border border-white/15 px-5 py-2.5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            Login
          </Link>

          <Link
            href="/signup"
            onClick={() => setResourcesOpen(false)}
            className="rounded-lg bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] px-5 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-[#4338ca] hover:to-[#2563eb] hover:shadow-blue-600/40"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen((v) => !v)
            setResourcesOpen(false)
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/80 transition-colors hover:bg-white/5 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
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
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#070b16] px-4 py-4 sm:px-6 lg:hidden"
        >
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMobileOpen(false)
                  setResourcesOpen(false)
                }}
                className="rounded-md px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Resources */}
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              aria-expanded={resourcesOpen}
            >
              <span>Resources</span>

              <ChevronDown
                className={`h-4 w-4 text-white/50 transition-transform duration-200 ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mobile Resource Links */}
            {resourcesOpen && (
              <div className="ml-3 border-l border-white/10 pl-3">
                {RESOURCE_LINKS.map((resource) => (
                  <Link
                    key={resource.label}
                    href={resource.href}
                    onClick={() => {
                      setMobileOpen(false)
                      setResourcesOpen(false)
                    }}
                    className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <span>{resource.label}</span>

                    <ChevronDown className="h-4 w-4 -rotate-90 text-white/20" />
                  </Link>
                ))}
              </div>
            )}
          </nav>

          {/* Mobile Buttons */}
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => {
                setMobileOpen(false)
                setResourcesOpen(false)
              }}
              className="w-full rounded-lg border border-white/15 px-5 py-2.5 text-center text-[15px] font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => {
                setMobileOpen(false)
                setResourcesOpen(false)
              }}
              className="w-full rounded-lg bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] px-5 py-2.5 text-center text-[15px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-[#4338ca] hover:to-[#2563eb] hover:shadow-blue-600/40"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}