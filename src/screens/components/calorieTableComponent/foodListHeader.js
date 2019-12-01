import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    View,
    Text
} from "react-native";
import Constant from '../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';

class FoodListHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {headerText, headerView} = styles;
        const {headerImage, foodTypeText} = this.props;
        return (
            <View>
                <Image source={{uri: headerImage}}
                       style={{height: hp('36%'), width: wp('100%')}}
                       resizeMode={'stretch'}/>
                <View style={headerView}>
                    <Text style={headerText}>
                        {foodTypeText}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: Constant.color.white,
    },
    headerText: {
        textAlign: 'center',
        marginTop: hp('3%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.navyblue
    }

});

export {FoodListHeader}