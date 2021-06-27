import { combineReducers } from 'redux';

import auth from './auth';
import mails from './mails'

export const reducers = combineReducers({ mails,auth });