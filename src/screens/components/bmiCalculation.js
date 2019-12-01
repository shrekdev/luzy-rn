import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView
} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppButton, BottomTab} from "../common";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "../../helper/responsiveScreen";
import {tabBarWithBack} from "../../helper/appConstant";

const resultDataArray = [{
    title: 'Malnutrition',
    color: Constant.color.lightblue,
    quantity: '<20 BMI'
}, {
    title: 'Normal',
    color: Constant.color.green,
    quantity: '20 - 24.9 BMI'
}, {
    title: 'OverWeight',
    color: Constant.color.yellow,
    quantity: '25 - 29.9 BMI'
}, {
    title: 'Obesity',
    color: Constant.color.orange,
    quantity: '30 - 40 BMI'
}, {
    title: 'Sever Obasity',
    color: Constant.color.red,
    quantity: '>40 BMI'
}];

class BMICalculation extends Component {

    constructor(props) {
        super(props);
        const {weight, height, gender, age} = props.navigation.state.params;
        this.state = {
            weight,
            height,
            gender,
            age,
            isButtonClicked: false
        };
    }

    renderSubCard = (data, index) => {
        const {calculationText, resultMenuView, cardMainView, cardSubView, resultCardView, textStyle} = styles;
        const {title, color, quantity} = data;
        return (
            <View style={cardMainView} key={index}>
                <View style={cardSubView}>
                    <View style={[resultCardView, {backgroundColor: color}]}>
                        <Text style={{
                            ...textStyle,
                            fontSize: Constant.fontSize.mini,
                            fontFamily: Constant.font.robotoRegular
                        }}>
                            {title}
                        </Text>
                    </View>
                    <View style={[resultMenuView, {alignItems: 'flex-end', paddingRight: wp('4%')}]}>
                        <Text style={calculationText}>{quantity}</Text>
                    </View>
                </View>
            </View>
        )
    }

    onSubmit = () => {
        this.props.navigation.navigate('BMIWeightMonitoring');
    };

