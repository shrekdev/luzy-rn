import {connect} from "react-redux";
import {VideoRecipe} from "../components/videoRecipe";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(VideoRecipe);