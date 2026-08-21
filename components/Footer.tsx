import Image from "next/image"
import { Heart } from "lucide-react";
import {
  FaYoutube,
  FaXTwitter,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa6";

const platformLinks = ["All Tools", "My Creations", "Features", "Pricing", "Why Choose"]
const resourceLinks = ["Blog", "Tutorials", "Help Center", "Community", "Updates"]
const companyLinks = ["About Us", "Careers", "Contact", "Affiliate Program"]
const legalLinks = ["Terms of Service", "Privacy Policy", "Refund Policy"]

const socials = [
  { label: "YouTube", icon: FaYoutube },
  { label: "X (Twitter)", icon: FaXTwitter },
  { label: "Instagram", icon: FaInstagram },
  { label: "Discord", icon: FaDiscord },
];

function LinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold tracking-wide text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-slate-400 transition-all duration-300 hover:text-white hover:pl-1"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070d1f] text-white">
      {/* Blue/Purple glow accents */}
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Left side */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="RYNOVIX Logo"
                width={42}
                height={42}
                priority
                className="h-[42px] w-[42px]"
              />
              <div className="leading-tight">
                <span className="block text-xl font-bold tracking-wide text-white">RYNOVIX</span>
                <span className="block text-xs text-slate-400">AI Creator Platform</span>
              </div>
            </div>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-400">
              Build faster.
              <br />
              Create smarter.
              <br />
              Grow bigger with AI.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right side link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <LinkColumn title="Platform" links={platformLinks} />
            <LinkColumn title="Resources" links={resourceLinks} />
            <LinkColumn title="Company" links={companyLinks} />
            <LinkColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">© 2026 RYNOVIX. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-sm text-slate-400">
            Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> for Creators
          </p>
        </div>
      </div>
    </footer>
  )
}
