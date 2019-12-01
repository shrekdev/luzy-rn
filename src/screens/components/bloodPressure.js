import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, Image, PanResponder, Platform, TouchableOpacity} from 'react-native';
import {AppButton, AppNavigator, BottomTab, ScrollPicker} from "../common";
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import BloodPressureMonitoring from "../containers/bloodPressureMonitoring";
import {tabBarWithBack} from "../../helper/appConstant";
import {getAsyncStorage} from "../../helper/appHelper";

class BloodPressure extends Component {

    systolicDataSource = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125];
    diastolicDataSource = [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
    pulseDatasource = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70];

    constructor(props) {
        super(props);
        this.state = {
            systolicValue: this.systolicDataSource[1],
            diastolicValue: this.diastolicDataSource[1],
            pulseValue: this.pulseDatasource[1],
            token: ''
        };
    }

    componentWillMount() {
        const {navigation} = this.props;
        const from = (navigation.state && navigation.state.params) && navigation.state.params.from || null;

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 2;  // can adjust this num
            },
            onPanResponderGrant: (e, gestureState) => {
                this.fScroll.setNativeProps({scrollEnabled: false})
            },
            onPanResponderMove: () => {
            },
            onPanResponderTerminationRequest: () => true,
        })

        getAsyncStorage('User').then((userData) => {
            let data = JSON.parse(userData);           
            this.setState({
                token: data.token
            })           
        }).catch((error) => {
            alert(JSON.stringify(error))
        });
    }

    onMomentumScrollEnd = () => {
    }

    onScrollEndDrag = () => {
        this.fScroll.setNativeProps({scrollEnabled: true})
    }

    onTouchStart = () => {
    }

    onRegister = () => {

        const {systolicValue,diastolicValue,pulseValue,token} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;
        
        handleLocalAction({
            type: localActions.REGISTER_BLOOD_PRESSURE, data: {
                in_Systolic: systolicValue,
                in_Diastolic: diastolicValue,
                in_Pulse: pulseValue,
                in_Token: token
            }
        }).then(res => {            
            if (res) {
                if (res.status === '200') {
                    alert(res.message);
                } else {
                    alert(res.message);
                }
            }
        }).catch(e => {
            console.log(e);
        });
       
        this.props.navigation.navigate('BloodPressureMonitoring');
    };

    render() {
        const {container, header, subText, titleText, titleView, detailView, wheelView, wheelSeprator, wheelText} = styles;
        const {safeArea, navigation} = this.props;

        return (
            <View style={{flex: 1}}>
                <ScrollView ref={(e) => {
                    this.fScroll = e
                }}
                            showsVerticalScrollIndicator={false} style={container}
                            contentContainerStyle={{paddingBottom: hp('10%') + safeArea.bottom}}
                >
                    <View style={{paddingBottom: hp('2%')}}>
                        <Image style={{height: hp('39%'), width: wp('100%')}} resizeMode={'stretch'}
                               source={{uri: 'blood_pressure_register_illustration'}}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={header}>{'BLOOD PRESSURE\nREGISTER'}</Text>
                        <Text
                            style={subText}>{'Enter your blood pressure values and keep track\nof your heart health.'}</Text>
                    </View>

                    <View style={{paddingStart: wp('9%'), paddingEnd: wp('9%')}}>

                        <View style={titleView}>
                            <Text style={titleText}>Systolic</Text>
                            <Text style={titleText}>Diastolic</Text>
                            <Text style={titleText}>Pulse</Text>
                        </View>
                        <View style={detailView}>
                            <ScrollPicker
                                dataSource={this.systolicDataSource}
                                selectedIndex={1}
                                onValueChange={(data, selectedIndex) => {
                                    this.setState({systolicValue: data})
                                }}
                                panResponder={this._panResponder.panHandlers}
                                containerStyle={wheelView}
                                sepratorStyle={wheelSeprator}
                                textStyle={wheelText}
                                onMomentumScrollEnd={this.onMomentumScrollEnd}
                                onScrollEndDrag={this.onScrollEndDrag}
                                onTouchStart={this.onTouchStart}
                                wrapperHeight={hp('22%')}
                                itemHeight={hp('7%')}
                            />
                            <View style={{
                                backgroundColor: '#e5f2ff',
                                width: 1,
                                height: hp('5%'),
                                marginBottom: hp('2%')
                            }}/>
                            <ScrollPicker
                                dataSource={this.diastolicDataSource}
                                selectedIndex={1}
                                onValueChange={(data, selectedIndex) => {
                                    this.setState({diastolicValue: data})
                                }}
                                panResponder={this._panResponder.panHandlers}
                                containerStyle={wheelView}
                                sepratorStyle={wheelSeprator}
                                textStyle={wheelText}
                                onMomentumScrollEnd={this.onMomentumScrollEnd}
                                onScrollEndDrag={this.onScrollEndDrag}
                                onTouchStart={this.onTouchStart}
                                wrapperHeight={hp('22%')}
                                itemHeight={hp('7%')}
                            />
                            <View style={{
                                backgroundColor: '#e5f2ff',
                                width: 1,
                                height: hp('5%'),
                                marginBottom: hp('2%')
                            }}/>
                            <ScrollPicker
                                dataSource={this.pulseDatasource}
                                selectedIndex={1}
                                onValueChange={(data, selectedIndex) => {
                                    this.setState({pulseValue: data})
                                }}
                                panResponder={this._panResponder.panHandlers}
                                containerStyle={wheelView}
                                sepratorStyle={wheelSeprator}
                                textStyle={wheelText}
                                onMomentumScrollEnd={this.onMomentumScrollEnd}
                                onScrollEndDrag={this.onScrollEndDrag}
                                onTouchStart={this.onTouchStart}
                                wrapperHeight={hp('22%')}
                                itemHeight={hp('7%')}
                            />
                        </View>

                        <AppButton
                            containerStyle={{
                                backgroundColor: Constant.color.lightblue, marginTop: hp('4%'),
                                marginBottom: hp('3%')
                            }}
                            title={'REGISTER BLOOD PRESSURE'}
                            onPress={this.onRegister}
                        />
                    </View>

                </ScrollView>
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
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.blue,
        textAlign: 'center'
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(14),
        color: Constant.color.blue,
        textAlign: 'center'
    },
    titleView: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: hp('8%'),
        backgroundColor: Constant.color.blue,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: hp('3%')
    },
    detailView: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        height: hp('22%'),
        backgroundColor: Constant.color.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden'
    },
    titleText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: normalize(14),
        color: Constant.color.white,
        textAlign: 'center'
    },
    wheelView: {
        height: hp('22%'),
        backgroundColor: Constant.color.white,
        flex: 1,
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
        textAlign: 'center'
    }

});

export {BloodPressure};


