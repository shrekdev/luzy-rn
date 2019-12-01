import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Constant from '../../../../helper/themeHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../../helper/responsiveScreen';

const ProfileText = (props) => {
    const {title, subTitle, titleTextStyle, subTitleTextStyle,containerStyle} = props;
    const {titleText, subTitileText} = styles;
    return(
        <View style={containerStyle}>
            <Text style={[titleText, titleTextStyle]}>{title}</Text>
            <Text style={[subTitileText, subTitleTextStyle]}>{subTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
      fontFamily: Constant.font.linateBold,
      color: Constant.color.darkBlue,
      fontSize: Constant.fontSize.mini
  },
    subTitileText: {
        fontFamily: Constant.font.linateBold,
        color: Constant.color.lightGray ,
        fontSize: Constant.fontSize.xmini
    }
});
export {ProfileText}