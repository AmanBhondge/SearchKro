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
  const currentMonth = new Date().getMonth();

  // Growth chart data
  const growthChartData = months.map((month, idx) => {
    const monthData = analyticsData.monthlyRegistrations?.find(
      (m) => m._id.month === idx + 1 && m._id.year === 2025
    );

    return {
      name: month,
      users: monthData ? monthData.count : 0,
      active: idx === currentMonth ? analyticsData.activeThisMonth : 0,
      verified: idx === currentMonth ? analyticsData.verifiedUsers : 0,
      activeToday: idx === currentMonth ? analyticsData.activeToday : 0,
    };
  });

  // Data for Pie Chart - Buyers vs Sellers
  const pieData = [
    { name: "Buyers", value: analyticsData.totalBuyers, fill: "#F59E0B" },
    { name: "Sellers", value: analyticsData.totalSellers, fill: "#E11D48" },
  ];

  const cards = [
    {
      title: "Total Users",
      value: analyticsData.totalUsers,
      icon: <FaUsers className="text-blue-600" />,
      bgGradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      title: "Verified Users",
      value: analyticsData.verifiedUsers,
      icon: <FaUserCheck className="text-green-600" />,
      bgGradient: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      title: "Active Today",
      value: analyticsData.activeToday,
      icon: <FaUserClock className="text-purple-600" />,
      bgGradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
    },
    {
      title: "Active This Month",
      value: analyticsData.activeThisMonth,
      icon: <FaCalendarAlt className="text-indigo-600" />,
      bgGradient: "from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
    },
    {
      title: "Total Buyers",
      value: analyticsData.totalBuyers,
      icon: <HiShoppingCart className="text-amber-600" />,
      bgGradient: "from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
    },
    {
      title: "Total Sellers",
      value: analyticsData.totalSellers,
      icon: <HiCurrencyDollar className="text-rose-600" />,
      bgGradient: "from-rose-50 to-rose-100",
      borderColor: "border-rose-200",
      textColor: "text-rose-700",
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
    </div>
  );
};

export default DailyAnalytics;