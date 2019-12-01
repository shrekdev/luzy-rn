import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Constant from "../../../helper/themeHelper";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "../../../helper/responsiveScreen";

const AddtoCaloriesCalculator = (props) => {
    return(
        <View style={{...styles.container, ...props.style}}>
            <Image source={{uri: 'total_calories_day_big_icon'}} resizeMode={'contain'} style={{...styles.leftIconStyle, ...props.leftIconStyle}} />
            <Text style={{...styles.textStyle, ...props.textStyle}} numberOfLines={2}>{props.title}</Text>
            <TouchableOpacity onPress={props.onPress} style={{...styles.rightIconStyle, ...props.rightIconStyle, backgroundColor: props.isChecked ? Constant.color.white : 'rgba(0, 0, 0, 0.3)', }}>
                {
                    props.isChecked && <Image source={{uri: 'food_and_fitness_check_mark_icon'}} resizeMode={'contain'} style={{height: '100%', width: '100%'}} />
                }
            </TouchableOpacity>
        </View>
    )
};

export {AddtoCaloriesCalculator}

const styles = StyleSheet.create({
   container: {
       backgroundColor: Constant.color.blue,
       position: 'absolute',
       right: 0,
       left: 0,
       zIndex: 1,
       height: hp('12%'),
       alignItems: 'center',
       justifyContent: 'space-between',
       flexDirection: 'row',
       paddingHorizontal: wp('8%')
   },
    leftIconStyle: {
       height: hp('13%'),
        width: wp('13%'),
        tintColor: Constant.color.white
   },
    textStyle: {
       fontFamily: Constant.font.robotoBold,
        color: Constant.color.white,
        fontSize: Constant.fontSize.large
   },
    rightIconStyle: {
       height: hp('5%'),
        width: hp('5%'),
        padding: hp('1%'),
        borderRadius: hp('1.5%')
   }
});