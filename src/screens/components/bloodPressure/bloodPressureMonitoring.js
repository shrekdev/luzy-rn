import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import moment from "moment";
import Constant from '../../../helper/themeHelper';
import {BottomTab, AppButton, DayTab} from "../../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {tabBarWithBack} from '../../../helper/appConstant'
import {LineChart, AbstractChart} from '../../../helper/chart'
import Appointment from '../../containers/appointment';

const activitySort = ['Day', 'Week', 'Month'];
let labels = [], plottingDataSystolic = [], plottingDataDiastolic = [], plottingDataPulse = [];

class BloodPressureMonitoring extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedActivityTab: 1,
        };
        this.currentWeek = 0
    }

    activityTabRender = (data, index) => {
        const {selectedActivityTab} = this.state;
        const {activityTabView, activityTabText} = styles;
        return (
            <TouchableOpacity key={index}
                              style={{
                                  ...activityTabView,
                                  backgroundColor: selectedActivityTab === index && Constant.color.white || Constant.color.lightSky
                              }}
                              onPress={() => {
                                  this.setState({selectedActivityTab: index})
                              }}
            >
                <Text style={activityTabText}>{data}</Text>
            </TouchableOpacity>
        )
    };

    makeAnAppointment = () => {
        this.props.navigation.navigate('Appointment',{from: 'BloodPressureMonitoring'});
    };

    dataBoxDataView = (value, key, color) => {
        const {dataBoxDataTopText} = styles;

        return (
            <View style={{width: wp('27.6%'), alignItems: 'center'}}>
                <Text style={{...dataBoxDataTopText, color: color}}>{value}</Text>
                <Text style={{
                    fontSize: Constant.fontSize.medium,
                    fontFamily: Constant.font.robotoRegular,
                    color: '#000'
                }}>{key}</Text>
            </View>
        )
    };

    render() {
        const {
            container, header, subText, scrollView, centerIt, separator, circle, denotationText, denotationBlock, dataBoxTop,
            dataBoxTopText, dataBoxBottom
        } = styles;
        const {safeArea, navigation} = this.props;
        const {selectedActivityTab} = this.state;

        if (selectedActivityTab === 0) {
            labels = ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night'];
            plottingDataSystolic = [115, 127, 120, 114, 128];
            plottingDataDiastolic = [85, 80, 87, 80, 75];
            plottingDataPulse = [66, 57, 65, 57, 60];
        } else if (selectedActivityTab === 1) {
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            plottingDataSystolic = [115, 120, 119, 127, 118, 114, 128];
            plottingDataDiastolic = [85, 80, 87, 80, 84, 75, 80];
            plottingDataPulse = [60, 66, 57, 65, 57, 60, 56];
        } else if (selectedActivityTab === 2) {
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            plottingDataSystolic = [115, 127, 118, 128];
            plottingDataDiastolic = [78, 83, 76, 80];
            plottingDataPulse = [62, 55, 62, 55];
        }

        return (
            <View style={container}>
                {/* 3 Tabs :  */}
                <View style={{height: hp('10%'), flexDirection: 'row'}}>
                    {activitySort.map((data, index) => {
                        return this.activityTabRender(data, index);
                    })}
                </View>
                <DayTab selectedActivityTab={selectedActivityTab}/>
                {
                    <View style={{flex: 1}}>
                        <ScrollView
                            contentContainerStyle={{paddingBottom: safeArea.bottom + hp('15%')}}
                            style={scrollView}
                            showsVerticalScrollIndicator={false}
                        >
                            <Text style={header}>{'BLOOD PRESSURE MONITORING'}</Text>
                            <Text style={subText}>{'Here is an overview of your blood pressure values.'}</Text>

                            <LineChart
                                data={{
                                    labels,
                                    datasets: [
                                        {
                                            data: plottingDataSystolic,
                                            color: (opacity = 1) => `rgba(251, 171, 40, ${opacity})`
                                        },
                                        // {data: [50,90,70,110,100,150,130], color: (opacity = 1) => `rgba(75,0,130, ${opacity})` },
                                        {
                                            data: plottingDataDiastolic,
                                            color: (opacity = 1) => `rgba(86,37,165, ${opacity})`
                                        },
                                        {
                                            data: plottingDataPulse,
                                            color: (opacity = 1) => `rgba(86,166,13, ${opacity})`
                                        },
                                        {data: [50, 150], color: (opacity = 1) => `rgba(229,242,255, ${opacity})`}
                                    ]
                                }}
                                width={wp('95%')}
                                height={230}
                                withShadow={false}
                                withInnerLines={true} //change
                                withOuterLines={false}
                                adjustmentFactor={0.00039}
                                chartConfig={{
                                    backgroundColor: '#e5f2ff',
                                    backgroundGradientFrom: '#e5f2ff',
                                    backgroundGradientTo: '#e5f2ff',   //change
                                    strokeWidth: 3,  //5
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0, 15, 55, ${opacity})`,
                                    style: {
                                        borderRadius: 18
                                    }
                                }}
                                style={{
                                    marginTop: hp('2.5%'),
                                    marginLeft: -wp('6%'),
                                    borderRadius: 1,
                                }}
                            />

                            {/*denotation*/}
                            <View style={denotationBlock}>
                                <View style={{...circle, backgroundColor: Constant.color.darkYellow}}/>
                                <Text style={{...denotationText, color: Constant.color.darkYellow}}>{'Systolic'}</Text>
                                <View style={{...circle, backgroundColor: Constant.color.violet}}/>
                                <Text style={{...denotationText, color: Constant.color.violet}}>{'Diastolic'}</Text>
                                <View style={{...circle, backgroundColor: Constant.color.green}}/>
                                <Text style={{...denotationText, color: Constant.color.green}}>{'Pulse'}</Text>
                            </View>

                            <View style={{marginTop: hp('3%')}}>
                                <View style={{...dataBoxTop, ...centerIt}}>
                                    <Text style={dataBoxTopText}>{'Today'}</Text>
                                </View>
                                <View style={{...dataBoxBottom}}>
                                    {this.dataBoxDataView(124, 'Systolic', Constant.color.darkYellow)}
                                    <View style={separator}/>
                                    {this.dataBoxDataView(83, 'Diastolic', Constant.color.violet)}
                                    <View style={separator}/>
                                    {this.dataBoxDataView(61, 'Pulse', Constant.color.darkGreen)}
                                </View>
                            </View>

                            <View style={{marginVertical: hp('3%')}}>
                                <AppButton
                                    containerStyle={{backgroundColor: Constant.color.lightblue}}
                                    textStyle={{color: Constant.color.white, fontSize: Constant.fontSize.large}}
                                    title={'MAKE AN APPOINTMENT'}
                                    onPress={this.makeAnAppointment}
                                />
                            </View>
                        </ScrollView>
                    </View>
                }
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
    },
    centerIt: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityTabView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('10%'),
        width: wp('100%%') / 3
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
        fontFamily: Constant.font.linateHeavy
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
        paddingHorizontal: wp('8%')
    },
    scalerImage: {
        height: hp('5%'), width: wp('70%'),
        marginVertical: hp('1%')
    },
    dataBoxTop: {
        backgroundColor: Constant.color.blue,
        height: hp('7.5%'),
        borderTopRightRadius: wp('2%'),
        borderTopLeftRadius: wp('2%')
    },
    dataBoxTopText: {
        color: Constant.color.white,
        fontSize: Constant.fontSize.large,
        fontFamily: Constant.font.robotoBold
    },
    dataBoxBottom: {
        backgroundColor: Constant.color.white,
        height: hp('13%'),
        borderBottomRightRadius: wp('2%'),
        borderBottomLeftRadius: wp('2%'),
        flexDirection: 'row',
        paddingVertical: hp('2%')
    },
    separator: {
        backgroundColor: Constant.color.lightSky,
        width: wp('0.6%'),
    },
    dataBoxDataTopText: {
        fontSize: Constant.fontSize.xxlarge,
        fontFamily: Constant.font.linateBold
    },
    circle: {
        height: hp('2%'),
        width: hp('2%'),
        borderRadius: hp('1%'),
    },
    denotationBlock: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginHorizontal: wp('10%'),
        alignItems: 'center'
    },
    denotationText: {
        fontFamily: Constant.font.robotoBold,
        marginLeft: wp('1%'),
        marginRight: wp('7%'),
        // marginTop: -hp('0.5%'),
        justifyContent: 'center'
    }
});

export {BloodPressureMonitoring};
