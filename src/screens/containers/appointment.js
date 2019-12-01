import {connect} from "react-redux";
import {Appointment} from "../components/appointment";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(Appointment);