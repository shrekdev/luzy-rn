import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { AppButton, AppNavigator, BottomTab } from "../common";
import Constant, { normalize } from '../../helper/themeHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/responsiveScreen';
import ModalDropdown from 'react-native-modal-dropdown'
import moment from "moment";
import { style } from "../common/style";
import { HideNavigationBar } from 'react-native-navigation-bar-color';
import { tabBarAfterLogin, doctorsType, tabBarWithBack } from "../../helper/appConstant";
import DatePicker from 'react-native-datepicker'

const History = [{
    date: 'May 5, 2019',
    time: '16:30',
    doctorType: 'Nutriologist Doctor',
    status: 'Video call 35 minutes'
},
{
    date: 'February 2, 2019',
    time: '16:30',
    doctorType: 'Nutriologist Doctor',
    status: 'Canceled'
},
{
    date: 'Seaptember 31, 2018',
    time: '16:30',
    doctorType: 'Generalist Doctor',
    status: 'Video call 35 minutes'
},];

class AppointmentHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emptyHistory: false
        };
        this.fadeAnim = new Animated.Value(0);
    }

    renderListItem = (data, index) => {
        const { listCotainer, listTitle, listSubTitle } = styles;
        const { navigation, safeArea } = this.props;

        return <View style={[listCotainer, { backgroundColor: index % 2 == 0 && Constant.color.white || Constant.color.lightSky }]}>
            <Image
                source={{ uri: data.status != 'Canceled' && 'login_check_mark_icon' || 'close' }}
                style={{
                    height: hp('5%'),
                    width: wp('8%')
                }} resizeMode='contain' />
            <View style={{ flex: 0.9 }}>
                <Text style={listTitle}>{data.date}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={listSubTitle}>{`at `}</Text>
                    <Text style={[listSubTitle, { fontFamily: Constant.font.robotoBold, }]}>{data.time}</Text>
                    <Text style={listSubTitle}>{` with a `}</Text>
                    <Text style={[listSubTitle, { fontFamily: Constant.font.robotoBold, }]}>{data.doctorType}</Text>
                </View>
                <Text style={[listSubTitle, { color: Constant.color.lightGray, marginTop: hp('1%') }]}>{data.status}</Text>
            </View>
            <Image
                source={{ uri: 'add_reminder_icon' }}
                style={{
                    height: hp('5%'),
                    width: wp('8%')
                }} resizeMode='contain' />
        </View>
    };

    renderEmptyHistory = () => {
        const { container, header, subText, title, subTitle } = styles;
        return (
            <ScrollView style={{ backgroundColor: Constant.color.lightSky, height: hp('75%') }}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}>
                <View style={{ height: hp('35%'), backgroundColor: Constant.color.white,justifyContent:'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: 'health_next_appointment_inactive_icon' }}
                            style={{ height: hp('10%'), width: wp('25%'), marginBottom: hp('1%') }} resizeMode={'contain'} />
                        <Text style={{
                            fontFamily: Constant.font.robotoBold,
                            fontSize: normalize(14),
                            color: Constant.color.lightGray,
                            textAlign: 'center',
                        }}>
                            {`You have no\nappointments made.`}
                        </Text>
                        <AppButton
                            containerStyle={{ width: wp('80%'), backgroundColor: Constant.color.lightblue, marginTop: hp('3%') }}
                            title={'MAKE AN APPOINTMENT'}
                        // onPress={this.onSubmit}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginVertical: hp('2.5%') }}>
                    <Text style={title}>{'APPOINTMENTS\nHISTORY '}</Text>
                    <Text style={subTitle}>{'Here are your appointments you did in the past\nand all the details about them.'}</Text>
                </View>

                <Text style={[subText, { color: Constant.color.lightGray, marginTop: hp('5%') }]}>
                    {`You did't had any appointment yet.`}
                </Text>
            </ScrollView>
        )
    }

    render() {
        Constant.isANDROID && HideNavigationBar();
        const { container, header, subText, title, subTitle } = styles;
        const { safeArea, navigation } = this.props;
        return (
            <View style={[container, { paddingBottom: hp('10%') + safeArea.bottom }]}>
                {this.state.emptyHistory == true &&
                    this.renderEmptyHistory()
                    ||
                    <ScrollView style={{ backgroundColor: Constant.color.lightSky, height: hp('75%') }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}>
                        <ImageBackground style={{ height: hp('45%'),justifyContent:'center' }} source={{ uri: 'prepare_your_food_background' }}>
                            <View style={{alignItems: 'center' }}>
                                <Image source={{ uri: 'health_next_appointment_active_icon' }}
                                    style={{ height: hp('10%'), width: wp('25%'), marginBottom: hp('1%') }} resizeMode={'contain'} />
                                <Text style={[subText, { marginBottom: hp('1%') }]}>
                                    {`Your next appointment is`}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={subText}>{`on `}</Text>
                                    <Text style={{ ...header, textAlign: 'center' }}>{`JUNE 06, 2019`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={subText}>{`at `}</Text>
                                    <Text style={{ ...header, textAlign: 'center' }}>{`09:00 A.M.`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={subText}>{`with a `}</Text>
                                    <Text style={[subText, { fontFamily: Constant.font.robotoBold, }]}>{`Generalist Doctor.`}</Text>
                                </View>
                                <AppButton
                                    containerStyle={{ width: wp('80%'), backgroundColor: Constant.color.lightGray, marginTop: hp('3%') }}
                                    title={'CANCEL APPOINTMENT'}
                                // onPress={this.onSubmit}
                                />
                            </View>
                        </ImageBackground>
                        <View style={{ flex: 1, alignItems: 'center', marginVertical: hp('2.5%') }}>
                            <Text style={title}>{'APPOINTMENTS\nHISTORY '}</Text>
                            <Text style={subTitle}>{'Here are your appointments you did in the past\nand all the details about them.'}</Text>
                        </View>

                        {
                            History.map((data, index) => this.renderListItem(data, index))
                        }
                    </ScrollView>
                }
                <BottomTab tabData={tabBarWithBack} navigation={navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.white
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.white
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(14),
        color: Constant.color.white,
        textAlign: 'center',
    },
    title: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.blue,
        textAlign: 'center',
    },
    subTitle: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(14),
        color: Constant.color.blue,
        textAlign: 'center',
    },
    listTitle: {
        fontFamily: Constant.font.robotoBold,
        fontSize: normalize(15),
        letterSpacing: 0,
        color: Constant.color.darkBlue,
    },
    listSubTitle: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(12),
        color: Constant.color.darkBlue,
    },
    listCotainer: {
        flexDirection: 'row',
        backgroundColor: Constant.color.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('8%'),
        paddingVertical: hp('2%')
    }
});

export { AppointmentHistory };
