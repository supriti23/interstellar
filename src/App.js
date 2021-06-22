import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Stars from "./components/Stars/Stars";
import Imprint from "./components/Imprint";
import Universes from "./components/Universes/Universes";
import Home from "./components/Home";
import { getStars, getUniverses } from "./components/ApiData";
function App() {
  const [universeList, setuniverseList] = useState([]);
  const [starsList, setStarsList] = useState([]);
  useEffect(() => {
    getStars().then((data) => setStarsList(data));
    getUniverses().then((data) => setuniverseList(data));
  },[]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/Universes"
            render={() => <Universes stars={starsList} universeDetails={universeList} />}
          />
          <Route
            path="/Stars"
            render={() => <Stars starDetails={starsList} universes={universeList} />}
          />
          <Route path="/Imprint" component={Imprint} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
