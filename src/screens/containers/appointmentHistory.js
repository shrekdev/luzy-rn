import {connect} from "react-redux";
import {AppointmentHistory} from "../components/appointmentHistory";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(AppointmentHistory);