import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const ToolBar = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{background: '#263238', padding: '10px 0'}}>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;