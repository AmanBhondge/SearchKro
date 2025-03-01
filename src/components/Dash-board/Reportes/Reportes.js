import React from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";


const Reportes = () => {
  return (
    <>
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* main Content */}
      <div className="flex-1 overflow-auto">
        <Navbar/>
        {/* Report Content */}
        <div className="p-8 flex items-center justify-center ">
          <div className="bg-white rounded-lg  shadow p-6 mb-6 w-[1063px] h-[741px] top-[154px] left-[307px] radius-[10px] border-[1px]">
            <div className="mb-4  left-[358px]">
              {" "}
              <h2 className="text-xl font-bold mb-4 text-[23px] top-[186px] left-[353px]">
                Company Overview
              </h2>
              <div className="border-t pt-4">
                <p className="text-gray-700 leading-relaxed text-[19px] line-height:[29.64px] top-[247px] font-normal">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>

            <div className="mb-4 left-[358px]">
              <h2 className="text-xl font-bold mb-4 text-[23px]">
                Market Position and Competitors
              </h2>
              <div className="border-t pt-4">
                <p className="text-gray-700 leading-relaxed text-[19px] top-[524px] font-normal">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>

            <div className=" left-[358px]">
              <h2 className="text-xl font-bold mb-4 text-[23px] top-[740px]">
                Challenges and Risks
              </h2>
              <div className="border-t pt-4">
                <p className="text-gray-700 leading-relaxed text-[19px] top-[801px] font-normal">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default Reportes;