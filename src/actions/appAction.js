import {SET_BOTTOM_TAB, SET_SAFE_AREA, SET_VISIBLE_TAB} from '../actions/types';
import {appDefaultReducer} from "../reducers/defaultReducer";

export const setSafeArea = (safeArea) => {
    return (dispatch, getState) => {
        return dispatch({
            type: SET_SAFE_AREA,
            payload: safeArea,
        });
    };
};

export const setVisibleTab = (visibleTab) => {
    return (dispatch, getState) => {
        return dispatch({
            type: SET_VISIBLE_TAB,
            payload: visibleTab,
        });
    };
};

export const setBottomTab = (activeBottomTabIndex) => {
    return (dispatch, getState) => {
        return dispatch({
            type: SET_BOTTOM_TAB,
            payload: activeBottomTabIndex,
        });
    };
};

export const setInitialData = () => {
    return (dispatch, getState) => {
        const initialAppData = appDefaultReducer.appReducer;
        return dispatch({
            type: SET_BOTTOM_TAB,
            payload: initialAppData.bottomTab,
        }, {
            type: SET_VISIBLE_TAB,
            payload: initialAppData.visibleTab
        });
    };
};