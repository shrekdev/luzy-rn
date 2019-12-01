import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, WebView} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppButton, AppNavigator, BottomTab} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import Video from 'react-native-video';
import {HideNavigationBar} from "react-native-navigation-bar-color";
import {tabBarWithBack} from "../../helper/appConstant";
import {AddtoCaloriesCalculator} from "./prepareYourFoodComponent";

const totalVotes = 13;
const totalRates = 3;
const rateArray = [1, 2, 3, 4, 5];

const overviewData = [{
    imageData: 'cooking_time_icon',
    title: 'Time',
    detail: '10 minutes'
}, {
    imageData: 'portions_icon',
    title: 'Difficulty',
    detail: 'Medium'
}, {
    imageData: 'calories_icon',
    title: 'Calories',
    detail: '- 200 kcal'
}]

class ExerciseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRate: 0,
            addExercise: false,
        }
    }

    rateExercise = (rates) => {
        this.setState({userRate: rates});
    };

    renderOverview = (data) => {
        const {overviewTitle, overviewDetail} = styles;
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: data.imageData}}
                       style={{height: hp('5%'), width: wp('10%')}}
                       resizeMode='contain'/>
                <Text style={overviewTitle}>{data.title}</Text>
                <Text style={overviewDetail}>{data.detail}</Text>
            </View>
        )
    };

    onAddExercise = () => {
        this.setState({addExercise: !this.state.addExercise});
    };


    /*https://www.youtube.com/embed/iwEhUa0QwIs*/

    /* https://youtu.be/iwEhUa0QwIs */
    render() {
        const {container, titleText, exerciseOverview, exerciseName, exerciseType, overviewTitle, separator, ratingView, rateImage} = styles;
        const {safeArea, navigation} = this.props;
        const {userRate} = this.state;
        const data = (navigation.state && navigation.state.params) && navigation.state.params.data || null;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ScrollView style={container} showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: hp('12%')}}
                >
                    {/*<WebView*/}
                    {/*source={{uri: 'https://www.youtube.com/embed/iwEhUa0QwIs'}}*/}
                    {/*style={{height: hp('36%'), width: wp('100%')}}*/}
                    {/*/>*/}

                    <Video
                        source={{uri: 'https://player.vimeo.com/external/253886611.sd.mp4?s=9b27bef92807ddcead7114c3f931d1506256485e&profile_id=165&download=1'}}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        // onBuffer={()=> alert('buffering...')}                // Callback when remote video is buffering
                        // onError={this.videoError}
                        onLoadStart={() => Constant.isANDROID && HideNavigationBar()}
                        controls={true}
                        resizeMode="stretch"              // Callback when video cannot be loaded
                        style={{height: hp('36%'), width: wp('100%')}}
                        onError={(err) => console.log(".......", err)}
                    />


                    <View>
                        <Text style={exerciseName}>{data.name}</Text>
                        <Text style={exerciseType}>{data.type}</Text>

                        <View style={exerciseOverview}>
                            {this.renderOverview(overviewData[0])}
                            <View style={separator}/>
                            {this.renderOverview(overviewData[1])}
                            <View style={separator}/>
                            {this.renderOverview(overviewData[2])}
                        </View>
                        <View style={{paddingHorizontal: wp('2%'), alignItems: 'center'}}>
                            <View>
                                <Text style={titleText}>Exercise rating</Text>
                                <View style={ratingView}>
                                    {
                                        rateArray.map((data, index) =>
                                            <Image
                                                source={{uri: totalRates >= data && 'good_rating_star_icon' || 'bad_rating_star_icon'}}
                                                style={rateImage}
                                                resizeMode='contain'
                                                key={index}/>)
                                    }
                                </View>
                                <Text style={overviewTitle}>{totalVotes + ' votes'}</Text>
                            </View>
                            <View>
                                <Text style={titleText}>Rate this exercise</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    {
                                        rateArray.map((data, index) =>
                                            <TouchableOpacity onPress={() => this.rateExercise(data)} key={index}>
                                                <Image
                                                    source={{uri: userRate >= data && 'good_rating_star_icon' || 'no_rating_star_icon'}}
                                                    style={rateImage}
                                                    resizeMode='contain'/>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>
                            <View style={{width: wp('85%'), marginVertical: hp('3%')}}>
                                <AppButton
                                    containerStyle={{backgroundColor: (userRate === 0) && Constant.color.lightGray || Constant.color.lightblue}}
                                    textStyle={{color: Constant.color.white}}
                                    title={'SEND YOUR RATING'}
                                    disabled={(userRate === 0)}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <AddtoCaloriesCalculator style={{bottom: safeArea.bottom + hp('10%')}} title={`Add this exercise to\ncalories calculator: `} isChecked={this.state.addExercise} onPress={this.onAddExercise}/>
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
    exerciseOverview: {
        backgroundColor: Constant.color.white,
        marginVertical: hp('3%'),
        height: hp('12%'),
        paddingHorizontal: wp('15%'),
        paddingVertical: hp('2%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseName: {
        textAlign: 'center',
        marginTop: hp('3%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.navyblue
    },
    exerciseType: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.medium, textAlign: 'center',
        color: Constant.color.black
    },
    titleText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.large,
        textAlign: 'center',
        color: Constant.color.black,
        marginTop: hp('2%'),
        marginBottom: hp('1%')
    },
    overviewTitle: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini, textAlign: 'center',
        color: Constant.color.black
    },
    overviewDetail: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.mini, textAlign: 'center',
        color: Constant.color.black
    },
    separator: {
        backgroundColor: Constant.color.lightSky,
        width: wp('0.3%')
    },
    ratingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    rateImage: {
        height: hp('5%'),
        width: wp('10%'),
        marginHorizontal: wp('1%')
    }
});

export {ExerciseDetail}