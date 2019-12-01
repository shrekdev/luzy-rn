import {connect} from "react-redux";
import {userRegistration} from "../../actions/user";
import {SignUp} from "../components/signUp";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.SIGNUP:
            return dispatch(userRegistration(action.data));
    }
};

export const localActions = {
    SIGNUP: 'SIGNUP'
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);