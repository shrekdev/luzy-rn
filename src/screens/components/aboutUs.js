import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, Image, ScrollView, Animated} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppNavigator, BottomTab} from "../common";
import {DetailComponent, VisionComponent, CardComponent, OurTeam, ContactUs, CardIcon} from './aboutUsDetails'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {aboutUsCardData, tabBarBeforeLogin, tabBarAfterLogin} from '../../helper/appConstant'
import SideMenu from 'react-native-side-menu';
import {Menu} from "../common";

class AboutUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCard: '',
            isOpen: false
        };
    }

    showModal = (index) => {
        const {navigation} = this.props;
        navigation.navigate('AboutUsSlider', {cardIndex: index});
    };

    cardView = (value, index) => {
        const {safeArea} = this.props;
        return (
            <CardComponent
                style={{height: (Constant.screenHeight - safeArea.top) * 0.18}}
                title={value.title}
                imageData={value.imageData}
                showModal={() => {
                    this.showModal(index)
                }}
                safeArea={safeArea}
                key={index}
            />
        )
    };

    onPressMenu = (isOpen) => {
        this.setState({isOpen: !isOpen});
    };

    onMenuClose = (isOpen) => {
        this.setState({isOpen});
    };

    render() {
        const {container, titleText, header, subText, cardView} = styles;
        const {safeArea, userDetail, navigation} = this.props;
        const tabBarData = userDetail && tabBarAfterLogin || tabBarBeforeLogin;
        const menu = <Menu navigation={this.props.navigation} onItemAction={() => this.onMenuClose(false)}/>;

        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <AppNavigator onPressMenu={() => this.onPressMenu(this.state.isOpen)} isMenuOpen={this.state.isOpen} />
                <View style={[container]}>
                    <SideMenu
                        menu={menu}
                        isOpen={this.state.isOpen}
                        menuPosition={'right'}
                        onChange={(isOpen)=>this.onMenuClose(isOpen)}
                        openMenuOffset={wp('60%')}
                    >
                        <ImageBackground style={{flex: 1}} source={{uri: 'about_us_background'}}>
                            <View style={titleText}>
                                <Text style={header}>
                                    {'ABOUT US'}</Text>
                                <Text style={subText}>
                                    {'Here you can find out more about us, who we are, diabetes and our application.'}</Text>
                                <View style={cardView}>
                                    {aboutUsCardData.map((value, index) => {
                                        return this.cardView(value, index)
                                    })}
                                </View>
                            </View>
                        </ImageBackground>
                    </SideMenu>
                </View>
                <BottomTab tabData={tabBarData} navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f6f8',
    },
    header: {
        textAlign: 'center',
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.blue,
        fontWeight: 'bold',
        fontFamily: Constant.font.linateBold
    },
    subText: {
        textAlign: 'center',
        fontSize: Constant.fontSize.small,
        color: Constant.color.blue,
        marginBottom: hp('2%'),
        fontFamily: Constant.font.robotoRegular
    },
    cardView: {
        width: wp('90%'),
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        zIndex: 1
    },
    titleText: {
        flex: 1,
        paddingTop: hp('5%'),
        paddingHorizontal: wp('10%')
    }
});

export {AboutUs};
