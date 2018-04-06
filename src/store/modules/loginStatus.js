import { createAction, handleActions } from 'redux-actions';

const LOGIN = 'loginStatus/LOGIN';
const LOGOUT = 'loginStatus/LOGOUT';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

const initialState = {
  isLoggedIn: false,
};

export default handleActions({
  [LOGIN]: () => ({ isLoggedIn: true }),
  [LOGOUT]: () => ({ isLoggedOut: false }),
}, initialState);
