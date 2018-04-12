import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const getCheckAPI = () => axios.get('/api/auth/check', { headers: { 'x-access-token': localStorage.getItem('token') } });

const LOGIN = 'loginStatus/LOGIN';
const LOGOUT = 'loginStatus/LOGOUT';
const CHECK_PENDING = 'loginStatus/CHECK_PENDING';
const CHECK_SUCCESS = 'loginStatus/CHECK_SUCCESS';
const CHECK_FAIL = 'loginStatus/CHECK_FAIL';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const checkPending = createAction(CHECK_PENDING);
export const checkSuccess = createAction(CHECK_SUCCESS);
export const checkFail = createAction(CHECK_FAIL);

const emptyUserData = {
  username: '',
  tags: [],
  description: '',
  profilePicture: '',
};

const initialState = {
  isLoggedIn: false,
  pending: false,
  userData: emptyUserData,
};

export const getCheck = () => (dispatch) => {
  dispatch({ type: CHECK_PENDING });

  if (!localStorage.getItem('token')) {
    localStorage.removeItem('token');
    dispatch({
      type: CHECK_FAIL,
    });
    return;
  }

  return getCheckAPI()
    .then((res) => {
      dispatch({
        type: CHECK_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: CHECK_FAIL,
      });
    });
};

export default handleActions({
  [LOGIN]: (prevState, action) => ({
    isLoggedIn: true,
    userData: action.payload,
  }),
  [LOGOUT]: () => ({ isLoggedIn: false, userData: emptyUserData }),
  [CHECK_PENDING]: state => ({ ...state, pending: true }),
  [CHECK_SUCCESS]: (state, action) => {
    const { userData } = action.payload;
    return { pending: false, isLoggedIn: true, userData };
  },
  [CHECK_FAIL]: () => ({ pending: false, isLoggedIn: false }),
}, initialState);
