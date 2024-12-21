import { Box, Button, Container, Typography } from '@mui/material';


const NewsContainer = () => {
  return (
    <Container>
      <Box sx={{marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
        <Typography variant="h3" component="div">Posts</Typography>
        <Button variant="contained">Add new post</Button>
      </Box>

    </Container>
  );
};

export default NewsContainer;