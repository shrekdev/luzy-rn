import {connect} from "react-redux";
import {registerBloodPressure} from "../../actions/bloodPressure";
import {BloodPressure} from "../components/bloodPressure";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.REGISTER_BLOOD_PRESSURE:
            return dispatch(registerBloodPressure(action.data));
    }
};

export const localActions = {
    REGISTER_BLOOD_PRESSURE: 'REGISTER_BLOOD_PRESSURE'
};

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        localActions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps,mapDispatchToProps, null)(BloodPressure);