import React, {Component} from "react";
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity, View,
} from "react-native";
import Constant,{normalize} from '../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';

class FoodListCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {foodListView, foodListText} = styles;
        const {data,onPress} = this.props;
        return (
            <View style={{
                marginVertical: hp('0.8%'),
                marginHorizontal: wp('8%'),
            }}>
                <TouchableOpacity style={foodListView} onPress={onPress}>
                    <Image source={{uri: data.imageSmall}}
                           style={{height: hp('8%'), width: wp('15%')}}
                           resizeMode='contain'/>
                    <Text style={foodListText}>{data.type}</Text>
                    <Image source={{uri: 'plus_icon'}}
                           style={{height: hp('3%'), width: wp('5%')}}
                           resizeMode='contain'/>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    foodListView: {
        flexDirection: 'row',
        backgroundColor: Constant.color.white,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: hp('9%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('4%'),
        borderRadius: 10,
        shadowColor: '#D0E0F0',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2
    },
    foodListText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.medium,
        color: Constant.color.navyblue, flex: 1,
        marginHorizontal: wp('2%')
    },
});

export {FoodListCard};
