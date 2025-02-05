import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CircularProgress, Box } from '@mui/material';
import { useGetTopTrendingCoinsQuery } from '../store/cryptoApi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopCoinsBarChart = ({ selectedAttribute }) => {
  const { data: coinsData, error, isLoading } = useGetTopTrendingCoinsQuery();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (coinsData && Array.isArray(coinsData)) {
      const labels = coinsData.map(coin => coin.symbol.toUpperCase());
      const values = coinsData.map(coin => {
        switch (selectedAttribute) {
          case 'current_price':
            return coin.current_price;
          case 'high_24h':
            return coin.high_24h;
          case 'low_24h':
            return coin.low_24h;
          case 'market_cap':
            return coin.market_cap;
          default:
            return coin.current_price;
        }
      });

      const backgroundColors = coinsData.map(() => 
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
      );

      setChartData({
        labels,
        datasets: [
          {
            label: formatLabel(selectedAttribute),
            data: values,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
            borderWidth: 1,
          },
        ],
      });
    }
  }, [coinsData, selectedAttribute]);

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center h-64 text-red-500">
        Error: {error.message || 'Failed to fetch data'}
      </Box>
    );
  }

  if (!chartData) {
    return (
      <Box className="flex justify-center items-center h-64">
        No data available
      </Box>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (selectedAttribute === 'market_cap') {
              return '$' + (value >= 1e9 
                ? (value / 1e9).toFixed(2) + 'B' 
                : value >= 1e6 
                  ? (value / 1e6).toFixed(2) + 'M' 
                  : value.toFixed(2));
            }
            return '$' + value.toFixed(2);
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (selectedAttribute === 'market_cap') {
              label += '$' + formatLargeNumber(context.parsed.y);
            } else {
              label += '$' + context.parsed.y.toFixed(2);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <Box className="h-96 w-full">
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

const formatLabel = (attribute) => {
  const labels = {
    current_price: 'Current Price',
    high_24h: '24h High',
    low_24h: '24h Low',
    market_cap: 'Market Cap'
  };
  return labels[attribute] || attribute;
};

const formatLargeNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  return num.toFixed(2);
};

export default TopCoinsBarChart;