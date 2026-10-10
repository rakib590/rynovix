"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import { ProfileProvider } from "@/components/providers/ProfileProvider";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

type Layout = "comfortable" | "compact";

const LAYOUT_KEY = "rynovix-dashboard-layout";

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [layout, setLayout] =
    useState<Layout>("comfortable");

  useEffect(() => {
    const savedLayout =
      localStorage.getItem(LAYOUT_KEY);

    if (
      savedLayout === "comfortable" ||
      savedLayout === "compact"
    ) {
      setLayout(savedLayout);
    }

    const savedTheme =
      localStorage.getItem("rynovix-theme");

    const savedAccent =
      localStorage.getItem("rynovix-accent");

    const currentTheme =
      savedTheme === "dark" ||
      savedTheme === "light" ||
      savedTheme === "system"
        ? savedTheme
        : "dark";

    const currentAccent =
      savedAccent === "blue" ||
      savedAccent === "purple" ||
      savedAccent === "green" ||
      savedAccent === "pink" ||
      savedAccent === "orange" ||
      savedAccent === "cyan" ||
      savedAccent === "black"
        ? savedAccent
        : "blue";

    document.documentElement.dataset.theme =
      currentTheme;

    document.documentElement.dataset.accent =
      currentAccent;

    if (currentTheme === "system") {
      const prefersDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      document.documentElement.dataset.resolvedTheme =
        prefersDark ? "dark" : "light";

      document.documentElement.style.colorScheme =
        prefersDark ? "dark" : "light";
    } else {
      document.documentElement.dataset.resolvedTheme =
        currentTheme;

      document.documentElement.style.colorScheme =
        currentTheme;
    }

    const handleAppearanceChange = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          type: string;
          value: string;
        }>;

      if (!customEvent.detail) return;

      if (
        customEvent.detail.type === "layout"
      ) {
        const newLayout =
          customEvent.detail.value;

        if (
          newLayout === "comfortable" ||
          newLayout === "compact"
        ) {
          setLayout(newLayout);
        }
      }

      if (
        customEvent.detail.type === "theme"
      ) {
        const newTheme =
          customEvent.detail.value;

        if (
          newTheme === "dark" ||
          newTheme === "light" ||
          newTheme === "system"
        ) {
          if (newTheme === "system") {
            const prefersDark =
              window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;

            document.documentElement.dataset.resolvedTheme =
              prefersDark
                ? "dark"
                : "light";

            document.documentElement.style.colorScheme =
              prefersDark
                ? "dark"
                : "light";
          } else {
            document.documentElement.dataset.resolvedTheme =
              newTheme;

            document.documentElement.style.colorScheme =
              newTheme;
          }

          document.documentElement.dataset.theme =
            newTheme;
        }
      }

      if (
        customEvent.detail.type === "accent"
      ) {
        document.documentElement.dataset.accent =
          customEvent.detail.value;
      }
    };

    window.addEventListener(
      "rynovix-appearance-change",
      handleAppearanceChange
    );

    return () => {
      window.removeEventListener(
        "rynovix-appearance-change",
        handleAppearanceChange
      );
    };
  }, []);

  return (
    <ProfileProvider>
      <div
        className={`dashboard-root flex h-screen overflow-hidden text-white ${
          layout === "compact"
            ? "dashboard-compact"
            : "dashboard-comfortable"
        }`}
      >
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() =>
            setMobileSidebarOpen(false)
          }
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar
            onMenuClick={() =>
              setMobileSidebarOpen(true)
            }
          />

          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="dashboard-content p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
}