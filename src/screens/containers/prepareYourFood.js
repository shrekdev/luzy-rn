import {connect} from "react-redux";
import {PrepareYourFood} from "../components/prepareYourFood";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(PrepareYourFood);