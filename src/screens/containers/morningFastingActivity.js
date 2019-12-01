import {connect} from "react-redux";
import {getGlucoseLevelForDay, getGlucoseLevelForWeek, getGlucoseLevelForMonth } from "../../actions/glucoseLevelforday";
import {MorningFastingActivity} from "../components/morningFastingActivity";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.GET_LEVELFORDAY:
            return dispatch(getGlucoseLevelForDay(action.data));            
        case localActions.GET_LEVELFORWEEK:
          return dispatch(getGlucoseLevelForWeek(action.data));
        case localActions.GET_LEVELFORMONTH:
          return dispatch(getGlucoseLevelForMonth(action.data));
    }
};

export const localActions = {
    GET_LEVELFORDAY: 'GET_LEVELFORDAY', 
    GET_LEVELFORWEEK: 'GET_LEVELFORWEEK',
    GET_LEVELFORMONTH: 'GET_LEVELFORMONTH'
};

const mapStateToProps = (state) => {
    const {userDetail} = state.user;
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        userDetail,
        localActions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MorningFastingActivity);