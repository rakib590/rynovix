import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

const platformLinks = [
  { label: "All Tools", href: "/#all-tools" },
  { label: "My Creations", href: "/dashboard/history" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
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

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold tracking-wide text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 transition-all duration-300 hover:pl-1 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070d1f] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="RYNOVIX Home"
            >
              <Image
                src="/logo.png"
                alt="RYNOVIX Logo"
                width={42}
                height={42}
                priority
                className="h-[42px] w-[42px] transition-transform duration-300 group-hover:scale-105"
              />

              <div className="leading-tight">
                <span className="block text-xl font-bold tracking-wide text-white">
                  RYNOVIX
                </span>

                <span className="block text-xs text-slate-400">
                  AI Creator Platform
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-400">
              Build faster.
              <br />
              Create smarter.
              <br />
              Grow bigger with AI.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <LinkColumn
              title="Platform"
              links={platformLinks}
            />

            <LinkColumn
              title="Resources"
              links={resourceLinks}
            />

            <LinkColumn
              title="Company"
              links={companyLinks}
            />

            <LinkColumn
              title="Legal"
              links={legalLinks}
            />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            © 2026 RYNOVIX. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-slate-400">
            Made with
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            for Creators
          </p>
        </div>
      </div>
    </footer>
  );
}