import {connect} from "react-redux";
import {AboutUsSlider} from "../components/aboutUsSlider";

const mapStateToProps = (state) => {
    const {userDetail} = state.user;
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        userDetail
    };
};

export default connect(mapStateToProps, null)(AboutUsSlider);