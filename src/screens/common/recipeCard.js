import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Constant from '../../helper/themeHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/responsiveScreen';

const RecipeCard = (props) => {
    const { container, cardTitle, cardSubtitle, cardSubText, imageView, detailView, middleRow, middleColumn } = styles;
    const {isImageOnly, onPress} = props;
    return (
        <TouchableOpacity style={container} onPress={onPress}>
            <ImageBackground source={{ uri: props.image }} style={imageView}>
                <Image source={{ uri: 'video_play' }} style={{ height: hp('10%'), width: wp('10%'),opacity: (!isImageOnly) && 1 || 0 }} resizeMode='contain' />
            </ImageBackground>
            <View style={middleRow}>
                <View style={[middleColumn, { backgroundColor: props.nonVeg &&  Constant.color.yellow || Constant.color.lightSky}]}>
                    <Image source={{ uri: props.nonVeg && 'food_with_meat_white' ||  'food_with_meat_grey'}} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                </View>
                <View style={[middleColumn, { backgroundColor: props.veg && Constant.color.green || Constant.color.lightSky}]}>
                    <Image source={{ uri: props.veg && 'vegetarian_food_white' || 'vegetarian_food_grey' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                </View>
                <View style={[middleColumn, { backgroundColor: props.diet && Constant.color.lightSky ||  Constant.color.red }]}>
                    <Image source={{ uri : props.diet && 'food_for_diabetics_grey' || 'food_for_diabetics_white' }} style={{ height: hp('5%'), width: wp('5%') }} resizeMode='contain' />
                </View>
            </View>
            <View style={detailView}>
                <Text style={cardTitle}>{props.title.substring(0,15)+"..."}</Text>
                <Text style={cardSubtitle}>{props.subtitle}</Text>
                <Text style={cardSubText}>{props.subtext}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: hp('1%'),
        backgroundColor: Constant.color.white,
        borderRadius: 12,
        shadowColor: Constant.color.lightGray,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 2,
    },
    imageView: {
        marginHorizontal: wp('1%'),
        marginTop: wp('1%'),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: hp('14%'),
        width: wp('35%'),
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: "hidden"
    },
    detailView: {
        paddingVertical: hp('1%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleRow: {
        flex: 1,
        height: hp('6%'),
        flexDirection: 'row'
    },
    middleColumn: {
        flex: 1 / 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardTitle: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.small,
        color: Constant.color.blue
    },
    cardSubtitle: {
        marginTop: -2,
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.lightGray
    },
    cardSubText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.lightblue
    }
});
export { RecipeCard };