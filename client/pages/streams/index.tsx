import { useEffect } from 'react';
import { useStreamsQuery, Stream } from 'lib/graphql/streams.graphql';
import { Box, Container, Typography } from '@material-ui/core';
import Posts from 'components/Posts';
import { useAuth } from 'lib/useAuth';

export default function Streams() {
  const { data, loading, refetch } = useStreamsQuery({ errorPolicy: 'ignore' });
  const { user } = useAuth()
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Typography variant='h4'>Streams</Typography>
      </Box>
      {!user && (
        <Box pt={4}>
          <Typography variant="h3">Please, Sign In!</Typography>
        </Box>
      )}
      {!loading && data && data.streams && (
        <Posts streams={data.streams as Stream[]} />
      )}
    </Container>
  );
}
