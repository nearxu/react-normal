import * as types from "../action-types";

  export default function menus(state = [], action) {
    switch (action.type) {
      case types.SET_MENUS:
        return {
          ...state,
          menus:action.menus
        };
      case types.RESET_MENUS:
        return {
            ...state,
            menus:[]
        } 
      default:
        return state;
    }
  }

