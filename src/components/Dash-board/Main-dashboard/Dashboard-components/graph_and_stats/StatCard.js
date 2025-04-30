import React from "react";

const StatCard = ({ title, value, icon, bgGradient, borderColor, textColor }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl shadow-lg border  bg-gradient-to-br ${bgGradient} ${borderColor}`}
    >
      <div className="p-3">
        <div className="flex justify-between items-center mb-4">
          <div className={`text-xl ${textColor} font-bold`}>
            {title}
          </div>
          <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="flex items-end space-x-1">
          <span className="text-xl font-bold text-gray-800">
            {value}
          </span>
          <span className="text-sm text-gray-500 mb-1">
            users
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default StatCard;