import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

const DashRating = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [50, 50],
            backgroundColor: [
              '#52C93F', // Green - updated to match DashRating color
              '#FF2727'  // Red - updated to match DashRating color
            ],
            borderWidth: 0
          }]
        },
        options: {
          cutout: '70%',
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        }
      });
    }
    
    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-full rounded-lg bg-white px-3 py-4 flex flex-col justify-start items-center">
      <div className="flex justify-between items-center w-full border-b-2 mb-4 pb-2">
        <h2 style={{ fontWeight: "700" }} className="text-[20px] ml-2">Rating</h2>
        <Link to="/rating">
          <button className="bg-[#191919] text-white w-[60px] h-[24px] rounded-sm text-[12px] font-semibold">View</button>
        </Link>
      </div>
      
      <div className="w-full">
        <div className="flex justify-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-40 lg:h-40 xl:w-48 xl:h-48">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
        
        <div className="space-y-2 mt-4 max-w-sm mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#52C93F] mr-3"></div>
              <span style={{ fontWeight: "400" }} className="text-[#1A1919] text-[16px] leading-[24px]">Positive</span>
            </div>
            <div className="flex items-center">
              <span style={{ fontWeight: "400" }} className="mr-2 text-[#1A1919] text-[16px] leading-[24px]">50%</span>
              <FaArrowUp className="w-[14px] h-[16px] text-[#52C93F]" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#FF2727] mr-3"></div>
              <span style={{ fontWeight: "400" }} className="text-[#1A1919] text-[16px] leading-[24px]">Negative</span>
            </div>
            <div className="flex items-center">
              <span style={{ fontWeight: "400" }} className="mr-2 text-[#1A1919] text-[16px] leading-[24px]">50%</span>
              <FaArrowDown className="w-[14px] h-[16px] text-[#FF2727]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashRating;