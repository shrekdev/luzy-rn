import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, ImageBackground, Modal, TouchableOpacity, Platform } from 'react-native';
import { AppButton, AppNavigator, BottomTab } from "../common";
import { style } from "../common/style";
import Constant, { normalize } from '../../helper/themeHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/responsiveScreen';
import { tabBarWithBack } from "../../helper/appConstant";
import AnimatedCircularProgress from 'react-native-conical-gradient-progress';
// import appPedometer from 'react-native-oui-pedometer'

import {BarChart} from '../../helper/chart'

const { font, fontSize, color } = Constant;
const overviewData = [
    {
        imageData: 'pedometer_calories_icon',
        title: 'Calories:',
        detail: '-258 kcal'
    }, {
        imageData: 'pedometer_time_icon',
        title: 'Time:',
        detail: '1 h 35 min'
    }, {
        imageData: 'pedometer_distance_icon',
        title: 'Distance:',
        detail: '8 km'
    }
];

const data = {
    labels: ['MON.', 'TUE.', 'WED.', 'THU.', 'FRI.', 'SAT.', 'SUN.'],
    datasets: [{
        data: [90, 30, 100, 40, 60, 75]
    }]
};

class Pedometer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalSteps: 10000,
            completedSteps:0

        };
    }

    componentWillMount() {
        /*appPedometer.isAvailable().then(isAvailable => {
            alert(isAvailable ? 'Pedometer will work on your device.' : 'Pedometer will not work on your device.');
        }).catch(err => {
            alert('Error in checking availibility of Pedometer in this device');
        });*/
    }

    renderOverview = (data) => {
        const { overviewTitle, overviewDetail } = styles;
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: data.imageData }}
                    style={{ height: hp('5%'), width: wp('10%') }}
                    resizeMode='contain' />
                <Text style={overviewTitle}>{data.title}</Text>
                <Text style={overviewDetail}>{data.detail}</Text>
            </View>
        )
    };

    render() {
        const { container, header, subText, pedometerOverview, separator, progressBarData, progressBarDataText, progressDetailText } = styles;
        const { safeArea, navigation } = this.props;
        const {totalSteps, completedSteps} = this.state;

        // appPedometer.getNumberOfSteps().then(numberOfSteps => {
        //     this.setState({completedSteps:numberOfSteps})
        // });

        return (
            <View style={{ flex: 1, paddingBottom: hp('10%') + safeArea.bottom }}>
                <ScrollView ref={(e) => {
                    this.fScroll = e
                }}
                    showsVerticalScrollIndicator={false}
                    style={container}
                    contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={{ paddingBottom: hp('4%') }}>
                        <Image style={{ height: hp('39%'), width: wp('100%') }} resizeMode={'stretch'}
                            source={{ uri: 'meditation_illustration' }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={header}>{'PEDOMETER'}</Text>
                        <Text
                            style={subText}>{'Keep track of your steps, calories consumed\nby walking and the distance you walked.'}</Text>
                    </View>

                    <View style={pedometerOverview}>
                        {this.renderOverview(overviewData[0])}
                        <View style={separator} />
                        {this.renderOverview(overviewData[1])}
                        <View style={separator} />
                        {this.renderOverview(overviewData[2])}
                    </View>

                    <ImageBackground style={{ paddingTop: hp('0%'), height: hp('38%'), alignItems: 'center', justifyContent: 'center' }}
                        source={{ uri: 'background_calories_calculator' }}>
                        <View style={{ transform: [{ scaleX: -1 }] }}>
                            <AnimatedCircularProgress
                                size={hp('30%')}
                                width={12}
                                fill={completedSteps * 100 / totalSteps}
                                segments={70}
                                beginColor={color.darkBlue}
                                endColor={'#00BFFF'}
                                backgroundColor="rgba(255, 255, 255, 1)"
                                backgroundWidth={50}
                                linecap="round"
                            />

                        </View>
                        <View style={{ ...progressBarData }}>
                            <Text style={{ ...progressBarDataText, fontSize: Constant.isIOS ? fontSize.small : fontSize.medium }}>
                                <Text style={{ fontFamily: font.linateHeavy, fontSize: fontSize.xxxlarge }}>
                                    {/*{`${((completedSteps * 100 / totalSteps/10)).toFixed(3)}\n`}*/}
                                    {completedSteps}
                                </Text>
                                <Text>{`steps`}</Text>
                            </Text>
                        </View>
                    </ImageBackground>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: hp('4%') }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: 'pedometer_completed_icon' }}
                                style={{ height: hp('4%'), width: wp('8%') }}
                                resizeMode='contain' />
                            <Text style={progressDetailText}>
                                {`${completedSteps * 100 / totalSteps}% completed`}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: 'pedometer_steps_icon' }}
                                style={{ height: hp('4%'), width: wp('8%') }}
                                resizeMode='contain' />
                            <Text style={progressDetailText}>
                                {`Goal ${(totalSteps/1000).toFixed(3)} steps.`}
                            </Text>
                        </View>
                    </View>

                    <BarChart
                        data={data}
                        width={wp('100%')}
                        height={234}
                        barTopCounts={5}
                        chartConfig={{
                            backgroundColor: Constant.color.blue,
                            backgroundGradientFrom: Constant.color.blue,
                            backgroundGradientTo: Constant.color.blue,
                            barGradientFrom: '#18A5EE',
                            barGradientTo: '#0D418E',
                            style: {
                                borderRadius: 18
                            }
                        }}
                        style={{
                            marginLeft: -wp('3%'),
                        }}
                    />
                </ScrollView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue,
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.white,
        textAlign: 'center',
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(14),
        color: Constant.color.white,
        textAlign: 'center'
    },
    separator: {
        backgroundColor: Constant.color.lightSky,
        width: wp('0.3%')
    },
    pedometerOverview: {
        backgroundColor: Constant.color.white,
        marginTop: hp('3%'),
        paddingHorizontal: wp('15%'),
        paddingVertical: hp('2%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    overviewTitle: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini, textAlign: 'center',
        color: Constant.color.blue
    },
    overviewDetail: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.mini, textAlign: 'center',
        color: Constant.color.blue
    },
    progressBarData: {
        position: 'absolute',
        top: hp('0%'),
        width: wp('100%'),
        height: hp('37.5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBarDataText: {
        color: color.white,
        textAlign: 'center',
        paddingTop: hp('2'),
        fontFamily: font.linateBold
    },
    progressDetailText: {
        marginLeft: wp('1%'),
        color: color.white,
        fontFamily: font.robotoBold,
        fontSize: Constant.isIOS ? fontSize.xxxsmall : fontSize.xsmall
    }
});

export { Pedometer };
