import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import App from "./containers/App/App";
import registerServiceWorker from "./utilities/registerServiceWorker";
import { store } from "./reducers/rootReducer";

// if (localStorage.gozoneJWT) {
//  const payload = decode(localStorage.gozoneJWT);
//  const user = {
//    id: payload.id,
//    token: localStorage.gozoneJWT,
//    email: payload.email,
//    admin: payload.admin
//  };
//  store.dispatch(userLoggedIn(user));
// }

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
