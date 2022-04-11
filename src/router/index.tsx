import Products from "@pages/Products";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Switch>
    </Router>
  );
}

export default Routes;
