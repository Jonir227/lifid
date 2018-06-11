import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import _ from 'lodash';

const fetchNotificationsAPI = (username, offset, limit) =>
  axios.get(`/api/notification/${username}?offset=${offset}&limit=${limit}`);

const readNotificationAPI = notiID =>
  axios.put(`/api/notification/${notiID}`);

const NOTI_PENDING = 'notification/NOTI_PENDING';
const NOTI_SUCCESS = 'notification/NOTI_SUCCESS';
const NOTI_FAIL = 'notification/NOTI_FAIL';
const NOTI_NONE = 'notification/NOTI_NONE';
const READ_PENDING = 'notification/READ_PENDING';
const READ_SUCCESS = 'notification/READ_SUCCESS';
const READ_FAIL = 'notifications/READ_FAIL';
const CLEAR = 'notifications/CLEAR';

export const notiPending = createAction(NOTI_PENDING);
export const notiSuccess = createAction(NOTI_SUCCESS);
export const notiFail = createAction(NOTI_FAIL);
export const readPending = createAction(READ_PENDING);
export const readSuccess = createAction(READ_SUCCESS);
export const readFail = createAction(READ_FAIL);
export const clear = createAction(CLEAR);

const initialState = {
  notiOffset: 0,
  notiLimit: 3,
  notificationStatus: false,
  notiPending: false,
  notifications: [],
  notiCount: 0,
  notiTotal: 0,
  readPending: false,
};

// fetch Noti Datas
export const fetchNotifications = (isLoggedIn, username, offset, limit) => (dispatch) => {
  dispatch({ type: NOTI_PENDING });

  if (!isLoggedIn) {
    dispatch({ type: NOTI_FAIL });
    return;
  }
  return fetchNotificationsAPI(username, offset, limit)
    .then((res) => {
      dispatch({
        type: NOTI_SUCCESS,
        payload: { data: res.data, moveVal: 0 },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: NOTI_FAIL,
      });
    });
};

export const notiNext = (isLoggedIn, username, offset, limit) => (dispatch) => {
  dispatch({ type: NOTI_PENDING });

  if (!isLoggedIn) {
    dispatch({ type: NOTI_FAIL });
    return;
  }

  return fetchNotificationsAPI(username, offset + limit, limit)
    .then((res) => {
      dispatch({
        type: NOTI_SUCCESS,
        payload: { data: res.data, moveVal: limit },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: NOTI_FAIL,
      });
    });
};

export const notiBefore = (isLoggedIn, username, offset, limit) => (dispatch) => {
  dispatch({ type: NOTI_PENDING });

  if (!isLoggedIn) {
    dispatch({ type: NOTI_FAIL });
    return;
  }

  return fetchNotificationsAPI(username, offset - limit, limit)
    .then((res) => {
      dispatch({
        type: NOTI_SUCCESS,
        payload: { data: res.data, moveVal: -limit },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: NOTI_FAIL,
      });
    });
}

// post readed Notification
export const readNotification = notiID => (dispatch) => {
  dispatch({ type: READ_PENDING });

  return readNotificationAPI(notiID)
    .then(() => {
      dispatch({
        type: READ_SUCCESS,
        payload: notiID,
      });
    })
    .catch((error) => {
      console.log(error.body);
      dispatch({
        type: READ_FAIL,
      });
    });
};


export default handleActions({
  [NOTI_PENDING]: state => ({ ...state, notiPending: true }),
  [NOTI_SUCCESS]: (state, action) => ({
    ...state,
    notiPending: false,
    notificationStatus: true,
    notifications: action.payload.data.notifications,
    notiCount: action.payload.data.count,
    notiOffset: state.notiOffset + action.payload.moveVal,
    notiTotal: action.payload.data.total,
  }),
  [NOTI_FAIL]: state => ({
    ...state,
    notiPending: false,
    notificationStatus: false,
  }),
  [READ_PENDING]: state => ({
    ...state,
    readPending: true,
  }),
  [READ_SUCCESS]: (state, action) => {
    const { notifications } = state;
    notifications[_.findIndex(notifications, { _id: action.payload })].read = true;
    return ({
      ...state,
      notifications,
      notiCount: state.notiCount - 1,
    });
  },
  [READ_FAIL]: status => ({ ...status, readPending: false }),
  [CLEAR]: () => (initialState),
}, initialState);
