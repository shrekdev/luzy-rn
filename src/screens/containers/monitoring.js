import {connect} from "react-redux";
import {Monitoring} from "../components/monitoring";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(Monitoring);