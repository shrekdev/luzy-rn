import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, Image, TextInput, KeyboardAvoidingView, Keyboard} from 'react-native';
import {AppButton, AppBackNavigator, AppNavigator, BottomTab} from "../common";
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import TwoHoursAfterFoodActivity from "../containers/twoHoursAfterFoodActivity";
import {tabBarWithBack} from "../../helper/appConstant";
import {getAsyncStorage} from "../../helper/appHelper";

class TwoHoursAfterFoodHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            btnColor: Constant.color.lightGray,
            glucose: '',
            token: '',
            isButton: false
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

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.onKeyboardHide,
        );
    }


    changeButtonState = () => {
        let btnColor = this.state.glucose !== '' && Constant.color.lightblue || Constant.color.lightGray;
        this.setState({btnColor});
    };

    onGlucoseValChange = async (glucose) => {
        await this.setState({glucose});
        this.changeButtonState();
    };

    onRegister = () => {
        
        const {glucose,token} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;
        
        handleLocalAction({
            type: localActions.REGISTER_GLUCOSE, data: {
                in_GlucoseLevel: glucose,
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

        this.state.btnColor === Constant.color.lightblue ? this.props.navigation.navigate('TwoHoursAfterFoodActivity') : alert('Input glucose value');
    };

    render() {
        const {header, textInput, label, inputContainer, inputIcon} = styles;
        const {btnColor, glucose, isButton} = this.state;
        const {safeArea, navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                <KeyboardAvoidingView
                    enabled={Constant.isANDROID}
                    style={{flex: 1, justifyContent: 'space-between'}}
                    behavior='padding'
                    keyboardVerticalOffset = {hp('20.6%')}
                >
                    <ScrollView style={{backgroundColor: Constant.color.lightSky, height: hp('72%')}} contentContainerStyle={{paddingBottom: hp('12%')}} showsVerticalScrollIndicator={false}>
                        <Image style={{height: hp('41%')}} resizeMode='stretch' source={{uri: 'glucose_2_hours_after_food_illustration'}}/>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text style={[header,{marginTop:hp('4%')}]}>{'2 HOURS AFTER FOOD'}</Text>
                            <Text style={header}>{'REGISTER'}</Text>
                        </View>
                        <View style={{paddingStart: wp('9%'),paddingEnd: wp('9%')}}>
                            <Text style={[label,{marginTop:hp('2%')}]}>{"GLUCOSE VALUE:"}</Text>
                            <View style={inputContainer}>
                                <Image source={{uri:'monitoring_glucose_register_icon'}}
                                       style={inputIcon}
                                       resizeMode={'contain'}/>
                                <TextInput placeholder={'Enter your glucose value'}
                                           placeholderTextColor={Constant.color.lightGray}
                                           keyboardType={'number-pad'}
                                           returnKeyType={'done'}
                                           style={textInput}
                                           value={glucose}
                                           onChangeText={this.onGlucoseValChange}
                                           underlineColorAndroid={Constant.color.transparent}
                                           clearButtonMode={'while-editing'}
                                           maxLength={3}
                                />
                            </View>
                            <AppButton
                                containerStyle={{backgroundColor:btnColor,marginTop:hp('2.5%')}}
                                title={'REGISTER GLUCOSE'}
                                onPress={this.onRegister}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.blue
    },
    subText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: normalize(16),
        color: Constant.color.black
    },
    label: {
        fontFamily: Constant.font.robotoBold,
        fontSize: normalize(13),
        color: Constant.color.black,
        marginBottom: hp('0.5%')
    },
    textInput: {
        fontSize: Constant.fontSize.mini,
        fontFamily: Constant.font.robotoRegular,
        padding: hp('1%'),
        color: Constant.color.black,
        flex: 1,
        height: hp('5.4%')
    },
    inputContainer: {
        backgroundColor: Constant.color.white,
        padding: hp('0.5%'),
        flexDirection: 'row',
        marginTop: 3,
        borderRadius: 5,
        alignItems: 'center'
    },
    inputIcon: {
        height: hp('4%'),
        width: hp('4%')
    },
});

export {TwoHoursAfterFoodHome};
