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
import {healthData, healthAppointmentsCardData, tabBarAfterLogin} from '../../helper/appConstant';
import {AppNavigator, BaseCard, BottomTab, Card, style} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';

class Health extends Component {

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
                marginRight: index === healthData.length - 1 ? wp('45%') : 0
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
                    style={{opacity, ...style.animatedView}}
                />
                <View style={style.innerAnimatedView}/>
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
        } else if (from === 'next' && this.selectedCard < healthData.length - 1) {
            this.scrollview.scrollTo({x: (this.selectedCard + 1) * 210, y: 0, animated: true})
        }
    };

    render () {
        const {container} = styles;
        const {safeArea, navigation} = this.props;
        return (
            <View style={[container, {paddingBottom:hp('10%')+safeArea.bottom}]}>
                <BaseCard
                    backgroundImage={'app_big_blue_background'}
                    headerImage={'health_big_icon'}
                    headerText={'HEALTH'}
                    headerSubText={'The place where you can keep track of your health\nand make appointments to a doctor.'}
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
                        healthData.map((data, index) => this.renderCard(data, index))
                    }
                </ScrollView>

                <View style={{...style.indicatorStyle, marginBottom: hp('2%')}}>
                    <TouchableOpacity onPress={() => this.onIconClick('prev')}>
                        <Image source={{uri: 'left_dark_arrow'}} style={style.arrow} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        {healthData.map((data, index) => this.renderCardBottom(index))}
                    </View>
                    <TouchableOpacity onPress={() => this.onIconClick('next')}>
                        <Image source={{uri: 'right_dark_arrow'}} style={style.arrow} resizeMode={'contain'}/>
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
        backgroundColor:Constant.color.blue,
    }
});

export {Health};