import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useGetNewsQuery } from '../store/newsApi';

// Define default crypto-related images for different news categories
const getDefaultImage = (title = '') => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('bitcoin')) {
    return 'https://source.unsplash.com/400x200/?bitcoin';
  } else if (lowerTitle.includes('mining')) {
    return 'https://source.unsplash.com/400x200/?mining,computer';
  } else if (lowerTitle.includes('trump')) {
    return 'https://source.unsplash.com/400x200/?president,politics';
  } else {
    return 'https://source.unsplash.com/400x200/?cryptocurrency';
  }
};

const NewsCard = () => {
  const { data: news, isLoading, error, isError } = useGetNewsQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={2}>
        <Alert severity="error">
          {error?.data?.message || 'Error loading news data. Please try again later.'}
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {news?.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={article.urlToImage || getDefaultImage(article.title)}
                alt={article.title}
                sx={{
                  objectFit: 'cover',
                  backgroundColor: 'grey.200'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x200?text=News';
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {article.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  endIcon={<OpenInNewIcon />}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsCard;