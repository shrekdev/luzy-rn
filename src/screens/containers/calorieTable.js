import {connect} from "react-redux";
import {CalorieTable} from "../components/calorieTable";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(CalorieTable);