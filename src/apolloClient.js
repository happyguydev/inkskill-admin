import { ApolloClient, createNetworkInterface } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${process.env.REACT_APP_API_BASE_URL}/graphql`,
    opts: {
      credentials: 'same-origin',
    },
  }),
  dataIdFromObject: o => o._id
});

export default client;
