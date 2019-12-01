import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import moment from "moment";
import Constant from '../../helper/themeHelper';
import {BottomTab, AppButton, DayTab} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {tabBarWithBack} from '../../helper/appConstant'
import {LineChart, AbstractChart} from '../../helper/chart'
import Appointment from '../containers/appointment';

const activitySort = ['Day', 'Week', 'Month'];
let labels = [], plottingData = [];

class BmiWeightMonitoring extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedActivityTab: 1,
            dateArray: [],
            isButtonClicked: false
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
        this.props.navigation.navigate('Appointment',{from: 'BMIWeightMonitoring'})
    };

    dataBoxDataView = (value, unit, key, color, isBold, isBottomData) => {
        const {dataBoxDataTopText} = styles;

        return (
            <View style={{width: isBottomData && wp('45%') || wp('41.6%'), alignItems: 'center'}}>
                <Text style={{
                    fontSize: Constant.fontSize.medium,
                    fontFamily: isBold && Constant.font.robotoBold || Constant.font.robotoRegular,
                    color: '#000'
                }}>
                    {key}
                </Text>
                <Text style={{
                    ...dataBoxDataTopText,
                    color: color,
                    fontSize: isBottomData && Constant.fontSize.xxxlarge || Constant.fontSize.xlarge
                }}>
                    {value}<Text style={{fontSize: Constant.fontSize.small}}>{unit}</Text>
                </Text>
            </View>
        )
    };

    render() {
        const {
            container, header, subText, scrollView, arrowsView, centerIt, separator, circle,
            denotationText, denotationBlock, activityTabText, arrowButtons, dataBoxTop,
            dataBoxTopText, dataBoxBottom, horizontalSeparator
        } = styles;
        const {safeArea, navigation} = this.props;
        const {selectedActivityTab, dateArray, isButtonClicked} = this.state;

        if (selectedActivityTab === 0) {
            labels = ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night'];
            plottingData = [90, 84, 86, 78, 76];
        } else if (selectedActivityTab === 1) {
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            plottingData = [90, 84, 86, 78, 76, 70, 66];
        } else if (selectedActivityTab === 2) {
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            plottingData = [90, 84, 86, 78];
        }

        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
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
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: 20}}
                            style={scrollView}
                        >
                            <Text style={header}>{'WEIGHT MONITORING'}</Text>
                            <Text style={subText}>{'Here is an overview of your weight.'}</Text>

                            <LineChart
                                data={{
                                    labels,
                                    datasets: [
                                        {data: plottingData, color: (opacity = 1) => `rgba(12, 182, 243, ${opacity})`},
                                        // {data: [20,60,40,90,80,120,100], color: (opacity = 1) => `rgba(75,0,130, ${opacity})` },
                                        {data: [20, 120], color: (opacity = 1) => `rgba(229,242,255, ${opacity})`}
                                    ]
                                }}
                                width={wp('100%')}
                                height={230}
                                withShadow={false}
                                withInnerLines={true} //change
                                withOuterLines={false}
                                yLabelUnit={'kg'}
                                adjustmentFactor={0.00075}
                                drawLine={true}
                                lineProps={{
                                    color: Constant.color.green,
                                    value: 70
                                }}
                                chartConfig={{
                                    backgroundColor: '#e5f2ff',
                                    backgroundGradientFrom: '#e5f2ff',
                                    backgroundGradientTo: '#e5f2ff',   //change
                                    strokeWidth: 3,  //5
                                    color: (opacity = 1) => `rgba(0, 15, 55, ${opacity})`,
                                    style: {
                                        borderRadius: 18
                                    }
                                }}
                                style={{
                                    marginTop: hp('2.5%'),
                                    marginBottom: hp('1%'),
                                    marginLeft: -wp('7%'),
                                    borderRadius: 1,
                                }}
                            />

                            {/*denotation*/}
                            <View style={denotationBlock}>
                                <View style={{...circle, backgroundColor: Constant.color.lightblue}}/>
                                <Text
                                    style={{...denotationText, color: Constant.color.lightblue}}>{'Your weight'}</Text>
                                <View style={{...circle, backgroundColor: Constant.color.green}}/>
                                <Text style={{...denotationText, color: Constant.color.green}}>{'Ideal weight'}</Text>
                            </View>

                            {/*Data Boxes*/}
                            <View style={{marginTop: hp('3%')}}>
                                <View style={{...dataBoxTop, ...centerIt}}>
                                    <Text style={dataBoxTopText}>{'Today'}</Text>
                                </View>
                                <View style={{...dataBoxBottom, ...centerIt}}>
                                    <View style={{flexDirection: 'row'}}>
                                        {this.dataBoxDataView(70, 'kg', 'Your weight', Constant.color.lightblue, true)}
                                        <View style={separator}/>
                                        {this.dataBoxDataView(70, 'kg', 'Ideal weight', Constant.color.green)}
                                    </View>
                                    <View style={horizontalSeparator}/>
                                    {this.dataBoxDataView(24.2, 'BMI', 'Your body mass index', Constant.color.lightblue, true, true)}
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
        fontFamily: Constant.font.linateBold
    },
    arrowsView: {
        position: 'absolute',
        width: Constant.screenWidth,
        height: hp('10%'),
        paddingHorizontal: wp('2%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    arrowButtons: {
        height: hp('3%'),
        width: wp('8%'),
        tintColor: Constant.color.lightGray,
        marginHorizontal: wp('3%')
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
        height: hp('5%'),
        width: wp('70%'),
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
        height: hp('28%'),
        borderBottomRightRadius: wp('2%'),
        borderBottomLeftRadius: wp('2%'),
        paddingTop: hp('2%'),
    },
    separator: {
        backgroundColor: Constant.color.lightSky,
        width: wp('0.6%'),
    },
    horizontalSeparator: {
        backgroundColor: Constant.color.lightSky,
        height: wp('0.6%'),
        width: wp('75%'),
        marginVertical: hp('1.5%')
    },
    dataBoxDataTopText: {
        fontFamily: Constant.font.linateBold,
        marginTop: hp('0.7%')
    },
    circle: {
        height: hp('2%'),
        width: hp('2%'),
        borderRadius: hp('1%'),
    },
    denotationBlock: {
        flexDirection: 'row',
        marginHorizontal: wp('12%'),
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

export {BmiWeightMonitoring};
