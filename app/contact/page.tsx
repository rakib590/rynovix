
"use client";

import {
  ArrowRight,
  Clock3,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const SUPPORT_EMAIL = "rynovix.support@gmail.com";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const supabase = createClient();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name,
          email,
          subject,
          message,
        });

      if (error) {
        console.error("Contact form submission failed:", error);
        setSubmitError(
          "We couldn't save your message. Please email our support team directly."
        );
        return;
      }

      setSubmitted(true);
      formElement.reset();
    } catch (error) {
      console.error("Unexpected contact form error:", error);
      setSubmitError(
        "Something went wrong. Please email our support team directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute right-[-180px] top-[25%] h-[420px] w-[420px] rounded-full bg-purple-600/15 blur-[140px]" />
        <div className="absolute bottom-[-200px] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            <Sparkles className="h-4 w-4" />
            RYNOVIX Support
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            How can we{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Have a question, need help with RYNOVIX, or want to discuss a
            business opportunity? Contact us by email or send a message
            using the form below.
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Support Card */}
            <div className="rounded-2xl border border-white/10 bg-[#070d1f]/90 p-7 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Mail className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-semibold text-white">
                Email Support
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                For general questions, account issues, billing questions,
                refund inquiries, or technical support, contact our support
                team by email.
              </p>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-xs text-slate-500">Support Email</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-1 inline-block break-all text-sm font-medium text-blue-300 transition hover:text-blue-200 hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>

            {/* Business Card */}
            <div className="rounded-2xl border border-white/10 bg-[#070d1f]/90 p-7 shadow-2xl shadow-purple-950/20 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                <MessageSquare className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-semibold text-white">
                Business &amp; Partnerships
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Interested in partnerships, collaborations, affiliate
                opportunities, or working with RYNOVIX? Contact us using
                the email below.
              </p>

              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                  "RYNOVIX Business Inquiry"
                )}`}
                className="mt-5 inline-flex items-center gap-2 break-all text-sm font-medium text-purple-300 transition hover:text-purple-200 hover:underline"
              >
                {SUPPORT_EMAIL}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
            </div>

            {/* Response Time */}
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-300">
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Response Time
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  We aim to respond to support requests as soon as possible.
                  Response times may vary depending on the nature of your
                  inquiry.
                </p>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6">
              <h3 className="font-semibold text-white">
                Looking for quick answers?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Check our frequently asked questions before contacting support.
              </p>

              <Link
                href="/#faq"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Visit FAQ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-white/10 bg-[#070d1f]/95 p-7 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">
                Send us a message
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Fill out the form below and tell us how we can help.
              </p>
            </div>

            {submitted ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10">
                  <Send className="h-7 w-7 text-green-400" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Message received
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                  Your message has been saved successfully. For a direct
                  response, you can also contact us at{" "}
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="text-blue-300 hover:underline"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError("");
                  }}
                  className="mt-7 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-blue-500/10"
                  >
                    <option value="" disabled className="bg-[#070d1f]">
                      Select a topic
                    </option>
                    <option value="general" className="bg-[#070d1f]">
                      General Question
                    </option>
                    <option value="technical" className="bg-[#070d1f]">
                      Technical Support
                    </option>
                    <option value="billing" className="bg-[#070d1f]">
                      Billing &amp; Subscription
                    </option>
                    <option value="business" className="bg-[#070d1f]">
                      Business / Partnership
                    </option>
                    <option value="feedback" className="bg-[#070d1f]">
                      Feedback
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={10000}
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
                  >
                    {submitError}{" "}
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="font-medium underline underline-offset-2"
                    >
                      Email support
                    </a>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-900/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs leading-5 text-slate-600">
                  By submitting this form, you agree that RYNOVIX may use the
                  information you provide to respond to your request.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}