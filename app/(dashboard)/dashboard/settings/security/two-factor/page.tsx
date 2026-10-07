"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Loader2,
  QrCode,
  ShieldCheck,
  Smartphone,
  XCircle,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/lib/supabase/client";

type TotpFactor = {
  id: string;
  friendly_name: string | null;
  factor_type: string;
  status: string;
};

export default function TwoFactorPage() {
  const supabase = createClient();

  const [factor, setFactor] = useState<TotpFactor | null>(null);

  const [factorId, setFactorId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");

  const [setupStarted, setSetupStarted] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showDisableModal, setShowDisableModal] = useState(false);

  useEffect(() => {
    loadFactors();
  }, []);

  async function loadFactors() {
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.mfa.listFactors();

      if (error) {
        throw new Error(error.message);
      }

      const totpFactors = data?.totp ?? [];

      const verifiedTotp =
        totpFactors.find((item) => item.status === "verified") ?? null;

      if (verifiedTotp) {
        setFactor({
          id: verifiedTotp.id,
          friendly_name: verifiedTotp.friendly_name ?? null,
          factor_type: "totp",
          status: "verified",
        });
      } else {
        setFactor(null);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load two-factor authentication status."
      );
    } finally {
      setLoading(false);
    }
  }

  async function startSetup() {
    setErrorMessage("");
    setSuccessMessage("");
    setActionLoading(true);

    try {
      const { data: factorsData, error: factorsError } =
        await supabase.auth.mfa.listFactors();

      if (factorsError) {
        throw new Error(factorsError.message);
      }

      const totpFactors = factorsData?.totp ?? [];

      // Check if a verified TOTP factor already exists.
      const verifiedTotp = totpFactors.find(
        (item) => item.status === "verified"
      );

      if (verifiedTotp) {
        setFactor({
          id: verifiedTotp.id,
          friendly_name: verifiedTotp.friendly_name ?? null,
          factor_type: "totp",
          status: "verified",
        });

        setSuccessMessage(
          "Two-factor authentication is already enabled on your account."
        );

        return;
      }

      // Remove old non-verified TOTP factors before starting a new setup.
      const unverifiedFactors = totpFactors.filter(
        (item) => item.status !== "verified"
      );

      for (const oldFactor of unverifiedFactors) {
        const { error: unenrollError } =
          await supabase.auth.mfa.unenroll({
            factorId: oldFactor.id,
          });

        if (unenrollError) {
          throw new Error(unenrollError.message);
        }
      }

      // Create a fresh TOTP factor.
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "RYNOVIX Authenticator",
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error(
          "Unable to start two-factor authentication setup."
        );
      }

      setFactorId(data.id);
      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setSetupStarted(true);

      setSuccessMessage(
        "Scan the QR code with your authenticator app, then enter the 6-digit code."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to start two-factor authentication setup."
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function verifySetup() {
    setErrorMessage("");
    setSuccessMessage("");

    const code = verificationCode.replace(/\D/g, "");

    if (code.length !== 6) {
      setErrorMessage("Please enter the 6-digit verification code.");
      return;
    }

    if (!factorId) {
      setErrorMessage(
        "Two-factor setup has expired. Please start setup again."
      );
      return;
    }

    setActionLoading(true);

    try {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({
          factorId,
        });

      if (challengeError) {
        throw new Error(challengeError.message);
      }

      if (!challengeData?.id) {
        throw new Error("Unable to create MFA verification challenge.");
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code,
      });

      if (verifyError) {
        throw new Error(verifyError.message);
      }

      setVerificationCode("");
      setQrCode("");
      setSecret("");
      setFactorId("");
      setSetupStarted(false);

      await supabase.auth.refreshSession();
      await loadFactors();

      setSuccessMessage(
        "Two-factor authentication has been enabled successfully."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to verify the authentication code."
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function disableTwoFactor() {
    setErrorMessage("");
    setSuccessMessage("");

    const code = verificationCode.replace(/\D/g, "");

    if (code.length !== 6) {
      setErrorMessage(
        "Enter the current 6-digit authenticator code to disable 2FA."
      );
      return;
    }

    if (!factor?.id) {
      setErrorMessage("No active two-factor authentication was found.");
      return;
    }

    setActionLoading(true);

    try {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({
          factorId: factor.id,
        });

      if (challengeError) {
        throw new Error(challengeError.message);
      }

      if (!challengeData?.id) {
        throw new Error("Unable to create MFA verification challenge.");
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: factor.id,
        challengeId: challengeData.id,
        code,
      });

      if (verifyError) {
        throw new Error(verifyError.message);
      }

      const { error: unenrollError } =
        await supabase.auth.mfa.unenroll({
          factorId: factor.id,
        });

      if (unenrollError) {
        throw new Error(unenrollError.message);
      }

      setFactor(null);
      setVerificationCode("");
      setShowDisableModal(false);

      await supabase.auth.refreshSession();

      setSuccessMessage(
        "Two-factor authentication has been disabled successfully."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to disable two-factor authentication."
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function copySecret() {
    if (!secret) return;

    try {
      await navigator.clipboard.writeText(secret);
      setSuccessMessage("Secret key copied to clipboard.");
    } catch {
      setErrorMessage("Could not copy the secret key.");
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/settings"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0B1220] text-gray-400 transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <p className="text-sm text-gray-500">Settings / Security</p>

            <h1 className="text-2xl font-bold text-white">
              Two-Factor Authentication
            </h1>
          </div>
        </div>

        {/* Main Card */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] shadow-xl">
          {/* Top */}
          <div className="border-b border-white/10 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/10">
                <ShieldCheck
                  size={30}
                  className="text-green-400"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Protect your account
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                  Add an extra layer of security to your RYNOVIX
                  account using an authenticator app such as Google
                  Authenticator, Microsoft Authenticator, or Authy.
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          {(errorMessage || successMessage) && (
            <div className="px-6 pt-6 sm:px-8">
              {errorMessage && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                  <XCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && !errorMessage && (
                <div className="flex items-start gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{successMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Already Enabled */}
            {factor && !setupStarted && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                        <CheckCircle2
                          size={24}
                          className="text-green-400"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          Two-factor authentication is enabled
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          {factor.friendly_name ||
                            "Authenticator app"}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex w-fit items-center rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                      Active
                    </span>
                  </div>
                </div>

                {/* Disable 2FA */}
                <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">
                  <div className="flex items-start gap-4">
                    <Smartphone
                      size={22}
                      className="mt-0.5 shrink-0 text-blue-400"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white">
                        Disable two-factor authentication
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-400">
                        Enter the current code from your authenticator
                        app to disable 2FA.
                      </p>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          value={verificationCode}
                          onChange={(e) =>
                            setVerificationCode(
                              e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 6)
                            )
                          }
                          placeholder="000000"
                          className="h-12 w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 text-center text-lg font-semibold tracking-[0.35em] text-white outline-none placeholder:text-gray-600 focus:border-blue-500 sm:w-44"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowDisableModal(true)
                          }
                          disabled={
                            actionLoading ||
                            verificationCode.length !== 6
                          }
                          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <XCircle size={18} />
                          Disable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Setup Start */}
            {!factor && !setupStarted && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                      <Smartphone
                        size={20}
                        className="text-blue-400"
                      />
                    </div>

                    <h3 className="font-semibold text-white">
                      1. Get an app
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Install an authenticator app on your phone.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                      <QrCode
                        size={20}
                        className="text-purple-400"
                      />
                    </div>

                    <h3 className="font-semibold text-white">
                      2. Scan QR code
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Scan the QR code generated by RYNOVIX.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                      <CheckCircle2
                        size={20}
                        className="text-green-400"
                      />
                    </div>

                    <h3 className="font-semibold text-white">
                      3. Verify
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Enter the 6-digit code to activate 2FA.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startSetup}
                  disabled={actionLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {actionLoading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Enable Two-Factor Authentication
                    </>
                  )}
                </button>
              </div>
            )}

            {/* QR Setup */}
            {setupStarted && qrCode && (
              <div className="space-y-8">
                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                  <div className="flex items-start gap-3">
                    <QrCode
                      size={22}
                      className="mt-0.5 shrink-0 text-blue-400"
                    />

                    <div>
                      <h3 className="font-semibold text-white">
                        Scan this QR code
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-400">
                        Open your authenticator app and scan the QR
                        code below.
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="rounded-3xl border border-white/10 bg-white p-5 shadow-2xl">
                    <img
                      src={qrCode}
                      alt="Two-factor authentication QR code"
                      className="h-64 w-64 max-w-full"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Manual Secret */}
                {secret && (
                  <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">
                    <p className="text-sm font-medium text-gray-300">
                      Can't scan the QR code?
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Enter this secret key manually in your
                      authenticator app.
                    </p>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <div className="min-w-0 flex-1 overflow-x-auto rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 font-mono text-sm tracking-wider text-white">
                        {secret}
                      </div>

                      <button
                        type="button"
                        onClick={copySecret}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                      >
                        <Copy size={17} />
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                {/* Verification */}
                <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">
                  <h3 className="font-semibold text-white">
                    Enter verification code
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Enter the 6-digit code currently shown in your
                    authenticator app.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) =>
                        setVerificationCode(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6)
                        )
                      }
                      placeholder="000000"
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 text-center text-lg font-semibold tracking-[0.35em] text-white outline-none placeholder:text-gray-600 focus:border-blue-500 sm:w-52"
                    />

                    <button
                      type="button"
                      onClick={verifySetup}
                      disabled={
                        actionLoading ||
                        verificationCode.length !== 6
                      }
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={18} />
                          Verify & Enable
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Cancel Setup */}
                <button
                  type="button"
                  onClick={() => {
                    setSetupStarted(false);
                    setFactorId("");
                    setQrCode("");
                    setSecret("");
                    setVerificationCode("");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  disabled={actionLoading}
                  className="text-sm font-medium text-gray-500 transition hover:text-white disabled:opacity-50"
                >
                  Cancel setup
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Disable Confirmation Modal */}
      {showDisableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-2xl sm:p-7"
            role="dialog"
            aria-modal="true"
            aria-labelledby="disable-2fa-title"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
              <XCircle
                size={28}
                className="text-red-400"
              />
            </div>

            <div className="mt-5 text-center">
              <h3
                id="disable-2fa-title"
                className="text-xl font-bold text-white"
              >
                Disable Two-Factor Authentication?
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                This will remove the authenticator from your RYNOVIX
                account and reduce your account security.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-sm leading-6 text-yellow-300">
                You will need to set up two-factor authentication
                again if you want to protect your account with an
                authenticator app in the future.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDisableModal(false)}
                disabled={actionLoading}
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-5 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={disableTwoFactor}
                disabled={actionLoading}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Disabling...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Yes, Disable 2FA
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}