import {connect} from "react-redux";
import {GeneralInformations} from "../components/medicalNotesComponent/generalInformations";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea
    };
};

export default connect(mapStateToProps, null)(GeneralInformations);