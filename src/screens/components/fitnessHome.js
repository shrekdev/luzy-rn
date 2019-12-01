import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {tabBarAfterLogin} from "../../helper/appConstant";
import {AppButton, BottomTab, VideoCard} from "../common";
import { style } from "../common/style";
import { TypeOfExerciseCard, BodyPartsCard, DifficultyCard, AgeRangeCard } from "./fitnessComponent"

import {ExerciseCard} from '../../helper/appConstant'

const FitnessCard = [{
    title: 'Type of exercise',
    imageActive: 'type_of_exercise_active_icon',
    imageInactive: 'type_of_exercise_inactive_icon'
}, {
    title: 'Body parts',
    imageActive: 'body_parts_active_icon',
    imageInactive: 'body_parts_inactive_icon'
}, {
    title: 'Difficulty',
    imageActive: 'difficulty_active_icon',
    imageInactive: 'difficulty_inactive_icon'
}, {
    title: 'Age Range',
    imageActive: 'age_range_active_icon',
    imageInactive: 'age_range_inactive_icon'
}];


class FitnessHome extends Component {

    typeOfExerciseArrayTemp = [];
    bodyPartsArrayTemp = [];
    difficultyArrayTemp = [];
    ageRangeArrayTemp = [];

    constructor(props) {
        super(props);
        this.state = {
            filterType: '',
            modalVisiblity: false,
            isTypeofExerciseSelected: false,
            isBodyPartsSelected: false,
            isDifficultySelected: false,
            isAgeRangeSelected: false,
            typeOfExerciseArray: [],
            bodyPartsArray: [],
            difficultyArray: [],
            ageRangeArray: []
        }

        this.onFilterClick = this.onFilterClick.bind(this);
        this.onExerciseSelect = this.onExerciseSelect.bind(this);
        this.onBodyPartsSelect = this.onBodyPartsSelect.bind(this);
        this.onBeginnerCheck = this.onBeginnerCheck.bind(this);
        this.onIntermediateCheck = this.onIntermediateCheck.bind(this);
        this.onAdvancedCheck = this.onAdvancedCheck.bind(this);
        this.onAgeRangeSelect = this.onAgeRangeSelect.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
    }

    onFilterClick(index, data) {
        if (index === 0) {
            this.typeOfExerciseArrayTemp = [];
            this.typeOfExerciseArrayTemp = this.state.typeOfExerciseArray.slice(0)
            this.setState({ filterType: data, modalVisiblity: true })
        } else if (index === 1) {
            this.bodyPartsArrayTemp = [];
            this.bodyPartsArrayTemp = this.state.bodyPartsArray.slice(0)
            this.setState({ filterType: data, modalVisiblity: true })
        } else if (index === 2) {
            this.difficultyArrayTemp = [];
            this.difficultyArrayTemp = this.state.difficultyArray.slice(0)
            this.setState({ filterType: data, modalVisiblity: true })
        } else {
            this.ageRangeArrayTemp = [];
            this.ageRangeArrayTemp = this.state.ageRangeArray.slice(0)
            this.setState({ filterType: data, modalVisiblity: true })
        }
    }

    onExerciseSelect = (data, index) => {
        if (this.typeOfExerciseArrayTemp.includes(data)) {
            let position = this.typeOfExerciseArrayTemp.indexOf(data)
            this.typeOfExerciseArrayTemp.splice(position, 1)
        } else {
            this.typeOfExerciseArrayTemp.push(data)
        }
        this.forceUpdate()
    }

    onBodyPartsSelect = (data, index) => {
        if (this.bodyPartsArrayTemp.includes(data)) {
            let position = this.bodyPartsArrayTemp.indexOf(data)
            this.bodyPartsArrayTemp.splice(position, 1)
        } else {
            this.bodyPartsArrayTemp.push(data)
        }
        this.forceUpdate()
    }

    onBeginnerCheck = () => {
        if (this.difficultyArrayTemp.includes('Beginner')) {
            let position = this.difficultyArrayTemp.indexOf('Beginner')
            this.difficultyArrayTemp.splice(position, 1)
        } else {
            this.difficultyArrayTemp.push('Beginner')
        }
        this.forceUpdate()
    };

    onIntermediateCheck = () => {
        if (this.difficultyArrayTemp.includes('Intermediate')) {
            let position = this.difficultyArrayTemp.indexOf('Intermediate')
            this.difficultyArrayTemp.splice(position, 1)
        } else {
            this.difficultyArrayTemp.push('Intermediate')
        }
        this.forceUpdate()
    };

    onAdvancedCheck = () => {
        if (this.difficultyArrayTemp.includes('Advanced')) {
            let position = this.difficultyArrayTemp.indexOf('Advanced')
            this.difficultyArrayTemp.splice(position, 1)
        } else {
            this.difficultyArrayTemp.push('Advanced')
        }
        this.forceUpdate()
    };

    onAgeRangeSelect = (data, index) => {
        if (this.ageRangeArrayTemp.includes(data)) {
            let position = this.ageRangeArrayTemp.indexOf(data)
            this.ageRangeArrayTemp.splice(position, 1)
        } else {
            this.ageRangeArrayTemp.push(data)
        }
        this.forceUpdate()
    }

