import {connect} from "react-redux";
import {SocialChat} from "../components/footer/socialChat";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(SocialChat);