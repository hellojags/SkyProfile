import { combineReducers, createStore } from "redux"
import { combineEpics } from "redux-observable"
import { composeWithDevTools } from "redux-devtools-extension"
import SnLoaderReducer from "./action-reducers-epic/SnLoaderReducer"
import SnUserProfile from "./action-reducers-epic/SnUserProfileReducer"
import { snUserProfileEpic } from "./action-reducers-epic/SnUserProfileEpic"
import SnUserPreferences from "./action-reducers-epic/SnUserPreferencesReducer"
import { snUserPreferencesEpic } from "./action-reducers-epic/SnUserPreferencesEpic"
import SnUploadListReducer from "./action-reducers-epic/SnUploadListReducer";
import SnUserSessionReducer from "./action-reducers-epic/SnUserSessionReducer";

const redux = require("redux")
const { createEpicMiddleware } = require("redux-observable")

const rootReducer = combineReducers({
  snLoader: SnLoaderReducer,
  userSession: SnUserSessionReducer,
  snUserProfile: SnUserProfile,
  snUserPreferences: SnUserPreferences,
  snUploadListStore: SnUploadListReducer
})

const rootEpic = combineEpics(
  snUserProfileEpic,
  snUserPreferencesEpic,
)

const observableMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(redux.applyMiddleware(observableMiddleware))
)
observableMiddleware.run(rootEpic)

export default store
