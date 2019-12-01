import {connect} from "react-redux";
import {HomeTabBar} from "../components/homeTabBar";
import {setVisibleTab} from "../../actions/appAction";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.VISIBLE_TAB:
            return dispatch(setVisibleTab(action.data));
    }
};

export const localActions = {
    VISIBLE_TAB: 'VISIBLE_TAB'
};

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    const {visibleTab} = state.appReducer;
    return {
        localActions,
        safeArea,
        visibleTab
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTabBar);