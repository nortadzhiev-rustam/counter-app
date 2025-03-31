import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Person as ClientIcon,
} from '@mui/icons-material';

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  const handleSwitchView = () => {
    if (isAdminPage) {
      navigate('/');
    } else {
      navigate('/admin');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {isAdminPage ? 'Admin Dashboard' : 'Client Dashboard'}
          </Typography>
          <Button
            color='inherit'
            onClick={handleSwitchView}
            startIcon={isAdminPage ? <ClientIcon /> : <AdminIcon />}
          >
            {isAdminPage ? 'Switch to Client' : 'Switch to Admin'}
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: '100vw', // changed from '100%'
          mt: '64px', // height of AppBar
          minHeight: 'calc(100vh - 64px)', // full height minus AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
