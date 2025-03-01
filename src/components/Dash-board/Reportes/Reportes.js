import React from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";

const Reportes = () => {
  // Define your data as an array of objects
  const reportSections = [
    {
      id: 1,
      title: "Company Overview",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 2,
      title: "Market Position and Competitors",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 3,
      title: "Challenges and Risks",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    }
  ];

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* main Content */}
        <div className="flex-1 p-8 w-[937px] overflow-auto bg-[#F4F7FF]">
          <div className="flex justify-between items-center border-b-2 pb-4">
            {/* Page Title */}
            <h1 style={{fontWeight:"700"}} className="text-[32px] mt-2 ml-10">Reports</h1>
            <Navbar />
          </div>
          
          {/* Report Content */}
          <div className="flex items-center justify-center mt-8">
            <div className="bg-white rounded-lg shadow p-6 mb-6 w-[1063px] border-[1px]">
              {/* Map through the report sections */}
              {reportSections.map((section, index) => (
                <div key={section.id} className={index > 0 ? "mt-8" : "mb-4"}>
                  <h2 style={{fontWeight:"700"}} className="text-[23px] border-b pb-4">
                    {section.title}
                  </h2>
                  <div className="pt-4">
                    <p style={{fontWeight:"400"}} className="text-black text-[19px] leading:[29.64px] w-[969px] h-[187px]">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reportes;