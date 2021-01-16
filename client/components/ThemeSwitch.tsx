import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const ThemeSwitch = withStyles(theme => ({
  root: {
    width: 60,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    transition: 'all .4s ease',
    '&$checked': {
      transform: 'translateX(35px)',
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
    width: 22,
    height: 22,
  },
  track: {
    borderRadius: 22 / 2,
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.grey[800],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
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

export default ThemeSwitch;
