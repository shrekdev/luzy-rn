import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, PanResponder, Modal, TouchableOpacity, Platform } from 'react-native';
import { AppButton, AppNavigator, BottomTab } from "../common";
import { style } from "../common/style";
import Constant, { normalize } from '../../helper/themeHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/responsiveScreen';
import { HideNavigationBar } from 'react-native-navigation-bar-color';
import BMICalculation from "../containers/bmiCalculation"
import {getAsyncStorage} from "../../helper/appHelper";
import { GenderCard, AgeCard, HeightCard, WeightCard } from "./bmiCalculatorComponent"
import { tabBarWithBack } from "../../helper/appConstant";

let string = '';

class BMICalculator extends Component {
    cards = [{
        title: 'GENDER',
        subTitle: 'Your gender',
        imageActive: 'gender_selected',
        imageInactive: 'gender_default',
    }, {
        title: 'AGE',
        subTitle: 'Your age',
        imageActive: 'age_selected',
        imageInactive: 'age_default'
    }, {
        title: 'Height',
        subTitle: 'Your height',
        imageActive: 'height_selected',
        imageInactive: 'height_default'
    }, {
        title: 'Weight',
        subTitle: 'Your weight',
        imageActive: 'weight_selected',
        imageInactive: 'weight_default'
    }];

    constructor(props) {
        super(props);
        this.state = {
            radioValue: 'Female',
            gender: '',
            sliderValue: '',
            sliderIndex: 1,
            age: '',
            ageIndex: 1,
            weight: '',
            weightIndex: 1,
            height: '',
            heightIndex: 1,
            cardType: '',
            isGenderSelected: false,
            isAgeSelected: false,
            isHeightSelected: false,
            isWeightSelected: false,
            modalVisiblity: false,
            weightDataSource: [],
            heightDataSource: [],
            ageDataSource: [],
            btnColor: Constant.color.lightGray,
            token:''
        };

        this.onCardClick = this.onCardClick.bind(this);
        this.onGenderClick = this.onGenderClick.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.changeButtonState = this.changeButtonState.bind(this);
        this.onOkClick = this.onOkClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
    }

