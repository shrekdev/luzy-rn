import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, ImageBackground, Modal} from 'react-native';
import Constant from '../../../helper/themeHelper';
import {BottomTab, AppNavigator} from "../../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {tabBarWithBack} from '../../../helper/appConstant';

const { font, fontSize, color } = Constant;
const social = [
    {
        title: 'Messages',
        image: 'progress_screen_profile_image_placeholder'
    }, {
        title: 'Contacts',
        image: 'progress_screen_profile_image_placeholder'
    }, {
        title: 'Favorites',
        image: 'progress_screen_profile_image_placeholder'
    }
];
const messages = [
    {
        avatar: 'social_profile_image_medium_placeholder_1',
        name: 'AGUSTIN DAVID IKER',
        time: 'Today 16:34',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. quisque arcu augue, porta a'
    }, {
        avatar: 'social_profile_image_small_placeholder_2',
        name: 'MELISSA MARIA CAMILA',
        time: 'Today 12:30',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. quisque arcu augue Lorem ipsum dolor sit amet, consectetur adipiscing elit. quisque arcu augue, porta a'
    }, {
        avatar: 'social_profile_image_small_placeholder_3',
        name: 'SAMANTHA NATALIA MIA',
        time: 'Today 11:14',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. quisque arcu augue, porta a'
    }, {
        avatar: 'progress_screen_profile_image_placeholder',
        name: 'AGUSTIN DAVID IKER',
        time: 'Today 16:42',
        message: 'consectetur adipiscing elit porta a'
    }
];

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 1,
            modalVisiblity: false,
        }
    }
    onDeleteChat = () => {
        this.setState({modalVisiblity: false});
    };

    renderDelete = () => {
        const {safeArea} = this.props;
        const {deleteModalBackground, deleteModalView, deleteModalBtnText} = styles;
        const height = hp('100%') - (hp('20%') + safeArea.top + safeArea.bottom);
        const marginTop = hp('10%') + (Constant.isIOS ? safeArea.top : 0);
        const marginBottom = Constant.isIOS ? hp('10%') + safeArea.bottom : 0;

        return(
            <View style={{...deleteModalBackground, marginTop, marginBottom}}>
                <View style={deleteModalView}>
                    <Image source={{uri: 'social_delete_icon'}} style={{height: hp('8%'), width: hp('8%'), marginBottom: hp('2%')}} resizeMode={'contain'}/>
                    <Text style={{fontFamily: font.linateBold, color: color.blue, fontSize: fontSize.xlarge, marginBottom: hp('1%')}}>CONFIRMATION</Text>
                    <Text style={{fontFamily: font.robotoRegular, color: color.black, fontSize: fontSize.mini, textAlign: 'center'}}>
                        {`Are you sure you want\nto delete this message?`}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('5%'), paddingHorizontal: wp('5%'), width: wp('66%')}}>
                        <TouchableOpacity onPress={() => this.setState({modalVisiblity: false})} activeOpacity={0.9}>
                            <Text style={{...deleteModalBtnText, color: color.lightGray}}>
                                {'CANCEL'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onDeleteChat()} activeOpacity={0.9}>
                            <Text style={{...deleteModalBtnText, color: color.red}}>
                                {'DELETE'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    messageCard = (data, index) => {
        const {imageStyle, actionIconStyle, actionIconContainer, messageCard, messageCardTopView, readStatusDot,
            messageText, messageView} = styles;

        return(
            <View key={index} style={messageCard}>
                <View style={messageCardTopView}>
                    <View style={{ height: hp('7%'), width: hp('7%'),  borderRadius: hp('3.5%'), overflow: 'hidden'}}>
                        <Image source={{uri: data.avatar}} style={imageStyle}/>
                    </View>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginLeft: wp('2.5%')}}>
                        <Text style={{fontFamily: font.robotoBold, color: color.blue, fontSize: fontSize.mini}}>{data.name}</Text>
                        <Text style={{fontFamily: font.robotoRegular, color: color.lightGray, fontSize: fontSize.xmini}}>{data.time}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {/*Reply Button*/}
                        <TouchableOpacity style={{...actionIconContainer, marginLeft: wp('5%')}}
                                          onPress={() => this.props.navigation.navigate('SocialChat')}
                                          activeOpacity={0.6}
                        >
                            <Image source={{uri: 'social_replay_blue_icon'}} style={actionIconStyle} resizeMode={'contain'} />
                        </TouchableOpacity>
                        {/*Delete Button*/}
                        <TouchableOpacity style={{...actionIconContainer, marginLeft: wp('2%')}}
                                          onPress={() => this.setState({modalVisiblity: true})}
                                          activeOpacity={0.6}
                        >
                            <Image source={{uri: 'social_messages_delete_message_icon'}} style={actionIconStyle} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={messageView}>
                    <View style={{...readStatusDot, backgroundColor: 1===1 ? color.blue : color.lightGray}} />
                    <Text numberOfLines={2} style={messageText}>
                        {data.message}
                    </Text>
                </View>
            </View>
        )
    };

    render() {

        const {container, header, subText, centerIt, extraTextStyle, extraTextStyleContainer, followingContainer, followingOuterContainer, followingText, imageStyle} = styles;
        const {safeArea, navigation} = this.props;

        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <AppNavigator/>
                <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', paddingVertical: hp('5%')}}>
                    <Text style={{fontFamily: font.linateBold, fontSize: fontSize.xxlarge, color: color.white}}>YOUR MESSAGES</Text>
                    <Text style={{fontFamily: font.robotoBold, fontSize: fontSize.xsmall, color: color.white}}>Here are the messages you received.</Text>
                    {/*Render Messages :*/}
                    <View style={{marginTop: hp('2%')}}>
                        {messages.map((data, index) => this.messageCard(data, index))}
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisiblity} >
                    {this.renderDelete()}
                </Modal>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.blue,
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
    extraTextStyleContainer: {
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('4%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    extraTextStyle: {
        fontFamily: font.robotoBold,
        fontSize: 13,
        color: color.white,
        marginLeft: wp('2%')
    },
    followingOuterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('8%'),
        backgroundColor: color.white
    },
    followingContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    followingText: {
        fontFamily: font.robotoRegular,
        fontSize: 14,
        color: color.blue,
    },
    imageStyle: {
        height: null,
        width: null,
        flex: 1
    },
    actionIconContainer: {
        borderRadius: hp('2%'),
        overflow: 'hidden',
        backgroundColor: color.white,
        height: hp('3%'),
        width: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionIconStyle: {
        height: hp('1.5%'),
        width: hp('1.5%')
    },
    messageCard: {
        borderRadius: hp('2%'),
        overflow: 'hidden',
        marginVertical: hp('1%'),
        width: wp('80%')
    },
    messageCardTopView: {
        justifyContent: 'space-around',
        backgroundColor: color.lightSky,
        flexDirection: 'row',
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('5%'),
        alignItems: 'center'
    },
    readStatusDot: {
        height: hp('2%'),
        width: hp('2%'),
        borderRadius: hp('1%')
    },
    messageText: {
        flex: 0.95,
        fontFamily: font.robotoRegular,
        color: '#353535',
        fontSize: fontSize.mini
    },
    messageView: {
        backgroundColor: color.white,
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        paddingHorizontal: wp('8%')
    },
    deleteModalView: {
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp('5.5%'),
        borderRadius: hp('3%')
    },
    deleteModalBtnText: {
        fontFamily: font.linateBold,
        fontSize: fontSize.medium,
        textAlign: 'center'
    }
});

export {Message};
