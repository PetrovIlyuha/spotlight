import { Typography, Button, Box, Grid, Paper, Theme, Container } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Stream } from 'lib/graphql/streams.graphql';
import { useAuth } from 'lib/useAuth';

interface Props {
  stream: Stream;
}

const useStyles = makeStyles((theme: Theme) => ({
  tollbar: {
    borderBottom: `2px solid ${theme.palette.divider}`,
  },
  toolBarTitle: {
    flex: 1,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url("https://source.unsplash.com/random")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  mainFeaturedContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const Hero = (props: Props) => {
  const { stream } = props;
  const { user } = useAuth();
  const classes = useStyles();
  const showEditButton = user?.email === stream.author.email;
  return (
    <Paper className={classes.mainFeaturedPost}>
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedContent}>
            <Typography
              component='h1'
              variant='h3'
              color='inherit'
              gutterBottom>
              {stream.title}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              {stream.description}
            </Typography>
            <Box pb={1} />
            {showEditButton && (
              <Link href={`edit/${stream._id}`}>
                <Button variant='outlined' color='inherit'>
                  Edit Stream
                  </Button>
              </Link>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Hero;
