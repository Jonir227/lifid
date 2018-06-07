import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const TODAY_NOVEL_DATA_PENDING = 'todayNovel/TODAY_NOVEL_DATA_PENDING';
const TODAY_NOVEL_DATA_SUCCESS = 'todayNovel/TODAY_NOVEL_DATA_SUCCESS';
const TODAY_NOVEL_DATA_FAIL = 'todayNovel/TODAY_NOVEL_DATA_FAIL';

export const todayNovelDataPending = createAction(TODAY_NOVEL_DATA_PENDING);
export const todayNovelDataSuccess = createAction(TODAY_NOVEL_DATA_SUCCESS);
export const todayNovelDataFail = createAction(TODAY_NOVEL_DATA_FAIL);

const defaultData = {
  novelPending: false,
  novelData: {
    name: '',
    author: '',
    quotation: '',
    dueDate: '',
  },
};

export const getTodayNovel = data => (dispatch) => {
  dispatch({ type: TODAY_NOVEL_DATA_PENDING });

  return axios.get(`/api/today-novel/${data}`)
    .then((res) => {
      dispatch({
        type: TODAY_NOVEL_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: TODAY_NOVEL_DATA_FAIL,
      });
    });
};

export default handleActions({
  [TODAY_NOVEL_DATA_PENDING]: state => ({ ...state, novelPending: true }),
  [TODAY_NOVEL_DATA_SUCCESS]: (state, action) => {
    const novelData = action.payload;
    return { novelPending: false, novelData };
  },
  [TODAY_NOVEL_DATA_FAIL]: () => ({ novelPending: false }),
}, defaultData);
