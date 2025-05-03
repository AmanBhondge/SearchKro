import React, { useState } from "react";
import { sendAdminNotification } from "../utils/AxiosApi";
import { toast } from "react-toastify";

const SendNotificationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    image: "",
    targetRole: 1,
    redirectTo: "offerPage",
    offerId: "",
    scheduleTime: new Date().toISOString().slice(0, 16),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      message: formData.message,
      image: formData.image,
      targetRole: Number(formData.targetRole),
      redirectTo: formData.redirectTo,
      dataPayload: {
        offerId: formData.offerId,
        redirectTo: formData.redirectTo,
      },
      scheduleTime: new Date(formData.scheduleTime).toISOString(),
    };

    try {
      const res = await sendAdminNotification(payload);
      toast.success("Notification sent successfully!");
    
      setFormData({
        title: "",
        message: "",
        image: "",
        targetRole: 1,
        redirectTo: "offerPage",
        offerId: "",
        scheduleTime: new Date().toISOString().slice(0, 16),
      });
      console.log("notification", res.data);
    } catch (err) {
      console.error("Failed to send notification:", err.response?.data || err.message);
      toast.error("Failed to send notification.");
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelClass = "block text-gray-700 font-medium mb-2";
  
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-8 border border-gray-100">
      
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Notification title"
              className={inputClass}
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              className={inputClass}
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Message</label>
          <textarea
            name="message"
            rows="3"
            placeholder="Enter notification message"
            className={inputClass}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Target Role</label>
            <select
              name="targetRole"
              className={`${inputClass} bg-white`}
              value={formData.targetRole}
              onChange={handleChange}
            >
              <option value="0">Buyer</option>
              <option value="1">Seller</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Select the role of users who will receive this notification</p>
          </div>

          <div>
            <label className={labelClass}>Schedule Time</label>
            <input
              type="datetime-local"
              name="scheduleTime"
              className={inputClass}
              value={formData.scheduleTime}
              onChange={handleChange}
            />
          </div>
        </div>


        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#06C4D9] text-white font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendNotificationForm;