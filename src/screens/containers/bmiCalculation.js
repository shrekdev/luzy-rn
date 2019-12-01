import {connect} from "react-redux";
import {BMICalculation} from "../components/bmiCalculation";

const mapStateToProps = (state) => {
    const {userDetail} = state.user;
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        userDetail
    };
};

export default connect(mapStateToProps, null)(BMICalculation);