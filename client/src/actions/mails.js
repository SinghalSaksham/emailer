import { FETCH_ALL, CREATE} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getMails = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMails();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createMail = (mail) => async (dispatch) => {
  try {
    const { data } = await api.createPost(mail);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
