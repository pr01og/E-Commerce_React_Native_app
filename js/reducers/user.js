
import type { Action } from '../actions/types';
import { GET_USER } from '../actions/user';

export type State = {
  userInfo: object,
  loggedIn: boolean,
}

const initialState = {
  userInfo: {},
  loggedIn: false,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === GET_USER) {
    return {
      ...state,
      userInfo: action.data,
      loggedIn: true
    };
  }
  return state;
}
