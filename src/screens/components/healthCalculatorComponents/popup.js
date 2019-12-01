import React, {Component} from 'react';
import {View, Text, Image, Animated, StyleSheet} from 'react-native';
import Constant from '../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {AppButton} from "../../common";


const Popup = (props) => {
    const {buttonContainer, buttonText, container, iconStyle, titleText, subText} = styles;
    const {image, title, normalSubTitle, boldSubTitle, buttonTitle, isShowBottomText, bottomTextClick, buttonClick} = props;

  return (
      <View style={container}>
          <Image source={{uri: image}} style={iconStyle} resizeMode={'contain'}/>
          <Text style={titleText}>{title}</Text>
          <Text style={subText}>{normalSubTitle}<Text style={{fontFamily: Constant.font.robotoBold}}>{boldSubTitle}</Text></Text>
          <AppButton
              containerStyle={{...buttonContainer}}
              textStyle={{...buttonText}}
              title={buttonTitle}
              onPress={() => buttonClick && buttonClick()} />
          {isShowBottomText &&
              <AppButton
                containerStyle={{backgroundColor: '#fff'}}
                textStyle={{...buttonText, color: Constant.color.lightGray, fontSize: Constant.fontSize.small}}
                title={'GO TO HOME SCREEN'}
                onPress={() => bottomTextClick && bottomTextClick()}/>
          }
      </View>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constant.color.white,
        marginHorizontal: wp('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: wp('5%'),
        paddingTop: hp('5%'),
        paddingBottom: hp('3%')
    },
    buttonText: {
        fontFamily: Constant.font.linateHeavy,
        fontSize: Constant.fontSize.medium,
        color: Constant.color.white
    },
    iconStyle: {
        height: hp('15%'),
        width: wp('25%'),
        marginBottom: hp('2%'),
        marginTop: hp('3%')
    },
    titleText: {
        fontFamily: Constant.font.linateBold,
        color: Constant.color.blue,
        fontSize: Constant.fontSize.xlarge,
        textAlign: 'center'
    },
    subText:{
        fontFamily: Constant.font.robotoRegular,
        color: Constant.color.blue,
        fontSize: Constant.fontSize.small,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: Constant.color.lightblue,
        marginTop: hp('15%'),
        width: wp('75%')
    }
});

export {Popup};