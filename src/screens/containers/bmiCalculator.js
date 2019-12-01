import {connect} from "react-redux";
import {registerBMI} from "../../actions/BMI";
import {BMICalculator} from "../components/bmiCalculator";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.REGISTER_BMI:
            return dispatch(registerBMI(action.data));
    }
};

export const localActions = {
    REGISTER_BMI: 'REGISTER_BMI',
};

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        localActions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BMICalculator);