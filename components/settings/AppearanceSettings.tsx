"use client";

import { useEffect, useState } from "react";
import {
  Monitor,
  Moon,
  Sun,
  LayoutDashboard,
  Check,
  Palette,
} from "lucide-react";

type Theme = "dark" | "light" | "system";
type Layout = "comfortable" | "compact";

type Accent =
  | "blue"
  | "purple"
  | "green"
  | "pink"
  | "orange"
  | "cyan";

const THEME_KEY = "rynovix-theme";
const LAYOUT_KEY = "rynovix-dashboard-layout";
const ACCENT_KEY = "rynovix-accent";

const accentColors: {
  id: Accent;
  name: string;
  color: string;
}[] = [
  {
    id: "blue",
    name: "Blue",
    color: "#3b82f6",
  },
  {
    id: "purple",
    name: "Purple",
    color: "#a855f7",
  },
  {
    id: "green",
    name: "Green",
    color: "#22c55e",
  },
  {
    id: "pink",
    name: "Pink",
    color: "#ec4899",
  },
  {
    id: "orange",
    name: "Orange",
    color: "#f97316",
  },
  {
    id: "cyan",
    name: "Cyan",
    color: "#06b6d4",
  },
];

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const resolvedTheme =
    theme === "system"
      ? getSystemTheme()
      : theme;

  document.documentElement.dataset.theme = theme;

  document.documentElement.dataset.resolvedTheme =
    resolvedTheme;

  document.documentElement.style.colorScheme =
    resolvedTheme;
}

function applyLayout(layout: Layout) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.layout =
    layout;

  window.dispatchEvent(
    new CustomEvent("rynovix-appearance-change", {
      detail: {
        type: "layout",
        value: layout,
      },
    })
  );
}

function applyAccent(accent: Accent) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.accent =
    accent;

  window.dispatchEvent(
    new CustomEvent("rynovix-appearance-change", {
      detail: {
        type: "accent",
        value: accent,
      },
    })
  );
}

