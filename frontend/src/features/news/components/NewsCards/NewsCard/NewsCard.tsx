import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { INews } from '../../../../../types';
import { apiUrl } from '../../../../../globalConstants.ts';
import { AspectRatio } from '@mui/joy';
import noPicture from '../../../../../assets/noPicture.png';
import dayjs from 'dayjs';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import Button from '@mui/joy/Button';
import { deleteNews, getNews } from '../../../newsThunk.ts';
import { useAppDispatch } from '../../../../../app/hooks.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Props {
  oneNews: INews;
}

const NewsCard:React.FC<Props> = ({oneNews}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let newsImage = noPicture;

  if (oneNews.image) {
    newsImage = apiUrl +  '/' + oneNews.image;
  }

  const deleteOneNews = (id: string) => {
    dispatch(deleteNews(id));
    toast.success('Данная новость успешно удалена!');
    dispatch(getNews());
  };

  const getOneNewsFromAPI = (id: string) => {
    navigate(`/news/${id}`);
  };

  return (
    <Card sx={{ width: 320, margin: '20px 10px',
      padding: '20px',
      boxShadow: 'inset 0 -3em 3em rgb(0 200 0 / 30%), 0 0 0 2px white, 0.3em 0.3em 1em rgb(255 255 255 / 60%)',
    }}>
      <div>
        <Typography level="body-sm">{oneNews.title}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{position: 'absolute', top: '0.875rem', right: '0.5rem'}}
        >
          <BookmarkAdd/>
        </IconButton>
      </div>
      {oneNews.image &&
        <AspectRatio minHeight="120px" maxHeight="200px">
        <img
            src={newsImage}
            srcSet={newsImage}
            loading="lazy"
            alt={oneNews.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',}}
          />
        </AspectRatio>
      }
      <Typography
        gutterBottom
        level="title-lg"
        component="div"
        sx={{fontSize: 18}}
      >
        At {dayjs(oneNews.create_date).format('DD:MM:YYYY')} {dayjs(oneNews.create_date).format('HH:mm:ss')}
      </Typography>
      <CardContent orientation="horizontal">
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Button variant="plain" onClick={() => getOneNewsFromAPI(oneNews.id)}>Read full post</Button>
          <Button size="md" color="danger" onClick={() => deleteOneNews(oneNews.id)}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard;