import { Box, Button, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { allNewsSlice } from '../newsSlice.ts';
import { useEffect } from 'react';
import { getNews } from '../newsThunk.ts';
import NewsCards from '../components/NewsCards/NewsCards.tsx';
import { useNavigate } from 'react-router-dom';


const NewsContainer = () => {
  const news = useAppSelector(allNewsSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
        <Typography variant="h3" component="div">Posts</Typography>
        <Button variant="contained" onClick={() => navigate('/news/add')}>Add new post</Button>
      </Box>
      <NewsCards news={news}/>
    </Container>
  );
};

export default NewsContainer;