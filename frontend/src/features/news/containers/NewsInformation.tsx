import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { getOneNewsSlice } from '../newsSlice.ts';
import Grid from '@mui/material/Grid2';
import { Box, CardMedia, Container, Typography } from '@mui/material';
import { apiUrl } from '../../../globalConstants.ts';
import NoPicture from '../../../assets/noPicture.png';
import { allCommentsSlice } from '../../comments/commentsSlice.ts';
import { useEffect } from 'react';
import { getComments } from '../../comments/commentsThunk.ts';
import { useParams } from 'react-router-dom';

const NewsInformation = () => {
  const oneNewsFromState = useAppSelector(getOneNewsSlice);
  const comments = useAppSelector(allCommentsSlice);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getComments(id));
    }
  }, [dispatch, id]);


  console.log(comments);



  let image;
  let newsImage = NoPicture;

  if (oneNewsFromState) {
    image = oneNewsFromState.image;
  }

  if (image) {
    newsImage = apiUrl + '/' + image;
  }

  return (
    <Container>
      {oneNewsFromState && (
        <Box sx={{marginTop: '30px'}}>
          <Box sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Grid>
              <Typography variant="h4" sx={{marginBottom: '15px'}}>{oneNewsFromState.title}</Typography>
            </Grid>
            <Grid>
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
    </Container>
  );
};

export default NewsInformation;