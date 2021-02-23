import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as TextLink,
  Switch,
} from '@material-ui/core';
import Link from 'next/link';
import { useAuth } from 'lib/useAuth';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 300,
  },
}));

export default function Header({ darkState, handleThemeChange }) {
  const classes = useStyles();
  const { user } = useAuth();

  console.log(user);

  const links = [
    !user && { label: 'Sign Up', href: '/auth/signup' },
    !user && { label: 'Sign In', href: '/auth/signin' },
    user && { label: 'Create Stream', href: '/streams/new' },
    user && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter(link => link)
    .map(({ label, href }) => {
      return (
        <Link href={href} key={href}>
          <Button color='inherit'>{label}</Button>
        </Link>
      );
    });

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>
            <Link href='/'>
              <TextLink href='' color='inherit'>
                Spotlight
              </TextLink>
            </Link>
          </Typography>
          <Switch checked={darkState} onChange={handleThemeChange} />
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}
