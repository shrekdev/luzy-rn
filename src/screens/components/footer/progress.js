import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Constant from '../../../helper/themeHelper';
import {BottomTab, AppNavigator, DayTab} from "../../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {tabBarAfterLogin} from '../../../helper/appConstant';
import AnimatedCircularProgress from 'react-native-conical-gradient-progress';
import Slider from 'react-native-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderThumb from '../../../assets/images/sliderThumb';
import Share from 'react-native-share';
import { ShareDialog } from 'react-native-fbsdk';
import SideMenu from 'react-native-side-menu';
import {Menu} from "../../common";

const { font, fontSize, color } = Constant;
const activitySort = ['Daily', 'Weekly', 'Monthly'];

class Progress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressPercentage: '25',
            selectedTab: 1,
            weeklyGoals: [4, 20, 5, 3, 3], //goalLoseWeight, goalBMI, goalSteps, goalCalories, goalWater
            dailyGoals: [6, 15, 4, 4, 15],
            monthlyGoals: [5, 25, 6, 3, 4],
            isOpen: false
        };
    }

    renderTabs = (data, index) => {
        const {selectedTab} = this.state;
        const {tabView, centerIt} = styles;
        return (
            <TouchableOpacity key={index}
                              style={{...tabView,
                                  ...centerIt,
                                  backgroundColor: selectedTab === index && color.lightblue || color.white,
                                  borderTopLeftRadius: index === 0 ? wp('5%') : 0,
                                  borderTopRightRadius: index === 2 ? wp('5%') : 0
                              }}
                              onPress={() => {this.setState({selectedTab: index})}}
            >
                <Text style={{
                    fontSize: fontSize.large,
                    fontFamily: selectedTab === index ? font.robotoBold : font.robotoRegular,
                    color: selectedTab === index ? color.white : color.blue
                }}>
                    {data}
                </Text>
            </TouchableOpacity>
        )
    };

    renderSliderView = (label, max, unit, arrayIndex) => {
        const {weeklyGoals, monthlyGoals, dailyGoals, selectedTab} = this.state;
        const {centerIt, sliderContainer, sliderTrack} = styles;
        const goals = selectedTab === 0 ? dailyGoals : (selectedTab === 1 ? weeklyGoals : monthlyGoals);
        const goalsRef = selectedTab === 0 ? 'dailyGoals' : (selectedTab === 1 ? 'weeklyGoals' : 'monthlyGoals');
        return (
            <View style={{marginTop: hp('1.5%')}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontFamily: font.linateHeavy}}>{label}:</Text>
                    <Text style={{fontSize: fontSize.mini}}>{`${goals[arrayIndex]}/${max} ${unit}`}</Text>
                </View>
                <View style={sliderContainer}>
                    <MultiSlider
                        values={[goals[arrayIndex]]}
                        sliderLength={wp('75%')}
                        onValuesChange={(val) => this.setState({[goalsRef]: {...goals, [arrayIndex]: parseInt(val)}})}
                        trackStyle={{...sliderTrack}}
                        selectedStyle={{backgroundColor: color.lightblue}}
                        max={max}
                        customMarker={SliderThumb}
                    />
                </View>
            </View>
        );
    };

    shareToSocialMedia = (title) => {
        const {weeklyGoals, dailyGoals, monthlyGoals, selectedTab} = this.state;
        const goals = selectedTab === 0 ? dailyGoals : (selectedTab === 1 ? weeklyGoals : monthlyGoals);

        let period = activitySort[selectedTab].toLowerCase(),
            message = `Luzy App - My Personal Health Assistant\n\nHere are my ${period} goals:\n\nLOSE WEIGHT: ${goals[0]}/10 kg\nBMI: ${goals[1]}/31 BMI\nSTEPS: ${goals[2]}/10 km\nCALORIES: ${goals[3]}/10 kcal\nDRINKING WATER: ${goals[4]}/90 l\n\nIf you haven't downloaded Luzy yet, you can download it from here:`;

        // For Facebook
        if (title[0] === 'F') {

            let shareLinkContent = {
                contentType: 'link',
                contentUrl: 'https://play.google.com/store/apps/details?id=com.bilkon.easypiano&hl=en',
                contentDescription: 'Facebook sharing is easy!',
                contentTitle: 'aaaaaaaaaa',
                quote: message
            };

            ShareDialog.canShow(shareLinkContent).then((canShow) => {
                    if (canShow) return ShareDialog.show(shareLinkContent);
                }
            ).then((result) => {
                    if (result.isCancelled) {
                        // alert('Sharing cancelled by user');
                    } else {
                        // alert('Post Shared successfully');
                    }
                },
                function (error) {
                    alert('Share fail with error: ' + error);
                    console.log(error);
                }
            );

        } else { // For Twitter and WhatsApp
            const shareOptions = {
                message,
                url: 'https://play.google.com/store/apps/details?id=com.bilkon.easypiano&hl=en',
                social: title[0] === 'T' ? Share.Social.TWITTER : Share.Social.WHATSAPP
            };

            Share.shareSingle(shareOptions).then((response) => {
                // console.log(response);
            }).catch((error) => {
                title[0] === 'W' && alert('The operation couldn’t be completed. WhatsApp not installed');
                // console.log(error);
            });
        }
    };

    shareToLuzyTimeline = () => {
        alert('A Card will be shared on Luzy Timeline');
    };

    renderShareIcons = (iconURI, title) => {
        const {centerIt, shareIcons, shareIconsText} = styles;
        return(
          <View style={{marginHorizontal: '2%'}}>
              <TouchableOpacity
                  activeOpacity={0.8}
                  style={{...shareIcons, ...centerIt}}
                  onPress={title[0]==='L' ? this.shareToLuzyTimeline : () => this.shareToSocialMedia(title)}
              >
                  <Image source={{uri: iconURI}} style={{height: '50%', width: '50%'}} resizeMode='contain'/>
              </TouchableOpacity>
              <Text style={shareIconsText}>{title}</Text>
          </View>
      )
    };

    onPressMenu = (isOpen) => {
        this.setState({isOpen: !isOpen});
    };

    onMenuClose = (isOpen) => {
        this.setState({isOpen});
    };

    render() {
        const {container, centerIt, emailText, nameText, roundImage, header, subText, progressBarData,
            progressText, headerGoals, goalsView, sliderView, shareIconsView} = styles;
        const {safeArea, navigation} = this.props;
        const {progressPercentage, goalLoseWeight} = this.state;
        const menu = <Menu navigation={this.props.navigation} onItemAction={() => this.onMenuClose(false)}/>;
        const name = 'MIGUEL ANGEL';
        const email = 'miguel.angel@website.com';

        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <AppNavigator onPressMenu={() => this.onPressMenu(this.state.isOpen)} isMenuOpen={this.state.isOpen} />
                <View style={{flex:2}}>
                    {/*<SideMenu*/}
                        {/*menu={menu}*/}
                        {/*isOpen={this.state.isOpen}*/}
                        {/*menuPosition={'right'}*/}
                        {/*onChange={(isOpen)=>this.onMenuClose(isOpen)}*/}
                        {/*openMenuOffset={wp('60%')}*/}
                    {/*>*/}
                        <ScrollView>
                        {/*TOP PART; image, name, email*/}
                        <View style={{...centerIt, paddingVertical: hp('4%'), backgroundColor: color.lightSky}}>
                            <View style={roundImage}>
                                <Image source={{uri: 'progress_screen_profile_image_placeholder'}} style={{height: null, width: null, flex: 1}} resizeMode='contain'/>
                            </View>
                            <Text style={nameText}>{name}</Text>
                            <Text style={emailText}>{email}</Text>
                        </View>

                        {/*Heading and sub-heading*/}
                        <View>
                            <Text style={header}>{'YOUR\nPROGRESS'}</Text>
                            <Text style={subText}>{'Here are the details of your progress,\naccordingly with your goals.'}</Text>
                        </View>

                        {/*Circular Progress Bar*/}
                        <ImageBackground style={{height: hp('38%'), ...centerIt}}
                                         source={{uri: 'background_calories_calculator'}}>
                            <View style={{transform: [{scaleX: -1}]}}>
                                <AnimatedCircularProgress
                                    size={hp('31%')}
                                    width={12}
                                    fill={parseInt(progressPercentage)}
                                    segments={70}
                                    beginColor={color.darkBlue}
                                    endColor={'#00BFFF'}
                                    backgroundColor="rgba(255, 255, 255, 1)"
                                    linecap="round"
                                />
                            </View>
                            {/*Progress bar data*/}
                            <View style={progressBarData}>
                                <Text style={progressText}>{`${progressPercentage}%`}</Text>
                                <Text style={subText}>{'out of 100%'}</Text>
                            </View>
                        </ImageBackground>

                        {/*Heading and sub-heading, of Goals*/}
                        <View style={centerIt}>
                            <Text style={headerGoals}>{'YOUR GOALS'}</Text>
                            <Text style={{...subText, fontSize: fontSize.mini}}>{'Set up your goals and get ready to stay healthy.'}</Text>
                        </View>

                        {/*Goals View*/}
                        <View style={goalsView}>
                            {/*3 Tabs*/}
                            <View style={{ flexDirection: 'row'}}>
                                {activitySort.map((data, index) => {
                                    return this.renderTabs(data, index);
                                })}
                            </View>
                            {/*Sliders view*/}
                            <View style={sliderView}>
                                {this.renderSliderView('LOSE WEIGHT', 10, 'kg', 0)}
                                {this.renderSliderView('BMI', 31, 'BMI', 1)}
                                {this.renderSliderView('STEPS', 10, 'km', 2)}
                                {this.renderSliderView('CALORIES', 10, 'kcal', 3)}
                                {this.renderSliderView('DRINKING WATER', 90, 'l', 4)}
                            </View>
                        </View>

                        {/*Heading and sub-heading, of Share*/}
                        <View style={{...centerIt, marginTop: hp('5%')}}>
                            <Text style={headerGoals}>{'SHARE'}</Text>
                            <Text style={{...subText, fontSize: fontSize.mini}}>{'your progress'}</Text>
                        </View>

                        {/*Share Icons*/}
                        <View style={shareIconsView}>
                            {this.renderShareIcons('progress_screen_luzy_app_icon','LUZY App')}
                            {this.renderShareIcons('progress_screen_facebook_app_icon','Facebook')}
                            {this.renderShareIcons('progress_screen_twitter_app_icon','Twitter')}
                            {this.renderShareIcons('progress_screen_whatsapp_app_icon','WhatsApp')}
                        </View>
                        </ScrollView>
                    {/*</SideMenu>*/}
                </View>
                <BottomTab tabData={tabBarAfterLogin} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.blue,
    },
    centerIt: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundImage: {
        height: hp('14%'),
        width: hp('14%'),
        borderRadius: hp('7%'),
        marginBottom: hp('1.5%'),
        overflow: 'hidden'
    },
    nameText: {
        fontFamily: font.linateBold,
        color: color.blue,
        fontSize: fontSize.medium
    },
    emailText: {
        fontFamily: font.robotoRegular,
        color: color.lightGray,
        fontSize: fontSize.mini
    },
    header: {
        textAlign: 'center',
        fontSize: fontSize.xxlarge,
        color: color.white,
        fontFamily: font.linateBold,
        marginTop: hp('3%')
    },
    subText: {
        textAlign: 'center',
        fontSize: fontSize.xsmall,
        color: color.white,
        fontFamily: font.robotoBold
    },
    progressBarData: {
        position: 'absolute',
        top: hp('0%'),
        width: wp('100%'),
        height: hp('37.5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressText: {
        textAlign: 'center',
        fontSize: fontSize.xxxlarge,
        color: color.white,
        fontFamily: font.linateBold,
    },
    headerGoals: {
        fontSize: fontSize.xlarge,
        color: color.white,
        fontFamily: font.linateBold,
    },
    goalsView: {
        marginHorizontal: wp('5.5%'),
        marginTop: hp('3%'),
    },
    tabView: {
        height: hp('12%'),
        width: wp('29.667%'),
    },
    sliderView: {
        backgroundColor: color.lightSky,
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('7%'),
        borderBottomRightRadius: wp('5%'),
        borderBottomLeftRadius: wp('5%')
    },
    sliderContainer: {
        flex: 1,
        marginTop: -hp('1%')
    },
    sliderTrack: {
        height: hp('1.5%'),
        borderRadius: hp('3%'),
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
    },
    shareIconsView: {
        marginBottom: hp('5.5%'),
        flexDirection: 'row',
        marginTop: hp('2%'),
        alignSelf: 'center'
    },
    shareIcons: {
        backgroundColor: color.white,
        height: hp('7%'),
        width: hp('7%'),
        borderRadius: hp('3.5%'),
    },
    shareIconsText: {
        textAlign: 'center',
        fontSize: fontSize.xmini,
        color: color.white,
        fontFamily: font.robotoBold,
        marginTop: hp('1%')
    },
});

export {Progress};

// If you haven't downloaded this app yet, you can download it from here: https://play.google.com/store/apps/details?id=com.bilkon.easypiano&hl=en
