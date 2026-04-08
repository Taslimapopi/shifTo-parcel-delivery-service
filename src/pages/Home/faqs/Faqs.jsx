"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Headings from "../../shared/Headings";

const faqs = [
  {
    question: "What is Shifto?",
    answer:
      "Shifto is a smart delivery management system designed to help businesses manage, track, and optimize their delivery operations efficiently.",
  },
  {
    question: "Who can use Shifto?",
    answer:
      "Shifto is ideal for e-commerce businesses, retail & wholesale stores, warehouse-based companies, and logistics providers.",
  },
  {
    question: "Does Shifto support live tracking?",
    answer:
      "Yes, Shifto provides real-time tracking so you can monitor deliveries and stay updated at every stage.",
  },
  {
    question: "Is Shifto available across Bangladesh?",
    answer:
      "Yes, Shifto is designed to support delivery operations across all regions of Bangladesh.",
  },
  {
    question: "Does Shifto support Cash on Delivery (COD)?",
    answer:
      "Yes, Shifto supports Cash on Delivery (COD) for flexible payment handling.",
  },
  {
    question: "Can I integrate Shifto with my website?",
    answer:
      "Absolutely! Shifto supports API integration with e-commerce platforms, ERP systems, and accounting tools.",
  },
  {
    question: "Is Shifto mobile-friendly?",
    answer:
      "Yes, Shifto is fully responsive and works seamlessly on mobile, tablet, and desktop devices.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use modern security practices and encryption to ensure your business data remains safe and protected.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-accent py-16 px-4 rounded-tl-4xl rounded-br-4xl">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12 text-white">
          
        
          <Headings>Frequently Asked Questions</Headings>
          <p className="text-black-500!important mt-3">
            Everything you need to know about Shifto
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md transition-all duration-300 ${
                openIndex === index ? "shadow-lg" : ""
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-lg text-gray-800">
                  {faq.question}
                </span>

                <IoIosArrowDown
                  className={`transition-transform duration-300 text-gray-500 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={24}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}