import { Box, Button, Tooltip, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreIcon from "@material-ui/icons/MoreVert";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as LogoutIcon } from "../../assets/img/icons/exit-log-out.2.svg";
import { ReactComponent as CustomMenuIcon } from "../../assets/img/icons/Icon ionic-ios-menu.svg";
import { ReactComponent as NotificationIcon } from "../../assets/img/icons/notification.svg";
import { setLoaderDisplay } from "../../redux/action-reducers-epic/SnLoaderAction";
import { setUserPreferencesAction } from "../../redux/action-reducers-epic/SnUserPreferencesAction";
import { setUserProfileAction } from "../../redux/action-reducers-epic/SnUserProfileAction";
import { setUserSession } from "../../redux/action-reducers-epic/SnUserSessionAction";
import { clearAllfromIDB, IDB_STORE_SKAPP } from "../../service/SnIndexedDB";
import { getPreferences, getProfile } from "../../service/SnSkappService";
import { BROWSER_STORAGE } from "../../utils/SnConstants";
import { skylinkToUrl } from "../../service/skynet-api";
import { useHistory } from "react-router-dom";
import SnDisclaimer from "../Utils/SnDisclaimer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    background: "#ffff 0 % 0 % no-repeat padding-box",
    boxShadow: "0px 1px 4px #15223214",
  },
  toolBarRoot: {
    justifyContent: "space-between",
    "@media only screen and (max-width: 890px)": {
      justifyContent: "space-between",
    },
  },
  // grow: {
  //     flexGrow: 1,
  //     // background: 'red'
  //     '@media only screen and (max-width: 890px)': {
  //         flexGrow: 0,
  //     }
  // },
  menuButton: {
    display: "none",
    marginRight: theme.spacing(2),
    "@media only screen and (max-width: 890px)": {
      display: "block",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#F0F5F7", 1),
    "&:hover": {
      backgroundColor: fade("#F0F5F7", 0.7),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    color: "#8B9DA5",
    "@media only screen and (max-width: 890px)": {
      display: "none",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#B4C6CC",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  AccountBoxIcon: {
    color: "#1DBF73",
  },
  logo: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Nunito",
    fontWeight: "fontWeightBold",
    "@media only screen and (max-width: 575px)": {
      fontSize: 13,
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  usrIcon: {
    width: "28px",
    height: "28px",
    minWidth: "auto",
    backgroundColor: "#7e84a31c",
    borderRadius: "4px",
    padding: 0,
  },
  userName: {
    paddingLeft: "10px",
    paddingRight: "1rem",
    textTransform: "capitalize",
    maxWidth: 110,
  },
  helpText: {
    paddingLeft: ".5rem",
  },
  pr_4: {
    paddingRight: "2rem",
  },
  AngleDown: {
    color: "#B4C6CC",
  },
  QuestionIcon: {
    marginRight: "7px",
  },
  avatarIcon: {
    color: "#7E84A3",
  },
  MenuRoot: {
    marginTop: "40px",
  },
  MenuItem: {
    borderBottom: ".3px solid #70707045",
    "@media(max-width: 991px)": {
      fontSize: "12px",
    },
  },
  menuIcon: {
    marginRight: ".90rem",
    "@media(max-width: 1440px)": {
      marginRight: ".70rem",
    },
  },
  logoutText: {
    color: "#FF6060",
  },
  notifiText: {
    paddingLeft: "10px",
  },
  mobileHelpItem: {
    paddingLeft: ".5rem",
  },
}));

export default function Navbar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const userSession = useSelector((state) => state.userSession);
  const [person, setPerson] = useState({ username: "MySky User", url: "" });

  const userProfile = useSelector((state) => state.snUserProfile);
  useEffect(() => {
    let avatarURl = userProfile?.avatar ? userProfile?.avatar[0]?.url : null;
    setPerson({ username: userProfile?.username, url: avatarURl });
  }, [userProfile]);

  useEffect(() => {
    const reloadReduxState = async () => {
    //console.log("#### On Refresh : Reload Redux State ####");
      if (userSession?.mySky != null) {
      //console.log("#### On Refresh : Reload Redux State #### [userProfile]");
        const userProfile = await getProfile();
        let avatarURl = userProfile?.avatar ? userProfile?.avatar[0]?.url : null;
        setPerson({ username: userProfile?.username, url: avatarURl });
        dispatch(setUserProfileAction(userProfile));
      //console.log("#### On Refresh : Reload Redux State #### [userPrefrences]");
        const userPrefrences = await getPreferences();
        dispatch(setUserPreferencesAction(userPrefrences));
      }
    };
    reloadReduxState();
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMySkyLogout = async () => {
    try {
      dispatch(setLoaderDisplay(true));
      if (userSession?.mySky) {
        try {
          await userSession.mySky.logout();
        } catch (e) {
        //console.log("Error during logout process." + e);
        }
      }
      await clearAllfromIDB({ store: IDB_STORE_SKAPP });
      BROWSER_STORAGE.clear();
      await dispatch(setUserSession(null));
      dispatch(setLoaderDisplay(false));
      window.location.href = window.location.origin;
    } catch (e) {
    //console.log("Error during logout process." + e);
      dispatch(setLoaderDisplay(false));
    }
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="profile-dropdown"
    >
      <MenuItem onClick={handleMySkyLogout} className={classes.MenuItem}>
        <LogoutIcon className={classes.menuIcon} />
        <span className={classes.logoutText}>Logout</span>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
                <Box display='flex' alignItems="center" className={classes.mobileHelpItem} >
                    <QuestionIcon />
                    <p className={classes.helpText}>Help</p>
                </Box>
            </MenuItem> */}
      {/* <MenuItem>
        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          style={{ width: "30px", height: "28px" }}
        >
          <Badge color="secondary" variant="dot">
            <NotificationIcon />
          </Badge>
        </IconButton>
        <p className={classes.notifiText}>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button className={classes.usrIcon}>
          {person.url ? (
            <img width="100%" src={skylinkToUrl(person.url)} alt="" />
          ) : (
            <PersonOutlineIcon className={classes.avatarIcon} />
          )}
        </Button>
        <Tooltip title={person.username} placement="top" arrow>
          <Typography className={classes.userName} noWrap>
            {person.username}
          </Typography>
        </Tooltip>
        <KeyboardArrowDownIcon className={classes.AngleDown} />
      </MenuItem>
    </Menu>
  );
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuButtonHandler = () => {
    menuIsOpen ? setMenuIsOpen(false) : setMenuIsOpen(true);
  };
  return (
    <Fragment>
      <AppBar position="static" className={classes.root} color="default">
        <Toolbar className={classes.toolBarRoot}>
          <IconButton
            edge="start"
            onClick={menuButtonHandler}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <CustomMenuIcon />
          </IconButton>
          <Box className="logo-top" display="flex" alignItems="center">
            <AccountBoxIcon
              className={classes.AccountBoxIcon}
              style={{ fontSize: 44, marginRight: 8 }}
            />
            <Typography className={classes.logo}>SkyProfile</Typography>
          </Box>
          {/* <Box display="flex" alignItems="flex-end" flexWrap="wrap" flexShrink={1}>
            <SnDisclaimer></SnDisclaimer>
          </Box> */}
          <div className={classes.sectionDesktop}>
            <Box
              display="flex"
              alignItems="center"
              onClick={handleProfileMenuOpen}
            >
              <Button className={classes.usrIcon}>
                {person.url ? (
                  <img width="100%" src={skylinkToUrl(person.url)} alt="" />
                ) : (
                  <PersonOutlineIcon className={classes.avatarIcon} />
                )}
              </Button>
              <Tooltip title={person.username} placement="top" arrow>
                <Typography className={classes.userName} noWrap>
                  {person.username}
                </Typography>
              </Tooltip>
              <KeyboardArrowDownIcon className={classes.AngleDown} />
            </Box>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Fragment>
  );
}
