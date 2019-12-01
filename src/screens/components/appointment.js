import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, Image, ImageBackground, Animated, TouchableOpacity} from 'react-native';
import {AppButton, AppNavigator, BottomTab} from "../common";
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import ModalDropdown from 'react-native-modal-dropdown'
import moment from "moment";
import {tabBarAfterLogin, doctorsType, tabBarWithBack} from "../../helper/appConstant";
import DatePicker from 'react-native-datepicker'

class Appointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            btnColor: Constant.color.lightGray,
            isDateTimePickerVisible: false,
            currentDateTime: new Date(),
            maxdate: new Date('2020-01-01'),
            doctorType: '',
            appointmentTime: '',
            datePickerText: 'Choose a date and hour',
            date: this.currentDateTime,
            modalVisible: false,
        };
        this.fadeAnim = new Animated.Value(0);
    }

    // displayDateTimePicker = (bool) => this.setState({ isDateTimePickerVisible: bool });

    changeButtonState = () => {
        const {doctorType, appointmentTime} = this.state;
        let btnColor = (doctorType !== '' && appointmentTime !== '') && Constant.color.blue || Constant.color.lightGray;
        this.setState({btnColor});
    };


    onDoctorTypeSelect = async (index, doctorType) => {
        await this.setState({doctorType});
        this.changeButtonState();
    };

    onDateSelect = async (appointmentTime) => {
        // this.displayDateTimePicker(false);
        await this.setState({
            appointmentTime,
            datePickerText: moment(appointmentTime).format("ddd, DD MMMM, HH:mm"),
            date: appointmentTime
        });
        this.changeButtonState();
    };

    onSubmit = () => {
        this.showPopup()
    };

    showPopup = () => {
        this.setState({
            modalVisible: true,
        }, () => {
            Animated.timing(
                this.fadeAnim,
                {
                    toValue: 1,
                    duration: 100,
                    delay: 10
                }
            ).start();
        });
    };

    hidePopup = () => {
        Animated.timing(
            this.fadeAnim,
            {
                toValue: 0,
                duration: 100,
                delay: 10
            }
        ).start(() => {
            this.setState({
                modalVisible: false
            }, () => this.props.navigation.navigate('Home'));
        });
    };

    showModal = () => {
        const {doctorType, appointmentTime} = this.state;
        const {safeArea, navigation} = this.props;
        let height = hp('100%') - (hp('20%') + safeArea.bottom);

        return (
            <Animated.View style={{...styles.innerContainer, opacity: this.fadeAnim,bottom: hp('10%') +safeArea.bottom}}>
                <View style={{...styles.modalContainer}}>
                    <Image style={{height: hp('15%'), width: wp('30%'),
                        marginTop: hp('5%')}} resizeMode='contain'
                           source={{uri: 'succes_icon'}}/>
                    <Text style={[styles.modal_text_top, {marginTop: hp('1%')}]}>SUCCESS</Text>
                    <Text style={styles.modal_text_bottom}>{`You successfully made an appointment\nto a `}<Text
                        style={{fontFamily: Constant.font.robotoBold}}>{doctorType.toLowerCase()} doctor</Text>{` for`}
                    </Text>
                    <Text style={{
                        ...styles.modal_text_bottom,
                        fontFamily: Constant.font.robotoBold
                    }}>{moment(appointmentTime).format("dddd, DD MMMM, [at] HH:mm")}.</Text>
                    <AppButton
                        containerStyle={{
                            backgroundColor: Constant.color.lightblue,
                            width: wp('80%'),
                            marginTop: hp('10%')
                        }}
                        title={'GO TO HOME SCREEN'}
                        onPress={this.hidePopup}/>
                </View>
            </Animated.View>
        );
    };

    showModalOnUnsuccess = () => {
        const {safeArea, navigation} = this.props;

        return (
            <Animated.View style={{...styles.innerContainer, opacity: this.fadeAnim, bottom: hp('10%') +safeArea.bottom}}>
                <View style={{...styles.modalContainer}}>
                    <Image style={{height: hp('15%'), width: wp('30%'), marginTop: hp('5%')}} resizeMode='contain'
                           source={{uri: 'unsucces'}}/>
                    <Text style={[styles.modal_text_top, {marginTop: hp('1%')}]}>UNSUCCESS</Text>
                    <Text style={{
                        ...styles.modal_text_bottom,
                        fontFamily: Constant.font.robotoBold
                    }}>{`We are sorry, something went wrong.`}</Text>
                    <Text style={{...styles.modal_text_bottom}}>{`Please make your appointment again.`}.</Text>
                    <AppButton
                        containerStyle={{
                            backgroundColor: Constant.color.lightblue,
                            width: wp('80%'),
                            marginTop: hp('10%')
                        }}
                        title={'TRY AGAIN'}
                        onPress={this.hidePopup}
                    />
                    <TouchableOpacity onPress={this.hidePopup}>
                        <Text style={{...styles.modal_text_button_bottom}}>{`GO TO HOME SCREEN`}</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    };

    render() {
        const {container, header, subText, label, dd_icon, dd_arrow, dd_btn, dd_image, dd_text, dd_options} = styles;
        const {btnColor, currentDateTime, appointmentTime, datePickerText, modalVisible, doctorType} = this.state;
        const {safeArea, navigation} = this.props;
        // const tabData = (navigation.state && navigation.state.params && navigation.state.params.from) && tabBarWithBack || tabBarAfterLogin;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ScrollView style={{backgroundColor: '#d7e9ff', height: hp('75%')}}
                            contentContainerStyle={{paddingBottom: 20}}
                            showsVerticalScrollIndicator={false}>
                    <View style={{paddingBottom: hp('2%')}}>
                        <Image style={{height: hp('39%'), width: wp('100%')}} resizeMode={'stretch'}
                               source={{uri: 'make_an_appointment_illustration'}}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={header}>{'SCHEDULE AN'}</Text>
                        <Text style={header}>{'APPOINTMENT'}</Text>
                        <Text style={subText}>{'for a video call with a doctor'}</Text>
                    </View>
                    <View style={{paddingStart: wp('9%'), paddingEnd: wp('9%')}}>

                        <Text style={[label, {marginTop: hp('2%')}]}>{"TYPE OF DOCTOR:"}</Text>
                        <View>
                            <Image resizeMode='contain'
                                   style={{...dd_icon}}
                                   source={{uri: 'make_an_appointment_doctor_icon'}}/>
                            <ModalDropdown
                                options={doctorsType}
                                defaultValue={"Choose a doctor speciality"}
                                onSelect={(index, doctorType) => this.onDoctorTypeSelect(index, doctorType)}
                                style={[dd_btn]}
                                textStyle={[dd_text, {
                                    height: hp('6%'),
                                    color: doctorType ? Constant.color.black : Constant.color.lightGray
                                }]}
                                dropdownStyle={{...dd_options, marginTop: Constant.isANDROID && -hp('3.5%')}}/>
                            <TouchableOpacity activeOpacity={1}>
                                <Image resizeMode='contain'
                                       style={{...dd_arrow}}
                                       source={{uri: 'form_drop_down_grey_arrow'}}
                                       pointerEvents={Constant.isIOS && 'none' || 'auto'}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={[label, {marginTop: hp('2%')}]}>{"DATE AND TIME:"}</Text>
                        <View>
                            <Image resizeMode='contain'
                                   style={{...dd_icon}}
                                   source={{uri: 'make_an_appointment_calendar_icon'}}/>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={dd_btn}
                                onPressIn={() => this.datePickerText.setNativeProps({style: {opacity: 0.52}})}
                                onPress={() => {
                                    this.datePickerRef.onPressDate()
                                }}
                                onPressOut={() => this.datePickerText.setNativeProps({style: {opacity: 0.9}})}
                            >
                                <Text
                                    ref={(ref) => this.datePickerText = ref}
                                    style={[dd_text, {
                                        height: hp('6%'),
                                        color: appointmentTime ? Constant.color.black : Constant.color.lightGray
                                    }]}>{datePickerText}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1}>
                                <Image resizeMode='contain'
                                       style={{...dd_arrow}}
                                       source={{uri: 'form_drop_down_grey_arrow'}}
                                       pointerEvents={Constant.isIOS && 'none' || 'auto'}
                                />
                            </TouchableOpacity>
                        </View>
                        <DatePicker
                            date={this.state.date}
                            mode="datetime"
                            placeholder="select date"
                            minDate={currentDateTime}
                            maxDate={this.state.maxdate}
                            ref={(ref) => this.datePickerRef = ref}
                            is24Hour={true}
                            minuteInterval={5}
                            showIcon={false}
                            hideText={true}
                            onDateChange={this.onDateSelect}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            style={{width: 0, height: 0}}
                            customStyles={{
                                btnTextConfirm: {
                                    color: '#054993'
                                }
                            }}
                        />
                        <AppButton
                            disabled={this.state.btnColor !== Constant.color.blue}
                            containerStyle={{backgroundColor: btnColor, marginTop: hp('4%'), marginBottom: hp('3%')}}
                            title={'MAKE AN APPOINTMENT'}
                            onPress={this.onSubmit}
                        />
                    </View>
                </ScrollView>
                {modalVisible && this.showModal()}
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
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
        color: Constant.color.blue
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(14),
        color: Constant.color.blue
    },
    label: {
        fontFamily: Constant.font.robotoBold,
        fontSize: normalize(13),
        color: Constant.color.black,
        marginBottom: hp('0.5%')
    },
    dd_btn: {
        backgroundColor: Constant.color.white,
        height: hp('6.5%'),
        borderRadius: 8
    },
    dd_image: {
        width: 40,
        height: 40,
        left: wp('3%'),
        top: hp('0.5%'),
        position: 'absolute'
    },
    dd_text: {
        // paddingVertical: hp('2.3%'),
        marginTop: hp('2.3%'),
        paddingHorizontal: wp('15%'),
        fontSize: Constant.fontSize.mini,
        color: 'black',
    },
    dd_options: {
        width: wp('82%'),
        height: hp('20%'),
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },
    dd_icon: {
        position: 'absolute',
        left: wp('3.8%'),
        zIndex: 10,
        height: hp('5.5%'),
        width: wp('9%'),
        top: hp('0.3%')
    },
    dd_arrow: {
        position: 'absolute',
        right: wp('3%'),
        zIndex: 10,
        height: hp('5%'),
        width: wp('7%'),
        // top: -hp('0.8%'),
        bottom: hp('1%')
    },
    modalContainer: {
        backgroundColor: Constant.color.white,
        marginHorizontal: wp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: hp('3%'),
        padding: hp('3%'),
        borderRadius: hp('2%')
    },
    modal_text_top: {
        color: Constant.color.blue,
        alignSelf: 'center',
        fontSize: Constant.fontSize.xlarge,
        fontFamily: Constant.font.robotoBold
    },
    modal_text_bottom: {
        color: Constant.color.blue,
        alignSelf: 'center',
        fontSize: Constant.fontSize.mini,
        textAlign: 'center'
    },
    modal_text_button_bottom: {
        color: Constant.color.lightGray,
        alignSelf: 'center',
        fontSize: Constant.fontSize.small,
        textAlign: 'center',
        fontFamily: Constant.font.robotoBold,
        paddingVertical: hp('3%')
    },
    innerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        backgroundColor: 'rgba(7, 47, 95, 0.9)',
        justifyContent: 'center'
    }
});

export {Appointment};
