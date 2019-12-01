import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity, ScrollView, Animated} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppNavigator, AppButton, BottomTab} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {Popup} from './healthCalculatorComponents/popup'
import {tabBarWithBack} from "../../helper/appConstant";

class HealthCalculator extends Component {
    constructor (props) {
        super(props);

        this.state = {
            questions: [
                {question: 'Are you obese or overweight?', answer: undefined},
                {question: 'Do you have swelling in your hand and feet often?', answer: undefined},
                {question: 'Do you exercise?', answer: undefined},
                {question: 'Do you have a balanced diet?', answer: undefined},
                {question: 'Do you have dark spots in armpits, groin or neck?', answer: undefined}
            ],
            isSuccessPopup: false,
            isFailurePopup: false,
        };
        this.fadeAnim = new Animated.Value(0);
    }

    onBack = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    onClick = (index, ans) => {
        const {questions} = this.state;
        questions[index] = {...questions[index], answer: ans};
        this.setState({questions});
    };

    renderQuestionCard = (data, index) => {
        const {buttonContainer, buttonText, cardIndex, questionStyle} = styles;
        const {questions} = this.state;

        return (
            <View key={index}>
                <View style={{flexDirection: 'row', paddingVertical: hp('2%')}}>
                    <Text style={cardIndex}>{((index + 1) < 10) ? ('0' + (index + 1)) : (index + 1)}.</Text>
                    <Text style={questionStyle}>{data.question}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <AppButton
                        containerStyle={{...buttonContainer, backgroundColor: questions[index]['answer'] !== undefined && questions[index]['answer'] ? Constant.color.blue : Constant.color.lightGray}}
                        textStyle={buttonText}
                        title={'YES'}
                        onPress={() => this.onClick(index, true)}
                    />
                    <AppButton
                        containerStyle={{...buttonContainer, backgroundColor: questions[index]['answer'] !== undefined && !questions[index]['answer'] ? Constant.color.blue : Constant.color.lightGray}}
                        textStyle={buttonText}
                        title={'NO'}
                        onPress={() => this.onClick(index, false)}
                    />
                </View>
            </View>
        )
    };

    showPopup = (show, hide) => {
        this.setState({
            [show]: true,
            [hide]: false,
        },()=>{
            Animated.timing(
                this.fadeAnim,
                {
                    toValue: 1,
                    duration: 100,
                    delay:10
                }
            ).start();
        });
    };

    hidePopup = () => {
        Animated.timing(
            this.fadeAnim,
            {
                toValue: 0,
                duration: 100,
                delay:10
            }
        ).start(()=>{
            this.setState({
                isFailurePopup: false,
                isSuccessPopup: false
            });
        })
    };

    onSubmit = (fail) => {
        if (fail) {
            this.showPopup('isFailurePopup', 'isSuccessPopup')
        } else {
            this.showPopup('isSuccessPopup', 'isFailurePopup');
        }
    };

    renderSubmit = () => {
        const {buttonText, submitText} = styles;
        const {questions} = this.state;
        let cnt = 0, fail = 0;

        questions.map((data, index) => {
            if (data.answer !== undefined) {
                cnt += 1;
                if (!data.answer) fail += 1
            }
        });

        return(
            <View style={{marginVertical:hp('1%')}}>
                <Text style={submitText}>Submit your answers and find your result.</Text>
                <AppButton
                    containerStyle={{backgroundColor: (cnt === (questions.length)) ? Constant.color.lightblue : Constant.color.lightGray}}
                    textStyle={buttonText}
                    title={'SUBMIT'}
                    onPress={() => this.onSubmit(fail >= 3)}
                    disabled={!(cnt === (questions.length))}
                />
             </View>
        )
    };

    buttonOnClick = () => {
        const {isSuccessPopup, isFailurePopup} = this.state;

        isSuccessPopup && this.props.navigation.navigate('Home');
        isFailurePopup && this.props.navigation.navigate('HomeTabBar',{currentTab: 0, currentScreen: 6, from: 'HealthCalculator'});
        this.hidePopup();
    };

    render () {
        const {container, scrollContainer, topContainer, header, subText, imageStyle} = styles;
        const {safeArea, navigation} = this.props;
        const {questions, isSuccessPopup, isFailurePopup} = this.state;
        //currentTab: 0, currentScreen: 6, from: 'HealthCalculator'
        return (
            <View style={{...container}}>
                <ScrollView style={scrollContainer} contentContainerStyle={{paddingBottom: hp('15%')}} showsVerticalScrollIndicator={false}>
                    <View style={topContainer}>
                        <Text style={header}>{`HEALTH\nCALCULATOR`}</Text>
                        <Text style={subText}>{`Take the quiz and find out if you are\nat risk with your health.`}</Text>
                        <Image source={{uri: 'health_calculator_img'}} style={imageStyle} resizeMode={'contain'}/>
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                        {questions.map((data, index) => this.renderQuestionCard(data, index))}
                        {this.renderSubmit()}
                    </View>
                </ScrollView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation} />
                {isSuccessPopup &&
                <Animated.View style={{...styles.innerContainer, paddingBottom: safeArea.bottom, opacity: this.fadeAnim, paddingTop: hp('20%')}}>
                    <Popup
                        image={'health_is_good'}
                        title={`YOUR HEALTH\nIS GOOD`}
                        normalSubTitle={`We recommend you to `}
                        boldSubTitle={`visit \n and enjoy the rest of our app.`}
                        buttonTitle={'GO TO HOME SCREEN'}
                        buttonClick={() => this.buttonOnClick()}/>
                </Animated.View>
                }
                {isFailurePopup &&
                <Animated.View style={{...styles.innerContainer, paddingBottom: safeArea.bottom,
                    opacity: this.fadeAnim, paddingTop: hp('13%')}}>
                    <Popup
                        image={'login_error_mark_icon'}
                        title={`YOUR HEALTH\nIS AT RISK`}
                        normalSubTitle={`We recommend you to `}
                        boldSubTitle={`make an appointment to one of our doctors.`}
                        buttonTitle={'MAKE AN APPOINTMENT'}
                        isShowBottomText buttonClick={() => this.buttonOnClick()}
                        bottomTextClick={() => this.props.navigation.navigate('Home')}/>
                </Animated.View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Constant.color.blue,
    },
    buttonContainer: {
        flex: 0.45,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp('2%'),
        borderRadius: 10
    },
    buttonText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.medium,
        color: Constant.color.white
    },
    submitText: {
        alignSelf: 'center',
        marginVertical: hp('2%')
    },
    scrollContainer: {
        backgroundColor: '#cce0f5',
        flex: 1
    },
    topContainer: {
        backgroundColor: Constant.color.blue,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: hp('2%')
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xxxlarge,
        color: Constant.color.white,
        textAlign: 'center'
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.small,
        color: Constant.color.white,
        textAlign: 'center'
    },
    imageStyle: {
        height: hp('30%'),
        width: wp('80%'),
        shadowOpacity: 0.7,
        shadowOffset: {width: 3, height: 2},
        shadowColor: Constant.color.white
    },
    cardIndex: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.medium,
        marginRight: 5
    },
    questionStyle: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.medium,
        width: wp('80%')
    },
    innerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: Constant.color.darkBlue
    }
});

export {HealthCalculator}