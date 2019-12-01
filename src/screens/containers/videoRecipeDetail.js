import {connect} from "react-redux";
import {VideoRecipeDetail} from "../components/videoRecipeDetail";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(VideoRecipeDetail);