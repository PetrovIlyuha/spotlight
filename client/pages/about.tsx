import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  FormControlLabel,
} from '@material-ui/core';
import Link from 'next/link';
import ThemeSwitch from 'components/ThemeSwitch';

export default function About({ darkState, handleThemeChange }) {
  const [switchChecked, setSwitchChecked] = useState(false);
  const handleChange = e => {
    setSwitchChecked(!switchChecked);
    handleThemeChange();
  };

  return (
    <Container maxWidth='sm'>
      <FormControlLabel
        control={
          <ThemeSwitch
            checked={switchChecked}
            onChange={handleChange}
            name='theme-switch'
          />
        }
        label={darkState ? 'Light mode' : 'Dark theme'}
      />
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          About Page
        </Typography>
        <Link href='/'>
          <Button variant='contained' color='primary'>
            Main Page
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
