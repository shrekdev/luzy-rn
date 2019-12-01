import { connect } from "react-redux";
import { addRemainder } from "../../actions/addRemainder";
import {getRemainder} from "../../actions/addRemainder";
import { Reminders } from "../components/reminders";

const handleLocalAction = (dispatch, action, navigation) => {
    const { type } = action;
    switch (type) {
        case localActions.ADDREMAINDER:
            return dispatch(addRemainder(action.data));
        case localActions.GETREMAINDER:
            return dispatch(getRemainder(action.data));
    }
};

export const localActions = {
    ADDREMAINDER: 'ADDREMAINDER',
    GETREMAINDER: 'GETREMAINDER'
};


const mapStateToProps = (state) => {
    const { safeArea } = state.appReducer;
    // const { getRemainder } = state.getRemainder;
    return {
        safeArea,
        localActions,
        // getRemainder
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Reminders);



