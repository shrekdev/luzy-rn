import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity, Animated, ScrollView} from 'react-native';
import Constant from '../../helper/themeHelper';
import {freeTimeCardData, tabBarAfterLogin} from '../../helper/appConstant';
import {Card, BottomTab, BaseCard} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';

class FreeTime extends Component {

    constructor(props) {
        super(props);

    }

    scrollX = new Animated.Value(0);
    selectedCard = 0;

    renderCard = (data, index) => {
        const {navigation, safeArea} = this.props;

        return <Card
            key={index}
            image={data.image}
            imgStyle={{width: wp('37%')}}
            title={data.title}
            subtitle={'See More'}
            style={{
                width: wp('50%'),
                height: (hp('25%') - safeArea.bottom),
                marginRight: index === freeTimeCardData.length - 1 ? wp('45%') : 0
            }}
            titleStyle={{fontSize: Constant.fontSize.medium}}
            onPress={() => data.screen && this.props.navigation.navigate(data.screen)}/>
    };

    renderCardBottom = (index) => {
        let position = Animated.divide(this.scrollX, 210);

        let opacity = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp'
        });

        return (
            <View key={index} style={{alignItems: 'center'}}>
                <Animated.View
                    key={index}
                    style={{opacity, ...styles.animatedView}}
                />
                <View style={styles.innerAnimatedView}/>
            </View>
        );
    };

    onScroll = (e) => {
        let x = e.nativeEvent.contentOffset.x;
        this.selectedCard = parseInt(x / 210);
        console.log('||| this.selectedCard: ', this.selectedCard);
    };

    onIconClick = (from) => {
        if (from === 'prev' && this.selectedCard > 0) {
            this.scrollview.scrollTo({x: (this.selectedCard - 1) * 210, y: 0, animated: true})
        } else if (from === 'next' && this.selectedCard < freeTimeCardData.length - 1) {
            this.scrollview.scrollTo({x: (this.selectedCard + 1) * 210, y: 0, animated: true})
        }
    };

    render() {
        const {container, arrow, indicatorStyle} = styles;
        const {safeArea, navigation} = this.props;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <BaseCard
                    backgroundImage={'app_big_blue_background'}
                    headerImage={'free_time_big_icon'}
                    headerText={'FREE TIME'}
                    headerSubText={'The place where you can find relaxation with our meditation audio files and keep track of your steps.'}
                />
                <ScrollView
                    ref={(el) => this.scrollview = el}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
                        {listener: this.onScroll},          // Optional async listener
                    )}
                    scrollEventThrottle={10}>
                    {
                        freeTimeCardData.map((data, index) => this.renderCard(data, index))
                    }
                </ScrollView>

                <View style={{
                    ...indicatorStyle, marginBottom: hp('2%')
                }}>
                    <TouchableOpacity onPress={() => this.onIconClick('prev')}>
                        <Image source={{uri: 'left_dark_arrow'}} style={arrow} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        {freeTimeCardData.map((data, index) => this.renderCardBottom(index))}
                    </View>
                    <TouchableOpacity onPress={() => this.onIconClick('next')}>
                        <Image source={{uri: 'right_dark_arrow'}} style={arrow} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>


                <BottomTab tabData={tabBarAfterLogin} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue,
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.large,
        marginLeft: 10
    },
    tabIcon: {
        height: hp('15%'),
        width: wp('15%')
    },
    arrow: {
        height: hp('4%'),
        width: wp('4%'),
        tintColor: Constant.color.black, //'#252525'
        marginTop: hp('0.1%')
    },
    animatedView: {
        borderRadius: 30,
        padding: wp('1.2%'),
        margin: wp('2%'),
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1
    },
    innerAnimatedView: {
        padding: wp('1.2%'),
        margin: wp('2%'),
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: Constant.color.black
    },
    indicatorStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('7%'),
        backgroundColor: Constant.color.blue,
    }
});

export {FreeTime};