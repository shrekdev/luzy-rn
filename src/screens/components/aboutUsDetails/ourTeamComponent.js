import React, {Component} from "react";
import {
    StyleSheet,
    View,
    ScrollView, Text, Picker, Image, TouchableOpacity, TextInput, Animated
} from "react-native";
import {AboutUsCardComponent, DetailComponent} from './index'
import Constant from '../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {aboutUsCardData, teamData} from "../../../helper/appConstant";

class OurTeam extends Component {

    constructor(props) {
        super(props);
        this.state={
          selectedCard:0
        };
        this.scrollX = new Animated.Value(0);
        // this.selectedCard = 0;
    }

    onSlideClick = (type) => {
        const {selectedCard} = this.state;
        if(this.refs.teamScrollView) {
            if (type === 'backward' && selectedCard > 0) {
                this.refs.teamScrollView.scrollTo({
                    x: (selectedCard - 1) * Constant.screenWidth,
                    y: 0,
                    animated: true
                })
            } else if (type === 'forward' && selectedCard < teamData.length - 1) {
                this.refs.teamScrollView.scrollTo({
                    x: (selectedCard + 1) * Constant.screenWidth,
                    y: 0,
                    animated: true
                })
            }
        }
    };

    renderView = (value, index) => {
        const {titleText, subTitleText, detailText, socialIcon} = styles;
        return (
            <View style={{width: Constant.screenWidth, marginTop: wp('15%')}} key={index}>
                <Text style={titleText}>{value.title}</Text>
                <Text style={subTitleText}>{value.subTitle}</Text>
                <Text style={detailText} numberOfLines={5}>{value.detail}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: hp('1%')}}>
                    <Image source={{uri: 'about_us_send_email_icon'}}
                           style={socialIcon}
                           resizeMode={'contain'}/>
                    <Image source={{uri: 'about_us_facebook_icon'}}
                           style={socialIcon}
                           resizeMode={'contain'}/>
                    <Image source={{uri: 'about_us_twitter_icon'}}
                           style={socialIcon}
                           resizeMode={'contain'}/>
                </View>
            </View>
        )
    }

    renderCardBottom = (index) => {
        const {sliderDot} = styles;
        let position = Animated.divide(this.scrollX, Constant.screenWidth);
        let opacity = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp'
        });

        return (
            <View style={{alignItems: 'center', marginTop: hp('1%')}} key={index}>
                <Animated.View
                    key={index}
                    style={[sliderDot, {
                        opacity,
                        backgroundColor: Constant.color.white,
                        position: 'absolute',
                        zIndex: 1
                    }]}
                />
                <View style={[sliderDot, {backgroundColor: Constant.color.blue}]}/>
            </View>
        );
    };

    onScroll = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNo = 0;
        pageNo = Math.ceil((contentOffset.x - (viewSize.width / 2)) / viewSize.width);
        if(this.state.selectedCard !== pageNo){
            this.setState({selectedCard: pageNo});
        }
    };

    render() {
        const {data, safeArea} = this.props;
        const {container, roundView, bottomView, bottomSliderView, sliderArrow} = styles;
        return (
            <View style={container}>
                <View>
                    <AboutUsCardComponent
                        data={data}
                    />
                    <View style={bottomView}>
                        <ScrollView
                            style={{width: Constant.screenWidth}}
                            horizontal
                            pagingEnabled
                            ref={"teamScrollView"}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={10}
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
                                {listener: this.onScroll},          // Optional async listener
                            )}>
                            {
                                teamData.map((value, index) => {
                                    return this.renderView(value, index);
                                })
                            }
                        </ScrollView>
                        <View style={bottomSliderView}>
                            <TouchableOpacity onPress={() => this.onSlideClick('backward')}>
                                <Image source={{uri: 'left_dark_arrow'}}
                                       style={sliderArrow}
                                       resizeMode={'contain'}/>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                {
                                    teamData.map((data, index) => this.renderCardBottom(index))
                                }
                            </View>
                            <TouchableOpacity onPress={() => this.onSlideClick('forward')}>
                                <Image source={{uri: 'right_dark_arrow'}}
                                       style={sliderArrow}
                                       resizeMode={'contain'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{position: 'absolute', width: '100%', alignItems: 'center'}}>
                            <View style={roundView}>
                                {
                                    this.state.selectedCard === 0 &&
                                    <Image source={{ uri: 'joaquin_image' }}
                                           style={{flex:1}}
                                           resizeMode='cover' />
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    bottomView: {
        maxHeight: hp('50%'),
        width: Constant.screenWidth,
        backgroundColor: Constant.color.lightblue,
        marginTop: wp('15%'),
        zIndex: 1
    },
    titleText: {
        color: Constant.color.white,
        fontSize: Constant.fontSize.xlarge,
        fontFamily: Constant.font.linateBold,
        textAlign: 'center',
        letterSpacing: 1
    },
    subTitleText: {
        color: Constant.color.white,
        fontSize: Constant.fontSize.small,
        fontFamily: Constant.font.linateBold,
        textAlign: 'center'
    },
    detailText: {
        color: Constant.color.white,
        fontSize: Constant.fontSize.mini,
        fontFamily: Constant.font.robotoRegular,
        textAlign: 'justify',
        marginHorizontal: wp('10%')
    },
    roundView: {
        backgroundColor: Constant.color.blue,
        borderColor: Constant.color.lightblue,
        borderWidth: wp('2%'),
        height: wp('30%'),
        width: wp('30%'),
        borderRadius: wp('15%'),
        marginTop: -wp('15%'),
        overflow:'hidden'
    },
    socialIcon: {
        height: hp('7%'),
        width: wp('10%'),
        marginHorizontal: wp('3%')
    },
    sliderDot: {
        padding: wp('1.5%'),
        margin: wp('2%'),
        borderRadius: 10,
        alignSelf: 'center'
    },
    bottomSliderView: {
        paddingVertical: hp('2%'),
        width: wp('100%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%')
    },
    sliderArrow: {
        height: hp('3%'),
        width: wp('8%'),
        alignSelf: 'center',
        tintColor: Constant.color.blue
    }

});

export {OurTeam};