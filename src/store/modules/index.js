import { combineReducers } from 'redux';
import loginStatus from './loginStatus';
import todayNovel from './todayNovel';
import notification from './notification';

export default combineReducers({
  loginStatus,
  todayNovel,
  notification,
});
