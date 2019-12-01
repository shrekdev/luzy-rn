import {connect} from "react-redux";
import {RecipeBook} from "../components/recipeBook";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(RecipeBook);