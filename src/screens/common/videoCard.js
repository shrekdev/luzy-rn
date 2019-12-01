import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {AppButton} from './index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';

const VideoCard = (props) => {
    const {item, isFitnessScreen, isMeditationScreen, onPress} = props;
    const {videoCardMainView, videoCardInnerView, videoCardImageView, videoCardDetailView,
        exerciseDetailText, btnStyle, btnTextStyle} = styles;
    return (
        <TouchableOpacity style={videoCardMainView} onPress={onPress}>
            <View style={videoCardInnerView}>
                <View style={{width: '45%', height: '100%'}}>
                    <Image source={{uri: item.PictureLink}}
                           style={{height: '100%', width: '100%'}}
                           resizeMode={'cover'}/>
                    <View style={videoCardImageView}>
                        <Image source={{uri: 'video_play'}}
                               style={{height: hp('7%'), width: wp('12%')}}
                               resizeMode={'contain'}/>
                    </View>
                </View>

                    {isFitnessScreen &&
                    <View style={videoCardDetailView}>
                        <Text
                            numberOfLines={1}
                            style={exerciseDetailText}>
                            {item.type}</Text>
                        <Text
                            numberOfLines={1}
                            style={{
                            ...exerciseDetailText,
                            fontFamily: Constant.font.linateBold,
                            fontSize: Constant.fontSize.small,
                        }}>{item.name}</Text>
                        <Text
                            numberOfLines={1}
                            style={{
                            ...exerciseDetailText,
                            color: Constant.color.lightGray,
                        }}>{item.time}</Text>
                        <Text
                            numberOfLines={1}
                            style={{
                            ...exerciseDetailText,
                            marginTop: hp('1%'),
                            color: Constant.color.lightblue,
                        }}>{'Begin exercise'}</Text>
                    </View>
                    }
                    {isMeditationScreen &&
                    <View style={videoCardDetailView}>
                        <Text
                            numberOfLines={1}
                            style={{
                            ...exerciseDetailText,
                            fontFamily: Constant.font.linateBold,
                            fontSize: Constant.fontSize.small,
                        }}>{item.Name}</Text>
                        <Text
                            numberOfLines={1}
                            style={{
                            ...exerciseDetailText,
                            color: Constant.color.lightGray,
                        }}>{item.Duration}</Text>
                        <AppButton
                            title={'PLAY'}
                            containerStyle={btnStyle}
                            textStyle={btnTextStyle}
                        />
                    </View>
                    }
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    videoCardMainView: {
        ...Constant.shadowStyle,
        height: hp('15%'),
        marginTop: hp('2%'),
    },
    videoCardInnerView: {
        flex: 1,
        backgroundColor: Constant.color.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 15,
        borderColor: Constant.color.white,
        borderWidth: 3,
        alignItems: 'center',
        overflow: 'hidden'
    },
    videoCardImageView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    videoCardDetailView: {
        width: '55%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp('1%')
    },
    exerciseDetailText: {
        textAlign: 'center',
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.navyblue,
    },
    btnStyle:{
        marginTop:'5%',
        paddingVertical:'7%',
        paddingTop:'3%',
        paddingHorizontal:'20%'
    },
    btnTextStyle:{
        fontSize:Constant.fontSize.xsmall
    }
});
export {VideoCard};