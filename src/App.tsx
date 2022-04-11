import { ApolloProvider } from "@apollo/client";
import Footer from "@components/Footer";
import Loading from "@components/Loading";
import Navbar from "@components/Navbar";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import Routes from "./router";
import client from "./services";

import "./styles/main.scss";

function App() {
  return (
    <Provider store={store}>
      <Loading />
      <ApolloProvider client={client}>
        <Navbar />
        <main className="routes">
          <Routes />
        </main>
        <Footer />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
