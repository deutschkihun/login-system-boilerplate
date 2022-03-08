import React from "react";
import "react-app-polyfill/ie11";
import "core-js";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import rootReducer from "./_reducers/user_reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// https://react-redux.js.org/api/hooks
// https://www.mydatahack.com/getting-redux-devtools-to-work-with-typescript/
ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      rootReducer,
      composeEnhancers && composeEnhancers()
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
