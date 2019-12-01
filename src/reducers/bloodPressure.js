import {
    SET_SAFE_AREA,
    REGISTER_BLOOD_PRESSURE
} from '../actions/types';
import {appDefaultReducer} from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.bloodPressure;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_BLOOD_PRESSURE: {
            return {
                ...state,
                registerBloodPressure: action.payload,
            };
        }
        default:
            return state;
    }
}