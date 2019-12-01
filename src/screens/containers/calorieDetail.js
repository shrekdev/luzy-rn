import {connect} from "react-redux";
import {CalorieDetail} from "../components/calorieDetail";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(CalorieDetail);