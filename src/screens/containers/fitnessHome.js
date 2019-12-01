import {connect} from "react-redux";
import {FitnessHome} from "../components/fitnessHome";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(FitnessHome);