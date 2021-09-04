import imageCompression from "browser-image-compression";
import { getProfileDAC, getUserID,getSocialDAC } from "./skynet-api";
import { uploadFile } from "./skynet-api";

export const getProfile = async () => {
  try {
    //set options
    const profileDAC = await getProfileDAC();
    //return await getFile_MySky("userProfile", { skydb: true })?.data
    const userID = await getUserID();
    return await profileDAC.getProfile(userID);
    //return JSON.parse(BROWSER_STORAGE.getItem('userProfile'));
  } catch (e) {
    console.log("profileDAC.getProfile : failed =" + e);
    return null;
  }
  // getFile_MySky( "userProfile", { skydb: true })
};

export const setProfile = async (profileJSON) => {
  //set options
  //const resultObj = await putFile_MySky("userProfile", profileJSON, { skydb: true });
  //BROWSER_STORAGE.setItem('userProfile', JSON.stringify(profileJSON));
  try {
    const profileDAC = await getProfileDAC();
    const status = await profileDAC.setProfile(profileJSON);
    const profile = await getProfile();
  //console.log("profileDAC.setProfile : After write : =" + profile);
    //await getContentDAC().recordNewContent({ skylink: resultObj.skylink, metadata: { "contentType": "userprofile", "action": "update" } });
    return profileJSON;
  } catch (e) {
  console.log("profileDAC.setProfile : failed =" + e);
  }
  return {};
  // await putFile_MySky("userProfile", profileJSON, { skydb: true });
};

export const getPreferences = async () => {
  try {
    //set options
    const profileDAC = await getProfileDAC();
    //return await getFile_MySky("userProfile", { skydb: true })?.data
    const userID = await getUserID();
    return await profileDAC.getPreferences(userID);
    //return JSON.parse(BROWSER_STORAGE.getItem('userProfile'));
  } catch (e) {
    console.log("profileDAC.getPreferences : failed =" + e);
    return null;
  }
};
export const setPreferences = async (preferencesJSON) => {
  try {
    const profileDAC = await getProfileDAC();
    //set options
    await profileDAC.setPreferences(preferencesJSON);
    //await getContentDAC().recordNewContent({ skylink: resultObj.skylink, metadata: { "contentType": "preferences", "action": "update" } });
    return preferencesJSON;
  } catch (e) {
    console.log("profileDAC.setPreferences : failed =" + e);
  }
  return {};
};
// ### Following/Followers Functionality ###
export const getFollowingCountForUser = async (userID) => {
  let followingCount = 0;
  try
  {
  const socialDAC = await getSocialDAC();
  const userId = userID ?? (await getUserID());
  console.log("getFollowingCountForUser:userId" + userId);
  //console.log("getFollowingCountForUser:socialDAC" + socialDAC);
  followingCount = await socialDAC.getFollowingCountForUser(userId)
//console.log("getFollowingCountForUser" + followingCount);
  // try {
  //     const contentDAC = await getContentDAC();
  //     await contentDAC.recordNewContent({ skylink: resultObj.dataLink, metadata: { "contentType": "following", "action": "add" } });
  //  } catch (e) {
  // //console.log("contentDAC.recordNewContent : failed =" + e)
  // }
  } catch (e) {
  console.log("getFollowingCountForUser : failed =" + e)
  }
  return followingCount;
}
//action for upload videos and images
export const UploadAppLogo = async (
  file,
  setLogoUploaded,
  logoLoaderHandler
) => {
  try {
    const getCompressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 256,
      useWebWorker: true,
    });
    const skylinkForCompressed = await uploadFile(getCompressed);
    const skylink = await uploadFile(file);
    let obj = {
      thumbnail: skylinkForCompressed.skylink,
      image: skylink.skylink,
    };
    setLogoUploaded(obj);
    logoLoaderHandler(false);
  } catch (err) {
    logoLoaderHandler(false);
  }
};

export const UploadImagesAction = async (file, getUploadedFile, getFun) => {
  try {
    const getCompressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 256,
      useWebWorker: true,
    });

    const skylinkForCompressed = await uploadFile(getCompressed);

    const skylink = await uploadFile(file);

    let obj = {
      thumbnail: skylinkForCompressed.skylink,
      image: skylink.skylink,
    };

    getUploadedFile(obj);
    getFun(false);
  } catch (err) {
    getFun(false);
  //console.log(err);
  }
};
