import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Background } from "./background/background";
import { ClearStyles } from "./clear_styles/clear_styles";
import "./i18n";
import { Navbar } from "./navbar/navbar";
import { HomePage } from "./pages/home_page";
import { Routes } from "./routes/routes";
import { SelectionContextProvider } from "./selection_context/selection_context_provider";
import { defaultStyles, styleContext } from "./style_context/style_context";

function App() {
  return (
    <styleContext.Provider value={defaultStyles}>
      <SelectionContextProvider>
        <ClearStyles>
          <Background>
            <BrowserRouter>
              <Navbar />
              <Switch>
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
      </SelectionContextProvider>
    </styleContext.Provider>
  );
}

export default App;
