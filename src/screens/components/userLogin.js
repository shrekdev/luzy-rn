import React, {Component} from 'react';
import {
    SafeAreaView, StyleSheet, Text,
    TouchableOpacity, Keyboard, StatusBar,
    View, TextInput, Image, AsyncStorage, ScrollView
} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppButton, AppNavigator} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {getAsyncStorage, isValidEmail, isValidUserName, setAsyncStorage} from "../../helper/appHelper";
import {rememberMe, user} from "../../helper/appConstant";
import {StackActions, NavigationActions} from "react-navigation";

class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            rememberMe: false,
            showPassword: false,
            isValid: true
        }
    }

    componentWillMount() {
        getAsyncStorage(rememberMe).then((response) => {
            let val = JSON.parse(response);

            if (val) {
                getAsyncStorage(user).then((userData) => {
                    let data = JSON.parse(userData);

                    this.setState({
                        userName: data.user,
                        password: data.password
                    })
                }).catch((error) => {
                    alert(error)
                });
            }
        }).catch((error) => {
            alert(error)
        })
    }

    onRememberMe = () => {
        this.setState({
            rememberMe: !this.state.rememberMe
        }, () => setAsyncStorage(rememberMe, JSON.stringify(this.state.rememberMe)));
    };

    onShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    onSocialMedia = (type) => {

    };

    //On User login
    onLogin = () => {
        const {userName, password} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;
        Keyboard.dismiss();
        if (!isValidEmail(userName)) {
            alert('Please enter valid Username');
        } else
            if (password.length === 0) {
            alert('Please enter your Password');
        } else {
            handleLocalAction({
                type: localActions.LOGIN, data: {
                    in_Username: userName,
                    in_Password: password
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
                console.log(e);
            });
        }
    };

    onForgotPassword = () => {

    };

    onEmailBlur = () => {
        if (this.refs.txtPassword) {
            this.refs.txtPassword.focus();
        }
    };
    OnChangeEmailText = (userName) => {
        this.setState({userName});
        if (isValidEmail(userName)) {
            this.setState({isValid: true})
        }
    };
    OnBlurEmailText = () => {
        if (isValidEmail(this.state.userName)) {
            this.setState({isValid: true});
        } else {
            this.setState({isValid: false});
        }
    };

    onAboutUs = () => {
        const {navigation} = this.props;
        navigation.navigate('AboutUs');
    };

    onSignUp = () => {
        const {navigation} = this.props;
        navigation.navigate('SignUp');
    };

    render() {
        const {
            container, textTitle, subTitle, inputIcon, inputRightIcon,
            socialIcon, inputLabel, textInput, inputContainer, bottomText,
            redAlert
        } = styles;
        const {userName, password, rememberMe, showPassword, isValid} = this.state;
        return (
            <View style={container}>
                <StatusBar backgroundColor={Constant.color.blue} barStyle="light-content"/>
                <AppNavigator onPressMenu={this.onAboutUs}/>
                <ScrollView scrollEnabled={Constant.isANDROID} showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: Constant.color.black, paddingVertical: hp('5%')}}>
                        <Text style={textTitle}>
                            {'LOGIN'}
                        </Text>
                        <Text style={subTitle}>
                            {'with LUZY account.'}
                        </Text>
                        <View style={{width: Constant.screenWidth * 0.85, alignSelf: 'center', paddingTop: hp('2%')}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={inputLabel}>USERNAME:</Text>
                                {!isValid && <Text style={[inputLabel, {
                                    color: Constant.color.red,
                                    fontFamily: Constant.font.robotoRegular
                                }]}>{'Wrong email address'}</Text>}
                            </View>
                            <View style={[!isValid && redAlert, inputContainer]}>
                                <Image source={{uri: 'login_email_icon'}}
                                       style={inputIcon} resizeMode={'contain'}/>
                                <TextInput placeholder={'Your email address'}
                                           numberOfLines={1}
                                           ref={'txtEmail'}
                                           autoCapitalize="none"
                                           autoCorrect={false}
                                           returnKeyType={'next'}
                                           placeholderTextColor={Constant.color.blue}
                                           style={textInput}
                                           value={userName}
                                           onChangeText={(userName) => this.OnChangeEmailText(userName)}
                                           onSubmitEditing={this.onEmailBlur}
                                           underlineColorAndroid={Constant.color.transparent}
                                           onBlur={this.OnBlurEmailText}
                                />
                                {
                                    !isValid &&
                                    <Image source={{uri: 'login_error_mark_icon'}}
                                           style={inputRightIcon} resizeMode={'contain'}/>
                                }
                                {
                                    isValidEmail(userName) &&
                                    <Image source={{uri: 'login_check_mark_icon'}}
                                           style={inputRightIcon} resizeMode={'contain'}/>
                                }

                            </View>
                            <Text style={inputLabel}>PASSWORD:</Text>
                            <View style={inputContainer}>
                                <Image source={{uri: 'login_password_icon'}}
                                       style={inputIcon} resizeMode={'contain'}/>
                                <TextInput placeholder={'Your password'}
                                           numberOfLines={1}
                                           ref={'txtPassword'}
                                           placeholderTextColor={Constant.color.blue}
                                           style={textInput}
                                           autoCapitalize="none"
                                           autoCorrect={false}
                                           value={password}
                                           onChangeText={(password) => this.setState({password})}
                                           underlineColorAndroid={Constant.color.transparent}
                                           secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={this.onShowPassword}>
                                    <Image
                                        source={{uri: showPassword && 'login_show_password_icon' || 'login_no_show_password_icon'}}
                                        style={inputRightIcon} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: 'row', marginTop: 3,
                                marginBottom: hp('1.5%'), alignItems: 'center', justifyContent: 'space-between'
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={this.onRememberMe}>
                                        <View style={{
                                            ...inputRightIcon, borderRadius: 5, borderColor: Constant.color.blue,
                                            backgroundColor: rememberMe && Constant.color.blue || Constant.color.transparent,
                                            padding: 2, alignItems: 'center', justifyContent: 'center', borderWidth: 2
                                        }}>
                                            {
                                                rememberMe &&
                                                <Image source={{uri: 'login_check_icon'}}
                                                       style={{height: '100%', width: '100%'}} resizeMode={'contain'}/>
                                            }

                                        </View>
                                    </TouchableOpacity>
                                    <Text style={[bottomText, {color: Constant.color.blue}]}>
                                        {'Remember me'}</Text>
                                </View>
                                <Text style={[bottomText, {color: Constant.color.blue}]}>
                                    {'Forgot your password'}</Text>
                            </View>
                            <AppButton
                                containerStyle={{backgroundColor: Constant.color.lightblue}}
                                textStyle={{color: Constant.color.white}}
                                title={'SIGN IN'}
                                onPress={this.onLogin}
                            />
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: Constant.color.textInput,
                        alignItems: 'center',
                        paddingVertical: hp('3%')
                    }}>
                        <Text style={textTitle}>
                            {'LOGIN'}
                        </Text>
                        <Text style={subTitle}>
                            {'with your social media account.'}
                        </Text>
                        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: hp('1.5%')}}>
                            <Image source={{uri: 'login_facebook_icon'}}
                                   style={socialIcon} resizeMode={'contain'}/>
                            <Image source={{uri: 'login_twitter_icon'}}
                                   style={[socialIcon, {marginHorizontal: 20}]} resizeMode={'contain'}/>
                            <Image source={{uri: 'login_instagram_icon'}}
                                   style={socialIcon} resizeMode={'contain'}/>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: Constant.color.blue,
                        flex: 1, paddingVertical: hp('4%')
                    }}>
                        <View style={{...Constant.style.container, flex: 1}}>
                            <Text style={[subTitle, {color: Constant.color.white, marginBottom: hp('1.5%')}]}>
                                {'Don\'t have an account?'}
                            </Text>
                            <AppButton
                                containerStyle={{backgroundColor: Constant.color.white}}
                                textStyle={{color: Constant.color.blue}}
                                title={'SIGN UP'}
                                onPress={this.onSignUp}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue
    },
    textTitle: {
        fontSize: Constant.fontSize.xlarge,
        fontFamily: Constant.font.linateBold,
        color: Constant.color.white,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: Constant.fontSize.mini,
        fontFamily: Constant.font.robotoRegular,
        color: Constant.color.white,
        textAlign: 'center',
        marginTop: -5
    },
    socialIcon: {
        height: hp('6%'),
        width: hp('6%'),
    },
    inputContainer: {
        backgroundColor: Constant.color.textInput,
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        flexDirection: 'row',
        marginTop: 1,
        borderRadius: 10,
        marginBottom: hp('2%'),
        alignItems: 'center',
    },
    textInput: {
        fontSize: Constant.fontSize.mini,
        fontFamily: Constant.font.robotoRegular,
        padding: hp('1%'),
        color: Constant.color.white,
        flex: 1
    },
    inputRightIcon: {
        height: hp('3%'),
        width: hp('3%')
    },
    inputIcon: {
        height: hp('4%'),
        width: hp('4%')
    },
    inputLabel: {
        fontSize: Constant.fontSize.mini,
        color: Constant.color.white,
        fontFamily: Constant.font.linateHeavy
    },
    bottomText: {
        fontSize: Constant.fontSize.mini,
        marginLeft: 5,
        color: Constant.color.lightGray,
        fontFamily: Constant.font.robotoBold
    },
    redAlert: {
        borderColor: Constant.color.red,
        borderWidth: 1
    }
});

export {UserLogin};