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
  const [refresh, setRefresh] = useState(false);

  const doRefresh = () => {
    setRefresh(true);
  };

  useEffect(() => {
    getStars()
      .then((data) => setStarsList(data))
      .catch((err) => {
        throw new Error(err);
      });
    getUniverses()
      .then((data) => setuniverseList(data))
      .catch((err) => {
        throw new Error(err);
      });
    setRefresh(false);
  }, [refresh]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/Universes"
            render={() => (
              <Universes
                stars={starsList}
                universeDetails={universeList}
                refresh={doRefresh}
              />
            )}
          />
          <Route
            path="/Stars"
            render={() => (
              <Stars starDetails={starsList} universes={universeList} refresh={doRefresh}/>
            )}
          />
          <Route path="/Imprint" component={Imprint} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
