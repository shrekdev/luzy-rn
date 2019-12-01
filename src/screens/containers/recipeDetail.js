import {connect} from "react-redux";
import {RecipeDetail} from "../components/recipeDetail";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(RecipeDetail);