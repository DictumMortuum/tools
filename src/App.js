import React from 'react';
import 'dayjs/locale/en-gb';
import { HashRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Login from './components/Layout/Login';
import Profile from './components/Profile';
import { Reset } from 'servus-react-login';
import { UserProvider } from './context';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout';
import Wishlist from './components/Wishlist';
import WishlistCreate from './components/Wishlist/Create';
import { theme } from './theme';

const App = () => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <ThemeProvider theme={theme}>
          <UserProvider>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Wishlist />} />
                  <Route path="/wishlist/create" element={<WishlistCreate />} />
                  <Route path="/auth/reset-password" element={<Reset />} />
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </HashRouter>
          </UserProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
