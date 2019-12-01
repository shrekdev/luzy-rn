import {
    SET_SAFE_AREA,
    MEDITATION_RECORDING_LIST
} from '../actions/types';
import {appDefaultReducer} from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.meditation;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MEDITATION_RECORDING_LIST: {
            return {
                ...state,
                meditationRecordingList: action.payload,
            };
        }
        default:
            return state;
    }
}