    onCloseClick = () => {
        this.setState({ modalVisiblity: false })
    }

    onClearClick = () => {
        if (this.state.filterType === FitnessCard[0].title) {
            this.typeOfExerciseArrayTemp = [];
            this.forceUpdate();
        } else if (this.state.filterType === FitnessCard[1].title) {
            this.bodyPartsArrayTemp = [];
            this.forceUpdate();
        } else if (this.state.filterType === FitnessCard[2].title) {
            this.difficultyArrayTemp = [];
            this.forceUpdate();
        } else {
            this.ageRangeArrayTemp = [];
            this.forceUpdate();
        }
    }

    onOkClick = () => {
        this.setState({ modalVisiblity: false })
        if (this.state.filterType === FitnessCard[0].title) {
            this.setState({
                typeOfExerciseArray: this.typeOfExerciseArrayTemp
            }, () => {
                this.typeOfExerciseArrayTemp = [];
                if (this.state.typeOfExerciseArray.length > 0) {
                    this.setState({ isTypeofExerciseSelected: true })
                } else {
                    this.setState({ isTypeofExerciseSelected: false })
                }
            });
        } else if (this.state.filterType === FitnessCard[1].title) {
            this.setState({
                bodyPartsArray: this.bodyPartsArrayTemp
            }, () => {
                this.bodyPartsArrayTemp = [];
                if (this.state.bodyPartsArray.length > 0) {
                    this.setState({ isBodyPartsSelected: true })
                } else {
                    this.setState({ isBodyPartsSelected: false })
                }
            });
        } else if (this.state.filterType === FitnessCard[2].title) {
            this.setState({
                difficultyArray: this.difficultyArrayTemp
            }, () => {
                this.difficultyArrayTemp = [];
                if (this.state.difficultyArray.length > 0) {
                    this.setState({ isDifficultySelected: true })
                } else {
                    this.setState({ isDifficultySelected: false })
                }
            });
        } else {
            this.setState({
                ageRangeArray: this.ageRangeArrayTemp
            }, () => {
                this.ageRangeArrayTemp = [];
                if (this.state.ageRangeArray.length > 0) {
                    this.setState({ isAgeRangeSelected: true })
                } else {
                    this.setState({ isAgeRangeSelected: false })
                }
            });
        }
    };

    renderFitnessCard = (data, index) => {
        const { cardView, cardTitle } = styles;
        const { isTypeofExerciseSelected, isBodyPartsSelected, isDifficultySelected, isAgeRangeSelected } = this.state;
        return (
            <TouchableOpacity key={index}
                style={[cardView, { backgroundColor: index === 0 && isTypeofExerciseSelected === true && Constant.color.navyblue || (index === 1 && isBodyPartsSelected === true && Constant.color.navyblue || (index === 2 && isDifficultySelected === true && Constant.color.navyblue || (index === 3 && isAgeRangeSelected === true && Constant.color.navyblue || Constant.color.white))) }]}
                onPress={() => this.onFilterClick(index, data.title)}>
                <Image
                    source={{ uri: index === 0 && isTypeofExerciseSelected === true && data.imageActive || (index === 1 && isBodyPartsSelected === true && data.imageActive || (index === 2 && isDifficultySelected === true && data.imageActive || (index === 3 && isAgeRangeSelected === true && data.imageActive || data.imageInactive))) }}
                    style={{ height: hp('5%'), width: wp('10%') }} resizeMode='contain' />
                <Text
                    style={[cardTitle, { color: index === 0 && isTypeofExerciseSelected === true && Constant.color.white || (index === 1 && isBodyPartsSelected === true && Constant.color.white || (index === 2 && isDifficultySelected === true && Constant.color.white || (index === 3 && isAgeRangeSelected === true && Constant.color.white || Constant.color.lightGray))) }]}>{data.title}</Text>
                <Image
                    source={{ uri: index === 0 && isTypeofExerciseSelected === true && 'filter_check' || (index === 1 && isBodyPartsSelected === true && 'filter_check' || (index === 2 && isDifficultySelected === true && 'filter_check' || (index === 3 && isAgeRangeSelected === true && 'filter_check' || 'grey_plus'))) }}
                    style={{
                        height: index === 0 && isTypeofExerciseSelected === true && hp('3.5%') || (index === 1 && isBodyPartsSelected === true && hp('3.5%') || (index === 2 && isDifficultySelected === true && hp('3.5%') || (index === 3 && isAgeRangeSelected === true && hp('3.5%') || hp('2%')))),
                        width: wp('7%')
                    }} resizeMode='contain' />
            </TouchableOpacity>
        )
    };

    exerciseDetail = (index) => {
        this.props.navigation.navigate('ExerciseDetail', { data: ExerciseCard[index] });
    };

    renderExerciseCard = (item, index) => {
        return (
            <VideoCard
                item={item}
                isFitnessScreen={true}
                onPress={() => this.exerciseDetail(index)}
                key={index}
            />
        )
    }

