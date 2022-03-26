import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:6002/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
