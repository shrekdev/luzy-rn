import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Constant from '../../helper/themeHelper';
import {style} from "./../common/style";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "../../helper/responsiveScreen";
import {homeCardData} from "../../helper/appConstant";
import {TabBar} from "./../common";

class HomeTabBar extends Component {
    constructor(props) {
        super(props);

        const {currentTab} = props;

        this.state = {
            currentTab: currentTab,
            showTopBar: true
        }
    }

    componentDidMount() {
        const from = this.props.navigation.state.params && this.props.navigation.state.params.from;

        (from !== 'HealthCalculator') && this.onTabChange(this.state.currentTab, homeCardData[this.state.currentTab])
    }

    onBack = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    onTabChange = (tab, data) => {
        const {currentTab} = this.state;
        const {handleLocalAction, navigation, localActions} = this.props;
        if(this.topscrollview !== null) {
            if (tab > currentTab) {
                setTimeout(() => {
                    this.topscrollview.scrollTo({
                        x: tab !== 1 ? ((tab - 1) * ((tab * wp('50%')) - wp('25%')) / (tab - 1)) : wp('25%'),
                        y: 0,
                        animated: true
                    })
                }, 100);
            } else if (tab <= currentTab) {
                setTimeout(() => {
                    this.topscrollview.scrollTo({x: (tab * wp('50%')), y: 0, animated: true})
                }, 100);
            }
        }
        this.setState({currentTab: tab});
        data.screen && navigation.navigate(data.screen);

        handleLocalAction({
                type: localActions.VISIBLE_TAB,
                data: data.title
        });
    };

    render() {
        const {container, chatText, chatIcon} = styles;
        const {navigation} = this.props;
        const {currentTab, showTopBar} = this.state;

        return (
            <View>
                {showTopBar &&
                <View style={{height: hp('10%'), flexDirection: 'row'}}>
                    {/*Chat Support Tab Component*/}
                    <TouchableOpacity style={{backgroundColor: 1===11 ? Constant.color.lightGray : Constant.color.blue, width: wp('25%')}}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={{uri: 1===11 ? 'chat_support_offline_icon' : 'chat_support_online_icon'}} style={{...chatIcon}} resizeMode={'contain'}/>
                            <Text style={{...chatText}}>{'Chat support'}</Text>
                        </View>
                    </TouchableOpacity>
                    {/*Tab bar*/}
                    <ScrollView
                        horizontal
                        scrollsToTop={false}
                        showsHorizontalScrollIndicator={false}
                        style={{...style.topBar}}
                        contentContainerStyle={{height: hp('10%')}}
                        ref={(el) => this.topscrollview = el}>
                        {homeCardData.map((data, index) =>
                            <TabBar currentTab={this.state.currentTab} index={index} data={data}
                                    onPress={() => this.onTabChange(index, data)} key={index}/>)}
                    </ScrollView>
                </View>
                }
            </View>
        );
    }
}

export {HomeTabBar};

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
    chatIcon: {
        marginTop: hp('0.8%'),
        height: hp('5%'),
        width: wp('12%'),
    },
    chatText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.xsmall,
        color: Constant.color.white,
        marginBottom: hp('0.8%'),
    }
});