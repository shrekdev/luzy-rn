import {connect} from "react-redux";
import {ExerciseDetail} from "../components/exerciseDetail";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(ExerciseDetail);