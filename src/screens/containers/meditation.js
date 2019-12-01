import {connect} from "react-redux";
import {Meditation} from "../components/meditation";
import {meditationRecordingList} from "../../actions/meditation";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.ALL_RECORDING:
            return dispatch(meditationRecordingList());
    }
};

export const localActions = {
    ALL_RECORDING: 'ALL_RECORDING'
};

const mapStateToProps = (state) => {
    const {safeArea, visibleTab} = state.appReducer;
    const {meditationRecordingList} = state.meditation;
    return {
        safeArea,
        visibleTab,
        localActions,
        meditationRecordingList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Meditation);