    render() {
        const { navigation, safeArea } = this.props;
        const { container, filterText, subText, header, exerciseText, modalView } = styles;
        return (
            <View style={[container, { paddingBottom: hp('10%') + safeArea.bottom }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={container}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <ImageBackground style={{ height: hp('36%') }} source={{ uri: 'app_big_blue_background' }}>
                        <View style={{ marginTop: hp('2.5%'), alignItems: 'center' }}>
                            <Image source={{ uri: 'fitness_big_icon' }} style={{ height: hp('20%'), width: wp('30%') }}
                                resizeMode={'contain'} />
                            <Text style={header}>Fitness</Text>
                            <Text style={subText}>
                                {`Here you can find fitness exercises for all ages, different difficulties and for all parts of your body.`}
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={{ backgroundColor: Constant.color.lightSky }}>
                        <Text style={exerciseText}>{'EXERCISES'}</Text>
                        <View style={{ paddingHorizontal: wp('10%'), marginTop: hp('1%') }}>
                            <Text style={filterText}>FILTERS: </Text>
                            {
                                FitnessCard.map((item, index) => {
                                    return this.renderFitnessCard(item, index)
                                })
                            }
                            {
                                ExerciseCard.map((item, index) => {
                                    return this.renderExerciseCard(item, index)
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisiblity}
                >
                    <View style={{ ...style.modalView }}>
                        {this.state.filterType === FitnessCard[0].title &&
                            <TypeOfExerciseCard
                                filterImage={'type_of_exercise_big_icon'}
                                filterText={this.state.filterType}
                                onExerciseSelect={(data, index) => this.onExerciseSelect(data, index)}
                                typeOfExerciseArrayTemp={this.typeOfExerciseArrayTemp}
                                onClearClick={this.onClearClick}
                                onOkClick={this.onOkClick}
                                onCloseClick={this.onCloseClick} />
                            || (this.state.filterType === FitnessCard[1].title &&
                                <BodyPartsCard
                                    filterImage={'body_parts_big_icon'}
                                    filterText={this.state.filterType}
                                    onBodyPartsSelect={(data, index) => this.onBodyPartsSelect(data, index)}
                                    bodyPartsArrayTemp={this.bodyPartsArrayTemp}
                                    onClearClick={this.onClearClick}
                                    onOkClick={this.onOkClick}
                                    onCloseClick={this.onCloseClick} />
                                || (this.state.filterType === FitnessCard[2].title &&
                                    <DifficultyCard
                                        filterImage={'difficulty_big_icon'}
                                        filterText={this.state.filterType}
                                        titleBeginner={'Beginner'}
                                        titleIntermediate={'Intermediate'}
                                        titleAdvanced={'Advanced'}
                                        onBeginnerCheck={this.onBeginnerCheck}
                                        onIntermediateCheck={this.onIntermediateCheck}
                                        onAdvancedCheck={this.onAdvancedCheck}
                                        difficultyArrayTemp={this.difficultyArrayTemp}
                                        onClearClick={this.onClearClick}
                                        onOkClick={this.onOkClick}
                                        onCloseClick={this.onCloseClick} />
                                    || <AgeRangeCard
                                        filterImage={'age_range_big_icon'}
                                        filterText={this.state.filterType}
                                        onAgeRangeSelect={(data, index) => this.onAgeRangeSelect(data, index)}
                                        ageRangeArrayTemp={this.ageRangeArrayTemp}
                                        onClearClick={this.onClearClick}
                                        onOkClick={this.onOkClick}
                                        onCloseClick={this.onCloseClick} />
                                ))}
                    </View>
                </Modal>
                <BottomTab tabData={tabBarAfterLogin} navigation={navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
    },
    cardView: {
        ...Constant.shadowStyle,
        backgroundColor: Constant.color.white,
        borderRadius: 10,
        height: hp('7%'),
        marginTop: hp('1%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp('4%'),
        flex: 1
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.white
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: normalize(13),
        color: Constant.color.white,
        textAlign: 'center',
        paddingHorizontal: wp('10%')
    },
    cardTitle: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.small,
        color: Constant.color.lightGray,
        flex: 1,
        marginHorizontal: wp('2%')
    },
    filterText: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.black
    },
    exerciseText: {
        textAlign: 'center',
        marginTop: hp('3%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.blue
    },
    videoCardMainView: {
        ...Constant.shadowStyle,
        height: hp('14%'),
        marginTop: hp('2%'),
    },
    videoCardInnerView: {
        flex: 1,
        backgroundColor: Constant.color.white,
        flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: 15,
        borderColor: Constant.color.white,
        borderWidth: 3,
        alignItems: 'center',
        overflow: 'hidden'
    },
    videoCardImageView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    videoCardDetailView: {
        width: '55%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    exerciseDetailText: {
        textAlign: 'center',
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.navyblue,
    },
    modalView: {
        backgroundColor: 'rgba(2,21,42,0.9)',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        height: hp('75%'),
        justifyContent: 'center'
    },
});

export {FitnessHome}