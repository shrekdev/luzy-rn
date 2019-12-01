import {connect} from "react-redux";
import {BmiWeightMonitoring} from "../components/bmiWeightMonitoring";

const mapStateToProps = (state) => {
    const {userDetail} = state.user;
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        userDetail
    };
};

export default connect(mapStateToProps, null)(BmiWeightMonitoring);