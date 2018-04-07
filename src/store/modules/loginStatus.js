import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const LOGIN = 'loginStatus/LOGIN';
const LOGOUT = 'loginStatus/LOGOUT';
const CHECKUSER = 'loginStatus/CHECKUSER';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const checkUser = createAction(CHECKUSER);


const initialState = {
  isLoggedIn: false,
  userData: {
    username: '',
    tags: [],
    description: '',
    profilePicture: '',
  },
};

export default handleActions({
  [LOGIN]: (prevState, action) => ({
    isLoggedIn: true,
    userData: action.payload,
  }),
  [LOGOUT]: () => ({ isLoggedOut: false, userData: {} }),
}, initialState);
