import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

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
            <NavLink to={'/'} style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '20px 0'}}>
              <Typography variant="h2" component="div" sx={{flexGrow: 1, fontSize: '23px', fontWeight: 600, fontStyle: 'oblique'}}>
                News
              </Typography>
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;