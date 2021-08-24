import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Background } from "./background/background";
import { ClearStyles } from "./clear_styles/clear_styles";
import "./i18n";
import { Navbar } from "./navbar/navbar";
import { AmazonPage } from "./pages/amazon_page";
import { HomePage } from "./pages/home_page";
import {
  defaultPosition,
  positionContext,
} from "./position_context/position_context";
import { Routes } from "./routes/routes";
import { defaultStyles, styleContext } from "./style_context/style_context";

function App() {
  const [position, setPosition] = React.useState(defaultPosition);
  const onSetLon = React.useCallback(
    (lon: number) => setPosition({ lat: position.lat, lon }),
    [position]
  );
  const onSetLat = React.useCallback(
    (lat: number) => setPosition({ lat: lat, lon: position.lon }),
    [position]
  );
  return (
    <styleContext.Provider value={defaultStyles}>
      <positionContext.Provider
        value={{ ...position, setLon: onSetLon, setLat: onSetLat }}
      >
        <ClearStyles>
          <Background>
            <BrowserRouter>
              <Navbar />
              <Switch>
                <Route path={Routes.amazon}>
                  <AmazonPage />
                </Route>
                <Route path={Routes.home}>
                  <HomePage />
                </Route>
                <Route path="/">
                  <Redirect to={Routes.home} />
                </Route>
              </Switch>
            </BrowserRouter>
          </Background>
        </ClearStyles>
      </positionContext.Provider>
    </styleContext.Provider>
  );
}

export default App;
