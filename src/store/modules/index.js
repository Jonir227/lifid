import { combineReducers } from 'redux';
import loginStatus from './loginStatus';
import todayNovel from './todayNovel';

export default combineReducers({
  loginStatus,
  todayNovel,
});
