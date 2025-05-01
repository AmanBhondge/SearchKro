import { useState, useEffect } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { HiShoppingCart, HiCurrencyDollar } from "react-icons/hi";
import { dailyAnalytics } from "../../../utils/AxiosApi";

import StatCard from "./graph_and_stats/StatCard";
import UserGrowthChart from "./graph_and_stats/UserGrowthChart";
import BuyerAndSellerGraph from "./graph_and_stats/BuyerAndSellerGraph";
import TrendingItems from "./graph_and_stats/TrendingItems";

const DailyAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dailyAnalytics();
        if (res.data && res.data.data) {
          setAnalyticsData(res.data.data);
        } else {
          setError("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
      </div>
    );

  if (!analyticsData) return null;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth(); // 0-based (0 = January)

  // Format the monthlyRegistrations data for the chart
  const growthChartData = months.map((month, idx) => {
    // Convert to 1-based month number for matching with API data format
    const monthNum = idx + 1;
    // Format month number to match API format (MM-YYYY)
    const monthFormatted = String(monthNum).padStart(2, '0') + '-2025';
    
    // Find registration data for this month
    const monthData = analyticsData.monthlyRegistrations.find(
      (m) => m.month === monthFormatted
    );

    // Create chart data point
    return {
      name: month,
      users: monthData ? monthData.count : 0,
      active: idx === currentMonth ? analyticsData.activeThisMonth || 0 : 0,
      verified: idx === currentMonth ? analyticsData.verifiedUsers || 0 : 0,
      activeToday: idx === currentMonth ? analyticsData.activeToday || 0 : 0,
    };
  });

  const pieData = [
    { name: "Buyers", value: analyticsData.totalBuyers || 0, fill: "#06C4D9" },
    { name: "Sellers", value: analyticsData.totalSellers || 0, fill: "#191919" },
  ];

  const cards = [
    {
      title: "Total Users",
      value: analyticsData.totalUsers || 0,
      icon: <FaUsers className="text-zinc-800" />,
      bgGradient: "from-[#191919] to-zinc-600",
      textColor: "text-[#06C4D9]",
    },
    {
      title: "Verified Users",
      value: analyticsData.verifiedUsers || 0,
      icon: <FaUserCheck className="text-zinc-800" />,
      bgGradient: "from-[#191919] to-zinc-600",
      textColor: "text-[#06C4D9]",
    },
    {
      title: "Active Today",
      value: analyticsData.activeToday || 0,
      icon: <FaUserClock className="text-zinc-800" />,
      bgGradient: "from-[#191919] to-zinc-600",
      textColor: "text-[#06C4D9]",
    },
    {
      title: "Active This Month",
      value: analyticsData.activeThisMonth || 0,
      icon: <FaCalendarAlt className="text-zinc-800" />,
      bgGradient: "from-[#191919] to-zinc-600",
      textColor: "text-[#06C4D9]",
    },
    {
      title: "Total Buyers",
      value: analyticsData.totalBuyers || 0,
      icon: <HiShoppingCart className="text-zinc-800" />,
      bgGradient: "from-[#191919] to-zinc-600",
      textColor: "text-[#06C4D9]",
    },
    {
      title: "Total Sellers",
      value: analyticsData.totalSellers || 0,
      icon: <HiCurrencyDollar className="text-zinc-800" />,
      bgGradient: "from-[#191919] to-zinc-600",
      textColor: "text-[#06C4D9]",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BuyerAndSellerGraph data={pieData} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
      </div>
      <UserGrowthChart data={growthChartData} />
      <TrendingItems/>
    </div>
  );
};

export default DailyAnalytics;