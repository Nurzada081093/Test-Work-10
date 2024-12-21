import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { allNewsSlice, getNewsLoading } from '../newsSlice.ts';
import { useEffect } from 'react';
import { getNews } from '../newsThunk.ts';
import NewsCards from '../components/NewsCards/NewsCards.tsx';
import { useNavigate } from 'react-router-dom';

const NewsContainer = () => {
  const news = useAppSelector(allNewsSlice);
  const loading = useAppSelector(getNewsLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <>
      {loading ? <CircularProgress sx={{margin: '15% 600px'}}/> :
        <Container>
          <Box sx={{marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
            <Typography variant="h3" component="div">Posts</Typography>
            <Button variant="contained" onClick={() => navigate('/news/add')}>Add new post</Button>
          </Box>
          <NewsCards news={news}/>
        </Container>
      }
    </>
  );
};

export default NewsContainer;