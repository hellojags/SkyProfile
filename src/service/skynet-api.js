import { UserProfileDAC } from "@skynethub/userprofile-library";
import { SkynetClient } from "skynet-js";
import { SocialDAC } from "social-dac-library";
import store from "../redux";
import { IDB_STORE_SKAPP, setJSONinIDB } from "./SnIndexedDB";

const portal =
  window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;
const client = new SkynetClient(portal);
const hostApp = window.location.hostname === 'localhost' ? "localhost" : "skyprofile.hns";

export const initMySky = async () => {
  let userSession = null;
  let loggedIn = false;
  try {
    // Initialize MySky.
    //const mySky = await client.loadMySky(hostApp, { dev: true, debug: true });
    const mySky = await client.loadMySky(hostApp);
    const userProfileDAC = new UserProfileDAC();
    const socialDAC = new SocialDAC();
    await mySky.loadDacs(userProfileDAC, socialDAC);
    //await mySky.loadDacs(userProfileDAC);
    // Add additional needed permissions before checkLogin.
    // Can be Permissions object or list of Permissions objects
    //await mySky.addPermissions(new Permission("requestor.hns", "domain.hns/path", PermCategory.Hidden, PermType.Write));
    // Try to login silently, requesting permissions for hostApp HNS.
    loggedIn = await mySky.checkLogin(); // check if user is already logged-In
    //console.log("checkLogin : loggedIn status: " + loggedIn);
    userSession = { mySky, dacs: { userProfileDAC, socialDAC } };
    //userSession = { mySky, dacs: { userProfileDAC } };
    // if not logged-in
    let portalUrl = await client.portalUrl();
    console.log("initMySky : portalUrl " + portalUrl);
    if (loggedIn) {
      let userID = await mySky.userID();
      userSession = { ...userSession, userID, portalUrl};
    }
    else
    {
      userSession = { ...userSession,portalUrl};
    }
  } catch (e) {
    console.error(e);
    return { loggedIn, userSession };
  }
  return { loggedIn, userSession };
};

export const handleMySkyLogin = async (userSession) => { };

export const getUserSession = async () => {
  let session = null;
  try {
    const state = store.getState();
    session = await state.userSession;
  } catch (e) {
    return session;
  }
  return session;
};

export const getPortalUrl = () => {
  let portalUrl = null;
  try {
    const state = store.getState();
    portalUrl = state.userSession.portalUrl;
  } catch (e) {
    return portalUrl;
  }
  return portalUrl;
};

export const getUserID = async () => {
  const userSession = await getUserSession();
  return userSession?.mySky?.userID() ?? null;
};

export const getMySky = async () => {
  const userSession = await getUserSession();
  return userSession?.mySky ?? null;
};
export const getContentDAC = async () => {
  const userSession = await getUserSession();
  return userSession?.dacs?.contentDAC ?? null;
};
export const getProfileDAC = async () => {
  const userSession = await getUserSession();
  return userSession?.dacs?.userProfileDAC ?? null;
};
export const getSocialDAC = async () => {
  const userSession = await getUserSession();
  return userSession?.dacs?.socialDAC ?? null;
}
export const getFeedDAC = async () => {
  const userSession = await getUserSession();
  return userSession?.dacs?.feedDAC ?? null;
};

export const getFile_MySky = async (dataKey, options) => {
  let result = null;
  try {
    // Below condition means, we are fetching other user's data
    if (options?.userID) {
      result = await client.file.getJSON(options.userID, dataKey);
    } else {
      let mySky = await getMySky();
      result = await mySky.getJSON(dataKey);
    }
    // TODO: decrypt method
    return result;
  } catch (error) {
    // setErrorMessage(error.message);
    //console.log(`error.message ${error.message}`);
    return null;
  }
};

// sets JSON file in MySky
export const putFile_MySky = async (dataKey, content, options) => {
  try {
    // get previous skylink
    // create linked list to track history
    if (options?.historyflag == true) {
      content.prevSkylink = getFile_MySky(dataKey)?.skylink ?? null;
    }
    // set new data in SkyDB with
    // encrypt it
    if (options?.encrypt == true) {
      //const cypherContent = await encryptData(privateKey, publicKey, JSON.stringify(content))
      //status = await skynetClient.db.setJSON(privateKey, dataKey, cypherContent)
    } else {
      let mySky = await getMySky();
      await mySky.setJSON(dataKey, content);
    }
    await setJSONinIDB(dataKey, content, { store: IDB_STORE_SKAPP });
    return true;
  } catch (error) {
    // setErrorMessage(error.message);
    //console.log(`error.message ${error.message}`);
    return false;
  }
};

export const skylinkToUrl = (skyLink) => {
  let link = "";
  try {
    if (skyLink.indexOf("http://") === 0 || skyLink.indexOf("https://") === 0) {
      link = skyLink;
    } else if (skyLink.indexOf("sia://") === 0) {
      link = skyLink.replace("sia://", "");
    } else if (skyLink.indexOf("sia:") === 0) {
      link = skyLink.replace("sia:", "");
    }
   
    link = getPortalUrl() + "/"+ link;
    //console.log("skylinkToUrl():: full url " + link);
    return link;
  }
  catch (error) {
    console.log("skylinkToUrl() : error: " + error);
    return link;
  }
};

export const uploadFile = async (file) => {
  try {
    const md = await client.uploadFile(file);
    return md;
  } catch (error) {
    console.log(error);
    return null;
  }
};
