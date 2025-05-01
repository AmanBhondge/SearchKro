import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const UserGrowthChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">User Growth Analytics</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#191919" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#191919" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06C4D9" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06C4D9  " stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06C4D9" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorActiveToday" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
            <YAxis tick={{ fill: '#6b7280' }} />
            <Tooltip 
              contentStyle={{ 
                fontWeight: 'bold', 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => {
                const formattedNames = {
                  users: "Total Users",
                  active: "Monthly Active Users",
                  verified: "Verified Users",
                  activeToday: "Today's Active Users"
                };
                return [value, formattedNames[name] || name];
              }}
            />
            <Legend />
            
            <Area 
              type="monotone" 
              dataKey="users" 
              name="Total Users"
              stroke="#191919" 
              fillOpacity={1} 
              fill="url(#colorUsers)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="active" 
              name="Monthly Active Users"
              stroke="blue" 
              fillOpacity={1} 
              fill="url(#colorActive)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="verified" 
              name="Verified Users"
              stroke="#06C4D9" 
              fillOpacity={1} 
              fill="url(#colorVerified)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="activeToday" 
              name="Today's Active Users"
              stroke="red" 
              fillOpacity={1} 
              fill="url(#colorActiveToday)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;