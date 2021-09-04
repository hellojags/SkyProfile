import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLoaderDisplay } from "../../redux/action-reducers-epic/SnLoaderAction";
import { setUserPreferencesAction } from "../../redux/action-reducers-epic/SnUserPreferencesAction";
import { setUserProfileAction } from "../../redux/action-reducers-epic/SnUserProfileAction";
import { setUserSession } from "../../redux/action-reducers-epic/SnUserSessionAction";
import { initMySky } from "../../service/skynet-api";
import { getPreferences, getProfile } from "../../service/SnSkappService";

const useStyles = makeStyles({
  input: {
    "&:focus": {
      outline: "none",
      borderColor: "#1DBF73",
    },
    background: "#fff",
    border: "1px solid #D9E1EC",
    borderRadius: 8,
    height: 45,
    width: "100%",
    fontSize: 18,
    padding: 20,
    "@media only screen and (max-width: 1440px)": {
      height: 45,
      // width: '100%',
      fontSize: 16,
      padding: 15,
    },
    "@media only screen and (max-width: 575px)": {
      height: 45,
      // width: '100%',
      fontSize: "14px !important",
      padding: 10,

    },
  },
  loginFormContainer: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  poweredBy: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& span": {
      color: "#4E4E4E",
    },
    fontSize: "25px",
    marginTop: "1.5rem",
    marginBottom: "2.5rem",
  },
});
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userSession = useSelector((state) => state.userSession);
  const [isMySkyReady, setIsMySkyReady] = useState(false);

  useEffect(() => {
    (async () => {

      const { loggedIn, userSession } = await initMySky();
      //console.log(">>>>>>>>>>>>>>>> loggedIn" + loggedIn);
      if (loggedIn == true) {
        //console.log("$$$$$$$$$ checkActiveLogin :: loggedIn = " + loggedIn);
        dispatch(setUserSession(userSession));
        history.push("/userprofile");
      }
      else {
        //console.log("$$$$$$$$$ checkActiveLogin :: loggedIn = " + loggedIn);
        dispatch(setUserSession(userSession));
      }
    })();
    //console.log("$$$$$$$$$ checkActiveLogin :: Redirecting to  /userprofile ");
  }, []);


  useEffect(() => {
    (async () => {
    //console.log("##### checkActiveLogin :: userSession = " + userSession);
    let isLoggedIn = await userSession?.mySky?.checkLogin() 
    if (isLoggedIn == true) {
      history.push("/userprofile");
    }
    //console.log("########################### BEFORE "+JSON.stringify(userSession));
    if (userSession?.mySky) {
      //console.log("######################## after ");
      setIsMySkyReady(true)
    }
  })();
  }, [userSession]);


  const handleLogin = async () => {
    let result = null;
    try {
      const status = await userSession.mySky.requestLoginAccess();
      if (status) {
        dispatch(setLoaderDisplay(true));
        //innocent motherly hull focus gnaw elapse custom sipped dazed eden sifting jump lush inkling
        dispatch(setUserSession(userSession));
        const userProfile = await getProfile();
        dispatch(setUserProfileAction(userProfile));
        const userPrefrences = await getPreferences();
        dispatch(setUserPreferencesAction(userPrefrences));
        dispatch(setLoaderDisplay(false));
        history.push("/userprofile");
      }
    } catch (error) {
    //console.log(error);
      dispatch(setLoaderDisplay(false));
    }
  };
  return (
    <div className={classes.loginFormContainer}>
      <form className="login-form">
        <div>
          {/* <Logo /> */}
          <h3> Manage Your Profile</h3>
          {isMySkyReady ?
            <Button onClick={handleLogin}> <h2>Login using MySky</h2></Button> :
            <Button> Loading...</Button>
          }
          <div className={classes.poweredBy}>
            <span>Powered by Skynet</span>
            {/* <SiteLogoGray /> */}
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
