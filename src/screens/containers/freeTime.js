import {connect} from "react-redux";
import {FreeTime} from "../components/freeTime";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(FreeTime);