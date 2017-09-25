import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";

export const rootReducer = combineReducers({
  user,
  form: formReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
