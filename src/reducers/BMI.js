import {
    SET_SAFE_AREA,
    REGISTER_BMI
} from '../actions/types';
import {appDefaultReducer} from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.BMI;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_BMI: {
            return {
                ...state,
                registerBMI: action.payload,
            };
        }
        default:
            return state;
    }
}