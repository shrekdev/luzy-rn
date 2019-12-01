import { combineReducers } from 'redux';
import UserReducer from './user';
import AppReducer from './appReducer';
import MeditationReducer from './meditation';
import {RESET_STORE} from '../actions/types';
import {appDefaultReducer} from "./defaultReducer";

const appReducer = combineReducers({
    user: UserReducer,
    meditation: MeditationReducer,
    appReducer: AppReducer
});

export default function rootReducer(state, action) {
    let finalState = appReducer(state, action);
    if (action.type === RESET_STORE) {
        finalState = appDefaultReducer; //resetReducer(finalState, action);
    }
    return finalState;
}