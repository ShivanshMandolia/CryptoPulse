import React, { useEffect, useState } from 'react';
import { useGetCoinsQuery } from '../store/coinsApi';
import millify from 'millify';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  TextField, 
  CircularProgress, 
  Box, 
  Chip,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link } from 'react-router-dom';

export default function Cryptocurrencies() {
  const { data: stats, error: statsError, isLoading: statsLoading } = useGetCoinsQuery();
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (stats?.data?.coins) {
      const filteredData = stats.data.coins.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCryptos(filteredData);
    }
  }, [stats, searchTerm]);

  if (statsLoading) return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
    >
      <CircularProgress color="primary" size={80} />
    </Box>
  );

  if (statsError) return (
    <Typography 
      color="error" 
      variant="h5" 
      align="center" 
      sx={{ mt: 4 }}
    >
      Failed to fetch cryptocurrency data
    </Typography>
  );

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 3, 
      backgroundColor: '#f4f6f9' 
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          mb: 3, 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ 
            disableUnderline: true 
          }}
        />
      </Paper>

      <Grid container spacing={4}>
        {cryptos.slice(0, 50).map((currency) => (
          <Grid item xs={12} sm={6} lg={3} key={currency.uuid}>
            <Link 
              to={`/crypto/${currency.uuid}`} 
              style={{ textDecoration: "none" }}
            >
              <Card 
                sx={{ 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column",
                  transition: "transform 0.3s ease-in-out",
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 3
                  },
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #f0f4f8, #ffffff)'
                }}
                elevation={2}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    p: 2 
                  }}
                >
                  <Typography 
                    variant="h6" 
                    color="text.secondary"
                  >
                    #{currency.rank}
                  </Typography>
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label={`${currency.change}%`}
                    color={parseFloat(currency.change) >= 0 ? 'success' : 'error'}
                    size="small"
                  />
                </Box>

                <CardMedia
                  component="img"
                  sx={{ 
                    height: 100, 
                    width: 100, 
                    margin: "0 auto",
                    objectFit: 'contain'
                  }}
                  image={currency.iconUrl}
                  alt={currency.name}
                />

                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    component="div" 
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {currency.name}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                  >
                    Price: {millify(currency.price)}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                  >
                    Market Cap: {millify(currency.marketCap)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}