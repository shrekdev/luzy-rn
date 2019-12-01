import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Constant from '../../../helper/themeHelper';
import {BottomTab, AppNavigator, style} from "../../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {tabBarWithBack} from '../../../helper/appConstant';
import {PostCard, PostMessageBox, ProfileText} from "./footerComponents";

const social = [{
    title: 'Messages',
    image: 'social_messages_icon',
    screen: 'Message'
}, {
    title: 'Contacts',
    image: 'social_contact_icon'
}, {
    title: 'Favorites',
    image: 'social_favorites_icon'
}];

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 0,
            postText: ''
        }
    }

    onPressMenu = () => {
        const {navigation} = this.props;
        navigation.navigate('AboutUs');
    };

    messageCard = () => {
        const {imageStyle, actionIconStyle, actionIconContainer} = styles;

        return (
            <View style={{borderRadius: 10, overflow: 'hidden', marginVertical: hp('2%'), width: wp('80%')}}>
                <View style={{
                    backgroundColor: Constant.color.lightSky,
                    flexDirection: 'row',
                    padding: hp('2%'),
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Image source={{uri: 'progress_screen_profile_image_placeholder'}}
                           style={{
                               height: hp('7%'),
                               width: hp('7%'),
                               borderRadius: hp('3.5%')
                           }}/>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                        <Text style={{
                            fontFamily: Constant.font.robotoBold,
                            color: Constant.color.blue,
                            fontSize: Constant.fontSize.mini
                        }}>AGUSTIN DAVID IKER</Text>
                        <Text style={{
                            fontFamily: Constant.font.robotoRegular,
                            color: Constant.color.lightGray,
                            fontSize: Constant.fontSize.mini
                        }}>Today 16:34</Text>
                    </View>
                    <View style={{...actionIconContainer, marginLeft: wp('5%')}}>
                        <Image source={{uri: 'social_replay_blue_icon'}} style={actionIconStyle}
                               resizeMode={'contain'}/>
                    </View>
                    <View style={actionIconContainer}>
                        <Image source={{uri: 'social_delete_post_dark_grey_icon'}} style={actionIconStyle}
                               resizeMode={'contain'}/>
                    </View>
                </View>
                <View style={{
                    backgroundColor: Constant.color.white,
                    padding: hp('2%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: Constant.color.blue,
                        height: hp('2%'),
                        width: hp('2%'),
                        borderRadius: hp('1%')
                    }}/>
                    <Text numberOfLines={2} style={{flex: 0.95}}>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. quisque arcu augue, porta a</Text>
                </View>
            </View>
        )
    };

    renderMessages = () => {
        const {header, subText} = style;
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                alignItems: 'center', justifyContent: 'center',
                paddingVertical: hp('5%')
            }}>
                <Text style={header}>{'YOUR MESSAGES'}</Text>
                <Text style={subText}>{'Here are the messages you received.'}</Text>
                {this.messageCard()}
            </ScrollView>
        )
    };

    render() {
        const {
            container, verticalSeparator, extraTextStyle, extraTextStyleContainer, followingContainer,
            followingOuterContainer, followingText, imageStyle, headerContainerView
        } = styles;
        const {header, subText} = style;
        const {safeArea, navigation} = this.props;
        const {postText} = this.state;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <AppNavigator onPressMenu={this.onPressMenu}/>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={headerContainerView}>
                            <Image source={{uri: 'progress_screen_profile_image_placeholder'}}
                                   style={imageStyle}
                            />
                            <ProfileText
                                title={'MIGUEL ANGEL'}
                                subTitle={'miguel.angel@website.com'}
                                containerStyle={{alignItems: 'center', marginTop: hp('2%'),}}
                                titleTextStyle={{fontSize: Constant.fontSize.medium,}}
                                subTitleTextStyle={{fontSize: Constant.fontSize.mini}}
                            />
                        </View>
                        <View style={{backgroundColor: Constant.color.lightGray, flex: 0.6}}>
                            {
                                social.map((data, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={{
                                            flex: 1, justifyContent: 'center', alignItems: 'center',
                                            backgroundColor: (index + 1) === this.state.selectedTab && Constant.color.blue || null
                                        }}
                                                          onPress={() => this.props.navigation.navigate(data.screen)}
                                        >
                                            <View style={extraTextStyleContainer}>
                                                <Image source={{uri: data.image}}
                                                       style={{height: hp('3.5%'), width: hp('3.5%')}}
                                                       resizeMode={'contain'}/>
                                                <Text style={extraTextStyle}>{data.title}</Text>
                                            </View>
                                            <View style={{
                                                height: index === social.length - 1 ? 0 : 2,
                                                opacity: (index + 1) === this.state.selectedTab ? 0 : 1,
                                                width: '80%',
                                                backgroundColor: Constant.color.white,
                                            }}/>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <View style={followingOuterContainer}>
                            <View style={followingContainer}>
                                <Text style={followingText}>Following:</Text>
                                <Text style={{...followingText, fontFamily: Constant.font.robotoBold}}>231</Text>
                            </View>
                            <View style={verticalSeparator}/>
                            <View style={followingContainer}>
                                <Text style={followingText}>Followers:</Text>
                                <Text style={{...followingText, fontFamily: Constant.font.robotoBold}}>213</Text>
                            </View>
                            <View style={verticalSeparator}/>
                            <View style={followingContainer}>
                                <Text style={followingText}>Likes:</Text>
                                <Text style={{...followingText, fontFamily: Constant.font.robotoBold}}>125</Text>
                            </View>
                        </View>
                        <View style={{paddingTop: hp('3%')}}>
                            <Text style={header}>{'YOUR PROFILE'}</Text>
                            <Text style={subText}>
                                {'Here are the details of your profile and the place from where you can make new posts.'}
                            </Text>
                            <View style={{paddingHorizontal: wp('8%'), paddingTop: hp('2%')}}>
                                <PostMessageBox
                                    onChangeText={(postText) => this.setState({postText})}
                                    postText={postText}
                                />
                                <PostCard
                                    // type={'image'}
                                    postImage={'post_image_1'}
                                    title={'MIGUEL ANGEL'}
                                    subTitle={'Today at 16:34'}
                                    profilePhoto={'progress_screen_profile_image_placeholder'}
                                    postData={'Cheesy Bacon Ranch Chicken'}
                                    likeCount={0}
                                    shareCount={21}
                                    postMessage={'Doing great!'}
                                    isEdit={true}
                                />
                                <PostCard
                                    // type={'video'}
                                    postImage={'post_image_2'}
                                    title={'MIGUEL ANGEL'}
                                    subTitle={'Today at 16:34'}
                                    profilePhoto={'progress_screen_profile_image_placeholder'}
                                    postData={'No-Equipment Home Workout'}
                                    likeCount={25}
                                    shareCount={2}
                                    isEdit={true}
                                    isVideo={true}
                                />
                                <PostCard
                                    // type={'image'}
                                    title={'MIGUEL ANGEL'}
                                    subTitle={'Today at 16:34'}
                                    profilePhoto={'progress_screen_profile_image_placeholder'}
                                    likeCount={25}
                                    shareCount={2}
                                    isEdit={true}
                                    postMessage={'\"Strength does not come from the physical capacity. It comes from an ' +
                                    'indomitable will. \n -Ghandi\"'}
                                />
                                <PostCard
                                    // type={'progress'}
                                    title={'MIGUEL ANGEL'}
                                    subTitle={'Today at 16:34'}
                                    profilePhoto={'progress_screen_profile_image_placeholder'}
                                    likeCount={25}
                                    shareCount={2}
                                    isEdit={true}
                                    postMessage={'Doing great!'}
                                    isProgress={true}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

export {Profile}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue,
    },
    imageStyle: {
        height: hp('12%'),
        width: hp('12%'),
        borderRadius: hp('6%')
    },
    extraTextStyleContainer: {
        paddingVertical: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    extraTextStyle: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.white,
        marginLeft: wp('2%')
    },
    followingOuterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('2.5%'),
        paddingHorizontal: wp('8%'),
        backgroundColor: Constant.color.white
    },
    followingContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    followingText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.blue,
    },
    actionIconContainer: {
        borderRadius: hp('2%'),
        overflow: 'hidden',
        backgroundColor: Constant.color.white,
        height: hp('3.5%'),
        width: hp('3.5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionIconStyle: {
        height: hp('2%'),
        width: hp('2%')
    },
    verticalSeparator: {
        height: hp('5%'),
        width: wp('0.5%'),
        backgroundColor: Constant.color.lightGray
    },
    headerContainerView: {
        padding: hp('2%'),
        backgroundColor: Constant.color.lightSky,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})