    componentWillMount() {

        let weightArray = [];
        let heightArray = [];
        let ageArray = [];

        for (i = 20; i <= 200; i++) {
            weightArray.push(i);
        }

        for (i = 150; i <= 180; i++) {
            heightArray.push(i);
        }

        for (i = 15; i <= 70; i++) {
            ageArray.push(i);
        }

        this.setState({
            weightDataSource: weightArray,
            heightDataSource: heightArray,
            ageDataSource:ageArray
        })

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 2;  // can adjust this num
            },
            onPanResponderGrant: (e, gestureState) => {
                this.fScroll.setNativeProps({ scrollEnabled: false })
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

    onCardClick(index) {
        if (index === 0) {
            if (this.state.gender === '') {
                this.setState({ cardType: 'YOUR GENDER', radioValue: 'Female', modalVisiblity: true })
            } else {
                this.setState({ cardType: 'YOUR GENDER', radioValue: this.state.gender, modalVisiblity: true })
            }
        } else if (index === 1) {
            this.setState({
                cardType: 'YOUR AGE',
                sliderValue: this.state.age,
                sliderIndex: this.state.ageIndex,
                modalVisiblity: true
            })
        } else if (index === 2) {
            this.setState({
                cardType: 'YOUR HEIGHT',
                sliderValue: this.state.height,
                sliderIndex: this.state.heightIndex,
                modalVisiblity: true
            })
        } else if (index === 3) {
            this.setState({
                cardType: 'YOUR WEIGHT',
                sliderValue: this.state.weight,
                sliderIndex: this.state.weightIndex,
                modalVisiblity: true
            })
        }
    }

    onGenderClick = async (gender) => {
        this.setState({ radioValue: gender })
    }

    onValueChange = async (sliderValue, sliderIndex) => {
        this.setState({ sliderValue: sliderValue, sliderIndex: sliderIndex })
    }

    changeButtonState = () => {
        const { isGenderSelected, isAgeSelected, isHeightSelected, isWeightSelected } = this.state;
        let btnColor = (isGenderSelected && isAgeSelected && isHeightSelected && isWeightSelected) && Constant.color.lightblue || Constant.color.lightGray;
        this.setState({ btnColor });
    };

    onCloseClick = () => {
        this.setState({ modalVisiblity: false })
        this.fScroll.setNativeProps({ scrollEnabled: true })
    }

    onOkClick = () => {
        this.setState({ modalVisiblity: false })
        this.fScroll.setNativeProps({ scrollEnabled: true })
        if (this.state.cardType === 'YOUR GENDER') {
            this.cards[0].subTitle = this.state.radioValue
            this.setState({ isGenderSelected: true, gender: this.state.radioValue }, () => {
                this.changeButtonState();
            });
        } else if (this.state.cardType === 'YOUR AGE') {
            if (this.state.sliderValue === '') {
                this.cards[1].subTitle = this.state.ageDataSource[1];
                this.setState({
                    isAgeSelected: true,
                    age: this.state.ageDataSource[1],
                    ageIndex: this.state.sliderIndex
                }, () => {
                    this.changeButtonState();
                });
            } else {
                this.cards[1].subTitle = this.state.sliderValue
                this.setState({
                    isAgeSelected: true,
                    age: this.state.sliderValue,
                    ageIndex: this.state.sliderIndex
                }, () => {
                    this.changeButtonState();
                });
            }
        } else if (this.state.cardType === 'YOUR HEIGHT') {
            if (this.state.sliderValue === '') {
                string = this.state.heightDataSource[1] + '';
                string = string.split(/(?=.{2}$)/).join(',');
                this.cards[2].subTitle = string + ' cm';
                this.setState({
                    isHeightSelected: true,
                    height: this.state.heightDataSource[1],
                    heightIndex: this.state.sliderIndex
                }, () => {
                    this.changeButtonState();
                });
            } else {
                string = this.state.sliderValue + '';
                string = string.split(/(?=.{2}$)/).join(',');
                this.cards[2].subTitle = string + ' cm';
                this.setState({
                    isHeightSelected: true,
                    height: this.state.sliderValue,
                    heightIndex: this.state.sliderIndex
                }, () => {
                    this.changeButtonState();
                });
            }
        } else if (this.state.cardType === 'YOUR WEIGHT') {
            if (this.state.sliderValue === '') {
                this.cards[3].subTitle = this.state.weightDataSource[1] + ' kg';
                this.setState({
                    isWeightSelected: true,
                    weight: this.state.weightDataSource[1],
                    weightIndex: this.state.sliderIndex
                }, () => {
                    this.changeButtonState();
                });
            } else {
                this.cards[3].subTitle = this.state.sliderValue + ' kg'
                this.setState({
                    isWeightSelected: true,
                    weight: this.state.sliderValue,
                    weightIndex: this.state.sliderIndex
                }, () => {
                    this.changeButtonState();
                });
            }
        }
    };

    renderCard = (data, index) => {
        const { cardView, cardText, cardSubText } = styles;
        return (
            <TouchableOpacity key={index}
                style={[cardView, { backgroundColor: index === 0 && this.state.isGenderSelected === true && Constant.color.navyblue || (index === 1 && this.state.isAgeSelected === true && Constant.color.navyblue || (index === 2 && this.state.isHeightSelected === true && Constant.color.navyblue || (index === 3 && this.state.isWeightSelected === true && Constant.color.navyblue || Constant.color.white))) }]}
                onPress={() => this.onCardClick(index)}>
                <Image
                    source={{ uri: index === 0 && this.state.isGenderSelected === true && data.imageActive || (index === 1 && this.state.isAgeSelected === true && data.imageActive || (index === 2 && this.state.isHeightSelected === true && data.imageActive || (index === 3 && this.state.isWeightSelected === true && data.imageActive || data.imageInactive))) }}
                    style={{ height: hp('10%'), width: wp('20%') }} resizeMode='contain' />
                <Text style={[cardText, { color: Constant.color.darkBlue }]}>{data.title}</Text>
                <Text
                    style={[cardSubText, { color: index === 0 && this.state.isGenderSelected === true && Constant.color.white || (index === 1 && this.state.isAgeSelected === true && Constant.color.white || (index === 2 && this.state.isHeightSelected === true && Constant.color.white || (index === 3 && this.state.isWeightSelected === true && Constant.color.white || Constant.color.lightGray))) }]}>{data.subTitle}</Text>
            </TouchableOpacity>
        )
    };

    onCalculateBMI = () => {

        const {token, gender, age, height, weight} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;
        
        handleLocalAction({
            type: localActions.REGISTER_BMI, data: {
                in_Token: token,
                in_Gender:gender,
                in_Age:age,
                in_Height:height,
                in_Weight:weight,
                in_BMI:'520'
            }
        }).then(res => {
            if (res) {
                if (res.status === '200') {
                    this.props.navigation.navigate('BMICalculation');
                } else {
                    alert(res.message);
                }
            }
        }).catch(e => {
            console.log(e);
        });
            
  
    }

    render() {
        Constant.isANDROID && HideNavigationBar();
        const { container, header, subText, cardContainer, modalView, detailView, wheelView, wheelSeprator, wheelText } = styles;
        const { safeArea, navigation } = this.props;

        return (
            <View style={{ flex: 1, paddingBottom: hp('10%') + safeArea.bottom }}>
                <ScrollView ref={(e) => {
                    this.fScroll = e
                }}
                    showsVerticalScrollIndicator={false}
                    style={container}
                    contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={{ paddingBottom: hp('2%') }}>
                        <Image style={{ height: hp('39%'), width: wp('100%') }} resizeMode={'stretch'}
                            source={{ uri: 'bmi_calculator_illustration' }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={header}>{'BMI CALCULATOR'}</Text>
                        <Text
                            style={subText}>{'Check your body-mass index\nand keep track of your weight evolution.'}</Text>
                    </View>

                    <View style={{ paddingHorizontal: wp('9%') }}>
                        <View style={cardContainer}>
                            {
                                this.cards.map((data, index) => this.renderCard(data, index))
                            }
                        </View>
                        <AppButton
                            disabled={this.state.btnColor !== Constant.color.lightblue}
                            containerStyle={{
                                backgroundColor: this.state.btnColor,
                                marginTop: hp('2%'),
                                marginBottom: hp('3%')
                            }}
                            title={'CALCULATE YOUR BMI'}
                            onPress={this.onCalculateBMI}
                        />
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisiblity}
                    onShow={() => {
                        Constant.isANDROID && HideNavigationBar()
                    }}
                    onDismiss={() => {
                        Constant.isANDROID && HideNavigationBar()
                    }}>
                    <View style={{ ...style.modalView }}>
                        {
                            this.state.cardType === 'YOUR GENDER' &&
                            <GenderCard
                                cardImage={'gender_big'}
                                cardText={'YOUR GENDER'}
                                titleMale={'Male'}
                                titleFemale={'Female'}
                                gender={this.state.radioValue}
                                onGenderClick={(gender) => this.onGenderClick(gender)}
                                onOkClick={this.onOkClick}
                                onCloseClick={this.onCloseClick}
                            />
                            || (this.state.cardType === 'YOUR AGE' &&
                                <AgeCard
                                    cardImage={'age_big'}
                                    cardText={'YOUR AGE'}
                                    selectedIndex={this.state.ageIndex}
                                    dataSource={this.state.ageDataSource}
                                    onValueChange={(age, ageIndex) => this.onValueChange(age, ageIndex)}
                                    panResponder={this._panResponder.panHandlers}
                                    onOkClick={this.onOkClick}
                                    onCloseClick={this.onCloseClick}
                                />
                                || (this.state.cardType === 'YOUR HEIGHT' &&
                                    <HeightCard
                                        cardImage={'height_big'}
                                        cardText={'YOUR HEIGHT'}
                                        selectedIndex={this.state.heightIndex}
                                        dataSource={this.state.heightDataSource}
                                        onValueChange={(height, heightIndex) => this.onValueChange(height, heightIndex)}
                                        panResponder={this._panResponder.panHandlers}
                                        onOkClick={this.onOkClick}
                                        onCloseClick={this.onCloseClick}
                                    />
                                    ||
                                    <WeightCard
                                        cardImage={'weight_big'}
                                        cardText={'YOUR WEIGHT'}
                                        selectedIndex={this.state.weightIndex}
                                        dataSource={this.state.weightDataSource}
                                        onValueChange={(weight, weightIndex) => this.onValueChange(weight, weightIndex)}
                                        panResponder={this._panResponder.panHandlers}
                                        onOkClick={this.onOkClick}
                                        onCloseClick={this.onCloseClick}
                                    />
                                ))
                        }
                    </View>
                </Modal>
                <BottomTab tabData={tabBarWithBack} navigation={navigation} />
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
    cardView: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
        // marginVertical: hp('0.5%'),
        shadowColor: Constant.color.lightGray,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        elevation: 2,
        width: wp('38%'),
        marginVertical: hp('1.3%')
    },
    cardText: {
        flex: 0.9,
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.mini,
        marginTop: hp('1%'),
    },
    cardSubText: {
        flex: 0.9,
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.small,
    },
    cardContainer: {
        width: wp('85%'),
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: hp('2%')
    },
});

export { BMICalculator };


