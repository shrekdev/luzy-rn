import {connect} from "react-redux";
import {setSafeArea , setInitialData} from "../../actions/appAction";
import {AppLoading} from "../components/loading";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.SET_SAFE_AREA:
            return dispatch(setSafeArea(action.data));
        case localActions.SET_INITIAL_DATA:
             return dispatch(setInitialData(action.data));
    }
};

export const localActions = {
    SET_SAFE_AREA: 'SET_SAFE_AREA',
    SET_INITIAL_DATA: 'SET_INITIAL_DATA'
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

export default connect(mapStateToProps, mapDispatchToProps)(AppLoading);