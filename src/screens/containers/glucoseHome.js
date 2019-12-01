import {connect} from "react-redux";
import {GlucoseHome} from "../components/glucoseHome";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(GlucoseHome);