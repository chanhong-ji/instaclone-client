import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("token")));

export const getUserLogin = (token: string) => {
  localStorage.setItem("token", token);
  isLoggedInVar(true);
};

export const getUserLogout = () => {
  localStorage.removeItem("token");
  isLoggedInVar(false);
  window.location.reload();
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem("token"),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
  connectToDevTools: true,
});