    render() {
        const {safeArea, navigation} = this.props;
        const {
            container, BMICalculatorImage, header, subText, calculationText, menuView, resultMenuView, horizontalSeparator,
            verticalSeparator, menuIcon, cardMainView, cardSubView, resultCardView, textStyle, resultViewStyle,
            horizontalMenuView, btnStyle
        } = styles;
        const {weight, height, gender, age} = this.state;

        const heightM = height / 100;
        let bmi = (weight / (heightM * heightM));
        let bmiImage = '', bmiColor = Constant.color.green;

        if(bmi < 18.5) {
            bmiImage = 'bmi_scale_malnutrition';
            bmiColor = Constant.color.lightblue
        } else if (bmi < 24.9) {
            bmiImage = 'bmi_scale_normal';
            bmiColor = Constant.color.green
        } else if (bmi < 29.9) {
            bmiImage = 'bmi_scale_overweight';
            bmiColor = Constant.color.yellow;
        } else if (bmi < 40) {
            bmiImage = 'bmi_scale_obesity';
            bmiColor = Constant.color.orange; 
        } else {
            bmiImage = 'bmi_scale_severe_obesity';
            bmiColor = Constant.color.red
        }
        // bmiImage = bmi < 20 ? 'bmi_scale_malnutrition' : bmi < 24.9 ? 'bmi_scale_normal' : bmi < 29.9 ? 'bmi_scale_overweight' : bmi < 40 ? 'bmi_scale_obesity' : 'bmi_scale_severe_obesity'

        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 20}} showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: Constant.color.white, paddingTop: hp('3%')}}>
                        <Image source={{uri: bmiImage}}
                               style={BMICalculatorImage}
                               resizeMode={'contain'}
                        />
                    </View>
                    <View style={{paddingTop: hp('3%'), flex: 1, alignItems: 'center'}}>
                        <Text style={header}>{'BMI CALCULATOR'}</Text>
                        <Text
                            style={subText}>{'Here are the results for you , accordingly with the informations you provided.'}</Text>
                        <View style={[cardMainView, resultViewStyle]}>
                            <View style={cardSubView}>
                                <View style={[resultCardView, {backgroundColor: bmiColor}]}>
                                    <Text
                                        style={{
                                            ...textStyle,
                                            fontSize: Constant.fontSize.xsmall,
                                            marginBottom: hp('1%')
                                        }}>
                                        {'Your result'}
                                    </Text>
                                    <Text style={{
                                        ...textStyle,
                                        fontSize: Constant.fontSize.xxxlarge,
                                        fontFamily: Constant.font.linateBold
                                    }}>
                                        {parseFloat(bmi).toFixed(2)}
                                    </Text>
                                    <Text style={{...textStyle, fontSize: Constant.fontSize.small,}}>
                                        {'BMI'}
                                    </Text>
                                </View>
                                <View style={resultMenuView}>
                                    <View style={horizontalMenuView}>
                                        <View style={menuView}>
                                            <Image source={{uri: 'gender_small_icon'}}
                                                   style={menuIcon}
                                                   resizeMode={'contain'}
                                            />
                                            <Text style={calculationText}>{gender}</Text>
                                        </View>
                                        <View style={verticalSeparator}/>
                                        <View style={menuView}>
                                            <Image source={{uri: 'age_small_icon'}}
                                                   style={menuIcon}
                                                   resizeMode={'contain'}
                                            />
                                            <Text style={calculationText}>{age}</Text>
                                        </View>
                                    </View>
                                    <View style={horizontalSeparator}/>
                                    <View style={horizontalMenuView}>
                                        <View style={menuView}>
                                            <Image source={{uri: 'height_small_icon'}}
                                                   style={menuIcon}
                                                   resizeMode={'contain'}
                                            />
                                            <Text style={calculationText}>{height + ' cm'}</Text>
                                        </View>
                                        <View style={verticalSeparator}/>
                                        <View style={menuView}>
                                            <Image source={{uri: 'weight_small_icon'}}
                                                   style={menuIcon}
                                                   resizeMode={'contain'}
                                            />
                                            <Text style={calculationText}>{weight + ' kg'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {
                            resultDataArray.map((data, index) => {
                                return this.renderSubCard(data, index)
                            })
                        }
                    </View>
                    <AppButton
                        containerStyle={btnStyle}
                        title={'MONITORING WEIGHT'}
                        onPress={this.onSubmit}
                    />
                </ScrollView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
    },
    BMICalculatorImage: {
        height: hp('25%'),
        width: wp('100%'),
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
        fontFamily: Constant.font.robotoRegular,
        paddingHorizontal: wp('15%')
    },
    textStyle: {
        textAlign: 'center',
        color: Constant.color.white,
        fontFamily: Constant.font.robotoBold
    },
    calculationText: {
        textAlign: 'center',
        fontSize: Constant.fontSize.mini,
        color: Constant.color.black,
        fontFamily: Constant.font.robotoRegular,
    },
    resultMenuView: {
        backgroundColor: Constant.color.white,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp('1%'),
    },
    menuView: {
        margin: wp('2%'),
        alignItems: 'center',
        flex: 1
    },
    horizontalMenuView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuIcon: {
        height: hp('3%'),
        width: wp('8%'),
        marginBottom: hp('0.5%')
    },
    verticalSeparator: {
        backgroundColor: Constant.color.lightSky,
        width: wp('0.6%'),
        height: '80%'
    },
    horizontalSeparator: {
        backgroundColor: Constant.color.lightSky,
        width: '80%',
        height: wp('0.6%')
    },
    cardMainView: {
        ...Constant.shadowStyle,
        borderRadius: 15,
        height: hp('4%'),
        width: wp('80%'),
        marginTop: hp('1%')
    },
    cardSubView: {
        borderRadius: 15,
        overflow: 'hidden',
        flexDirection: 'row',
        flex: 1
    },
    resultCardView: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultViewStyle: {
        marginTop: hp('3%'),
        height: hp('18%'),
        width: wp('80%'),
        marginBottom: hp('1%')
    },
    btnStyle: {
        backgroundColor: Constant.color.lightblue,
        marginTop: hp('3%'),
        width: wp('80%'),
    }
});

export {BMICalculation};
