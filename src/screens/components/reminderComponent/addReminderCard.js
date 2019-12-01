import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, TextInput, Switch, Platform
} from "react-native";
import Constant, { normalize } from '../../../helper/themeHelper';
import { daysList } from '../../../helper/appConstant'
import { AppButton, ScrollPicker } from "../../common";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helper/responsiveScreen';

class AddReminderCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alarmView: false,
            repeatAlarmView: false,
        }

        this.onDetailOkClick = this.onDetailOkClick.bind(this);
        this.onAlarmOkClick = this.onAlarmOkClick.bind(this);
        this.onAlarmBackClick = this.onAlarmBackClick.bind(this);
        this.onRepeatAlarmBackClick = this.onRepeatAlarmBackClick.bind(this);
    }

    renderListItem = (data, index) => {
        const { navigation, safeArea } = this.props;
        const { daysText, rowCenter } = styles;
        return <View key={index}>
            <TouchableOpacity style={rowCenter} onPress={() => this.props.onDaySelect(data, index)}>
                {
                    this.props.dayArrayTemp.includes(data) &&
                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%'), marginLeft: index % 2 != 0 && wp('6%') || 0 }} resizeMode='contain' />
                    || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%'), marginLeft: index % 2 != 0 && wp('6%') || 0 }} resizeMode='contain' />
                }
                <Text style={[daysText, { marginLeft: wp('2%'), width: wp('25%') }]}>{data}</Text>
            </TouchableOpacity>
        </View>
    };

    onDetailOkClick = () => {
        if (this.props.setAlarm) {
            this.setState({ alarmView: true })
        }
        else {
            this.props.onOkClick()
        }
    }

    onAlarmOkClick = () => {
        if (this.props.repeatAlarm) {
            this.setState({ alarmView: false, repeatAlarmView: true })
        }
        else {
            this.props.onOkClick()
        }
    }

    onAlarmBackClick = () => {
        this.setState({ alarmView: false })
    }

    onRepeatAlarmBackClick = () => {
        this.setState({ repeatAlarmView: false, alarmView: true })
    }

    onMomentumScrollEnd = () => {
    }

    onScrollEndDrag = () => {
    }

    onTouchStart = () => {
    }

    render() {
        const { reminderTitle, reminderDesc, setAlarm, repeatAlarm, onOkClick, onCloseClick, onSetAlarmValueChange, onRepeatAlarmValueChange, onTitleChangeText, onDescChangeText } = this.props;
        const { container, center, titleText, subText, rowSpace, pickerView, textInput, titleView, titleDesc, wheelView, wheelSeprator, wheelText, daysContainer } = styles;
        return (
            <View style={container}>
                <View style={rowSpace}>
                    <TouchableOpacity onPress={onCloseClick}>
                        <Image source={{ uri: 'close' }} style={{ height: hp('5%'), width: wp('8%') }} resizeMode='contain' />
                    </TouchableOpacity>
                </View>

                <View style={center}>
                    <Image source={{ uri: this.props.filterImage }} style={{ height: hp('9%'), width: wp('23%') }} resizeMode='contain' />
                    <Text style={titleText}>{(this.props.filterText).toUpperCase()}</Text>
                </View>

                {this.state.alarmView == true &&
                    <View style={{ paddingHorizontal: wp('1%') }}>
                        <Text style={[subText, { alignSelf: 'center' }]}>{'SET UP ALARM:'}</Text>

                        <View style={pickerView}>

                            <ScrollPicker
                                dataSource={this.props.dateDataSource}
                                selectedIndex={this.props.dateSelectedIndex}
                                onValueChange={(data, selectedIndex) => {
                                    this.props.onDateValueChange(data, selectedIndex)
                                }}
                                panResponder={this.props.panResponder}
                                containerStyle={[wheelView, { flex: 0.5 }]}
                                sepratorStyle={[wheelSeprator, { width: wp('40%') }]}
                                textStyle={wheelText}
                                onMomentumScrollEnd={this.onMomentumScrollEnd}
                                onScrollEndDrag={this.onScrollEndDrag}
                                onTouchStart={this.onTouchStart}
                                wrapperHeight={hp('22%')}
                                itemHeight={hp('7%')}
                            />
                            <ScrollPicker
                                dataSource={this.props.hourDataSource}
                                selectedIndex={this.props.hourSelectedIndex}
                                onValueChange={(data, selectedIndex) => {
                                    this.props.onHourValueChange(data, selectedIndex)
                                }}
                                panResponder={this.props.panResponder}
                                containerStyle={[wheelView, { flex: 0.15 }]}
                                sepratorStyle={wheelSeprator}
                                textStyle={wheelText}
                                onMomentumScrollEnd={this.onMomentumScrollEnd}
                                onScrollEndDrag={this.onScrollEndDrag}
                                onTouchStart={this.onTouchStart}
                                wrapperHeight={hp('22%')}
                                itemHeight={hp('7%')}
                            />
                            <Text style={wheelText}>:</Text>
                            <ScrollPicker
                                dataSource={this.props.minuteDataSource}
                                selectedIndex={this.props.minuteSelectedIndex}
                                onValueChange={(data, selectedIndex) => {
                                    this.props.onMinuteValueChange(data, selectedIndex)
                                }}
                                panResponder={this.props.panResponder}
                                containerStyle={[wheelView, { flex: 0.15 }]}
                                sepratorStyle={wheelSeprator}
                                textStyle={wheelText}
                                onMomentumScrollEnd={this.onMomentumScrollEnd}
                                onScrollEndDrag={this.onScrollEndDrag}
                                onTouchStart={this.onTouchStart}
                                wrapperHeight={hp('22%')}
                                itemHeight={hp('7%')}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), alignItems: 'center' }}>
                            <Text style={subText}>{'REPEAT ALARM:'}</Text>
                            <Switch value={repeatAlarm} onValueChange={(repeatAlarm) => onRepeatAlarmValueChange(repeatAlarm)} ios_backgroundColor={Constant.color.lightGray} trackColor={Constant.color.lightGray}></Switch>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ flex: 0.15, backgroundColor: Constant.color.lightGray, marginTop: hp('3%'), borderRadius: 8, alignItems: 'center', justifyContent: 'center', }}
                                onPress={this.onAlarmBackClick}>
                                <Image source={{ uri: 'back_button_icon' }} style={{ height: hp('3%'), width: wp('6%') }} resizeMode='contain' />
                            </TouchableOpacity>
                            <AppButton
                                containerStyle={{ flex: 0.82, backgroundColor: Constant.color.lightblue, marginTop: hp('3%') }}
                                title={'OK'}
                                onPress={this.onAlarmOkClick} />
                        </View>
                    </View>

                    || (this.state.repeatAlarmView == true &&
                        <View style={{ paddingHorizontal: wp('1%') }}>
                            <Text style={[subText, { alignSelf: 'center' }]}>{'REPEAT ALARM:'}</Text>

                            <View style={daysContainer}>
                                {
                                    daysList.map((data, index) => this.renderListItem(data, index))
                                }
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{ flex: 0.15, backgroundColor: Constant.color.lightGray, marginTop: hp('3%'), borderRadius: 8, alignItems: 'center', justifyContent: 'center', }}
                                    onPress={this.onRepeatAlarmBackClick}>
                                    <Image source={{ uri: 'back_button_icon' }} style={{ height: hp('3%'), width: wp('6%') }} resizeMode='contain' />
                                </TouchableOpacity>
                                <AppButton
                                    containerStyle={{ flex: 0.82, backgroundColor: Constant.color.lightblue, marginTop: hp('3%') }}
                                    title={'OK'}
                                    onPress={onOkClick} />
                            </View>
                        </View>

                        ||
                        <View style={{ paddingHorizontal: wp('1%'), marginTop: hp('0.5%') }}>
                            <Text style={subText}>{'TITLE:'}</Text>
                            <View style={titleView}>
                                <Image source={{ uri: 'title_placeholder_icon' }} style={{ height: hp('3%'), width: wp('6%') }} resizeMode='contain' />
                                <TextInput placeholder={'Choose a title'}
                                    ref={(input) => this.txtTitle = input}
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    placeholderTextColor={Constant.color.lightGray}
                                    style={textInput}
                                    value={reminderTitle}
                                    onSubmitEditing={() => { this.txtDesc.focus() }}
                                    blurOnSubmit={false}
                                    onChangeText={(reminderTitle) => onTitleChangeText(reminderTitle)}
                                    underlineColorAndroid={Constant.color.transparent}></TextInput>
                            </View>
                            <Text style={subText}>{'DESCRIPTION:'}</Text>
                            <View style={titleDesc}>
                                <Image source={{ uri: 'description_placeholder_icon' }} style={{ height: hp('3%'), width: wp('6%') }} resizeMode='contain' />
                                <TextInput placeholder={'Choose a description'}
                                    multiline={true}
                                    ref={(input) => this.txtDesc = input}
                                    autoCapitalize="sentences"
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                    returnKeyType={'done'}
                                    textAlignVertical={'top'}
                                    placeholderTextColor={Constant.color.lightGray}
                                    style={[textInput, { height: hp('7%') }]}
                                    value={reminderDesc}
                                    onChangeText={(reminderDesc) => onDescChangeText(reminderDesc)}
                                    underlineColorAndroid={Constant.color.transparent}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%'), alignItems: 'center' }}>
                                <Text style={subText}>{'SET UP ALARM:'}</Text>
                                <Switch value={setAlarm} onValueChange={(setAlarm) => onSetAlarmValueChange(setAlarm)} ios_backgroundColor={Constant.color.lightGray} trackColor={Constant.color.lightGray}></Switch>
                            </View>
                            <AppButton
                                containerStyle={{ backgroundColor: Constant.color.lightblue, marginTop: hp('3%') }}
                                title={'OK'}
                                onPress={this.onDetailOkClick} />
                        </View>

                    )
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constant.color.white,
        borderRadius: 18,
        paddingVertical: hp('2.5%'),
        paddingHorizontal: wp('4%'),
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: hp('2%')
    },
    titleText: {
        marginTop: hp('1%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.blue
    },
    subText: {
        fontFamily: Constant.font.linateBold,
        color: Constant.color.darkBlue,
        fontSize: normalize(14),
    },
    textInput: {
        fontSize: Constant.fontSize.mini,
        fontFamily: Constant.font.robotoRegular,
        color: Constant.color.blue,
        flex: 1,
        paddingBottom: 0,
        paddingTop: 0,
        marginLeft: wp('1.5%')
    },
    titleView: {
        flexDirection: 'row',
        backgroundColor: Constant.color.lightSky,
        padding: wp('3%'),
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: hp('2%')
    },
    titleDesc: {
        flexDirection: 'row',
        backgroundColor: Constant.color.lightSky,
        padding: wp('3%'),
        borderRadius: 8,
        height: hp('10%'),
        alignItems: 'flex-start'
    },
    wheelView: {
        height: hp('21%'),
        backgroundColor: Constant.color.white,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    wheelSeprator: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? (hp('22%') - hp('9%')) / 2 : (hp('22%') - hp('7%')) / 2,
        height: hp('7%'),
        width: wp('15%'),
        borderTopColor: '#e5f2ff',
        borderTopWidth: 1,
        borderBottomColor: '#e5f2ff',
        borderBottomWidth: 1,
        alignSelf: 'center'
    },
    wheelText: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(25),
        textAlign: 'center',
        color: Constant.color.blue
    },
    daysContainer: {
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('2.2'),
        marginLeft: wp('3%'),
        // justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    daysText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.small,
        color: Constant.color.darkBlue
    },
});

export { AddReminderCard }