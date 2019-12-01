import {connect} from "react-redux";
import {registerGlucoseLevel} from "../../actions/glucose";
import {TwoHoursAfterFoodHome} from "../components/twoHrsAfterFoodHome";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.REGISTER_GLUCOSE:
            return dispatch(registerGlucoseLevel(action.data));
    }
};

export const localActions = {
    REGISTER_GLUCOSE: 'REGISTER_GLUCOSE'
};

const mapStateToProps = (state) => {
    const {safeArea, visibleTab} = state.appReducer;    
    return {
        safeArea,
        visibleTab,
        localActions,       
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TwoHoursAfterFoodHome);
