import {connect} from "react-redux";
import {AppointmentHome} from "../components/appointmentHome";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(AppointmentHome);