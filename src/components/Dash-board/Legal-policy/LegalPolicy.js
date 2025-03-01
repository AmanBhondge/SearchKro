import React, { useState } from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import { ChevronRight, X, Plus } from "lucide-react";

const faqs = [
  {
    question: "How do I book a service?",
    answer:
      "You can book a service by selecting your preferred category, choosing a time slot, and confirming the booking via the app.",
  },
  { question: "How do I track my service provider?", answer: "lorem" },
  { question: "What if I face an issue with the service?", answer: " lorem" },
  { question: "How do I rate and review a service?", answer: "lorem" },
  { question: "What services does this app provide?", answer: "lorem" },
  { question: "Is registration required to use the app?", answer: "lorem" },
  { question: "How can I cancel or reschedule a service?", answer: "" },
  { question: "What payment methods are accepted?", answer: "" },
];

const LegalPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 w-[937px] h-[651px] overflow-auto">
      
        
<div className="flex justify-between items-center">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold mt-4">Legal Policy</h1>

        <Navbar />
        </div>

        {/* FAQ Section */}
        <div className="mt-6 h-['64px'] w-[937px] ">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-2">
              {index === activeIndex ? (
                <div className="bg-black text-white p-4 rounded-lg flex justify-between items-center ">
                  <div>
                    <p className="font-bold">{faq.question}</p>
                    <p className="text-sm">{faq.answer}</p>
                  </div>
                  <X
                    className="cursor-pointer"
                    onClick={() => setActiveIndex(null)}
                  />
                </div>
              ) : (
                <button
                  className="w-full bg-gray-200 text-left p-4 rounded-lg flex justify-between items-center"
                  onClick={() => setActiveIndex(index)}
                >
                  {faq.question}
                  {faq.answer ? <ChevronRight /> : <Plus />}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalPolicy;