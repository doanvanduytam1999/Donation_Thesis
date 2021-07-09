//import { createStore, applyMiddleware } from "redux";
//import { composeWithDevTools } from "redux-devtools-extension";
import LoginReducer from "./redux/reducer/auth";
import {configureStore} from "@reduxjs/toolkit"
//import thunk from "redux-thunk";
import UserReducer from "./redux/reducer/UserSlice";
//import reducer from "./redux/reducer";
//const middleware = [thunk];


const store = configureStore({
  reducer:{
    login : LoginReducer,
    user :UserReducer
  }
  
});

export default store;
