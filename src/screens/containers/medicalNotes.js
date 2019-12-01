import {connect} from "react-redux";
import {MedicalNotes} from "../components/medicalNotes";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(MedicalNotes);