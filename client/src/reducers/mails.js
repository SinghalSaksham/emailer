import { FETCH_ALL, CREATE} from '../constants/actionTypes';

export default (mails = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...mails, action.payload];
    default:
      return mails;
  }
};