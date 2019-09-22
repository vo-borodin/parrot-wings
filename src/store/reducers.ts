import { combineReducers } from "redux";

import { authentication } from "./auth/reducers";
import { users } from "./users/reducers";
import { alert } from "./alert/reducers";

const rootReducer = combineReducers({
  authentication,
  users,
  alert
});

export default rootReducer;
