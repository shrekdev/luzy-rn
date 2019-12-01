import {
    SET_SAFE_AREA,
    ADD_REMAINDER,
    GET_REMAINDER
} from '../actions/types';
import {appDefaultReducer} from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.addRemainder;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_REMAINDER: {
            return {
                ...state,
                addRemainder: action.payload,
            };
        }
        case GET_REMAINDER: {
            return {
                ...state,
                getRemainder: action.payload,
            };
        }
        default:
            return state;
    }
}


