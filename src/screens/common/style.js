import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import Constant, {normalize} from "../../helper/themeHelper";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';

const style = StyleSheet.create({
    topBar: {
        margin: 0,
        padding: 0
    },
    modalView: {
        backgroundColor: 'rgba(2, 21, 42, 0.9)',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('5%'),
        // marginTop:Platform.OS === 'ios' ? hp('20.5%') : hp('17.9%'),
        marginTop:Platform.OS === 'ios' ? hp('22.5%') : hp('18.5%'),
        marginBottom: Platform.OS === 'ios' ? hp('10%') : hp('3%')
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.white,
        textAlign: 'center',
        paddingHorizontal: wp('10%'),
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.xsmall,
        color: Constant.color.white,
        textAlign: 'center',
        paddingHorizontal: wp('10%'),
    },
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue,
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.large,
        marginLeft: 10
    },
    tabIcon: {
        height: hp('15%'),
        width: wp('15%')
    },
    arrow: {
        height: hp('4%'),
        width: wp('4%'),
        tintColor: Constant.color.black, //'#252525'
        marginTop: hp('0.1%')
    },
    animatedView: {
        borderRadius: 30,
        padding: wp('1.2%'),
        margin: wp('2%'),
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1
    },
    innerAnimatedView: {
        padding: wp('1.2%'),
        margin: wp('2%'),
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: Constant.color.black
    },
    indicatorStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('7%'),
        backgroundColor: Constant.color.blue,
    }
});

export {style};