"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Sparkles,
  CreditCard,
  Mail,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type NotificationPreferences = {
  ai_generation_complete: boolean;
  new_features: boolean;
  billing_alerts: boolean;
  email_updates: boolean;
};

const DEFAULT_PREFERENCES: NotificationPreferences = {
  ai_generation_complete: true,
  new_features: true,
  billing_alerts: true,
  email_updates: false,
};

type PreferenceKey = keyof NotificationPreferences;

export default function NotificationSettings() {
  const supabase = createClient();

  const [preferences, setPreferences] =
    useState<NotificationPreferences>(DEFAULT_PREFERENCES);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<PreferenceKey | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successKey, setSuccessKey] = useState<PreferenceKey | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadPreferences() {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (userError || !user) {
        setErrorMessage("Please sign in to manage notification settings.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("notification_preferences")
        .select(
          "ai_generation_complete, new_features, billing_alerts, email_updates"
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error("Notification preferences error:", error);
        setErrorMessage("Unable to load your notification settings.");
        setLoading(false);
        return;
      }

      if (data) {
        setPreferences({
          ai_generation_complete:
            data.ai_generation_complete ??
            DEFAULT_PREFERENCES.ai_generation_complete,
          new_features:
            data.new_features ?? DEFAULT_PREFERENCES.new_features,
          billing_alerts:
            data.billing_alerts ?? DEFAULT_PREFERENCES.billing_alerts,
          email_updates:
            data.email_updates ?? DEFAULT_PREFERENCES.email_updates,
        });
      } else {
        const { error: insertError } = await supabase
          .from("notification_preferences")
          .insert({
            user_id: user.id,
            ...DEFAULT_PREFERENCES,
          });

        if (insertError) {
          console.error(
            "Notification preferences insert error:",
            insertError
          );
        }
      }

      setLoading(false);
    }

    loadPreferences();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  async function updatePreference(
    key: PreferenceKey,
    value: boolean
  ) {
    if (saving) return;

    setSaving(key);
    setErrorMessage("");
    setSuccessKey(null);

    const previousValue = preferences[key];

    // Optimistic UI update
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setPreferences((current) => ({
        ...current,
        [key]: previousValue,
      }));

      setErrorMessage("Your session has expired. Please sign in again.");
      setSaving(null);
      return;
    }

    const { error } = await supabase
      .from("notification_preferences")
      .upsert(
        {
          user_id: user.id,
          [key]: value,
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error("Notification preference update error:", error);

      setPreferences((current) => ({
        ...current,
        [key]: previousValue,
      }));

      setErrorMessage("Could not save this setting. Please try again.");
      setSaving(null);
      return;
    }

    setSuccessKey(key);
    setSaving(null);

    window.setTimeout(() => {
      setSuccessKey((current) => (current === key ? null : current));
    }, 1800);
  }

  const settings = [
    {
      key: "ai_generation_complete" as PreferenceKey,
      title: "AI Generation Complete",
      description: "Notify when AI finishes generating content.",
      icon: Sparkles,
      iconClass: "bg-blue-500/10 text-blue-400",
      checkedClass: "peer-checked:bg-blue-500",
    },
    {
      key: "new_features" as PreferenceKey,
      title: "New Features",
      description: "Receive updates when new AI tools are released.",
      icon: Bell,
      iconClass: "bg-purple-500/10 text-purple-400",
      checkedClass: "peer-checked:bg-purple-500",
    },
    {
      key: "billing_alerts" as PreferenceKey,
      title: "Billing Alerts",
      description: "Payment receipts and subscription notifications.",
      icon: CreditCard,
      iconClass: "bg-green-500/10 text-green-400",
      checkedClass: "peer-checked:bg-green-500",
    },
    {
      key: "email_updates" as PreferenceKey,
      title: "Email Updates",
      description: "Receive newsletters, tips and platform updates.",
      icon: Mail,
      iconClass: "bg-cyan-500/10 text-cyan-400",
      checkedClass: "peer-checked:bg-cyan-500",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10">
          <Bell size={28} className="text-yellow-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Notifications
          </h2>

          <p className="mt-1 text-gray-400">
            Choose which notifications you'd like to receive.
          </p>
        </div>
      </div>

      {/* Error */}
      {errorMessage && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Settings */}
      <div className="space-y-5">
        {settings.map((setting) => {
          const Icon = setting.icon;
          const checked = preferences[setting.key];
          const isSaving = saving === setting.key;
          const isSuccess = successKey === setting.key;

          return (
            <div
              key={setting.key}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-white/20"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div
                  className={`shrink-0 rounded-xl p-3 ${setting.iconClass}`}
                >
                  <Icon size={22} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-white">
                    {setting.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {setting.description}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {isSuccess && (
                  <Check
                    size={18}
                    className="text-emerald-400"
                    aria-label="Saved"
                  />
                )}

                {isSaving && (
                  <Loader2
                    size={18}
                    className="animate-spin text-gray-400"
                    aria-label="Saving"
                  />
                )}

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={loading || isSaving}
                    onChange={(event) =>
                      updatePreference(
                        setting.key,
                        event.target.checked
                      )
                    }
                    className="peer sr-only"
                  />

                  <div
                    className={`relative h-6 w-11 rounded-full bg-gray-700 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform ${
                      setting.checkedClass
                    } peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-white/40 peer-disabled:cursor-not-allowed peer-disabled:opacity-60`}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Loading overlay state */}
      {loading && (
        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          Loading notification settings...
        </div>
      )}
    </section>
  );
}