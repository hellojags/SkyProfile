import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../components/Auth/Login";
import Error from "../components/ErrorPage/Error";
import Settings from "../components/Setting/Settings";
const SnRouter = (props) => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/error">
      <Error />
    </Route>
    <Route exact path="/userprofile">
      <Settings />
    </Route>
  </Switch>
);
export default SnRouter;
