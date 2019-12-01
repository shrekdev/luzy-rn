import {connect} from "react-redux";
import {HealthCalculator} from "../components/healthCalculator";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(HealthCalculator);