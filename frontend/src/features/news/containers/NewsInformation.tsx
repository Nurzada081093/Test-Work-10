import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { getOneNewsSlice } from '../newsSlice.ts';
import Grid from '@mui/material/Grid2';
import { Box, Button, CardMedia, CircularProgress, Container, Typography } from '@mui/material';
import { apiUrl } from '../../../globalConstants.ts';
import NoPicture from '../../../assets/noPicture.png';
import { allCommentsSlice, getCommentsSlice } from '../../comments/commentsSlice.ts';
import { useEffect } from 'react';
import { deleteComment, getComments, postComment } from '../../comments/commentsThunk.ts';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import { getOneNews } from '../newsThunk.ts';
import { toast } from 'react-toastify';
import CommentsForm from '../../comments/components/CommentsForm.tsx';
import { CommentWithoutId } from '../../../types';
import dayjs from 'dayjs';

const NewsInformation = () => {
  const oneNewsFromState = useAppSelector(getOneNewsSlice);
  const loading = useAppSelector(getCommentsSlice);
  const comments = useAppSelector(allCommentsSlice);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOneNews(id));
      dispatch(getComments(id));
    }
  }, [dispatch, id]);

  let image;
  let newsImage = NoPicture;

  if (oneNewsFromState) {
    image = oneNewsFromState.image;
  }

  if (image) {
    newsImage = apiUrl + '/' + image;
  }

  const deleteTheComment = (commentId: string) => {
    dispatch(deleteComment(commentId));
    toast.success('Данный коментарий успешно удален!');
    if (id) {
      dispatch(getComments(id));
    }
  };

  const addComment = (newComment: CommentWithoutId) => {
    if (oneNewsFromState) {
      newComment.news_id = oneNewsFromState.id;
      dispatch(postComment({...newComment}));
      toast.success('Данный коментарий успешно создан!');
      if (id) {
        dispatch(getComments(id));
      }
    }
  };

  return (
    <>
      {loading ? <CircularProgress sx={{margin: '15% 600px'}}/> :
        <Container>
          {oneNewsFromState && (
            <Box sx={{marginTop: '30px'}}>
              <Box sx={{justifyContent: "space-between", alignItems: "center"}}>
                <Grid>
                  <Typography variant="h3" sx={{marginBottom: '15px'}}>{oneNewsFromState.title}</Typography>
                </Grid>
                <Grid>
                  <Typography sx={{marginBottom: '15px', color: 'grey'}}> At {dayjs(oneNewsFromState.create_date).format('DD:MM:YYYY')} {dayjs(oneNewsFromState.create_date).format('HH:mm:ss')}</Typography>
                  <Typography>{oneNewsFromState.description}</Typography>
                </Grid>
              </Box>
              <Grid container direction="row" spacing={1}>
                <CardMedia
                  style={{width: '50%', margin: '0 auto'}}
                  component="img"
                  image={newsImage}
                  title={oneNewsFromState.title}
                />
              </Grid>
            </Box>
          )}
          <Box>
            <Typography variant="h3" sx={{marginBottom: '15px'}}>Comments</Typography>
            {comments.length > 0 ?
              (comments.map((comment) => (
                <Card sx={{ minWidth: 200, marginBottom: '20px', padding: '20px'}} key={comment.id}>
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography sx={{width: '80%'}}>
                      <b>{comment.author}</b> wrote: "{comment.description}".
                    </Typography>
                    <Button size="small" onClick={() => deleteTheComment(comment.id)}>Delete</Button>
                  </Box>
                </Card>
              ))) :
              <Typography sx={{width: '80%', fontSize: '30px'}}>No comments yet</Typography>
            }
          </Box>
          <Box sx={{marginTop: '30px'}}>
            <Typography variant="h4" sx={{marginBottom: '15px'}}>Add new comment</Typography>
            <CommentsForm addComment={addComment}/>
          </Box>
        </Container>
      }
    </>
  );
};

export default NewsInformation;