import {connect} from "react-redux";
import {NotRecommendedFood} from "../components/notRecommendedFood";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(NotRecommendedFood);