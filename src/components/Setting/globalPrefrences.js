import { Box, Grid, Button, makeStyles, Snackbar, Divider, colors, Typography } from "@material-ui/core";
import { Add, LensTwoTone } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderDisplay } from "../../redux/action-reducers-epic/SnLoaderAction";
import { setUserPreferencesAction } from "../../redux/action-reducers-epic/SnUserPreferencesAction";
import { setSkappPreferences, setGlobalPreferences, getSkappUserStatus, getGlobalUserStatus } from "../../service/SnSkappService";
import { SnSelect, SnSwitch } from "../Utils/SnFormikControlls";
import { LastSeenPrivacyType } from "@skynethub/userprofile-library";

const useStyles = makeStyles((theme) => ({
  ProfileRoot: {
    backgroundColor: "#fff",
    boxShadow: "0px 2px 5px #15223214",
    borderRadius: 6,
    padding: "50px 30px",
    "@media only screen and (max-width: 575px)": {
      padding: "20px 10px",
    },
    "& h2": {
      color: "#242F57",
      marginBottom: "1rem",
      "@media only screen and (max-width: 575px)": {
        fontSize: 22,
      },
    },
  },
  textInfo: {
    color: "#000",
    fontSize: 14,
    "@media only screen and (max-width: 575px)": {
      fontSize: 13,
    },
  },
  submitBtn: {
    background: "#1DBF73!important",
    color: "#fff",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    display: "inlin-flex",
    alignItems: "center",
    float: "right",
    height: 45,
    minWidth: 130,
    "& svg": {
      fontSize: "19px",
      marginRight: "5px",
    },
    "@media only screen and (max-width: 575px)": {
      fontSize: "12px",

      paddingLeft: ".5rem",
      paddingRight: ".5rem",
      minWidth: 70,
    },
  },
  siteLogo: {
    background: "#fff",
    cursor: "pointer",
    height: 150,
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #D9E1EC",
    borderRadius: "50%",
    marginBottom: 10,
    marginTop: 10,
    "@media only screen and (max-width: 575px)": {
      width: 75,
      height: 75,
      // maxWidth: 340,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  label: {
    display: "block",
    color: "#5A607F",
    marginBottom: 8,
    fontSize: 18,
    "@media only screen and (max-width: 575px)": {
      fontSize: 16,
    },
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    background: "#EFF5F7",
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    "& svg": {
      fontSize: 89,
      // marginTop: '2.9rem',
      color: "#B4C6CC",
    },
    "@media only screen and (max-width: 575px)": {
      width: 75,
      height: 75,
      "& svg": {
        fontSize: 45,
        // marginTop: '2.9rem',
        color: "#B4C6CC",
      },
    },
  },
  btnUpload: {
    backgroundColor: "#869EA6!important",
    color: "#fff",
    fontSize: 14,
    minWidth: 150,
    "@media only screen and (max-width: 575px)": {
      fontSize: 12,
      height: 40,
    },
    "& svg": {
      marginRight: 7,
    },
  },
  textHelper: {
    fontSize: 13,
    color: "#5C757D",
    marginTop: 5,
    "@media only screen and (max-width: 575px)": {
      fontSize: 12,
    },
  },
  form: {
    marginTop: 20,
  },
  inputGuide: {
    color: "#5C757D",
    "@media only screen and (max-width: 575px)": {
      fontSize: 12,
    },
  },
  input: {
    background: "#fff",
    border: "1px solid #D9E1EC",
    borderRadius: 8,
    height: 55,
    width: "100%",
    fontSize: 18,
    padding: 20,
    "@media only screen and (max-width: 1440px)": {
      height: 50,
      // width: '100%',
      fontSize: 16,
      padding: 15,
    },
    "@media only screen and (max-width: 575px)": {
      height: 43,
      // width: '100%',
      fontSize: "14px !important",
      padding: 10,
    },
  },
  inputContainer: {
    "& > label": {
      display: "block",
      color: "#5A607F",
      marginBottom: 7,
    },
    "& input:focus, & select:focus": {
      outline: "none!important",
      border: "1px solid #1DBF73",
    },
    marginTop: "25px",
    "&": {
      marginRight: "1rem",
    },
    "& input, & input": {
      fontSize: 18,
    },
    "@media only screen and (max-width: 575px)": {
      marginTop: "16px",
      marginRight: "10px",
    },
  },
  firstInput: {
    marginTop: 5,
    "@media only screen and (max-width: 575px)": {
      marginBottom: 10,
    },
  },
}));

const portalOptions = [
  { value: "https://siasky.net/", label: "https://siasky.net/" },
  { value: "https://skyportal.xyz/", label: "https://skyportal.xyz/" },
];
const statusPrivacyOptions = [
  { value: "Private", label: "Private" },
  { value: "Public", label: "Public" },
];
const lastSeenPrivacyOptions = [
  { value: LastSeenPrivacyType.PRIVATE, label: LastSeenPrivacyType.PRIVATE },
  //{ value: LastSeenPrivacyType.PUBLIC_NO_TS, label: LastSeenPrivacyType.PUBLIC_NO_TS },
  { value: LastSeenPrivacyType.PUBLIC_TS, label: LastSeenPrivacyType.PUBLIC_TS },
];

const initailValueFormikObGB = {
  darkmode: true,
  portal: "https://siasky.net/",
  statusPrivacy: "Private",
  lastSeenPrivacy: "Private",
  updatefrequency: 0
};
const initailUserStatus = {
  status: "None",
  lastSeen: "0"
};
const GlobalPrefrences = () => {
  const [skappUserStatus, setSkappUserStatus] = useState(initailUserStatus);
  const [globalUserStatus, setGlobalUserStatus] = useState(initailUserStatus);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formikObjGB, setFormikObGB] = useState(initailValueFormikObGB);
  const [skappFormikObjGB, setSkappFormikObGB] = useState(initailValueFormikObGB);


  // to store Formik Form data
  const classes = useStyles();
  const userPreferences = useSelector((state) => state.snUserPreferences);
  const hostSkapp = window.location.hostname === 'localhost' ? "localhost" : "skyprofile.hns";

  //console.log(`userPreferences ${JSON.stringify(userPreferences)}`)
  const dispatch = useDispatch();
  const onGlobalUserStatusChange = async (latestStatus) => {
    console.log(`callback :: onGlobalUserStatusChange :: ${JSON.stringify(latestStatus)}`);
    setGlobalUserStatus(JSON.parse(JSON.stringify(latestStatus)));
  }
  const onSkappUserStatusChange = async (latestStatus) => {
    console.log(`callback :: onSkappUserStatusChange :: ${JSON.stringify(latestStatus)}`);
    setSkappUserStatus(JSON.parse(JSON.stringify(latestStatus)));
  }
  useEffect(() => {
    getGlobalUserStatus(onGlobalUserStatusChange);
    getSkappUserStatus(hostSkapp, onSkappUserStatusChange);
    // (async () => {
    //   await getGlobalUserStatus(getRealtimeUpdate);
    // })();
    // (async () => {
    //   await getSkappUserStatus(hostSkapp, getRealtimeUpdate1);
    // })();
  }, []);

  useEffect(() => {
    setFormikObGB({
      darkmode: userPreferences?.global?.darkmode,
      portal: userPreferences?.global?.portal,
      statusPrivacy: userPreferences?.global?.userStatus?.statusPrivacy,
      lastSeenPrivacy: userPreferences?.global?.userStatus?.lastSeenPrivacy,
      updatefrequency: userPreferences?.global?.userStatus?.updatefrequency,
    });
    setSkappFormikObGB({
      darkmode: userPreferences?.[hostSkapp]?.darkmode,
      portal: userPreferences?.[hostSkapp]?.portal,
      statusPrivacy: userPreferences?.[hostSkapp]?.userStatus?.statusPrivacy,
      lastSeenPrivacy: userPreferences?.[hostSkapp]?.userStatus?.lastSeenPrivacy,
      updatefrequency: userPreferences?.[hostSkapp]?.userStatus?.updatefrequency,
    });
  }, [userPreferences]);

  const getTimeInLocalFormat = (timestamp) => {
    try {
      if (timestamp == 0 || timestamp == "0") {
        return " NA";
      }
      else {
        let ts = new Date(Number(timestamp));
        return ts.toLocaleString();
      }
    }
    catch (e) {
      console.log(`Error converting timestamp to localtime format ${e}`);
      return ts;
    }
  }

  const submitGlobalPreferencesForm = async (values) => {
    dispatch(setLoaderDisplay(true));
    let preferencesJSON = {
      darkmode: values.darkmode,
      portal: values.portal,
      userStatus: {
        statusPrivacy: values.statusPrivacy,
        lastSeenPrivacy: values.lastSeenPrivacy,
        updatefrequency: values.updatefrequency,
      }
    };
    await setGlobalPreferences(preferencesJSON);
    userPreferences.global = preferencesJSON;
    dispatch(setUserPreferencesAction(userPreferences));
    setIsSuccess(true);
    dispatch(setLoaderDisplay(false));
  };
  const submitSkappPreferencesForm = async (values) => {
    dispatch(setLoaderDisplay(true));
    let preferencesJSON = {
      darkmode: values.darkmode,
      portal: values.portal,
      userStatus: {
        statusPrivacy: values.statusPrivacy,
        lastSeenPrivacy: values.lastSeenPrivacy,
        updatefrequency: values.updatefrequency,
      }
    };
    await setSkappPreferences(preferencesJSON);
    userPreferences[hostSkapp] = preferencesJSON;
    dispatch(setUserPreferencesAction(userPreferences));
    setIsSuccess(true);
    dispatch(setLoaderDisplay(false));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSuccess(false);
    setIsError(false);
  };

  //console.log(formikObjGB);

  return (
    <div className={classes.ProfileRoot}>
      <Box>
        {isSuccess && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isSuccess}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              User Preferences Successfully Saved!
            </Alert>
          </Snackbar>
        )}
        {isError && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isError}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Error Occurred while saving User Preferences!
            </Alert>
          </Snackbar>
        )}
        {
          <Formik
            initialValues={formikObjGB}
            validateOnChange={true}
            validateOnBlur={true}
            enableReinitialize={true}
            onSubmit={submitGlobalPreferencesForm}
          >
            {(formik) => (
              <form onSubmit1={formik.handleSubmit}>
                <Box>
                  <h2>
                    Global Preferences {" "}
                    <Typography color="Secondary">[ * Global privacy preferences configuration will take precedence over Skapp specific preferences ]</Typography>
                  </h2>

                  <Box>
                    {/* {JSON.stringify(globalUserStatus)} */}
                    <Typography style={{ fontWeight: "bold" }}> LastSeen on Skynet :{getTimeInLocalFormat(globalUserStatus.lastSeen)}
                    </Typography>

                  </Box>
                </Box>
                <Box
                  display="flex"
                  className={`${classes.formRow} formSiteRow`}
                >
                  {/* <Box className={`${classes.inputContainer}`} flex={1}> */}
                  <Box className={`${classes.inputContainer}`}>
                    <SnSwitch label="Dark Mode" name="darkmode" />
                  </Box>
                  <Box className={`${classes.inputContainer}`} flex={1}>
                    <label>Skynet Portal</label>
                    <Box>
                      <SnSelect
                        label="Skynet Portal"
                        name="portal"
                        options={portalOptions}
                      />
                    </Box>
                  </Box>
                  <Box className={`${classes.inputContainer}`} flex={1}>
                    <label>Status Privacy</label>
                    <Box>
                      <SnSelect
                        label="Status Privacy"
                        name="statusPrivacy"
                        options={statusPrivacyOptions}
                      />
                    </Box>
                  </Box>
                  <Box className={`${classes.inputContainer}`} flex={1}>
                    <label>LastSeen Privacy</label>
                    <Box>
                      <SnSelect
                        label="LastSeen Privacy"
                        name="lastSeenPrivacy"
                        options={lastSeenPrivacyOptions}
                      />
                    </Box>
                  </Box>
                  <Box
                    alignItems="flex-end">
                    <Grid >
                      <Button
                        className={classes.submitBtn}
                        onClick={formik.handleSubmit}
                      >
                        <Add /> Save {" "}
                      </Button>
                    </Grid>
                  </Box>
                </Box>
                <Box marginTop={2}>
                  <Typography> [ * It may take upto 2 minutes for privacy changes to reflect on UserStatus ]</Typography>
                </Box>
              </form>
            )}
          </Formik>
        }
        <Box marginTop={5} marginBottom={5}>
          <Box marginBottom={3}>
            <Divider />
          </Box>
          <Box>
            <h2>
              Skapps Preferences{" "}
            </h2>
          </Box>
        </Box>
        {
          <Formik
            initialValues={skappFormikObjGB}
            validateOnChange={true}
            validateOnBlur={true}
            enableReinitialize={true}
            onSubmit={submitSkappPreferencesForm}
          >
            {(formik) => (
              <form onSubmit2={formik.handleSubmit}>
                <Box>  <h3 color="">Skapp Name : {hostSkapp} </h3> </Box>
                <Box>
                  {/* {JSON.stringify(skappUserStatus)} */}
                  <Typography color="Primary" style={{ fontWeight: "bold" }}> UserStatus: {skappUserStatus.status} , LastSeen:{getTimeInLocalFormat(skappUserStatus.lastSeen)}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  className={`${classes.formRow} formSiteRow`}
                >
                  <Box className={`${classes.inputContainer}`}>
                    {/* <Box className={`${classes.inputContainer}`} flex={1}> */}
                    <SnSwitch label="Dark Mode" name="darkmode" />
                  </Box>
                  <Box className={`${classes.inputContainer}`} flex={1}>
                    <label>Skynet Portal</label>
                    <Box>
                      <SnSelect
                        label="Skynet Portal"
                        name="portal"
                        options={portalOptions}
                      />
                    </Box>
                  </Box>
                  <Box className={`${classes.inputContainer}`} flex={1}>
                    <label>Status Privacy</label>
                    <Box>
                      <SnSelect
                        label="Status Privacy"
                        name="statusPrivacy"
                        options={statusPrivacyOptions}
                      />
                    </Box>
                  </Box>
                  <Box className={`${classes.inputContainer}`} flex={1}>
                    <label>LastSeen Privacy</label>
                    <Box>
                      <SnSelect
                        label="LastSeen Privacy"
                        name="lastSeenPrivacy"
                        options={lastSeenPrivacyOptions}
                      />
                    </Box>
                  </Box>
                  <Button
                    className={classes.submitBtn}
                    onClick={formik.handleSubmit}
                  >
                    <Add /> Save{" "}
                  </Button>
                </Box>
                <Box marginTop={2}>
                  <Typography> [ * It may take upto 2 minutes for privacy changes to reflect on UserStatus ]</Typography>
                </Box>
              </form>
            )}
          </Formik>
        }
      </Box>
    </div>
  );
};

export default GlobalPrefrences;
