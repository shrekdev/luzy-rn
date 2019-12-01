import {connect} from "react-redux";
import {CaloriesCalculator} from "../components/caloriesCalculator";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(CaloriesCalculator);