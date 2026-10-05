export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-6 py-16 text-slate-300">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium text-blue-400">
            RYNOVIX Legal
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Refund & Cancellation Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: October 4, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="space-y-4">
          <p className="leading-7">
            Thank you for choosing RYNOVIX. We want you to have a clear
            understanding of our subscription, cancellation, and refund
            policies before purchasing any paid plan.
          </p>

          <p className="leading-7">
            By purchasing a paid RYNOVIX subscription, you acknowledge and
            agree to the terms described in this Refund & Cancellation Policy.
          </p>
        </section>

        {/* 1 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            1. Subscription Cancellation
          </h2>

          <p className="leading-7">
            You may cancel your RYNOVIX subscription at any time. Cancellation
            will stop future subscription renewals, but it does not
            automatically create a refund for a payment that has already been
            processed.
          </p>

          <p className="leading-7">
            After cancellation, you may continue to access your paid plan
            features until the end of the current billing period, unless
            otherwise stated at the time of cancellation.
          </p>
        </section>

        {/* 2 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            2. Refund Eligibility
          </h2>

          <p className="leading-7">
            Because RYNOVIX provides digital services and AI-powered features,
            payments are generally non-refundable once a subscription has
            started or AI credits have been used.
          </p>

          <p className="leading-7">
            However, we may consider refund requests in exceptional
            circumstances, such as a duplicate charge, an incorrect charge,
            or a significant technical issue that prevented reasonable use of
            the paid service.
          </p>

          <p className="leading-7">
            Refund decisions are reviewed on a case-by-case basis and are made
            at the discretion of RYNOVIX.
          </p>
        </section>

        {/* 3 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            3. AI Credits
          </h2>

          <p className="leading-7">
            AI credits are provided as part of your selected subscription
            plan. Unused monthly AI credits generally do not carry over to the
            next billing period unless RYNOVIX explicitly states otherwise.
          </p>

          <p className="leading-7">
            Used AI credits cannot be restored or exchanged for cash or other
            forms of payment.
          </p>
        </section>

        {/* 4 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            4. Billing Errors
          </h2>

          <p className="leading-7">
            If you believe you were charged incorrectly, please contact us as
            soon as possible with the relevant billing information.
          </p>

          <p className="leading-7">
            If we confirm that a duplicate or incorrect charge occurred, we
            may issue an appropriate refund to the original payment method.
          </p>
        </section>

        {/* 5 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            5. Failed or Interrupted Services
          </h2>

          <p className="leading-7">
            If a technical problem significantly prevents you from using a
            paid RYNOVIX service, please contact our support team.
          </p>

          <p className="leading-7">
            We may investigate the issue and, where appropriate, provide a
            service adjustment, account credit, or refund depending on the
            circumstances.
          </p>
        </section>

        {/* 6 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            6. How to Request a Refund
          </h2>

          <p className="leading-7">
            To request a refund or report a billing issue, contact RYNOVIX
            Support with:
          </p>

          <ul className="list-disc space-y-2 pl-6 leading-7">
            <li>Your RYNOVIX account email address</li>
            <li>The date of the transaction</li>
            <li>The plan associated with the payment</li>
            <li>A brief explanation of the issue</li>
          </ul>

          <p className="leading-7">
            Providing accurate information helps us review your request more
            quickly.
          </p>
        </section>

        {/* 7 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            7. Refund Processing
          </h2>

          <p className="leading-7">
            If a refund is approved, it will normally be issued to the
            original payment method used for the transaction.
          </p>

          <p className="leading-7">
            The time required for the refund to appear in your account may
            depend on your payment provider or financial institution.
          </p>
        </section>

        {/* 8 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            8. Changes to This Policy
          </h2>

          <p className="leading-7">
            RYNOVIX may update this Refund & Cancellation Policy from time to
            time. Any changes will be posted on this page with an updated
            revision date.
          </p>
        </section>

        {/* 9 */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            9. Contact RYNOVIX
          </h2>

          <p className="leading-7">
            If you have questions about cancellations, refunds, or billing,
            please contact RYNOVIX Support through the official Contact /
            Support page.
          </p>
        </section>

        {/* Footer Note */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-sm text-slate-500">
            This policy applies to paid RYNOVIX subscriptions and services.
          </p>
        </div>
      </div>
    </main>
  );
}