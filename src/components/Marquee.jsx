import React from "react";
import { motion } from "framer-motion";
import { useGetTopTrendingCoinsQuery } from "../store/cryptoApi";

export function Marquee() {
  const { data: coinsData = [], error, isLoading } = useGetTopTrendingCoinsQuery();

  if (isLoading) {
    return (
      <div className="w-full h-[60px] py-2 bg-white/90 fixed top-0 left-0 z-50">
        <div className="text-blue-600 text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[60px] py-2 bg-white/90 fixed top-0 left-0 z-50">
        <div className="text-red-600 text-center">Error fetching data</div>
      </div>
    );
  }

  const sortedCoins = [...coinsData]
    .sort((a, b) => Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h))
    .slice(0, 10);

  const prices = sortedCoins.map((coin) => ({
    name: coin.name,
    change: coin.price_change_percentage_24h.toFixed(2),
  }));

  // Duplicate the prices array multiple times to ensure continuous flow
  const duplicatedPrices = [...prices, ...prices, ...prices, ...prices];

  return (
    <div className="w-full h-[60px] overflow-hidden bg-white/95 shadow-lg relative top-0 left-0 z-50">
      <div className="relative h-full flex items-center border-y border-blue-100">
        <div className="flex absolute whitespace-nowrap">
          <motion.div
            className="flex space-x-4 whitespace-nowrap"
            animate={{ 
              x: [0, -200 * duplicatedPrices.length] // Move based on content width
            }}
            transition={{ 
              repeat: Infinity,
              duration: 60, // Slower duration for smoother movement
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {duplicatedPrices.map((crypto, index) => (
              <div
                key={index}
                className={`
                  px-4 py-2 
                  rounded-lg 
                  text-sm 
                  font-bold 
                  shadow-sm
                  transition-transform hover:scale-105
                  ${Number(crypto.change) >= 0 
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-400" 
                    : "bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-400"}`}
              >
                <span className="mr-2 font-medium">{crypto.name}:</span>
                <span className="font-bold">
                  {Number(crypto.change) >= 0 ? "+" : ""}{crypto.change}%
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}