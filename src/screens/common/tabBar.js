import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Constant from "../../helper/themeHelper";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "../../helper/responsiveScreen";

const TabBar = (props) => {
    const {topBar, tabContainer, tabText, tabIcon} = styles;
    const {currentTab, data, index} = props;

    return (
        <TouchableOpacity style={{flex: 1, backgroundColor: currentTab === index && Constant.color.lightblue || (index%2 === 0 && Constant.color.white || Constant.color.lightGray), width: wp('50%'), ...props.style}}
                          onPress={() => props.onPress && props.onPress()}>
            <View style={tabContainer}>
                <Image source={{uri: (currentTab === index && currentTab%2 === 0) ? data.imageOnActive : data.image}} style={tabIcon} resizeMode={'contain'}/>
                <Text style={{...tabText, color: currentTab === index && Constant.color.white || (index%2 === 1 && Constant.color.white || Constant.color.lightGray)}}>{data.title}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    topBar: {
        height: hp('8%'),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8'
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
        height: hp('8%'),
        width: wp('14%'),
    }
});

export {TabBar}
