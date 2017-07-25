
import { combineReducers } from 'redux';

import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';
import userInfo from './user';

export default combineReducers({
  drawer,
  cardNavigation,
  routes,
  userInfo
});
