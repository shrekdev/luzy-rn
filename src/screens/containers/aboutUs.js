import {connect} from "react-redux";
import {AboutUs} from "../components/aboutUs";

const mapStateToProps = (state) => {
    const {userDetail} = state.user;
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        userDetail
    };
};

export default connect(mapStateToProps, null)(AboutUs);