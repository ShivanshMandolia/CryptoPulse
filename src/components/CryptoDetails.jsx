import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { 
    Container, Typography, Grid, Card, CardContent, MenuItem, 
    Select, CircularProgress, Box, Paper, FormControl,
    InputLabel, Divider, IconButton, useTheme, alpha
} from '@mui/material';
import { 
    AttachMoney, TrendingUp, MonetizationOn, EmojiEvents, 
    BarChart, Store, Done, Close, Info, OpenInNew 
} from '@mui/icons-material';

import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from '../store/coinsApi';
import LineChart from './LineChart';

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timeperiod, setTimeperiod] = useState('7d');
    const { data, isFetching } = useGetCoinDetailsQuery(coinId);
    const { data: histdata } = useGetCoinHistoryQuery({ coinId, timeperiod });
    const theme = useTheme();

    const cryptoDetails = data?.data?.coin;

    if (isFetching) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress />
        </Box>
    );

    const timeOptions = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <AttachMoney />, color: theme.palette.primary.main },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <TrendingUp />, color: theme.palette.success.main },
        { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <MonetizationOn />, color: theme.palette.info.main },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <AttachMoney />, color: theme.palette.warning.main },
        { title: 'All-time-high', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <EmojiEvents />, color: theme.palette.error.main }
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <BarChart />, color: theme.palette.primary.main },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <Store />, color: theme.palette.secondary.main },
        { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <Done color="success" /> : <Close color="error" />, icon: <Info />, color: theme.palette.success.main },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <Info />, color: theme.palette.warning.main },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <Info />, color: theme.palette.info.main }
    ];
    console.log("API Response:", histdata?.data);


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap, and supply.
                </Typography>
            </Paper>

            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Select Time Period</InputLabel>
                <Select
                    value={timeperiod}
                    onChange={(e) => setTimeperiod(e.target.value)}
                    label="Select Time Period"
                >
                    {timeOptions.map((date) => (
                        <MenuItem key={date} value={date}>{date}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ mb: 6 }}>
            <LineChart 
  coinHistory={histdata?.data} // Note: histdata.data contains the history array
  currentPrice={cryptoDetails?.price}
  coinName={cryptoDetails?.name}
/>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {cryptoDetails?.name} Value Statistics
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            An overview showing the stats of {cryptoDetails?.name}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {stats.map(({ title, value, icon, color }) => (
                                <Card key={title} variant="outlined">
                                    <CardContent sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        '&:last-child': { pb: 2 }
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ 
                                                bgcolor: alpha(color, 0.1), 
                                                p: 1, 
                                                borderRadius: 1,
                                                color: color 
                                            }}>
                                                {icon}
                                            </Box>
                                            <Typography variant="body1">{title}</Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight="medium">{value}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Other Statistics
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Additional statistics of {cryptoDetails?.name}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {genericStats.map(({ title, value, icon, color }) => (
                                <Card key={title} variant="outlined">
                                    <CardContent sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        '&:last-child': { pb: 2 }
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ 
                                                bgcolor: alpha(color, 0.1), 
                                                p: 1, 
                                                borderRadius: 1,
                                                color: color 
                                            }}>
                                                {icon}
                                            </Box>
                                            <Typography variant="body1">{title}</Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight="medium">{value}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Paper elevation={0} sx={{ p: 3, mt: 4, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    What is {cryptoDetails?.name}?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    {HTMLReactParser(cryptoDetails?.description || '')}
                </Typography>

                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {cryptoDetails?.name} Links
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    {cryptoDetails?.links?.map((link) => (
                        <Grid item xs={12} sm={6} md={4} key={link.name}>
                            <Card variant="outlined">
                                <CardContent sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    '&:last-child': { pb: 2 }
                                }}>
                                    <Typography variant="body1" color="text.secondary">
                                        {link.type}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <a 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            style={{ 
                                                color: theme.palette.primary.main,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {link.name}
                                        </a>
                                        <IconButton 
                                            size="small" 
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <OpenInNew fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};

export default CryptoDetails;