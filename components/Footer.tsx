
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";
import { createClient } from "@/lib/supabase/client";

const platformLinks = [
  { label: "All Tools", href: "/#all-tools" },
  { label: "My Creations", href: "/dashboard/history", protected: true },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Why Choose", href: "/#why-choose" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Help Center", href: "/help" },
  { label: "Community", href: "/community" },
  { label: "Updates", href: "/updates" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Affiliate Program", href: "/affiliate" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund & Cancellation Policy", href: "/refund" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/rynovix",
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@rynovixai",
    icon: FaYoutube,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@rynovix3",
    icon: FaTiktok,
  },
];

type FooterLink = {
  label: string;
  href: string;
  protected?: boolean;
};

function LinkColumn({
  title,
  links,
  onProtectedLink,
}: {
  title: string;
  links: FooterLink[];
  onProtectedLink: (href: string) => void;
}) {
  return (
    <div className="min-w-0">
      <h3 className="mb-5 text-sm font-semibold tracking-wide text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.protected ? (
              <button
                type="button"
                onClick={() => onProtectedLink(link.href)}
                className="text-left text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {link.label}
              </button>
            ) : (
              <Link
                href={link.href}
                className="inline-block text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let active = true;

    const checkUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (active) {
          setLoggedIn(Boolean(user));
        }
      } catch (error) {
        console.error("Footer auth check failed:", error);
        if (active) setLoggedIn(false);
      }
    };

    void checkUser();

    return () => {
      active = false;
    };
  }, []);

  const handleProtectedLink = (href: string) => {
    if (loggedIn) {
      router.push(href);
    } else {
      router.push(`/login?next=${encodeURIComponent(href)}`);
    }
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#070d1f] text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-blue-600/15 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-purple-600/15 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="RYNOVIX Home"
            >
              <Image
                src="/logo.png"
                alt="RYNOVIX logo"
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <span className="leading-tight">
                <span className="block text-xl font-bold tracking-wide text-white">
                  RYNOVIX
                </span>
                <span className="mt-1 block text-xs text-slate-400">
                  AI Creator Platform
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-slate-400">
              Build faster.
              <br />
              Create smarter.
              <br />
              Grow bigger with AI.
            </p>

            {/* Social links */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit RYNOVIX on ${label} (opens in a new tab)`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8">
            <LinkColumn
              title="Platform"
              links={platformLinks}
              onProtectedLink={handleProtectedLink}
            />

            <LinkColumn
              title="Resources"
              links={resourceLinks}
              onProtectedLink={handleProtectedLink}
            />

            <LinkColumn
              title="Company"
              links={companyLinks}
              onProtectedLink={handleProtectedLink}
            />

            <LinkColumn
              title="Legal"
              links={legalLinks}
              onProtectedLink={handleProtectedLink}
            />
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center sm:mt-16 sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            © {new Date().getFullYear()} RYNOVIX. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-slate-400">
            Made with
            <Heart
              className="h-4 w-4 fill-red-500 text-red-500"
              aria-label="love"
            />
            for Creators
          </p>
        </div>
      </div>
    </footer>
  );
}
