import React, {Component} from 'react';
import {
    StyleSheet,
    ImageBackground,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {Card, BottomTab} from "./../common";
import {prepareYourFoodCardData, tabBarWithBack} from '../../helper/appConstant'

class PrepareYourFood extends Component {
    scrollX = new Animated.Value(0);
    selectedCard = 0;

    renderCard = (data, index) => {
        const {navigation, safeArea} = this.props;

        return <Card
            key={index}
            image={data.image}
            imageBackground={{uri: 'app_small_grey_background'}}
            imgStyle={{width: wp('26%')}}
            title={data.title}
            subtitle={'See More'}
            style={{
                width: wp('50%'),
                height: (hp('25%') - safeArea.bottom),
                shadowColor: Constant.color.lightGray,
                marginRight: index === prepareYourFoodCardData.length - 1 ? wp('45%') : 0
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
        } else if (from === 'next' && this.selectedCard < prepareYourFoodCardData.length - 1) {
            this.scrollview.scrollTo({x: (this.selectedCard + 1) * 210, y: 0, animated: true})
        }
    };

    renderHome = () => {

    };

    render() {
        const {container, arrow, indicatorStyle, header} = styles;
        const {safeArea, navigation} = this.props;

        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ImageBackground style={{height: hp('36%')}} source={{uri: 'prepare_your_food_background'}}>
                    <View style={{marginTop: hp('2.5%'), alignItems: 'center'}}>
                        <Image source={{uri: 'food_big_prepare_your_food'}}
                               style={{height: hp('20%'), width: wp('40%')}} resizeMode={'contain'}/>
                        <Text style={{...header, textAlign: 'center'}}>{`PREPARE\nYOUR FOOD`}</Text>
                    </View>
                </ImageBackground>

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
                        prepareYourFoodCardData.map((data, index) => this.renderCard(data, index))
                    }
                </ScrollView>

                <View style={{
                    ...indicatorStyle, marginBottom:hp('2%')
                    // marginBottom: safeArea.bottom && safeArea.bottom + hp('7%') || (Constant.isANDROID && hp('11%') || hp('8.5%'))
                }}>
                    <TouchableOpacity onPress={() => this.onIconClick('prev')}>
                        <Image source={{uri: 'left_dark_arrow'}} style={arrow} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        {prepareYourFoodCardData.map((data, index) => this.renderCardBottom(index))}
                    </View>
                    <TouchableOpacity onPress={() => this.onIconClick('next')}>
                        <Image source={{uri: 'right_dark_arrow'}} style={arrow} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.white
    },
    subText: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(13),
        color: Constant.color.white
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
        tintColor: Constant.color.lightGray, //'#252525'
        marginTop: hp('0.1%')
    },
    animatedView: {
        borderRadius: 30,
        padding: wp('1.2%'),
        margin: wp('2%'),
        backgroundColor: Constant.color.blue,
        position: 'absolute',
        zIndex: 1
    },
    innerAnimatedView: {
        padding: wp('1.2%'),
        margin: wp('2%'),
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: Constant.color.lightGray
    },
    indicatorStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('7%'),
        backgroundColor: Constant.color.lightSky
    }
});

export {PrepareYourFood}