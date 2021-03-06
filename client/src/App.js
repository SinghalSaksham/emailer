import React, { useRef, useEffect,useState } from "react";
import { useLocation, Switch ,Route} from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";
import Auth from "./components/auth/Auth.js";
import api from "./api";
import Compose from "./components/compose/Compose";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import mails from "./components/history/Mails";

ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/compose" component={Compose}/>
          <Route path="/history" component={mails}/>
          <AppRoute exact path="/home" component={Home} layout={LayoutDefault} />
        </Switch>
      )}
    />
  );
};

export default App;
