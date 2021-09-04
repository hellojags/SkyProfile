export const WEBSERVICE_SUCCESS = "success"
export const WEBSERVICE_FAILURE = "failure"
export const APP_TITLE = "SkySpaces"
export const APP_BG_COLOR = "var(--app-bg-color)"
export const ITEMS_PER_PAGE = 9
export const STORAGE_SKYSPACE_APP_COUNT_KEY = "SKYSPACE_APP_COUNT"
export const STORAGE_USER_KEY = "USER"
export const STORAGE_SKYSPACE_LIST_KEY = "SKYSPACELIST"
export const STORAGE_USER_SETTING_KEY = "USER_SETTING"
export const STORAGE_USER_APP_PROFILE_KEY = "USER_APP_PROFILE"
export const STORAGE_USER_PREFERENCES_KEY = "USER_PREFERENCES"
export const STORAGE_PORTALS_LIST_KEY = "PORTALS_LIST"
//export const STORAGE_USER_SESSION_KEY = "USER_SESSION"
export const STORAGE_DARK_MODE_KEY = "darkMode"
export const BROWSER_STORAGE = localStorage
export const BLOCKSTACK_CORE_NAMES = "https://core.blockstack.org/v1/names"
export const STORAGE_REDIRECT_POST_LOGIN_KEY = "REDIRECT_POST_LOGIN"
export const STORAGE_SKYAPP_DETAIL_KEY = "SKYAPP_DETAIL"
export const STORAGE_SKYSPACE_DETAIL_KEY = "STORAGE_SKYSPACE_DETAIL_KEY"

export const ID_PROVIDER_BLOCKSTACK = "BLOCKSTACK_ID"
export const ID_PROVIDER_SKYID = "SKYID"
export const ID_PROVIDER_CERAMIC = "CERAMIC_ID"

export const ADD_SKYSPACE = "ADD_SKYSPACE"
export const RENAME_SKYSPACE = "RENAME_SKYSPACE"
export const DELETE = "DELETE"

export const ADD_PORTAL = "ADD_PORTAL"
export const EDIT_PORTAL = "RENAME_PORTAL"
export const DELETE_PORTAL = "DELETE_PORTAL"

export const APP_SKYDB_SEED = "THE_SKYSPACES_APP_SKYDB_SEED"
export const SKYDB_SERIALIZATION_SEPERATOR = "."

export const UPLOAD = "Upload"
export const DOWNLOAD = "Download"
export const PUBLIC_IMPORT = "Public Import"

// export const PUBLIC_SHARE_BASE_URL = "https://siasky.net/AAB-SesrL4TJn8l6F0besVVWYCK8axTjTmffFK4WTBPLWA/?#/";
export const PUBLIC_SHARE_ROUTE = "public-skapps/"
// export const DOWNLOAD_PORTAL = process.env.REACT_APP_SIASKYNET_HOST;
// export const SKYNETHUB_PORTAL = process.env.REACT_APP_SKYNETHUB_HOST;
export const MUI_THEME_LIGHT = "light"
export const MUI_THEME_DARK = "dark"


// IndexedDB metadataKey to maintain local state (not required in SkyDB)
export const IDB_LAST_SYNC_REVISION_NO = "skhub/skyspaces/idb/lastSyncRevNo"
export const IDB_IS_OUT_OF_SYNC = "skhub/skyspaces/idb/isOutOfSync"

// add skyDB datakey name must be prefixed with DK_
export const DK_IDB_SKYSPACES = "skhub/skyspaces/idb"
export const DK_IDB_SYNC_HISTORY = "skhub/skyspaces/idb"

// ** Start : AppStore Specific keys
export const APP_STORE_PROVIDER_FILEPATH = "skyx/skapp/appstoreprovider"
// ** End : AppStore Specific keys
export const SUCCESS = "success"
export const FAILED = "failed"
export const CONFLICT = "conflict"
export const FAILED_DECRYPT_ERR = "FailedDecryptionError"
export const AVATAR_IMAGE_DEFAULT = "https://s3.amazonaws.com/onename/avatar-placeholder.png"
export const authOrigin = "" 
export const UPLOAD_SOURCE_DEPLOY = "UPLOAD_SOURCE_DEPLOY";
export const UPLOAD_SOURCE_NEW_HOSTING = "UPLOAD_SOURCE_NEW_HOSTING";
export const UPLOAD_SOURCE_NEW_HOSTING_IMG = "UPLOAD_SOURCE_NEW_HOSTING_IMG";

export const STORAGE_SELECTED_HOSTED_APP_KEY = "STORAGE_SELECTED_HOSTED_APP_KEY";


// Skapp SkyDB DataKeys
export const DK_INSTALLED_APPS = "installedApps";
export const DK_PUBLISHED_APPS = "publishedApps";
export const DK_HOSTED_APPS = "hostedApps";

export const DK_AGGREGATED_PUBLISHED_APPS = "aggregatedPublishedApps";
export const DK_AGGREGATED_PUBLISHED_APPS_STATS = "aggregatedPublishedAppsStats";

//Stats Action Type
// export const VIEW_COUNT = "view";
// export const ACCESS_COUNT = "access";
// export const LIKE = "like";
// export const LIKE_REMOVED = "like_removed";
// export const FAVORITE = "favorite";
// export const FAVORITE_REMOVED = "favorite_removed";
export const ANONYMOUS = "anonymous";
// SkyMQ Events
export const EVENT_PUBLISHED_APP = "0";
export const EVENT_PUBLISHED_APP_REMOVED = "1";
export const EVENT_APP_VIEWED = "2";
export const EVENT_APP_ACCESSED = "3";
export const EVENT_APP_LIKED = "4";
export const EVENT_APP_LIKED_REMOVED = "5";
export const EVENT_APP_FAVORITE = "6";
export const EVENT_APP_FAVORITE_REMOVED = "7";
export const EVENT_APP_COMMENT = "8";
export const EVENT_APP_COMMENT_REMOVED = "9";
export const EVENT_APP_INSTALLED = "10";
export const EVENT_APP_UNINSTALLED = "11";

// export const EVENT_APP_LIKED_REMOVED =  'appLikedRemoved';
// export const EVENT_APP_FAVORITE_MARKED =  'FavoriteMarked';
// export const EVENT_APP_FAVORITE_UNMARKED =  'FavoriteUnmarked';
// export const EVENT_APP_COMMENT_ADDED =  'commentAdded';
// export const EVENT_APP_COMMENT_REMOVED =  'commentRemoved';
// export const EVENT_REMOVE_PUBLISHED_APP =  DK_PUBLISHED_APPS + '#REMOVED';
