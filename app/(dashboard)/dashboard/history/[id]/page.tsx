"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Clock3,
  Copy,
  Check,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import HistoryResultRenderer from "@/components/history/HistoryResultRenderer";

type HistoryItem = {
  id: string;
  user_id: string;
  tool_id: string;
  tool_name: string;
  title: string;
  prompt: string;
  result: any;
  credits_used: number;
  created_at: string;
  favorite: boolean;
};

interface HistoryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function HistoryDetailPage({
  params,
}: HistoryDetailPageProps) {
  const router = useRouter();

  const [historyItem, setHistoryItem] =
    useState<HistoryItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHistoryItem();
  }, []);

  async function loadHistoryItem() {
    try {
      setLoading(true);
      setError("");

      const { id } = await params;

      const res = await fetch(
        `/api/history/${id}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (
        res.status === 404 ||
        !res.ok ||
        !data.success ||
        !data.history
      ) {
        setError(
          data.error ||
            "History item not found."
        );
        return;
      }

      setHistoryItem(data.history);
    } catch (error) {
      console.error(
        "Failed to load history item:",
        error
      );

      setError(
        "Failed to load saved result."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyResult() {
    if (!historyItem) return;

    let resultText = "";

    if (
      typeof historyItem.result === "string"
    ) {
      resultText = historyItem.result;
    } else {
      resultText = JSON.stringify(
        historyItem.result,
        null,
        2
      );
    }

    try {
      await navigator.clipboard.writeText(
        resultText
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy result:",
        error
      );
    }
  }

  function formatToolName(toolName: string) {
    return toolName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-white/5" />

          <div className="h-24 animate-pulse rounded-3xl bg-[#0B1220]" />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-28 animate-pulse rounded-2xl bg-[#0B1220]" />
            <div className="h-28 animate-pulse rounded-2xl bg-[#0B1220]" />
            <div className="h-28 animate-pulse rounded-2xl bg-[#0B1220]" />
          </div>

          <div className="h-96 animate-pulse rounded-3xl bg-[#0B1220]" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !historyItem) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B1220] p-8 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              !
            </div>

            <h1 className="mt-5 text-2xl font-bold text-white">
              Saved Result Not Found
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {error ||
                "This history item could not be loaded."}
            </p>

            <Link
              href="/dashboard/history"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={17} />
              Back to History
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const toolName = formatToolName(
    historyItem.tool_name
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ==================================================
            HEADER
        ================================================== */}
        <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8">
          <Link
            href="/dashboard/history"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to History
          </Link>

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                  {toolName}
                </span>

                {historyItem.favorite && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                    <Star
                      size={12}
                      fill="currentColor"
                    />
                    Favorite
                  </span>
                )}
              </div>

              <h1 className="mt-4 break-words text-2xl font-bold text-white sm:text-3xl">
                {historyItem.title ||
                  toolName}
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                Saved AI generation
              </p>
            </div>

            <Link
              href={`/dashboard/tools/${historyItem.tool_id}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-400 transition hover:border-blue-500/40 hover:bg-blue-500/20 hover:text-white"
            >
              Open Tool
              <ExternalLink size={16} />
            </Link>
          </div>
        </section>

        {/* ==================================================
            META
        ================================================== */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Tool
            </p>

            <p className="mt-2 font-semibold text-white">
              {toolName}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Generated
            </p>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
              <Clock3
                size={16}
                className="text-blue-400"
              />

              {new Date(
                historyItem.created_at
              ).toLocaleString()}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Credits Used
            </p>

            <p className="mt-2 font-semibold text-white">
              {historyItem.credits_used}
            </p>
          </div>
        </section>

        {/* ==================================================
            GENERATED RESULT
        ================================================== */}
        <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Generated Result
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your saved AI generation.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyResult}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#050814] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
            >
              {copied ? (
                <>
                  <Check
                    size={16}
                    className="text-green-400"
                  />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Result
                </>
              )}
            </button>
          </div>

          <HistoryResultRenderer
            toolId={historyItem.tool_id}
            result={historyItem.result}
          />
        </section>

        {/* ==================================================
            ORIGINAL PROMPT
        ================================================== */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] shadow-xl">
          <button
            type="button"
            onClick={() =>
              setShowPrompt((prev) => !prev)
            }
            className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-white/[0.02] sm:p-7"
          >
            <div>
              <h2 className="text-lg font-bold text-white">
                Original Prompt
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View the prompt used for this generation.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#050814] text-gray-400">
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  showPrompt
                    ? "rotate-180"
                    : ""
                }`}
              />
            </div>
          </button>

          {showPrompt && (
            <div className="border-t border-white/10 p-6 sm:p-7">
              <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-300">
                  {historyItem.prompt ||
                    "No prompt available."}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ==================================================
            BOTTOM ACTION
        ================================================== */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/history"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0B1220] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to History
          </Link>

          <Link
            href={`/dashboard/tools/${historyItem.tool_id}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Open Tool
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}