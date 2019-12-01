import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, Image} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';

const BaseCard = (props) => {
    const {header, subText} = styles;
    const {backgroundImage, headerImage, headerText, headerSubText,containerStyle} = props;
    return (
        <ImageBackground style={{height: hp('36%'), width: '100%', ...containerStyle}} source={{uri: backgroundImage}} resizeMode={'stretch'}>
            <View style={{marginTop: hp('2.5%'), alignItems: 'center'}}>
               {
                   headerImage &&
                   <Image source={{uri: headerImage}} style={{height: hp('20%'), width: wp('30%')}}
                       resizeMode={'contain'}/>
               }
                {
                    headerText && <Text style={header}>{headerText}</Text>
                }
                {
                    subText && <Text style={subText}>{headerSubText}</Text>
                }
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.white
    },
    subText: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(13),
        color: Constant.color.white,
        textAlign: 'center'
    },
});
export {BaseCard};