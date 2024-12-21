import React from 'react';
import { Box } from '@mui/material';
import { INews } from '../../../../types';
import NewsCard from './NewsCard/NewsCard.tsx';

interface Props {
  news: INews[];
}

const NewsCards:React.FC<Props> = ({news}) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
      {news.map((oneNews) => {
        return (
          <NewsCard key={oneNews.id}  oneNews={oneNews}/>
        )
      })}
    </Box>
  );
};

export default NewsCards;