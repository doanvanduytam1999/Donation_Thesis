import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducer";

//const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(/* applyMiddleware(...middleware) */)
);

export default store;