import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Box, Typography, Card, CardContent } from '@mui/material';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log("Coin History Data:", coinHistory);

  if (!coinHistory?.history || coinHistory.history.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No chart data available</Typography>
      </Box>
    );
  }

  // Process array data
  const timestamps = [];
  const prices = [];

  // Updated to handle the new data structure
  for (let i = 0; i < coinHistory.history.length; i++) {
    const item = coinHistory.history[i];
    timestamps.push(new Date(item.timestamp * 1000).toLocaleDateString());
    prices.push(parseFloat(item.price));
  }

  const data = {
    labels: timestamps.reverse(),
    datasets: [
      {
        label: 'Price in USD',
        data: prices.reverse(),
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
        borderWidth: 2,
        pointRadius: 0.5,
        pointHoverRadius: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `$ ${Number(context.raw).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 10,
          maxRotation: 45,
          minRotation: 45,
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          drawBorder: false,
        },
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          maxTicksLimit: 8,
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h2">
            {coinName} Price Chart
          </Typography>
          {coinHistory.change && (
            <Typography 
              variant="body1" 
              color={Number(coinHistory.change) >= 0 ? 'success.main' : 'error.main'}
            >
              Change: {Number(coinHistory.change).toFixed(2)}%
            </Typography>
          )}
          <Typography variant="body1">
            Current Price: $ {Number(currentPrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Typography>
        </Box>
        <Box sx={{ height: 400 }}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChart;