import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const getCheckAPI = () => axios.get('/api/auth/check', { headers: { 'x-access-token': localStorage.getItem('token') } });

const LOGIN = 'loginStatus/LOGIN';
const LOGOUT = 'loginStatus/LOGOUT';
const CHECK = 'loginStatus/CHECK';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const check = createAction(CHECK);


const initialState = {
  isLoggedIn: false,
  userData: {
    username: '',
    tags: [],
    description: '',
    profilePicture: '',
  },
};

export const getCheck = () => (dispatch) => {
  console.log('hello!');
  if (!localStorage.getItem('token')) return;

  return getCheckAPI().then((res) => {
    dispatch({
      type: CHECK,
      payload: res.data,
    });
  });
};

export default handleActions({
  [LOGIN]: (prevState, action) => ({
    isLoggedIn: true,
    userData: action.payload,
  }),
  [LOGOUT]: () => ({ isLoggedOut: false, userData: {} }),
  [CHECK]: (state, action) => {
    const { userData } = action.payload;
    return { isLoggedIn: true, userData };
  },
}, initialState);
