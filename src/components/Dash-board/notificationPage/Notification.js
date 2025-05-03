import React from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import SendNotificationForm from "../../notification/SendNotificationForm";

const Notification = () => {

  return (
    <div className="flex h-screen bg-[#F4F7FF94]">
      <div className="md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-900">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-10 py-4">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold ml-9 ">
            Notifications
          </h1>
          <Navbar />
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <SendNotificationForm/>
        </div>

      </div>
    </div>
  );
};

export default Notification;