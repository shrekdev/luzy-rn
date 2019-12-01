import {connect} from "react-redux";
import {Progress} from "../components/footer/progress";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea
    };
};

export default connect(mapStateToProps, null)(Progress);