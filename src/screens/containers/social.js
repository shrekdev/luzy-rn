import {connect} from "react-redux";
import {Social} from "../components/footer/social";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea
    };
};

export default connect(mapStateToProps, null)(Social);