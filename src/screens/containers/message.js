import {connect} from "react-redux";
import {Message} from "../components/footer/message";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(Message);