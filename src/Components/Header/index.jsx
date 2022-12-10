import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './Header.module.css';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} className={styles.margin}>
      <AppBar position="static" color ='transparent'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Статистика по откликам на сайте HH.RU
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}