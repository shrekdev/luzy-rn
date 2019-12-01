import React, {Component} from 'react';
import {
    SafeAreaView, StyleSheet, Text,
    TouchableOpacity, Keyboard, StatusBar,
    View, TextInput, Image, ScrollView
} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppButton, AppNavigator} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {isValidUserName, isValidEmail} from "../../helper/appHelper";
import {StackActions, NavigationActions} from "react-navigation";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            cPassword: '',
            policy: false,
            newsletter: false,
            showPassword: false,
            showCPassword: false,
            matchPassword: true
        }
    }

    onCheckPolicy = () => {
        this.setState({
            policy: !this.state.policy
        });
    }
    onCheckNewsletter = () => {
        this.setState({
            newsletter: !this.state.newsletter
        });
    }

    onShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    onShowCPassword = () => {
        this.setState({
            showCPassword: !this.state.showCPassword
        })
    };

    //On User login
    onSignUp = () => {
        const {email, password, name, newsletter} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;
        Keyboard.dismiss();
        if (!isValidEmail(email)) {
            alert('Please enter valid Username');
        } else
        if (password.length === 0) {
            alert('Please enter your Password');
        } else {
            handleLocalAction({
                type: localActions.SIGNUP, data: {
                    in_Email: email,
                    in_Password: password,
                    in_name: name,
                    in_ReceiveEmails: newsletter ? "1" : "0"
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


    onSubmitInputText = (key) => {
        if(this.refs && this.refs[key]) {
            this.refs[key].focus();
        }
    };

    onBlurCPassword = () => {
        if (this.state.password !== this.state.cPassword) {
            this.setState({matchPassword: false})
        } else {
            this.setState({matchPassword: true})
        }
    }

    onAboutUs = () => {
        const {navigation} = this.props;
        navigation.navigate('AboutUs');
    };

    onUserLogin = () => {
        const {navigation} = this.props;
        navigation.navigate('UserLogin');
    };

    render() {
        const {container, textTitle, subTitle, inputIcon, inputRightIcon, inputLabel, textInput, inputContainer, bottomText, redAlert} = styles;
        const {name, email, password, cPassword, policy, newsletter, showPassword, showCPassword, matchPassword} = this.state;
        return (
            <View style={container}>
                <StatusBar backgroundColor={Constant.color.blue} barStyle="light-content"/>
                <AppNavigator onPressMenu={this.onAboutUs}/>
                <ScrollView scrollEnabled={Constant.isANDROID} showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: Constant.color.black, paddingVertical: hp('4%')}}>
                        <Text style={textTitle}>
                            {'SIGN UP'}
                        </Text>
                        <Text style={subTitle}>
                            {'to LUZY App'}
                        </Text>
                        <View style={{width: Constant.screenWidth * 0.85, alignSelf: 'center', paddingTop: hp('2%')}}>
                            <Text style={inputLabel}>NAME:</Text>
                            <View style={inputContainer}>
                                <Image source={{uri: 'sign_up_user_icon'}}
                                       style={inputIcon} resizeMode={'contain'}/>
                                <TextInput placeholder={'Your first and last name'}
                                           numberOfLines={1}
                                           ref={'txtName'}
                                           autoCapitalize="none"
                                           autoCorrect={false}
                                           returnKeyType={'next'}
                                           placeholderTextColor={Constant.color.blue}
                                           style={textInput}
                                           value={name}
                                           onChangeText={(name) => this.setState({name})}
                                           onSubmitEditing={() => this.onSubmitInputText('txtEmail')}
                                           underlineColorAndroid={Constant.color.transparent}
                                />
                                {
                                    isValidUserName(name) &&
                                    <Image source={{uri: 'login_check_mark_icon'}}
                                           style={inputRightIcon} resizeMode={'contain'}/>
                                }
                            </View>
                            <Text style={inputLabel}>EMAIL:</Text>
                            <View style={inputContainer}>
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
                                           value={email}
                                           onChangeText={(email) => this.setState({email})}
                                           onSubmitEditing={() => this.onSubmitInputText('txtPassword')}
                                           underlineColorAndroid={Constant.color.transparent}
                                />
                                {
                                    isValidEmail(email) &&
                                    <Image source={{uri: 'login_check_mark_icon'}}
                                           style={inputRightIcon} resizeMode={'contain'}/>
                                }
                            </View>
                            <Text style={inputLabel}>CHOOSE PASSWORD:</Text>
                            <View style={inputContainer}>
                                <Image source={{uri: 'login_password_icon'}}
                                       style={inputIcon} resizeMode={'contain'}/>
                                <TextInput placeholder={'Type your password'}
                                           numberOfLines={1}
                                           ref={'txtPassword'}
                                           placeholderTextColor={Constant.color.blue}
                                           style={textInput}
                                           autoCapitalize="none"
                                           autoCorrect={false}
                                           value={password}
                                           returnKeyType={'next'}
                                           onChangeText={(password) => this.setState({password})}
                                           onSubmitEditing={() => this.onSubmitInputText('txtCPassword')}
                                           underlineColorAndroid={Constant.color.transparent}
                                           secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={this.onShowPassword}>
                                    <Image
                                        source={{uri: showPassword && 'login_show_password_icon' || 'login_no_show_password_icon'}}
                                        style={inputRightIcon} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={inputLabel}>CONFIRM PASSWORD:</Text>
                                {!matchPassword && <Text style={[inputLabel, {
                                    color: Constant.color.red,
                                    fontFamily: Constant.font.robotoRegular
                                }]}>
                                    {'Passwords don\'t match.'}</Text>}
                            </View>
                            <View style={[inputContainer, !matchPassword && redAlert]}>
                                <Image source={{uri: 'sign_up_password_icon'}}
                                       style={inputIcon} resizeMode={'contain'}/>
                                <TextInput placeholder={'Retype your password'}
                                           numberOfLines={1}
                                           ref={'txtCPassword'}
                                           placeholderTextColor={Constant.color.blue}
                                           style={textInput}
                                           autoCapitalize="none"
                                           autoCorrect={false}
                                           value={cPassword}
                                           returnKeyType={'done'}
                                           onChangeText={(cPassword) => this.setState({cPassword})}
                                           onSubmitEditing={this.onSubmitInputText}
                                           underlineColorAndroid={Constant.color.transparent}
                                           secureTextEntry={!showCPassword}
                                           onBlur={this.onBlurCPassword}
                                />
                                {
                                    !matchPassword &&
                                    <Image source={{uri: 'login_error_mark_icon'}}
                                           style={inputRightIcon} resizeMode={'contain'}/>
                                    ||
                                    <TouchableOpacity onPress={this.onShowCPassword}>
                                        <Image
                                            source={{uri: showCPassword && 'login_show_password_icon' || 'login_no_show_password_icon'}}
                                            style={inputRightIcon} resizeMode={'contain'}/>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', marginTop: 3,
                                marginBottom: hp('1.5%')
                            }}>
                                <TouchableOpacity onPress={this.onCheckPolicy}>
                                    <View style={{
                                        ...inputRightIcon, borderRadius: 5, borderColor: Constant.color.blue,
                                        backgroundColor: policy && Constant.color.blue || Constant.color.transparent,
                                        padding: 2, alignItems: 'center', justifyContent: 'center', borderWidth: 2
                                    }}>
                                        {
                                            policy &&
                                            <Image source={{uri: 'login_check_icon'}}
                                                   style={{height: '100%', width: '100%'}} resizeMode={'contain'}/>
                                        }

                                    </View>
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[bottomText, {color: Constant.color.blue}]}>
                                        {'I accept the'}</Text>
                                    <Text style={[bottomText, {
                                        color: Constant.color.skyblue,
                                        fontFamily: Constant.font.robotoBold
                                    }]}>
                                        {'Terms of Use'}</Text>
                                    <Text style={[bottomText, {color: Constant.color.blue}]}>
                                        {'and'}</Text>
                                    <Text style={[bottomText, {
                                        color: Constant.color.skyblue,
                                        fontFamily: Constant.font.robotoBold
                                    }]}>
                                        {'Privacy Policy.'}</Text>
                                </View>
                            </View>


                            <View style={{
                                flexDirection: 'row', alignItems: 'center', marginTop: 3,
                                marginBottom: hp('1.5%')
                            }}>
                                <TouchableOpacity onPress={this.onCheckNewsletter}>
                                    <View style={{
                                        ...inputRightIcon, borderRadius: 5, borderColor: Constant.color.blue,
                                        backgroundColor: newsletter && Constant.color.blue || Constant.color.transparent,
                                        padding: 2, alignItems: 'center', justifyContent: 'center', borderWidth: 2
                                    }}>
                                        {
                                            newsletter &&
                                            <Image source={{uri: 'login_check_icon'}}
                                                   style={{height: '100%', width: '100%'}} resizeMode={'contain'}/>
                                        }

                                    </View>
                                </TouchableOpacity>
                                <Text style={[bottomText, {color: Constant.color.blue}]}>
                                    {'I want to receive newsletters'}</Text>
                            </View>

                            <AppButton
                                containerStyle={{backgroundColor: Constant.color.lightblue}}
                                textStyle={{color: Constant.color.white}}
                                title={'CREATE ACCOUNT'}
                                onPress={this.onSignUp}
                            />
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: Constant.color.blue,
                        flex: 1, paddingVertical: hp('4%')
                    }}>
                        <View style={{...Constant.style.container, flex: 1}}>
                            <Text style={[subTitle, {color: Constant.color.white, marginBottom: hp('1.5%')}]}>
                                {'Already have an account?'}
                            </Text>
                            <AppButton
                                containerStyle={{backgroundColor: Constant.color.white}}
                                textStyle={{color: Constant.color.blue}}
                                title={'SIGN IN'}
                                onPress={this.onUserLogin}
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
        color: Constant.color.white, flex: 1
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
        fontFamily: Constant.font.robotoRegular
    },
    redAlert: {
        borderColor: Constant.color.red,
        borderWidth: 1
    }
});

export {SignUp};