export default function AppearanceSettings() {
  const [theme, setTheme] =
    useState<Theme>("dark");

  const [layout, setLayout] =
    useState<Layout>("comfortable");

  const [accent, setAccent] =
    useState<Accent>("blue");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(THEME_KEY);

    const savedLayout =
      localStorage.getItem(LAYOUT_KEY);

    const savedAccent =
      localStorage.getItem(ACCENT_KEY);

    const initialTheme: Theme =
      savedTheme === "dark" ||
      savedTheme === "light" ||
      savedTheme === "system"
        ? savedTheme
        : "dark";

    const initialLayout: Layout =
      savedLayout === "comfortable" ||
      savedLayout === "compact"
        ? savedLayout
        : "comfortable";

    const initialAccent: Accent =
      savedAccent === "blue" ||
      savedAccent === "purple" ||
      savedAccent === "green" ||
      savedAccent === "pink" ||
      savedAccent === "orange" ||
      savedAccent === "cyan"
        ? savedAccent
        : "blue";

    setTheme(initialTheme);
    setLayout(initialLayout);
    setAccent(initialAccent);

    applyTheme(initialTheme);

    document.documentElement.dataset.layout =
      initialLayout;

    document.documentElement.dataset.accent =
      initialAccent;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemThemeChange = () => {
      const currentTheme =
        localStorage.getItem(THEME_KEY);

      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, []);

  function handleThemeChange(value: Theme) {
    setTheme(value);

    localStorage.setItem(
      THEME_KEY,
      value
    );

    applyTheme(value);

    window.dispatchEvent(
      new CustomEvent(
        "rynovix-appearance-change",
        {
          detail: {
            type: "theme",
            value,
          },
        }
      )
    );
  }

  function handleLayoutChange(value: Layout) {
    setLayout(value);

    localStorage.setItem(
      LAYOUT_KEY,
      value
    );

    applyLayout(value);
  }

  function handleAccentChange(value: Accent) {
    setAccent(value);

    localStorage.setItem(
      ACCENT_KEY,
      value
    );

    applyAccent(value);
  }

  return (
    <section className="appearance-settings rounded-3xl border border-white/10 bg-[#0B1220] p-5 shadow-xl sm:p-8">

      {/* Header */}
      <div className="mb-8 flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 sm:h-14 sm:w-14">
          <Palette
            size={26}
            className="text-purple-400 sm:h-7 sm:w-7"
          />
        </div>

        <div className="min-w-0">

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Appearance
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-400">
            Personalize your dashboard experience.
          </p>

        </div>

      </div>

      {/* Theme */}
      <div className="mb-10">

        <div className="mb-4">

          <h3 className="text-base font-semibold text-white">
            Theme
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Choose how RYNOVIX should look.
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

          {/* Dark Mode */}
          <button
            type="button"
            onClick={() =>
              handleThemeChange("dark")
            }
            className={`appearance-option group relative rounded-2xl border p-5 text-left transition-all ${
              theme === "dark"
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-[#050814] hover:border-white/20"
            }`}
          >

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800">
                <Moon
                  size={21}
                  className="text-blue-400"
                />
              </div>

              {theme === "dark" && (
                <Check
                  size={20}
                  className="text-blue-400"
                />
              )}

            </div>

            <h4 className="font-semibold text-white">
              Dark Mode
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Use the dark dashboard theme.
            </p>

          </button>

          {/* Light Mode */}
          <button
            type="button"
            onClick={() =>
              handleThemeChange("light")
            }
            className={`appearance-option group relative rounded-2xl border p-5 text-left transition-all ${
              theme === "light"
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-[#050814] hover:border-white/20"
            }`}
          >

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                <Sun
                  size={21}
                  className="text-orange-500"
                />
              </div>

              {theme === "light" && (
                <Check
                  size={20}
                  className="text-blue-400"
                />
              )}

            </div>

            <h4 className="font-semibold text-white">
              Light Mode
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Use the light dashboard theme.
            </p>

          </button>

          {/* System Default */}
          <button
            type="button"
            onClick={() =>
              handleThemeChange("system")
            }
            className={`appearance-option group relative rounded-2xl border p-5 text-left transition-all ${
              theme === "system"
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-[#050814] hover:border-white/20"
            }`}
          >

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800">
                <Monitor
                  size={21}
                  className="text-purple-400"
                />
              </div>

              {theme === "system" && (
                <Check
                  size={20}
                  className="text-blue-400"
                />
              )}

            </div>

            <h4 className="font-semibold text-white">
              System Default
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Follow your Windows theme.
            </p>

          </button>

        </div>

      </div>

      {/* Dashboard Layout */}
      <div className="mb-10">

        <div className="mb-4">

          <h3 className="text-base font-semibold text-white">
            Dashboard Layout
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Choose the amount of spacing in your dashboard.
          </p>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* Comfortable */}
          <button
            type="button"
            onClick={() =>
              handleLayoutChange("comfortable")
            }
            className={`appearance-option rounded-2xl border p-5 text-left transition-all ${
              layout === "comfortable"
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-[#050814] hover:border-white/20"
            }`}
          >

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <LayoutDashboard
                  size={21}
                  className="text-blue-400"
                />
              </div>

              {layout === "comfortable" && (
                <Check
                  size={20}
                  className="text-blue-400"
                />
              )}

            </div>

            <h4 className="font-semibold text-white">
              Comfortable
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              More breathing room and larger spacing.
            </p>

          </button>

          {/* Compact */}
          <button
            type="button"
            onClick={() =>
              handleLayoutChange("compact")
            }
            className={`appearance-option rounded-2xl border p-5 text-left transition-all ${
              layout === "compact"
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-[#050814] hover:border-white/20"
            }`}
          >

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
                <LayoutDashboard
                  size={21}
                  className="text-purple-400"
                />
              </div>

              {layout === "compact" && (
                <Check
                  size={20}
                  className="text-blue-400"
                />
              )}

            </div>

            <h4 className="font-semibold text-white">
              Compact
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Reduce spacing to fit more content.
            </p>

          </button>

        </div>

      </div>

      {/* Accent Theme */}
      <div>

        <div className="mb-4">

          <h3 className="text-base font-semibold text-white">
            Accent Theme
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Choose your preferred accent color.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          {accentColors.map((item) => {

            const selected =
              accent === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  handleAccentChange(item.id)
                }
                className={`appearance-accent group relative flex flex-col items-center rounded-2xl border p-4 transition-all ${
                  selected
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-[#050814] hover:border-white/20"
                }`}
              >

                <span
                  className="mb-3 h-9 w-9 rounded-full border border-white/20 shadow-lg"
                  style={{
                    backgroundColor:
                      item.color,
                  }}
                />

                <span className="text-xs font-medium text-gray-300">
                  {item.name}
                </span>

                {selected && (
                  <span className="absolute right-2 top-2">
                    <Check
                      size={15}
                      className="text-white"
                    />
                  </span>
                )}

              </button>
            );

          })}

        </div>

      </div>

    </section>
  );
}