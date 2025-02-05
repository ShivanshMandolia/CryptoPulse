import React, { useState } from 'react';
import { useGetGlobalStatsQuery, useGetTopTrendingCoinsQuery } from '../store/cryptoApi';
import millify from 'millify';
import {Marquee} from './Marquee'
import { 
  Typography, 
  Grid, 
  Box, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  ShowChart, 
  MonetizationOn,
  AccountBalance,
  Timeline
} from '@mui/icons-material';
import TopCoinsBarChart from './TopCoinsBarChart';

const Homepage = () => {
  const { data: stats, error: statsError, isLoading: statsLoading } = useGetGlobalStatsQuery();
  const { data: trendingCoins } = useGetTopTrendingCoinsQuery();
  const [selectedAttribute, setSelectedAttribute] = useState('current_price');
  const [activeTab, setActiveTab] = useState(0);

  if (statsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (statsError) {
    return (
      <Box sx={{ p: 2, color: 'error.main' }}>
        Error: {statsError.message}
      </Box>
    );
  }

  const globalStats = stats?.data;
  const priceData = trendingCoins?.[0]?.sparkline_in_7d?.price?.map((price, index) => ({
    time: index,
    price: price
  })) || [];

  const statsData = [
    { 
      title: 'Total Cryptocurrencies', 
      value: globalStats?.active_cryptocurrencies,
      icon: <MonetizationOn color="primary" />
    },
    { 
      title: 'Total Market Cap (USD)', 
      value: globalStats?.total_market_cap?.usd 
        ? millify(globalStats.total_market_cap.usd) 
        : "N/A",
      icon: <AccountBalance color="primary" />
    },
    { 
      title: 'Total 24h Volume (USD)', 
      value: globalStats?.total_volume?.usd 
        ? millify(globalStats.total_volume.usd) 
        : "N/A",
      icon: <Timeline color="primary" />
    },
    { 
      title: 'Total Markets', 
      value: globalStats?.markets || "N/A",
      icon: <ShowChart color="primary" />
    },
    { 
      title: 'Market Cap Change 24h', 
      value: globalStats?.market_cap_change_percentage_24h_usd 
        ? `${globalStats.market_cap_change_percentage_24h_usd.toFixed(2)}%` 
        : "N/A",
      isPositive: globalStats?.market_cap_change_percentage_24h_usd > 0,
      icon: globalStats?.market_cap_change_percentage_24h_usd > 0 
        ? <TrendingUp color="success" /> 
        : <TrendingDown color="error" />
    }
  ];

  const sortedCoins = [...(trendingCoins || [])].sort((a, b) => 
    b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  const topGainers = sortedCoins.slice(0, 3);
  const topLosers = sortedCoins.slice(-3).reverse();

  return (
    <>
     
      <Container maxWidth="xl" sx={{ mt: '10px' }}>
      <Marquee />
        <Box sx={{ p: 3 }}>
          <Card sx={{ 
            mb: 3, 
            background: 'linear-gradient(45deg, #1976d2 30%, #3f51b5 90%)',
            color: 'white'
          }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Crypto Market Summary
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {globalStats?.market_cap_change_percentage_24h_usd > 0 ? 
                  <TrendingUp sx={{ mr: 1 }} /> : 
                  <TrendingDown sx={{ mr: 1 }} />}
                <Typography>
                  Market is {globalStats?.market_cap_change_percentage_24h_usd > 0 ? 'up' : 'down'} by
                  {` ${globalStats?.market_cap_change_percentage_24h_usd?.toFixed(2)}%`} in the last 24h
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {stat.icon}
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ml: 1 }}>
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: stat.hasOwnProperty('isPositive') 
                          ? stat.isPositive 
                            ? 'success.main' 
                            : 'error.main'
                          : 'text.primary'
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Market Analysis</Typography>
                <Tabs 
                  value={activeTab} 
                  onChange={(e, newValue) => setActiveTab(newValue)} 
                  sx={{ mb: 2 }}
                >
                  <Tab label="Market Comparison" />
                </Tabs>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel>Select Attribute</InputLabel>
                      <Select
                        value={selectedAttribute}
                        onChange={(e) => setSelectedAttribute(e.target.value)}
                        label="Select Attribute"
                      >
                        <MenuItem value="current_price">Current Price</MenuItem>
                        <MenuItem value="high_24h">24h High</MenuItem>
                        <MenuItem value="low_24h">24h Low</MenuItem>
                        <MenuItem value="market_cap">Market Cap</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <TopCoinsBarChart selectedAttribute={selectedAttribute} />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: 'success.light' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 5, color: 'success.dark' }}>
                    Top Gainers
                  </Typography>
                  {topGainers.map((coin) => (
                    <Box key={coin.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontWeight="medium" sx={{ color: 'black' }}>
                        {coin.symbol.toUpperCase()}
                      </Typography>
                      <Typography sx={{ color: 'black' }}>
                        +{coin.price_change_percentage_24h?.toFixed(2)}%
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: 'error.light' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 5, color: 'error.dark' }}>
                    Top Losers
                  </Typography>
                  {topLosers.map((coin) => (
                    <Box key={coin.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontWeight="medium" sx={{ color: 'black' }}>
                        {coin.symbol.toUpperCase()}
                      </Typography>
                      <Typography sx={{ color: 'black' }}>
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;