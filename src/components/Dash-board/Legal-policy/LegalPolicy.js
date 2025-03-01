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
    <div className="flex h-screen bg-[#F4F7FF94]">
    <div className="w-60 bg-black text-white">
      <Sidebar />
    </div>
    
    <div className="flex-1 overflow-auto p-8">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-[32px] font-bold ml-10">Legal Policy</h1>
        
        <Navbar/>
      </div>
      
      <div className="p-8">
        {/* FAQ Section */}
        <div className="mt-6 h-['64px'] w-[937px]  ">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-2">
              {index === activeIndex ? (
                <div className="bg-black text-white p-4 rounded-lg flex justify-between items-center  ">
                  <div>
                    <p className="font-bold text-[20px]">{faq.question}</p>
                    <p className="text-[17px]">{faq.answer}</p>
                  </div>
                  <X
                    className="cursor-pointer"
                    onClick={() => setActiveIndex(null)}
                  />
                </div>
              ) : (
                <button
                  className="w-full text-[20px] bg-gray-200 text-left p-4 rounded-[10px] flex justify-between items-center"
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
  </div>
  );    
};

export default LegalPolicy;