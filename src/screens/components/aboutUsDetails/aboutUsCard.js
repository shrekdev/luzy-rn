import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import Constant from '../../../helper/themeHelper';

const CardComponent = (props) => {
    const {cardStyle, titleText, seeMoreText} = styles;
    const {style, safeArea, showModal, textStyle, imageData, title} = props;
    return (
        <TouchableOpacity style={{height: (Constant.screenHeight - safeArea.top) * 0.19, ...cardStyle, ...style}}
                          onPress={showModal}>
            <Image source={{uri: imageData}}
                   style={{height: hp('10%'), width: wp('38%')}}
                   resizeMode={'contain'}
            />
            <Text style={[titleText, textStyle]} numberOfLines={1}>
                {title}
            </Text>
            <Text style={seeMoreText} numberOfLines={1}>
                {'See more'}</Text>

        </TouchableOpacity>
    )
};


const AboutUsCardComponent = (props) => {
    const {data} = props;
    const {detailImage, title, detail} = data;
    const {detailCardMainView, detailImageStyle, detailTitle, detailText} = styles;
    return (
        <View style={detailCardMainView}>
            <Image source={{uri: detailImage}}
                   style={detailImageStyle}
                   resizeMode={'contain'}/>
            <Text style={detailTitle}>{title.toUpperCase()}</Text>
            <Text style={detailText}>{detail}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: Constant.color.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('40%'),
        margin: hp('1%'),
        padding: hp('1%'),
        borderRadius: 15,
        shadowColor: '#b5c8dd',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2,
    },
    titleText: {
        textAlign: 'center',
        fontSize: Constant.fontSize.medium,
        marginTop: hp('1%'),
        color: Constant.color.blue,
        fontFamily: Constant.font.linateBold
    },
    seeMoreText: {
        textAlign: 'center',
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.xmini,
        color: Constant.color.lightblue
    },
    detailCardMainView: {
        flex: 1,
        width: Constant.screenWidth,
        alignItems: 'center',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('15%'),
        zIndex: 1,
    },
    detailImageStyle: {
        height: hp('15%'),
        width: wp('30%'),
        marginBottom: hp('2%')
    },
    detailTitle: {
        color: Constant.color.white,
        fontSize: Constant.fontSize.xxlarge,
        fontFamily: Constant.font.linateBold,
        textAlign: 'center',
        letterSpacing: 1
    },
    detailText: {
        color: Constant.color.white,
        fontSize: Constant.fontSize.mini,
        lineHeight: Constant.fontSize.mini + 5,
        fontFamily: Constant.font.robotoRegular,
        textAlign: 'center'
    }
});

export {CardComponent, AboutUsCardComponent};
