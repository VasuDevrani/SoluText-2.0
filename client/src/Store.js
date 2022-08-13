import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

export const Store = createContext();

const initialState = {
  note: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
  userInfo: localStorage.getItem("userinfo")
    ? JSON.parse(localStorage.getItem("userinfo"))
    : null,
  translations: localStorage.getItem("trans")
    ? JSON.parse(localStorage.getItem("trans"))
    : [],
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
