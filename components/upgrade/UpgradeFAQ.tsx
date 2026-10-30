"use client";

import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";


interface FAQItem {
  question: string;
  answer: string;
}



const faqs: FAQItem[] = [

  {
    question:
      "Can I cancel my RYNOVIX subscription anytime?",

    answer:
      "Yes. You can cancel your subscription anytime. Your plan will continue until the end of your current billing period, and you will not be charged for the next renewal.",
  },


  {
    question:
      "What is the difference between Monthly and Yearly billing?",

    answer:
      "Monthly billing gives you flexible access without a long commitment. Yearly billing provides better value with a discounted monthly equivalent price.",
  },


  {
    question:
      "How many AI credits do I get with each plan?",

    answer:
      "The Free plan includes 300 AI credits per month. The Pro plan includes 5,000 AI credits per month, and the Business plan includes 15,000 AI credits per month.",
  },


  {
    question:
      "What happens after I upgrade my plan?",

    answer:
      "After successful payment confirmation, your account will be updated with the selected plan benefits and available AI credits according to your subscription.",
  },


  {
    question:
      "Do unused AI credits carry over?",

    answer:
      "AI credit rollover depends on the active RYNOVIX credit policy and subscription rules. Please review the latest billing terms before purchasing.",
  },


  {
    question:
      "Is my payment information secure?",

    answer:
      "Yes. Payments are securely processed through Lemon Squeezy checkout. RYNOVIX does not store your complete payment card information.",
  },


  {
    question:
      "Which payment methods are available?",

    answer:
      "Available payment methods are shown directly on the Lemon Squeezy checkout page and may vary depending on your location.",
  },


  {
    question:
      "Can I upgrade directly from Free to Business?",

    answer:
      "Yes. You can upgrade directly from the Free plan to Business if you need maximum AI credits, priority generation, and advanced features.",
  },


  {
    question:
      "Will my subscription renew automatically?",

    answer:
      "Paid subscriptions renew automatically according to the billing cycle selected during checkout. You can manage your subscription based on the available subscription options.",
  },


  {
    question:
      "What happens if my payment fails?",

    answer:
      "If payment fails, your upgrade will not be completed. Your current plan will remain active until a successful payment is completed.",
  },


];





export default function UpgradeFAQ() {


  const [openItems, setOpenItems] =
    useState<number[]>([]);




  function toggleFAQ(index: number) {

    setOpenItems((current) =>
      current.includes(index)

        ? current.filter(
            (item) => item !== index
          )

        : [
            ...current,
            index,
          ]
    );

  }






  return (

    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8 lg:p-10">


      {/* Header */}

      <div className="text-center">


        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-400">

          <HelpCircle size={14} />

          Frequently Asked Questions

        </div>



        <h2 className="text-3xl font-bold text-white sm:text-4xl">

          Everything about billing

        </h2>



        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">

          Learn more about RYNOVIX plans,
          AI credits, payments and subscriptions.

        </p>


      </div>







      {/* FAQ List */}


      <div className="mx-auto mt-10 max-w-4xl space-y-3">


        {faqs.map((faq,index)=>{


          const isOpen =
            openItems.includes(index);



          return (

            <div
              key={faq.question}

              className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                isOpen

                ? "border-blue-500/30 bg-blue-500/[0.03]"

                : "border-white/10 bg-[#050814] hover:border-white/20"
              }`}
            >



              <button

                type="button"

                onClick={() =>
                  toggleFAQ(index)
                }

                aria-expanded={isOpen}

                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >


                <span className="text-sm font-semibold leading-6 text-white sm:text-base">

                  {faq.question}

                </span>




                <span

                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isOpen

                    ? "rotate-180 border-blue-500/30 bg-blue-500/10 text-blue-400"

                    : "border-white/10 bg-white/5 text-gray-400"
                  }`}
                >

                  <ChevronDown size={17}/>

                </span>


              </button>







              <div

                className={`grid transition-all duration-200 ${
                  isOpen
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
                }`}
              >

                <div className="overflow-hidden">

                  <div className="border-t border-white/5 px-5 pb-5 pt-4 sm:px-6">


                    <p className="text-sm leading-7 text-gray-400">

                      {faq.answer}

                    </p>


                  </div>

                </div>


              </div>



            </div>

          );

        })}


      </div>








      {/* Security Box */}


      <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-4 rounded-2xl border border-green-500/10 bg-green-500/[0.03] p-5 sm:flex-row sm:items-center">


        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10">

          <ShieldCheck
            size={22}
            className="text-green-400"
          />

        </div>




        <div>


          <h3 className="text-sm font-semibold text-white">

            Secure and transparent billing

          </h3>



          <p className="mt-1 text-xs leading-5 text-gray-500">

            Your plan details, billing cycle,
            payment information and applicable
            terms are shown clearly before checkout.

          </p>


        </div>



      </div>



    </section>

  );

}