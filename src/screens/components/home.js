import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity, Animated, ScrollView, Modal} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {homeCardData,tabBarAfterLogin} from '../../helper/appConstant';
import {AppNavigator, BottomTab} from "../common";
import {CardComponent} from "./aboutUsDetails/aboutUsCard";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import SideMenu from 'react-native-side-menu';
import {Menu} from "../common";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            modalVisiblity: false,
            isStartCall: false,
        };

        if(Constant.isANDROID){
            this.reRenderScreen = this.props.navigation.addListener('willFocus', () => {this.forceUpdate()});
        }
    }

    componentWillUnmount() {
        Constant.isANDROID && this.reRenderScreen();
    }

    renderCard = (value, index) => {
        const {safeArea} = this.props;
        return(
            <CardComponent
                style={{backgroundColor: Constant.color.blue, shadowColor: '#042b55'}}
                textStyle={{color: Constant.color.white}}
                title={value.title}
                imageData={value.imageData}
                showModal={() => value.screen ? this.props.navigation.navigate(value.screen) : value.title === 'Play' ? this.setState({modalVisiblity: true}) : null}
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

    renderVideoCall = () => {
        const {safeArea} = this.props;
        const {callContainer, modalStyle, doctorName, doctorType, textStyle, callTime, doctorProfile, callIcon} = styles;

        return(
            <View style={{...callContainer, marginTop: safeArea.top + hp('8%')}}>
                <View style={modalStyle}>
                    <View style={doctorProfile}>
                        <Image  source={{uri: 'progress_screen_profile_image_placeholder'}} style={{height: '100%', width: '100%'}}/>
                    </View>
                    <Text style={doctorName}>JUAN MIGUAL ANGEL</Text>
                    <Text style={doctorType}>Nutriologist Doctor</Text>
                    <Text style={textStyle}>Missed call.</Text>
                    <Text style={callTime}>05:00</Text>
                    <TouchableOpacity style={callIcon} onPress={() => this.setState({isStartCall: true})}>
                        <Image  source={{uri: 'video_call_call_back_icon'}} style={{height: '100%', width: '100%'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    renderCallModal = () => {
        const {safeArea} = this.props;
        const {callContainer, modalStyle, doctorName, doctorType, textStyle, callTime, doctorProfile, callIcon} = styles;

        return(
            <View style={{...callContainer, marginTop: safeArea.top + hp('8%')}}>
                <View style={modalStyle}>
                    <View style={doctorProfile}>
                        <Image  source={{uri: 'progress_screen_profile_image_placeholder'}} style={{height: '100%', width: '100%'}}/>
                    </View>
                    <Text style={doctorName}>JUAN MIGUAL ANGEL</Text>
                    <Text style={doctorType}>Nutriologist Doctor</Text>
                    <Text style={textStyle}>calling....</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: wp('60%')}}>
                        <TouchableOpacity style={callIcon} >
                            <Image  source={{uri: 'video_call_take_call_icon'}} style={{height: '100%', width: '100%'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={callIcon} onPress={() => this.setState({isStartCall: false, modalVisiblity: false})}>
                            <Image  source={{uri: 'video_call_decline_call_icon'}} style={{height: '100%', width: '100%'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    render () {
        const {container, header, subText,cardView} = styles;
        const {safeArea,navigation} = this.props;
        const menu = <Menu navigation={this.props.navigation} onItemAction={() => this.onMenuClose(false)}/>;

        return (
            <View style={[container,{paddingBottom:hp('10%')+safeArea.bottom}]}>
            <AppNavigator onPressMenu={() => this.onPressMenu(this.state.isOpen)} isMenuOpen={this.state.isOpen} />
                    <View style={[container]}>
                        <SideMenu
                            menu={menu}
                            isOpen={this.state.isOpen}
                            menuPosition={'right'}
                            onChange={(isOpen)=>this.onMenuClose(isOpen)}
                            openMenuOffset={wp('60%')}
                        >
                            <ImageBackground style={{flex:1, alignItems: 'center', paddingTop:hp('5%')}}
                                             source={{uri:'background'}}>
                                <Text style={header}>
                                    {'WELCOME'}
                                </Text>
                                <Text style={subText}>
                                    {'to LUZY application your health assistant.'}
                                </Text>
                                <View style={cardView}>
                                    {homeCardData.map((value, index) => this.renderCard(value, index))}
                                </View>
                            </ImageBackground>
                        </SideMenu>
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisiblity} >
                        {this.state.isStartCall ? this.renderCallModal() : this.renderVideoCall()}
                    </Modal>
                    <BottomTab tabData={tabBarAfterLogin} navigation={navigation} isHome={true}/>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Constant.color.blue,
    },
    header: {
        textAlign: 'center',
        fontSize:Constant.fontSize.xlarge,
        color:Constant.color.white,
        fontFamily: Constant.font.linateBold,
    },
    subText: {
        textAlign: 'center',
        fontSize:Constant.fontSize.small,
        color:Constant.color.white,
        fontFamily: Constant.font.robotoRegular,
        marginBottom:hp('1%')
    },
    cardView:{
        width: wp('90%'),
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    callContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalStyle: {
        width: wp('80%'),
        paddingVertical: hp('5%'),
        paddingHorizontal: wp('8%'),
        borderRadius: 15,
        backgroundColor: Constant.color.blue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    doctorName: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        textAlign: 'center',
        color: Constant.color.white
    },
    doctorType: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.medium,
        textAlign: 'center',
        color: Constant.color.white
    },
    textStyle: {
        marginTop: hp('3%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.mini,
        textAlign: 'center',
        color: Constant.color.white
    },
    callTime: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xxlarge,
        textAlign: 'center',
        color: Constant.color.white
    },
    doctorProfile: {
        marginBottom: hp('3%'),
        height: hp('12%'),
        width: hp('12%'),
        borderRadius: hp('6%'),
        overflow: 'hidden'
    },
    callIcon: {
        marginTop: hp('3%'),
        height: hp('8%'),
        width: hp('8%'),
        borderRadius: hp('5%'),
        overflow: 'hidden'
    }
});

export {Home};