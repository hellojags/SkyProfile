import {
  ACT_TY_SET_USER_PROFILE,
  EPIC_TY_SET_USER_PROFILE
} from "../SnActionConstants"
import store from ".."
import { STORAGE_USER_APP_PROFILE_KEY, BROWSER_STORAGE } from "../../utils/SnConstants"

// get internally calls set from epic
export const setUserProfileEpic = (userAppProfile) => {
  if (userAppProfile == null) {
    BROWSER_STORAGE.removeItem(STORAGE_USER_APP_PROFILE_KEY)
  } else {
    BROWSER_STORAGE.setItem(STORAGE_USER_APP_PROFILE_KEY,JSON.stringify(userAppProfile))
  }
  return {
    type: EPIC_TY_SET_USER_PROFILE,
    payload: userAppProfile,
  }
}
// This method is called during login and on Profile Page
export const setUserProfileAction = (userAppProfile) => {
  if (userAppProfile == null) {
    userAppProfile = BROWSER_STORAGE.getItem(STORAGE_USER_APP_PROFILE_KEY)
    if (userAppProfile != null) {
      userAppProfile = JSON.parse(userAppProfile)
    }
    
  } else {
    BROWSER_STORAGE.setItem(STORAGE_USER_APP_PROFILE_KEY,JSON.stringify(userAppProfile))
  }
  return {
    type: ACT_TY_SET_USER_PROFILE,
    payload: userAppProfile,
  }
}