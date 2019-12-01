import {connect} from "react-redux";
import {userLogin} from "../../actions/user";
import {UserLogin} from "../components/userLogin";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.LOGIN:
            return dispatch(userLogin(action.data));
    }
};

export const localActions = {
    LOGIN: 'LOGIN',
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

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);