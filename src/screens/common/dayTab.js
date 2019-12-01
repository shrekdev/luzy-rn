import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, Keyboard
} from "react-native";
import Constant from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import moment from "moment";

class DayTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daysArray: [],
            currentDay: 0,
            weekArray: [],
            currentWeek: 0,
            monthArray: [],
            currentMonth: 0,
            selectedActivityTab: 1
        }
    }

    componentWillMount() {
        this.dayDataRender();
        this.weekDataRender();
        this.monthDataRender();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({selectedActivityTab: nextProps.selectedActivityTab});
    }

    dayDataRender = () => {
        let daysArray = [];
        let today = moment();
        let userDate = moment("1-1-2019", "DD-MM-YYYY");

        let totalDays = today.diff(userDate, 'day');

        for (let i = 0; i <= totalDays; i++) {
            daysArray[i] = userDate.format('MMMM DD, YYYY');
            userDate.add(1, 'day').format('MMMM DD, YYYY')
        }
        this.setState({daysArray: daysArray, currentDay: daysArray.length - 1});
    };

    weekDataRender = () => {
        let weekArray = [];
        let today = moment();
        let userDate = moment("1-1-2019", "DD-MM-YYYY");

        userDate.startOf('week');
        today = today.endOf('week');

        let totalWeek = today.diff(userDate, 'week');
        let startDate, endDate;

        for (let i = 0; i <= totalWeek; i++) {
            startDate = userDate.clone();
            endDate = userDate.clone();

            weekArray[i] = {
                startDate: startDate.format('MMMM DD'),
                endDate: endDate.add(7, 'day').format('DD, YYYY')
            };
            userDate.add(1, 'week').format('MMMM DD');
        }
        this.setState({weekArray: weekArray, currentWeek: weekArray.length - 1});
    };

    monthDataRender = () => {
        let monthArray = [];
        let today = moment();
        let userDate = moment("1-1-2019", "DD-MM-YYYY");

        let totalMonths = today.diff(userDate, 'month');

        for (let i = 0; i <= totalMonths; i++) {
            monthArray[i] = userDate.format('MMMM YYYY');
            userDate.add(1, 'month').format('MMMM YYYY')
        }
        this.setState({monthArray: monthArray, currentMonth: monthArray.length - 1});
    };

    changeDay = (type) => {
        const {currentDay, daysArray, currentWeek, weekArray, currentMonth, monthArray, selectedActivityTab} = this.state;
        if (selectedActivityTab === 0) {
            if (type === 'left' && currentDay > 0) {
                this.setState({currentDay: currentDay - 1});
            } else if (type === 'right' && currentDay < daysArray.length - 1) {
                this.setState({currentDay: currentDay + 1});
            }
        } else if (selectedActivityTab === 1) {
            if (type === 'left' && currentWeek > 0) {
                this.setState({currentWeek: currentWeek - 1});
            } else if (type === 'right' && currentWeek < weekArray.length - 1) {
                this.setState({currentWeek: currentWeek + 1})
            }
        } else if (selectedActivityTab === 2) {
            if (type === 'left' && currentMonth > 0) {
                this.setState({currentMonth: currentMonth - 1});
            } else if (type === 'right' && currentMonth < monthArray.length - 1) {
                this.setState({currentMonth: currentMonth + 1})
            }
        }
    };

    render() {
        const {daysArray, currentDay, weekArray, currentWeek, currentMonth, monthArray, selectedActivityTab} = this.state;
        const {container, dateView, dateText, arrowView, arrowIcon} = styles;
        return (
            <View style={container}>
                <View style={dateView}>
                    <Text
                        style={dateText}>
                        {selectedActivityTab === 0 && daysArray[currentDay]}
                        {selectedActivityTab === 1 && weekArray[currentWeek].startDate + ' - ' + weekArray[currentWeek].endDate}
                        {selectedActivityTab === 2 && monthArray[currentMonth]}
                    </Text>
                </View>
                <View style={arrowView}>
                    <TouchableOpacity onPress={() => {
                        this.changeDay('left')
                    }}
                                      style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={{uri: 'left_dark_arrow'}}
                               style={arrowIcon}
                               resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.changeDay('right')
                    }}
                                      style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={{uri: 'right_dark_arrow'}}
                               style={arrowIcon}
                               resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp('10%'),
        backgroundColor: Constant.color.white,
        justifyContent: 'center'
    },
    dateView: {
        width: Constant.screenWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        fontFamily: Constant.font.robotoRegular,
        color: Constant.color.blue,
        fontSize: Constant.fontSize.large
    },
    arrowView: {
        position: 'absolute',
        width: Constant.screenWidth,
        height: hp('10%'),
        paddingHorizontal: wp('2%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    arrowIcon: {
        height: hp('3%'),
        width: wp('8%'),
        tintColor: Constant.color.lightGray
    }
});


export {DayTab}
