import { persistCombineReducers } from 'redux-persist';
import {
  login,
  register,
  getreset,
  validate,
  token,
} from './AuthReducer';
import {action} from './ActionsReducer'

import {
  updateuser,
  getuser
} from './UserReducer';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'rmnkbnkcrhikneubvinknebvbit',
  storage
};
//import metrics from "./metricReducer"

export default persistCombineReducers(persistConfig, {
  login,
  action,
  register,
  getreset,
  validate,
  updateuser,
  getuser,
  token
});
