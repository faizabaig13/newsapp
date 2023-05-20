import Head from 'next/head';
import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [latestNews, setLatestNews] = useState({});
 const API_KEY = "4ea0b5b773074658b628bcf8545614b2"
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        setArticles(response.data.articles);
        setLatestNews(response.data.articles[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>News App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static" style={{ backgroundColor: '#8B0000' }}>
        <Toolbar>
          <Typography variant="h6">News App</Typography>
        </Toolbar>
      </AppBar>

      <div
        style={{
          height: '300px',
          backgroundColor: '#ddd',
          position: 'relative',
        }}
      >
        <img
          src={latestNews.urlToImage}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt={latestNews.title}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h2"
            color="white"
            style={{ color: 'white' }}
          >
            Catch the latest News!
          </Typography>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '10px' }}></div>

      <Container maxWidth="md">
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.url}>
              <Card style={{ height: '100%' }}>
                <CardHeader
                  title={article.title}
                  subheader={moment(article.publishedAt).format('LLL')}
                />
                <CardMedia
                  component="img"
                  style={{ height: '200px', objectFit: 'cover' }}
                  image={article.urlToImage}
                  alt={article.title}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {article.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" href={article.url}>
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
         
         ))}
         </Grid>
       </Container>
 
       <footer style={{ backgroundColor: '#ddd', padding: '1rem', textAlign: 'center' }}>
         <Typography variant="body1">News App &copy; {new Date().getFullYear()}</Typography>
       </footer>
     </div>
   );
 }
 