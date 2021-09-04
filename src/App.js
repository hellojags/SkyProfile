import { ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import Nav from "./components/Navbar/Nav";
import SnLoader from "./components/Utils/SnLoader";
import "./index.css";
import SnRouter from "./router/SnRouter";
import { skappTheme } from "./theme/Theme";
function App() {
  return (
    <Router>
      <ThemeProvider theme={skappTheme}>
        <SnLoader />
        <div className="App">
          <Nav />
          <section className="main-content">
            <main className="app-content" id="app-content">
              <SnRouter />
            </main>
          </section>
        </div>
      </ThemeProvider>
    </Router>
  );
}
export default App;
