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
import { useGetNewsQuery } from '../store/newsApi';

// Function to get default crypto-related image
const getDefaultImage = (title = '') => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('bitcoin')) {
    return 'https://source.unsplash.com/400x200/?bitcoin';
  } else if (lowerTitle.includes('crypto')) {
    return 'https://source.unsplash.com/400x200/?cryptocurrency';
  } else if (lowerTitle.includes('blockchain')) {
    return 'https://source.unsplash.com/400x200/?blockchain';
  } else {
    return 'https://source.unsplash.com/400x200/?crypto,finance';
  }
};

const News = () => {
  const { data, isLoading, error, isError } = useGetNewsQuery();

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
          {error?.message || 'Error loading news. Please try again later.'}
        </Alert>
      </Box>
    );
  }

  // Debug logging
  console.log('Received data:', data);

  // Ensure data is an array
  const articles = Array.isArray(data) ? data : [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={article.id || index}>
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
                image={article.urlToImage || article.imageUrl || getDefaultImage(article.title)}
                alt={article.title}
                sx={{
                  objectFit: 'cover',
                  backgroundColor: 'grey.200'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getDefaultImage(article.title);
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

export default News;