import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../Hooks/useAuth";
import useRole from "../Role/useRole";
import { FaArrowUp, FaChartPie, FaBookReader, FaCircle, FaShieldAlt } from "react-icons/fa";
import DashboardWelcome from "./DashboardWelcome";

const data = [
  { name: "Jan", active: 400, orders: 240 },
  { name: "Feb", active: 300, orders: 139 },
  { name: "Mar", active: 200, orders: 980 },
  { name: "Apr", active: 278, orders: 390 },
  { name: "May", active: 189, orders: 480 },
  { name: "Jun", active: 239, orders: 380 },
];

const DashboardHomePage = () => {
  const { user } = useAuth();
  const [role] = useRole();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="p-4 lg:p-10 bg-base-200 min-h-screen space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 1. Dashboard Welcome - Main Attraction */}
      <motion.div variants={itemVariants}>
        <DashboardWelcome />
      </motion.div>

      {/* 2. Stats Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "User Engagement", val: "24.5k", icon: <FaChartPie />, color: "text-indigo-600" },
          { label: "Live Sessions", val: "1,204", icon: <FaCircle className="animate-pulse" />, color: "text-emerald-500" },
          { label: "Security Status", val: "Verified", icon: <FaShieldAlt />, color: "text-blue-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex items-center justify-between group transition-all"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-800 tracking-tight">{stat.val}</h4>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
                <FaArrowUp /> +12% performance
              </p>
            </div>
            <div className={`text-2xl ${stat.color} opacity-20 group-hover:opacity-100 transition-all duration-300`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Full Width Advanced Chart Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-6 lg:p-10 rounded-[3rem] shadow-sm border border-slate-200"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-800">
              System <span className="text-indigo-600">Growth</span> Metrics
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
              Real-time interaction analytics for {role} console
            </p>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
            <div className="h-2 w-2 rounded-full bg-slate-200"></div>
            <div className="h-2 w-2 rounded-full bg-slate-200"></div>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }} 
                dy={15} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }} 
              />
              <Tooltip 
                contentStyle={{ 
                    borderRadius: "24px", 
                    border: "none", 
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)", 
                    fontSize: "12px", 
                    fontWeight: "bold",
                    padding: "15px"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="active" 
                stroke="#6366f1" 
                strokeWidth={5} 
                fillOpacity={1} 
                fill="url(#colorActive)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 4. Minimal Footer */}
      <motion.div variants={itemVariants} className="pt-6 border-t border-slate-300 flex justify-between items-center opacity-40">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] italic">
          Indigo Core Engine
        </p>
        <p className="text-[9px] font-bold uppercase tracking-widest">
          © 2026 BookCourier System
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DashboardHomePage;