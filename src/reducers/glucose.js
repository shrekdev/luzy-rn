import {
    SET_SAFE_AREA,
    REGISTER_GLUCOSE_LEVEL, 
    GET_GLUCOSE_LEVEL_FORDAY,
    GET_GLUCOSE_LEVEL_FORWEEK,
    GET_GLUCOSE_LEVEL_FORMONTH
} from '../actions/types';
import {appDefaultReducer} from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.glucose;
const INITIAL_STATE_LEVELFORDAY = appDefaultReducer.levelforday;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_GLUCOSE_LEVEL: {
            return {
                ...state,
                registerGlucoseLevel: action.payload,
            };
        }
        default:
            return state;
    }
}

export default (state = INITIAL_STATE_LEVELFORDAY, action) => {
    switch (action.type) {
        case GET_GLUCOSE_LEVEL_FORDAY: {
            return {
                ...state,
                getGlucoseLevelForDay: action.payload,
            };
        }
        default:
            return state;
    }
}

export default (state = INITIAL_STATE_LEVELFORWEEK, action) => {
    switch (action.type) {
        case INITIAL_STATE_LEVELFORWEEK: {
            return {
                ...state,
                getGlucoseLevelForWeek: action.payload,
            };
        }
        default:
            return state;
    }
}

export default (state = INITIAL_STATE_LEVELFORMONTH, action) => {
    switch (action.type) {
        case INITIAL_STATE_LEVELFORWEEK: {
            return {
                ...state,
                getGlucoseLevelForMonth: action.payload,
            };
        }
        default:
            return state;
    }
}