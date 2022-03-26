import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("token")));

export const getUserLogin = (token: string) => {
  localStorage.setItem("token", token);
  isLoggedInVar(true);
};

export const getUserLogout = () => {
  localStorage.removeItem("token");
  isLoggedInVar(false);
};

export const client = new ApolloClient({
  uri: "http://localhost:6002/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
