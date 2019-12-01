import {connect} from "react-redux";
import {Profile} from "../components/footer/profile";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(Profile);