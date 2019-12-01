import {connect} from "react-redux";
import {Pedometer} from "../components/pedometer";

const mapStateToProps = (state) => {
    const {safeArea} = state.appReducer;
    return {
        safeArea,
    };
};

export default connect(mapStateToProps, null)(Pedometer);