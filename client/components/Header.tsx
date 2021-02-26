import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as TextLink,
  Switch,
  withStyles,
  createStyles,
} from '@material-ui/core';
import { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
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

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}
interface Props extends SwitchProps {
  classes: Styles;
}

const CustomSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 24,
      padding: 0,
      margin: theme.spacing(2),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
      background: '#CC8B79',
      '&:hover': {
        background: 'yellow',
      },
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function Header({ darkState, handleThemeChange }) {
  const classes = useStyles();
  const { user } = useAuth();

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
          <CustomSwitch checked={darkState} onChange={handleThemeChange} />
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}
