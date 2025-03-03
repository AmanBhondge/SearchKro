import React, { useState } from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";

const Reportes = () => {
  const reportSections = [
    {
      id: 1,
      title: "Company Overview",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      title: "Market Position and Competitors",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 3,
      title: "Challenges and Risks",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F4F7FF94]">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-300">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300 ">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <div className="flex items-center">
            <h1
              style={{ fontWeight: "700" }}
              className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl ml-9 sm:ml-0"
            >
              Reports
            </h1>
          </div>
          <Navbar />
        </div>

        {/* Report Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 2xl:p-10">
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg shadow w-full border p-4 md:p-6 lg:p-8 2xl:p-10">
              {reportSections.map((section, index) => (
                <div
                  key={section.id}
                  className={index > 0 ? "mt-6 md:mt-8" : "mb-4"}
                >
                  <h2
                    style={{ fontWeight: "700" }}
                    className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl border-b pb-3 md:pb-4 max-w-screen-xl:text-[23px] "
                  >
                    {section.title}
                  </h2>
                  <div className="pt-3 md:pt-4">
                    <p
                      style={{ fontWeight: "400" }}
                      className="text-black text-base sm:text-sm md:text-lg 2xl:text-xl leading-relaxed max-w-screen-xl:text-[19px] "
                    >
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
