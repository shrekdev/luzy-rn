import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Modal, PanResponder, TouchableOpacity } from 'react-native';
import { BottomTab } from "../common";
import Constant, { normalize } from '../../helper/themeHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/responsiveScreen';
import { HideNavigationBar } from 'react-native-navigation-bar-color';
import { AddReminderCard } from './reminderComponent'
import { tabBarWithBack } from "../../helper/appConstant";
import {style} from "../common/style";
import moment from "moment";
import {getAsyncStorage, isValidEmail, isValidUserName, setAsyncStorage} from "../../helper/appHelper";

class Reminders extends Component {

    dayArrayTemp = [];

    constructor(props) {
        super(props);
        this.state = {
            modalVisiblity: false,
            reminderTitle: '',
            reminderDesc: '',
            setAlarm: false,
            repeatAlarm: false,
            date: '',
            dateIndex: 1,
            hour: '',
            hourIndex: 1,
            minute: '',
            minuteIndex: 1,
            dateArray: [],
            hourArray: [],
            minuteArray: [],
            dayArray: [],
            reminderList: [],
            edit: false,
            editIndex: null, 
            token: '',
            getRemainder: props.getRemainder || [],
            
        };

        this.onCloseClick = this.onCloseClick.bind(this);
        this.onOkClick = this.onOkClick.bind(this);
        this.onDaySelect = this.onDaySelect.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getRemainder !== this.state.getRemainder) {
            this.setState({getRemainder: nextProps.getRemainder})
        }
    }

    componentWillMount() {

        const {handleLocalAction, navigation, localActions} = this.props;
        getAsyncStorage('User').then((userData) => {
            let data = JSON.parse(userData);

            this.setState({
                token: data.token
            })

            handleLocalAction({
                type: localActions.GETREMAINDER, data: {
                    in_Token: data.token,
                }
            }).then(res => {
                if (res) {
                    if (res.status === '200') {
                        alert(res.message)
                    } else {
                        alert(res.message);
                    }
                }
            }).catch(e => {
                alert(e)
                console.log(e);
            });
        }).catch((error) => {
            alert(error)
        });
          
        
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 2;  // can adjust this num
            },
            onPanResponderGrant: (e, gestureState) => {
                this.fScroll.setNativeProps({ scrollEnabled: false })
            },
            onPanResponderMove: () => { },
            onPanResponderTerminationRequest: () => true,
        })
    }

    yearDataRender = () => {

        this.setState({ modalVisiblity: true })

        // var ar = [];
        // let year = moment().year();
        // let month = moment().month();
        // let montName = moment().month(month).format('MMMM')
        // var start = moment(year + "-" + montName, "YYYY-MMM");
        // for (var end = moment(start).add(1, 'month'); start.isBefore(end); start.add(1, 'day')) {
        //     ar.push(start.format('ddd D MMM').toUpperCase());
        // }

        let daysArray = [];
        let today = moment();
        let endOfYear = moment().endOf('year').format("DD-MM-YYYY");
        let endDate = moment(endOfYear, "DD-MM-YYYY");
        let totalDays = endDate.diff(today, 'day');

        for (let i = 0; i <= totalDays+1; i++) {
            daysArray[i] = today.format('ddd D MMM');
            today.add(1, 'day').format('ddd D MMM')
        }
        this.setState({dateArray: daysArray});

        var hoursPerDay = 23;
        var hours = [];

        for (let i = 0; i < hoursPerDay + 1; i++) { //fill in all of the hours
            if (i < 10) {
                hours.push("0" + i);
            } else {
                hours.push(i);
            }   //add to beginning of array
        }

        var minutesPerHour = 59;
        var minutes = [];

        for (let i = 0; i < minutesPerHour + 1; i++) { //fill in all of the hours
            if (i < 10) {
                minutes.push("0" + i);
            } else {
                minutes.push(i);
            } //add to beginning of array
        }

        this.setState({
            dateArray: daysArray, 
            dateIndex: 1,
            hourArray: hours, hourIndex: moment().format("h") - 0,
            minuteArray: minutes, minuteIndex: moment().format("mm") - 0
        });

        
    };

    onTitleChangeText = (reminderTitle) => {
        this.setState({ reminderTitle: reminderTitle })
    }

    onDescChangeText = (reminderDesc) => {
        this.setState({ reminderDesc: reminderDesc })
    }

    onSetAlarmValueChange = (setAlarm) => {
        this.setState({ setAlarm: setAlarm })
    }

    onRepeatAlarmValueChange = (repeatAlarm) => {
        this.setState({ repeatAlarm: repeatAlarm })
    }

    onDateValueChange = async (date, dateIndex) => {
        // this.setState({ date: date, dateIndex: dateIndex })
    }

    onHourValueChange = async (hour, hourIndex) => {
        // this.setState({ hour: hour, hourIndex: hourIndex })
    }

    onMinuteValueChange = async (minute, minuteIndex) => {
        // this.setState({ minute: minute, minuteIndex: minuteIndex })
    }

    onDaySelect = (data, index) => {
        if (this.dayArrayTemp.includes(data)) {
            let position = this.dayArrayTemp.indexOf(data)
            this.dayArrayTemp.splice(position, 1)
        }
        else {
            this.dayArrayTemp.push(data)
        }
        this.forceUpdate()
    }

    onDeleteClick = (position) => {
        this.state.reminderList.splice(position, 1)
        this.forceUpdate()
    }

    onCloseClick = () => {
        this.setState({ reminderTitle: '', reminderDesc: '', setAlarm: false, repeatAlarm: false })
        this.setState({ modalVisiblity: false, })
    }

    onEditClick = (data, index) => {
        this.setState({
            reminderTitle: data.title,
            reminderDesc: data.desc,
            setAlarm: data.setAlarm,
            repeatAlarm: data.repeatAlarm,
            modalVisiblity: true,
            edit: true,
            editIndex: index
        })
        if(data.dayArray.length != 0)
        {
            this.dayArrayTemp =  data.dayArray.slice(0)
        }
    }

    getRemainderList = () => {
        const {reminderTitle,reminderDesc, token} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;
        handleLocalAction({
            type: localActions.GETREMAINDER, data: {
                in_Token: token,
            }
        }).then(res => {
            if (res) {
                if (res.status === '200') {
                    navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: 'Home',
                        })],
                    }));
                } else {
                    alert(res.message);
                }
            }
        }).catch(e => {
            alert(e)
            console.log(e);
        });
    }



    onOkClick = () => {
        const {reminderTitle,reminderDesc,date, token} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;
        handleLocalAction({
            type: localActions.ADDREMAINDER, data: {
                in_Token: token,
                in_Title: reminderTitle,
                in_Description: reminderDesc,
                in_DateTime: date,
            }
        }).then(res => {
            if (res) {
                if (res.status === '200') {
                   
                } else {
                    alert(res.message);
                }
            }
        }).catch(e => {
            console.log(e);
        });
        this.setState({
            modalVisiblity: false,
            dayArray: this.dayArrayTemp
        }, () => {
            this.dayArrayTemp = [];
            if (this.state.setAlarm && this.state.repeatAlarm) {
                let repeatAlarmText = "Repeat alarm";

                for (i = 0; i < this.state.dayArray.length; i++) {
                    if (i == this.state.dayArray.length - 1) {
                        repeatAlarmText = repeatAlarmText + " " + this.state.dayArray[i];
                        var reminder = {
                            title: this.state.reminderTitle,
                            desc: this.state.reminderDesc,
                            setAlarm: this.state.setAlarm,
                            repeatAlarm: this.state.repeatAlarm,
                            repeatText: repeatAlarmText,
                            dayArray: this.state.dayArray
                        }
                        if (this.state.edit) {
                            this.state.reminderList[this.state.editIndex] = reminder;
                            this.setState({ edit: false, reminderTitle: '', reminderDesc: '', setAlarm: false, repeatAlarm: false, dayArray:[] })
                        }
                        else {
                            this.state.reminderList.push(reminder)
                            this.setState({ reminderTitle: '', reminderDesc: '', setAlarm: false, repeatAlarm: false, dayArray:[] })
                        }
                    }
                    else {
                        repeatAlarmText = repeatAlarmText + " " + this.state.dayArray[i] + ",";
                    }
                }
            }
            else {
                var reminder = {
                    title: this.state.reminderTitle,
                    desc: this.state.reminderDesc,
                    setAlarm: this.state.setAlarm,
                    repeatAlarm: this.state.repeatAlarm,
                    repeatText: null,
                    dayArray:[]
                }
                if (this.state.edit) {
                    this.state.reminderList[this.state.editIndex] = reminder;
                    this.setState({ edit: false, reminderTitle: '', reminderDesc: '', setAlarm: false, repeatAlarm: false, dayArray:[] })
                }
                else {
                    this.state.reminderList.push(reminder)
                    this.setState({ reminderTitle: '', reminderDesc: '', setAlarm: false, repeatAlarm: false, dayArray:[] })
                }
            }
        });
    }

    renderReminderItem = (data, index) => {
        console.log("data",data)
        const { navigation, safeArea } = this.props;
        const { reminderAlarmText, reminderTitleText, reminderDescText } = styles;
        return <View key={index}>
            <View style={{ flexDirection: 'row', height: 2, backgroundColor: Constant.color.white }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp('1%') }}>

                <Image source={{ uri: (data.setAlarm && data.repeatAlarm) && 'alarm_icon' || 'no_alarm_icon' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode={'contain'} />
                <View style={{ flex: 1 }}>
                    <Text style={reminderTitleText}>{data.title}</Text>
                    <Text style={reminderDescText}>{data.desc}</Text>
                    {
                        data.repeatText != null && <Text style={reminderAlarmText}>{data.repeatText}</Text>
                    }
                </View>
                <TouchableOpacity onPress={() => this.onEditClick(data, index)} style={{ alignItems: 'center', justifyContent: 'center', marginLeft: wp('8%'), borderRadius: 16, backgroundColor: Constant.color.blue, height: 32, width: 32 }}>
                    <Image source={{ uri: 'edit_reminder_icon' }} style={{ height: hp('3%'), width: wp('4%') }} resizeMode={'contain'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onDeleteClick(index)} style={{ alignItems: 'center', justifyContent: 'center', marginLeft: wp('1.5%'), borderRadius: 16, backgroundColor: Constant.color.lightGray, height: 32, width: 32 }}>
                    <Image source={{ uri: 'delete_reminder_icon' }} style={{ height: hp('3%'), width: wp('4%') }} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
        </View>
    };

    render() {
        const { container, header, subText, reminderView, titleText, sepratorView, modalView } = styles;
        const { safeArea, navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <ScrollView ref={(e) => { this.fScroll = e }} showsVerticalScrollIndicator={false} style={container} contentContainerStyle={{ paddingBottom: hp('10%') + safeArea.bottom }}>

                    <View style={{ flex: 1, alignItems: 'center', marginTop: hp('5%') }}>
                        <Text style={header}>{'REMINDERS'}</Text>
                        <Text style={subText}>{'Keep track of your treatments, appointments\nand everything else is important to you.'}</Text>
                    </View>

                    <View style={reminderView}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.yearDataRender()} >
                                <Image source={{ uri: 'add_reminder_icon' }} style={{ height: hp('7%'), width: wp('7%') }} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <Text style={titleText}>Add a reminder</Text>
                        </View>
                        {
                            this.state.reminderList.map((data, index) => this.renderReminderItem(data, index))
                        }
                        <View style={sepratorView}></View>
                        <View style={sepratorView}></View>
                        <View style={sepratorView}></View>
                        <View style={sepratorView}></View>
                        <View style={sepratorView}></View>
                        <View style={sepratorView}></View>
                        <View style={sepratorView}></View>
                        <View style={sepratorView}></View>
                        <View style={sepratorView}></View>
                    </View>
                </ScrollView >
                <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisiblity}
                        // onShow={() => { Constant.isANDROID && HideNavigationBar() }}
                        // onDismiss={() => { Constant.isANDROID && HideNavigationBar() }}
                >
                       <View style={{...style.modalView}}>
                                <AddReminderCard
                                    filterImage={'add_reminder_big_icon'}
                                    filterText={'ADD A REMINDER'}
                                    reminderTitle={this.state.reminderTitle}
                                    reminderDesc={this.state.reminderDesc}
                                    setAlarm={this.state.setAlarm}
                                    repeatAlarm={this.state.repeatAlarm}

                                    dateSelectedIndex={this.state.dateIndex}
                                    dateDataSource={this.state.dateArray}
                                    onDateValueChange={(date, dateIndex) => this.onDateValueChange(date, dateIndex)}

                                    hourSelectedIndex={this.state.hourIndex}
                                    hourDataSource={this.state.hourArray}
                                    onHourValueChange={(hour, hourIndex) => this.onHourValueChange(hour, hourIndex)}

                                    minuteSelectedIndex={this.state.minuteIndex}
                                    minuteDataSource={this.state.minuteArray}
                                    onMinuteValueChange={(minute, minuteIndex) => this.onMinuteValueChange(minute, minuteIndex)}

                                    onDaySelect={(data, index) => this.onDaySelect(data, index)}
                                    dayArrayTemp={this.dayArrayTemp}

                                    panResponder={this._panResponder.panHandlers}
                                    onTitleChangeText={(reminderTitle) => this.onTitleChangeText(reminderTitle)}
                                    onDescChangeText={(reminderDesc) => this.onDescChangeText(reminderDesc)}
                                    onSetAlarmValueChange={(setAlarm) => this.onSetAlarmValueChange(setAlarm)}
                                    onRepeatAlarmValueChange={(repeatAlarm) => this.onRepeatAlarmValueChange(repeatAlarm)}
                                    onCloseClick={this.onCloseClick}
                                    onOkClick={this.onOkClick}
                                />
                            </View>
                    </Modal>
                <BottomTab tabData={tabBarWithBack} navigation={navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.blue,
        textAlign: 'center',
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(14),
        color: Constant.color.blue,
        textAlign: 'center'
    },
    reminderView: {
        paddingHorizontal: wp('10%'),
        marginTop: hp('2%'),
    },
    sepratorView: {
        flexDirection: 'row',
        marginBottom: hp('6%'),
        height: 2,
        backgroundColor: Constant.color.white
    },
    titleText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(13),
        color: Constant.color.lightGray,
        marginLeft: wp('2%')
    },
    reminderTitleText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: normalize(15),
        color: Constant.color.blue,
        marginLeft: wp('2%')
    },
    reminderDescText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(12),
        color: Constant.color.darkBlue,
        marginLeft: wp('2%')
    },
    reminderAlarmText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(12),
        color: Constant.color.lightGray,
        marginLeft: wp('2%'),
        marginTop: hp('1%')
    },
    modalView: {
        backgroundColor: 'rgba(2,21,42,0.9)',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        height: hp('75%'),
        justifyContent: 'center'
    },
});

export { Reminders };