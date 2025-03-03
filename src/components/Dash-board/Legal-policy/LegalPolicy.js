import React, { useState } from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import { ChevronRight, X, Plus, Menu } from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F4F7FF]">
      {/* Mobile Menu Button */}
      <div
        className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-300"
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden bg-[#F4F7FF] transition-all duration-300 `}
      >
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <div className="flex items-center 2xl:px-12">
            <h1
              style={{ fontWeight: "700" }}
              className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl ml-9 sm:ml-0 "
            >
              Legal Policy
            </h1>
          </div>
          <Navbar />
        </div>

        {/* FAQ Content */}
        <div className="p-4 sm:p-6 md:py-8  flex-1 overflow-auto">
          <div className="w-full max-w-4xl 2xl:max-w-full 2xl:px-12 mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-2">
                {index === activeIndex ? (
                  <div className="bg-black text-white p-4 rounded-lg flex justify-between">
                    <div className="flex-1 pr-2 2xl:p-2">
                      <p className="font-bold text-base sm:text-lg md:text-xl ">{faq.question}</p>
                      <p className="text-sm sm:text-base mt-2 ">{faq.answer}</p>
                    </div>
                    <X
                      className="cursor-pointer flex-shrink-0 mt-1"
                      onClick={() => setActiveIndex(null)}
                      size={20}
                    />
                  </div>
                ) : (
                  <button
                    className="w-full text-sm sm:text-base md:text-lg  bg-gray-200 text-left p-3 sm:p-4 rounded-lg flex justify-between items-center"
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="line-clamp-1 pr-2">{faq.question}</span>
                    {faq.answer ? (
                      <ChevronRight size={20} className="flex-shrink-0" />
                    ) : (
                      <Plus size={20} className="flex-shrink-0" />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPolicy;