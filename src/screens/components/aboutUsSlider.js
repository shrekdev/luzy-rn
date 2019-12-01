import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    Animated,
    ImageBackground,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import Constant from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import SafeArea, {SafeAreaInsets} from 'react-native-safe-area';
import {
    aboutUsCardData,
    ourValuesList,
    tabBarBeforeLogin,
    tabBarWithBack,
} from "../../helper/appConstant";
import {AppNavigator, BottomTab} from "../common";
import {AboutUsCardComponent, VisionComponent, OurTeam, ContactUs} from './aboutUsDetails'

class AboutUsSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.scrollX = new Animated.Value(0);
        this.scrollY = new Animated.Value(0);
        this.selectedCard = (props.navigation.state && props.navigation.state.params) &&
            props.navigation.state.params.cardIndex || 0;
    }

    componentDidMount() {
        setTimeout(() => {
            let width = Constant.screenWidth;
            width = (this.selectedCard) * width;
            if (this.refs.mainScrollView) {
                this.refs.mainScrollView.scrollTo({x: width, y: 0, animated: false});
            }
        }, 100);
    }

    onSlideClick = (type) => {
        if (this.refs.mainScrollView) {
            if (type === 'backward' && this.selectedCard > 0) {
                this.refs.mainScrollView.scrollTo({
                    x: (this.selectedCard - 1) * Constant.screenWidth,
                    y: 0,
                    animated: true
                });
                setTimeout(() => {
                    this.scrollY.setValue(0);
                }, 300);
            } else if (type === 'forward' && this.selectedCard < aboutUsCardData.length - 1) {
                this.refs.mainScrollView.scrollTo({
                    x: (this.selectedCard + 1) * Constant.screenWidth,
                    y: 0,
                    animated: true
                });
                setTimeout(() => {
                    this.scrollY.setValue(0);
                }, 300);
            }

        }
    };

    renderCardBottom = (index) => {
        const {sliderDot} = styles;
        let position = Animated.divide(this.scrollX, Constant.screenWidth);
        let opacity = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp'
        });

        let selected = this.scrollY.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [Constant.color.white, Constant.color.navyblue, Constant.color.navyblue],
            extrapolate: 'clamp'
        });

        let disable = this.scrollY.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [Constant.color.black, Constant.color.lightGray, Constant.color.lightGray],
            extrapolate: 'clamp'
        });

        return (
            <View style={{alignItems: 'center', marginTop: hp('1%'), backgroundColor: Constant.color.transparent}}
                  key={index}>
                <Animated.View
                    key={index}
                    style={[sliderDot, {
                        opacity,
                        backgroundColor: selected,
                        position: 'absolute',
                        zIndex: 1
                    }]}
                />
                <Animated.View style={[sliderDot, {backgroundColor: disable}]}/>
            </View>
        );
    };

    onScroll = (e) => {
        let x = e.nativeEvent.contentOffset.x;
        let cardIndex= parseInt(x/Constant.screenWidth);
        if(this.selectedCard !== cardIndex){
            this.selectedCard = cardIndex;
        }
    };

    render() {
        const {container, sliderTopView, sliderArrows} = styles;
        const {safeArea, navigation, userDetail} = this.props;
        const tabBarData = userDetail && tabBarWithBack || tabBarBeforeLogin;

        let backgroundColor = this.scrollY.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [Constant.color.blue, Constant.color.white, Constant.color.white],
            extrapolate: 'clamp'
        });

        let arrow = this.scrollY.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [Constant.color.black, Constant.color.lightGray, Constant.color.lightGray],
            extrapolate: 'clamp'
        });

        return (
            <View style={container}>
                <AppNavigator/>
                <Animated.View style={{...sliderTopView, backgroundColor}}>
                    <TouchableOpacity onPress={() => this.onSlideClick('backward')}>
                        <Animated.Image source={{uri: 'left_dark_arrow'}}
                                        style={{...sliderArrows, tintColor: arrow}}
                                        resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    {
                        aboutUsCardData.map((data, index) => this.renderCardBottom(index))
                    }
                    </View>
                    <TouchableOpacity onPress={() => this.onSlideClick('forward')}>
                        <Animated.Image source={{uri: 'right_dark_arrow'}}
                                        style={{...sliderArrows, tintColor: arrow}}
                                        resizeMode={'contain'}/>
                    </TouchableOpacity>
                </Animated.View>
                <ScrollView
                    keyboardDismissMode={'on-drag'}
                    horizontal
                    pagingEnabled
                    ref={"mainScrollView"}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
                        {listener: this.onScroll},          // Optional async listener
                    )}
                    onScrollEndDrag={() => {
                        this.scrollY.setValue(0)
                    }}>
                    <AboutUsCardComponent
                        data={aboutUsCardData[0]}
                    />
                    <AboutUsCardComponent
                        data={aboutUsCardData[1]}
                    />
                    <AboutUsCardComponent
                        data={aboutUsCardData[2]}
                    />

                    <ScrollView
                        contentContainerStyle={{paddingBottom: hp('10%')+ safeArea.bottom}}
                        onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.scrollY}}}]
                    )}>
                        <VisionComponent
                            data={aboutUsCardData[3]}
                            ourValuesList={ourValuesList}
                            safeArea={safeArea}
                        />
                    </ScrollView>
                    <ScrollView
                        contentContainerStyle={{paddingBottom: hp('10%')+ safeArea.bottom}}
                        onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.scrollY}}}]
                    )}>
                        <OurTeam
                            data={aboutUsCardData[4]}
                            safeArea={safeArea}
                        />
                    </ScrollView>

                    <ScrollView
                        contentContainerStyle={{paddingBottom: hp('10%')+ safeArea.bottom}}
                        onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.scrollY}}}]
                    )}>
                        <ContactUs
                            data={aboutUsCardData[5]}
                            safeArea={safeArea}
                        />
                    </ScrollView>

                </ScrollView>
                <BottomTab tabData={tabBarData} navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.navyblue
    },
    sliderDot: {
        padding: wp('1.5%'),
        margin: wp('2%'),
        borderRadius: 10,
        alignSelf: 'center'
    },
    sliderTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%')
    },
    sliderArrows: {
        height: hp('3%'),
        width: wp('8%'),
        alignSelf: 'center'
    }
});

export {AboutUsSlider};
