import { combineReducers } from 'redux';
import user from "./userReducer";
import auth from "./authReducer";
import product from "./productReducer";
import order from "./orderReducer";
import shop from "./shopReducer";

const appReducers = combineReducers({
  user,
  auth,
  product,
  order,
  shop
});
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      state = null
    }
    return appReducers(state, action)
  }
export default appReducers;