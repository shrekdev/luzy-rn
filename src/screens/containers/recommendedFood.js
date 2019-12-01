import {connect} from "react-redux";
import {RecommendedFood} from "../components/recommendedFood";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(RecommendedFood);