import { Container, Typography, Box, Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ThemeSwitch from 'components/ThemeSwitch';
import { ThemeContext } from 'context/ThemeContext';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function Index({ handleThemeChange, darkState }) {
  const [switchChecked, setSwitchChecked] = useState(false);
  console.log(handleThemeChange);
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
          Hey Next here
        </Typography>
        <Link href='/about'>
          <Button variant='contained' color='primary'>
            About Page
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
