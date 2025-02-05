import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  IconButton,
  Box,
  Collapse,
  Avatar,
  TextField,
  CircularProgress
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useGetGlobalExchangeQuery } from '../store/cryptoApi'; // Correct hook import

const ExchangeGrid = () => {
  const { data: exchanges, isLoading, error } = useGetGlobalExchangeQuery(); // Updated hook
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredExchanges = exchanges?.filter(exchange => 
    exchange.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          Error loading exchanges: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search exchanges..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {filteredExchanges?.map((exchange, index) => (
          <Grid item xs={12} sm={6} lg={4} key={exchange.id}>
            <Card>
              <CardContent>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} onClick={() => toggleExpand(index)}>
                    <Avatar 
                      src={exchange.image} 
                      alt={`${exchange.name} logo`}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {exchange.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rank #{exchange.trust_score_rank}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton 
                    size="small"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedId === index ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </Box>

                <Collapse in={expandedId === index}>
                  <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Country:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {exchange.country || 'N/A'}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Established:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {exchange.year_established || 'N/A'}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          24h Volume (BTC):
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {exchange.trade_volume_24h_btc?.toLocaleString(undefined, {
                            maximumFractionDigits: 2
                          }) || 'N/A'}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Trust Score:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {exchange.trust_score || 'N/A'}/10
                        </Typography>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Description:
                      </Typography>
                      <Typography variant="body2">
                        {exchange.description || 'No description available'}
                      </Typography>
                    </Box>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExchangeGrid;
