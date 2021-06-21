import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Stars from "./components/Stars";
import Imprint from "./components/Imprint";
import Universes from "./components/Universes";
import Home from "./components/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
        <Route exact path="/" component={Home} />
          <Route path="/Universes" component={Universes} />
          <Route path="/Stars" component={Stars} />
          <Route path="/Imprint" component={Imprint} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
