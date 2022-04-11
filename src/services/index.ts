import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://frontend-code-challenge-api.ze.delivery/graphql",
  cache: new InMemoryCache(),
});

export default client;
