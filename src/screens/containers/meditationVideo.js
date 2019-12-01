import {connect} from "react-redux";
import {MeditationVideo} from "../components/meditationVideo";

const mapStateToProps = (state) => {
    const {safeArea, visibleTab} = state.appReducer;
    const {meditationRecordingList} = state.meditation;

    return {
        safeArea,
        visibleTab,
        meditationRecordingList
    };
};

export default connect(mapStateToProps, null)(MeditationVideo);