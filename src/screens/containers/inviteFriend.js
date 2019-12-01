import {connect} from "react-redux";
import {InviteFriend} from "../components/inviteFriend";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(InviteFriend);