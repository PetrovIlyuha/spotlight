import { makeStyles } from '@material-ui/core/styles'

type VideoProps = {
  url: string
}

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: '56.25%',
    position: 'relative'
  },
  iframe: {
    border: '0',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  }
}))

const Content = ({ url }: VideoProps) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <iframe
        className={classes.iframe}
        src={url} frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyposcope; picture-in-picture; audio;"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

export default Content
