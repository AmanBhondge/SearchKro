import React, { useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";

// Custom Active Shape component for PieChart
const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" fontSize={16} fontWeight="bold">
        {payload.name}
      </text>
      <text x={cx} y={cy} textAnchor="middle" fill="#666">
        {value} users
      </text>
      <text x={cx} y={cy + 20} textAnchor="middle" fill="#999">
        (Rate {(percent * 100).toFixed(2)}%)
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const BuyerAndSellerGraph = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Buyers vs Sellers Distribution</h2>
      <div className="h-80 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-8 mt-2">
        {data.map((entry, index) => (
          <div className="flex items-center" key={`legend-${index}`}>
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: entry.fill }}
            ></div>
            <span className="text-sm">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerAndSellerGraph;