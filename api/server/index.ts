import './env';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

import createSchema from '../schema/index';
import createSession from '../session';

const port = process.env.PORT || 8000;

async function createServer() {
  try {
    await createSession();
    const app = express();
    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    const schema = createSchema();
    const apolloServer = new ApolloServer({
      // @ts-ignore
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });
    apolloServer.applyMiddleware({ app, cors: corsOptions });
    app.listen(port, () => {
      console.log(
        `Server is listening on port: http://localhost:${port}${apolloServer.graphqlPath}`,
      );
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Something has happened: ${error}`);
  }
}

createServer();
