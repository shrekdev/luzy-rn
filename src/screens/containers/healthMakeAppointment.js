import {connect} from "react-redux";
import {HealthMakeAppointment} from "../components/healthMakeAppointment";

const mapStateToProps = (state) => {
    const {safeArea} = state.user;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(HealthMakeAppointment);