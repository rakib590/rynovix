
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Tools", href: "/#all-tools" },
  { label: "Features", href: "/#features" },
  { label: "Why Choose", href: "/#why-choose" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
] as const;

const RESOURCE_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Help Center", href: "/help" },
  { label: "Community", href: "/community" },
  { label: "Updates", href: "/updates" },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const resourcesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;

      if (resourcesRef.current?.contains(target)) {
        return;
      }

      if (mobileMenuRef.current?.contains(target)) {
        return;
      }

      setResourcesOpen(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setResourcesOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      setResourcesOpen(false);
    }
  }, [mobileOpen]);

  function closeMenus() {
    setMobileOpen(false);
    setResourcesOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070b16]/95 backdrop-blur-xl supports-[backdrop-filter]:bg-[#070b16]/85">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-20 sm:gap-6 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          aria-label="RYNOVIX home"
          onClick={closeMenus}
        >
          <Image
            src="/logo.png"
            alt="RYNOVIX Logo"
            width={60}
            height={60}
            priority
            className="h-10 w-10 object-contain sm:h-[52px] sm:w-[52px] lg:h-[60px] lg:w-[60px]"
          />

          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-[0.14em] text-white sm:text-lg sm:tracking-[0.18em]">
              RYNOVIX
            </span>

            <span className="mt-1 whitespace-nowrap text-[9px] font-medium tracking-wide text-white/45 sm:text-[11px]">
              AI Creator Platform
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-7"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenus}
              className="whitespace-nowrap text-sm font-medium text-white/75 transition-colors hover:text-white xl:text-[15px]"
            >
              {link.label}
            </Link>
          ))}

          {/* Desktop Resources */}
          <div ref={resourcesRef} className="relative">
            <button
              type="button"
              onClick={() => setResourcesOpen((value) => !value)}
              className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-white/75 transition-colors hover:text-white xl:text-[15px]"
              aria-expanded={resourcesOpen}
              aria-haspopup="menu"
            >
              Resources

              <ChevronDown
                className={`h-4 w-4 text-white/50 transition-transform duration-200 ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
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
                    role="menuitem"
                    onClick={closeMenus}
                    className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <span>{resource.label}</span>

                    <ChevronDown
                      className="h-4 w-4 -rotate-90 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-blue-400"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/login"
            onClick={closeMenus}
            className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/5 xl:px-5 xl:text-[15px]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            onClick={closeMenus}
            className="rounded-lg bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-[#4338ca] hover:to-[#2563eb] hover:shadow-blue-600/40 xl:px-5 xl:text-[15px]"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/80 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#070b16] px-4 py-4 sm:px-6 lg:hidden"
        >
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenus}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Resources */}
            <button
              type="button"
              onClick={() => setResourcesOpen((value) => !value)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              aria-expanded={resourcesOpen}
            >
              <span>Resources</span>

              <ChevronDown
                className={`h-4 w-4 text-white/50 transition-transform duration-200 ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {resourcesOpen && (
              <div className="ml-3 border-l border-white/10 pl-3">
                {RESOURCE_LINKS.map((resource) => (
                  <Link
                    key={resource.label}
                    href={resource.href}
                    onClick={closeMenus}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <span>{resource.label}</span>

                    <ChevronDown
                      className="h-4 w-4 -rotate-90 text-white/20"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            )}
          </nav>

          {/* Mobile Actions */}
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <Link
              href="/login"
              onClick={closeMenus}
              className="w-full rounded-lg border border-white/15 px-5 py-3 text-center text-[15px] font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={closeMenus}
              className="w-full rounded-lg bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] px-5 py-3 text-center text-[15px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-[#4338ca] hover:to-[#2563eb]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
