import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar component='nav'>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link to='/' component={NavLink} color='inherit' underline='none'>
                Quotes Central
              </Link>
            </Typography>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Link to='/' component={NavLink} color='inherit' underline='hover'>
                Quotes
              </Link>
              <Link to='/add-quote' component={NavLink} color='inherit' underline='hover'>
                Submit new quote
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
