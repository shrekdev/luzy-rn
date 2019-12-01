import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import moment from "moment";
import Constant from '../../helper/themeHelper';
import {BottomTab, AppNavigator, AppButton, WeekTab, DayTab} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import Appointment from '../containers/appointment';
import {HealthRanking} from './glucose'
import {tabBarWithBack} from "../../helper/appConstant";
import {getAsyncStorage} from "../../helper/appHelper";

const activitySort = ['Day', 'Week', 'Month'];
var weekday=new Array(7);
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";
weekday[7]="Sunday";

var dayHours = new Array(24);
var monthWeeks = new Array(4);

dayData = [
    {
        title: '00:00 - 01:00',
        level: 200,
    }, {
        title: '01:00 - 02:00',
        level: 150
    }, {
        title: '02:00 - 03:00',
        level: 120
    }, {
        title: '03:00 - 04:00',
        level: 80
    }, {
        title: '04:00 - 05:00',
        level: 70
    }, {
        title: '05:00 - 06:00',
        level: 150
    }, {
        title: '06:00 - 07:00',
        level: 160
    }, {
        title: '07:00 - 08:00',
        level: 70
    }, {
        title: '08:00 - 09:00',
        level: 140
    }, {
        title: '09:00 - 10:00',
        level: 190
    }, {
        title: '10:00 - 11:00',
        level: 110
    }, {
        title: '11:00 - 12:00',
        level: 70
    }, {
        title: '12:00 - 13:00',
        level: 80
    }, {
        title: '13:00 - 14:00',
        level: 150
    }, {
        title: '14:00 - 15:00',
        level: 45
    }, {
        title: '15:00 - 16:00',
        level: 180
    }, {
        title: '16:00 - 17:00',
        level: 60
    }, {
        title: '17:00 - 18:00',
        level: 199
    }, {
        title: '18:00 - 19:00',
        level: 170
    }, {
        title: '19:00 - 20:00',
        level: 140
    }, {
        title: '20:00 - 21:00',
        level: 70
    }, {
        title: '21:00 - 22:00',
        level: 120
    }, {
        title: '22:00 - 23:00',
        level: 70
    }, {
        title: '23:00 - 24:00',
        level: 100
    }, {
        title: '24:00 - 00:00',
        level: 70
    }];

weekData = [
    {
        title: 'Monday',
        level: 50,
    }, {
        title: 'Tuesday',
        level: 190
    }, {
        title: 'Wednesday',
        level: 198
    }, {
        title: 'Thursday',
        level: 90
    }, {
        title: 'Friday',
        level: 100
    }, {
        title: 'Saturday',
        level: 120
    }, {
        title: 'Sunday',
        level: 65
    }];

monthData = [
    {
        title: 'Week 1',
        level: 50,
    }, {
        title: 'Week 2',
        level: 170
    }, {
        title: 'Week 3',
        level: 100
    }, {
        title: 'week 4',
        level: 70
    }];

class MorningFastingActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedActivityTab: 1,
            isButton: false,
            token: '',
            weekData: weekData,
            dayData: dayData,
            monthData: monthData
        };

        for(let i = 0; i < 24; i++){   
            dayHours[i] = i + ":00" + "- " + (i + 1) + ":00";
        }

        for(let i = 0; i < 5; i++)
        {
            monthWeeks[i] = "week" + (i + 1);
        }

    }

    componentWillMount()
    {    
        getAsyncStorage('User').then((userData) => {
            let data = JSON.parse(userData);           
            this.setState({
                token: data.token
            }) 
        }).catch((error) => {
            alert(JSON.stringify(error))
        });
    }

    makeAnAppointment = () => {
        this.props.navigation.navigate('Appointment', {from: 'MorningFastingActivity'})
    };

    activityTabRender = (data, index) => {
       
        const {selectedActivityTab} = this.state;
        const {activityTabView, activityTabText} = styles;

        const {token} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;        

        var type = localActions.GET_LEVELFORDAY;

        if(selectedActivityTab == 0)
        {
            type = localActions.GET_LEVELFORDAY;
        }
        else if(selectedActivityTab == 1)
        {
            type = localActions.GET_LEVELFORWEEK;
        }
        else if(selectedActivityTab ==2)
        {
            type = localActions.GET_LEVELFORMONTH;
        }

        handleLocalAction({
            type: type, data: {                
                in_Token: token,
                in_Date: moment(new Date, 'YYYY-MM-DD').format('YYYY-MM-DD')
            }
        }).then(res => {            
            if (res) {                       
                if (res.status === '200') {
                   if(selectedActivityTab == 0)
                   {    
                       var arrDayData = [];

                        for(let i = 0; i < res.data.result.length; i++){                            
                            arrDayData.push({
                                    title: dayHours[res.data.result[i].Hour],
                                    level: res.data.result[i].Value
                                })
                                this.setState({
                                    dayData: arrDayData
                                });
                        }
                   }
                   else if(selectedActivityTab == 1)
                   {    
                       var arrWeekData = [];

                        for(let i = 0; i < res.data.result.length; i++){                            
                                arrWeekData.push({
                                    title: weekday[res.data.result[i].Day_No],
                                    level: res.data.result[i].Value
                                })
                                this.setState({
                                    weekData: arrWeekData
                                });
                        }
                   }
                   else if(selectedActivityTab == 2)
                   {    
                       var arrMonthData = [];
                        for(let i = 0; i < res.data.result.length; i++){          
                            if(res.data.result[i].Value != "NA")
                            {
                                arrMonthData.push({
                                    title: monthWeeks[res.data.result[i].Week],
                                    level: res.data.result[i].Value
                                })
                            }                  
                                
                            this.setState({
                                monthData: arrMonthData
                            });
                        }
                   }    
                                  
                   
                } else {
                   //alert(res.message);
                }
            }
        }).catch(e => {
            console.log(e);
        });        

        return (
            <TouchableOpacity key={index}
                              style={{
                                  ...activityTabView,
                                  backgroundColor: selectedActivityTab === index && Constant.color.white || Constant.color.lightSky
                              }}
                              onPress={() => {
                                  this.setState({selectedActivityTab: index})
                              }}>
                <Text style={activityTabText}>{data}</Text>
            </TouchableOpacity>
        )
    };

    /*50-100   -green
    * 100-125  -yellow
    * 125-200 -red */

    /*  < 92 mg/dl -OPTIMUM   = GREEN
        92- 100 mg/dl – NORMAL  =GREEN
        101- 124 mg/dl- PRE-DIABETES = YELLOW
        125 OR MORE – DIABETES = RED
        > 200   DIABETES   = RED
    */

    activityBarRender = (data, index) => {
        const {weekDaysText, activityMainView, activityIndicatorView} = styles;
        let level = 0;
        let arr = [0, 0, 0];
        if (data.level > 200) {
            level = 160;
        } else {
            level = data.level - 40;
        }

        let activityData = 0;
        activityData = (level * 6.25) / 10;

        if (activityData <= 37.5) {
            arr = [JSON.stringify(activityData) + '%', 0, 0];

        } else if (activityData <= (37.5 + 15.625)) {
            activityData = activityData - 37.5;
            arr = ['37.5%', JSON.stringify(activityData) + '%', 0]

        } else if (activityData <= (37.5 + 15.625 + 46.875)) {
            activityData = activityData - (37.5 + 15.625);
            arr = ['37.5%', '15.625%', JSON.stringify(activityData) + '%']
        } else {
            arr = ['37.5%', '15.625%', '46.875%'];
        }

        return (
            <View style={activityMainView} key={index}>
                <View style={activityIndicatorView}>
                    <View style={{backgroundColor: Constant.color.green, height: hp('2.5%'), width: arr[0]}}/>
                    <View style={{backgroundColor: Constant.color.yellow, height: hp('2.5%'), width: arr[1]}}/>
                    <View style={{backgroundColor: Constant.color.red, height: hp('2.5%'), width: arr[2]}}/>
                </View>
                <Text style={weekDaysText} numberOfLines={1}>{data.title}</Text>
            </View>)
    };

    renderActivityView = (dataArray) => {
        const {scalerImage, xAxisView, xAxisText} = styles;
        return (
            <View>
                <Image source={{uri: 'monitoring_glucose_register_glucose_scale'}}
                       style={scalerImage}
                       resizeMode={'stretch'}
                />
                {dataArray.map((data, index) => {
                    return this.activityBarRender(data, index);
                })}

                <View style={xAxisView}>
                    <Text style={{
                        ...xAxisText,
                        color: Constant.color.green,
                        width: '37.5%'
                    }} numberOfLines={1}>{'40-100'}</Text>
                    <Text style={{
                        ...xAxisText,
                        color: Constant.color.yellow,
                        width: '15.625%'
                    }} numberOfLines={1}>{'100-125'}</Text>
                    <Text style={{
                        ...xAxisText,
                        color: Constant.color.red,
                        width: '46.875%'
                    }} numberOfLines={1}>{'126+'}</Text>
                </View>
            </View>
        )
    };

    renderSelectedTab = (data) => {
        const {container, header, subText, scrollView} = styles;
        const {safeArea} = this.props;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={scrollView} showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: 20}}>
                    <Text style={header}>
                        {'MORNING FASTING ACTIVITY'}</Text>
                    <Text style={subText}>
                        {'Here is an overview of your blood glucose level.'}</Text>
                    {this.renderActivityView(data)}
                    <HealthRanking/>
                    <View style={{marginVertical: hp('2%')}}>
                        <AppButton
                            containerStyle={{backgroundColor: Constant.color.lightblue}}
                            textStyle={{color: Constant.color.white}}
                            title={'MAKE AN APPOINTMENT'}
                            onPress={this.makeAnAppointment}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        const {safeArea, navigation} = this.props;
        const {selectedActivityTab, isButton} = this.state;
        const {container} = styles;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <View style={{height: hp('10%'), flexDirection: 'row'}}>
                    {activitySort.map((data, index) => {
                        return this.activityTabRender(data, index);
                    })}
                </View>

                <DayTab selectedActivityTab={selectedActivityTab}/>

                {
                    (selectedActivityTab === 0)
                    &&
                    this.renderSelectedTab(this.state.dayData)
                }
                {
                    (selectedActivityTab === 1)
                    &&
                    this.renderSelectedTab(this.state.weekData)
                }
                {
                    (selectedActivityTab === 2)
                    &&
                    this.renderSelectedTab(this.state.monthData)
                }
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky
    },
    activityTabView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('10%'),
        width: wp('100%') / 3
    },
    activityTabText: {
        fontFamily: Constant.font.robotoRegular,
        color: Constant.color.lightGray,
        fontSize: Constant.fontSize.large
    },
    header: {
        textAlign: 'center',
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.blue,
        fontWeight: 'bold',
        fontFamily: Constant.font.linateBold
    },
    subText: {
        textAlign: 'center',
        fontSize: Constant.fontSize.xsmall,
        color: Constant.color.blue,
        fontFamily: Constant.font.robotoRegular
    },
    weekDaysText: {
        textAlign: 'center',
        fontSize: Constant.fontSize.mini,
        color: Constant.color.lightGray,
        fontFamily: Constant.font.robotoBold,
        flex: 1
    },
    activityMainView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginVertical: hp('0.5%')
    },
    activityIndicatorView: {
        backgroundColor: '#fff',
        height: hp('2.5%'),
        width: wp('65%'),
        borderRadius: 10,
        flexDirection: 'row',
        marginHorizontal: wp('2.5%'),
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
        paddingTop: hp('3%'),
        paddingHorizontal: wp('5%'),
        backgroundColor: Constant.color.lightSky
    },
    scalerImage: {
        height: parseInt(wp('70%') * 87 / 752),
        width: wp('70%'),
        marginVertical: hp('1%'),
    },
    xAxisView: {
        width: wp('65%'),
        flexDirection: 'row',
        marginHorizontal: wp('2.5%')
    },
    xAxisText: {
        textAlign: 'center',
        fontSize: Constant.fontSize.xmini,
        fontFamily: Constant.font.robotoRegular,
    }
});

export {MorningFastingActivity};
