import {
    SET_SAFE_AREA,
    SET_VISIBLE_TAB,
    SET_BOTTOM_TAB
} from '../actions/types';
import {appDefaultReducer} from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.appReducer;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_VISIBLE_TAB: {
            return {
                ...state,
                visibleTab: action.payload,
            };
        }
        case SET_BOTTOM_TAB: {
            return {
                ...state,
                bottomTab: action.payload,
            };
        }
        case SET_SAFE_AREA: {
            return {
                ...state,
                safeArea: action.payload,
            };
        }
        default:
            return state;
    }
}