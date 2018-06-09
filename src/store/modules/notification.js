import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const fetchNotificationsAPI = username =>
  axios.get(`/api/notification/${username}`);

const readNotificationAPI = docNo =>
  axios.post('/api/notification/read', docNo);

const NOTI_PENDING = 'notification/NOTI_PENDING';
const NOTI_SUCCESS = 'notification/NOTI_SUCCESS';
const NOTI_FAIL = 'notification/NOTI_FAIL';
const NOTI_NONE = 'notification/NOTI_NONE';
const READ_PENDING = 'notification/READ_PENDING';
const READ_SUCCESS = 'notificaiton/READ_SUCCESS';
const READ_FAIL = 'notificaitons/READ_FAIL';

const initialState = {
  notificationStatus: false,
  notiPending: false,
  notifications: [],
  readPending: false,
};

// fetch Noti Datas
export const fetchNotifications = (isLoggedIn, username = '') => (dispatch) => {
  dispatch({ type: NOTI_PENDING });

  if (!isLoggedIn) {
    dispatch({ type: NOTI_NONE });
    return;
  }

  return fetchNotificationsAPI(username)
    .then((res) => {
      dispatch({
        type: NOTI_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: NOTI_FAIL,
      });
    });
};

// post readed Notification
export const readNotification = docNo => (dispatch) => {
  dispatch({ type: READ_PENDING });

  return readNotificationAPI(docNo)
    .then(() => {
      dispatch({
        type: READ_SUCCESS,
      });
    })
    .catch(() => {
      dispatch({
        type: READ_FAIL,
      });
    });
}

export default handleActions({
  [NOTI_PENDING]: state => ({ ...state, notiPending: true }),
  [NOTI_SUCCESS]: (state, action) => ({
    ...state,
    notiPending: false,
    notificaitonStatus: true,
    notifications: action.payload,
  }),
  [NOTI_FAIL]: () => ({
    notiPending: false,
    notificaitonStatus: false,
  }),
  [READ_PENDING]: () => ({
    readPending: true,
  }),
  [READ_SUCCESS]: (state, action) => ({
    ...state,
    notificaitons: _.reject(state, action.payload),
  }),
  [READ_FAIL]: () => ({ readPending: false }),
}, initialState);
