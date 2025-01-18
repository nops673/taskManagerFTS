import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { styled as muiStyled, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledToolbar = muiStyled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  height: '80px',
  backgroundColor: '#FFF9F2',
});

const Logo = muiStyled('img')({
  height: '40px',
});

const NavLinks = muiStyled(Box)({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
});

const NavLink = styled(Link)({
  color: '#FF6B4A',
  textDecoration: 'none',
  fontFamily: 'Montserrat',
  fontWeight: 500,
  fontSize: '16px',
  '&:hover': {
    color: '#E54E2E',
  },
});

const LoginButton = styled(Button)({
  backgroundColor: '#C41E3A',
  color: '#fff',
  borderRadius: '50px',
  padding: '8px 24px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#A01830',
  },
});

export function Header() {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#FFF9F2' }}>
      <Container maxWidth="lg">
        <StyledToolbar>
          <NavLink to="/">
            <Logo src="/logo.svg" alt="Food to Save" />
          </NavLink>
          
          <NavLinks>
            <NavLink to="/calculadora">calculadora</NavLink>
            <NavLink to="/blog">blog</NavLink>
            
            <LoginButton variant="contained">
              login
            </LoginButton>
          </NavLinks>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
} 