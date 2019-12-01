import {connect} from "react-redux";
import {BloodPressureMonitoring} from "../components/bloodPressure/bloodPressureMonitoring";

const mapStateToProps = (state) => {
    const {userDetail} = state.user;
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        userDetail
    };
};

export default connect(mapStateToProps, null)(BloodPressureMonitoring);