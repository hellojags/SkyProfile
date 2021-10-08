import { Box, Button, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import { ReactComponent as AppLogo } from '../../assets/img/icons/skyprofile.svg'
import IconButton from "@material-ui/core/IconButton";
import Icon from '@material-ui/core/Icon';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppIcon from '../../svg/AppIcon';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import React, { Fragment } from "react";
// icons custom
import { ReactComponent as EditProfileIcon } from "../../assets/img/icons/edit-profile.svg";
import { ReactComponent as LogoutIcon } from "../../assets/img/icons/exit-log-out.2.svg";
import { ReactComponent as NotificationIcon } from "../../assets/img/icons/notification.svg";
import { ReactComponent as SettingIcon } from "../../assets/img/icons/settingIconGreen.svg";

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
  logo: {
    color: "#1DBF73",
    paddingLeft: 10,
    fontSize: 30,
    fontFamily: "Nunito",
    fontWeight: 800,
    "@media only screen and (max-width: 575px)": {
      fontSize: 13,
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#F0F5F7", 1),
    "&:hover": {
      backgroundColor: fade("#F0F5F7", 0.7),
    },
    // marginRight: theme.spacing(2),
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
    marginRight: "auto",
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
  },
  userName: {
    paddingLeft: "10px",
    paddingRight: "1rem",
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
  AccountBoxIcon: {
    color: "#1DBF73",
  },
  AppLogo: {
    width: 35,
    height: 35,
    color: "#1DBF73",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
  signupBtn: {
    background: "transparent",
    border: "2px solid #1DBF73",
    color: "#1DBF73",
    height: 38,
    width: 135,
    fontSize: 15,
    fontWeight: 700,

    "@media(max-width: 575px)": {
      width: 75,
      height: 36,
    },
    "&:hover": {
      background: "#1DBF73!important",
      color: "#fff!important",
    },
  },
  loginBtn: {
    background: "#1DBF73!important",
    height: 38,

    width: 135,
    color: "#fff",
    marginLeft: "1rem",
    fontSize: 15,
    fontWeight: 700,
    "@media(max-width: 575px)": {
      width: 75,
      height: 36,
      marginLeft: "10px",
    },
  },
}));

export default function LandingPageNavbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
      <MenuItem onClick={handleMenuClose} className={classes.MenuItem}>
        <SettingIcon className={classes.menuIcon} />
        <span>Settings</span>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.MenuItem}>
        <EditProfileIcon className={classes.menuIcon} />
        <span>Edit Profile</span>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.MenuItem}>
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
      <MenuItem>
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
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <Button className={classes.usrIcon}>
          <PersonOutlineIcon className={classes.avatarIcon} />
        </Button>
        <p className={classes.userName}>Fernando Cabral</p>
        <KeyboardArrowDownIcon className={classes.AngleDown} />
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <AppBar position="static" className={classes.root} color="default">
        <Toolbar className={classes.toolBarRoot}>
          <div className="logo-top">
            <Box className="logo-top" display="flex" alignItems="center">
              {/* <AccountBoxIcon
              className={classes.AccountBoxIcon}
              style={{ fontSize: 44 }}
            /> */}
                <div className={classes.AppLogo}>
                  <AppLogo/>
                </div>
              <Typography className={classes.logo}>SkyProfile</Typography>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Fragment>
  );
}
