import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image, ScrollView, Animated, TextInput, Linking} from 'react-native';
import Constant from '../../../helper/themeHelper';
import {AppNavigator, BottomTab, style} from "../../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {tabBarAfterLogin} from '../../../helper/appConstant'
import {PostMessageBox, ProfileText, PostCard} from './footerComponents'
import LinkPreview from 'react-native-link-preview'

class Social extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postText: '',
            postImage: '',
            title: '',
            postData: '',
            postMessage: ''
        };
    }

    onProfileScreen = (data) => {
        this.props.navigation.navigate('Social', {
            profileDetail: {
                name: data.name,
                email: data.email
            }
        })
    };

    onPost = () => {
        let url = this.state.postText;
        let urlRgex = /\b(https|http)?:\/\/\S+/gi;

        let matches = url.match(urlRgex) || [];

        if(matches && matches.length > 0) {
            let postMessage = url.replace(matches[0], '');

            LinkPreview.getPreview(url).then((data) => {

                console.log(data);
                if(data.description) {
                    this.setState({
                        postMessage: postMessage && postMessage || '',
                        postImage: data.images.length > 0 ? data.images[0] : 'post_image_2',
                        title: data.title,
                        postData: data.description,
                        postText: ''
                    })
                } else {
                    alert('You have share link but no data found for that, please check it again')
                }
            }).catch((error) => {
                alert('Something went wrong. Sorry for that.');
                console.log('Error while getting link data: ' + error.error.message)
            });
        }
    };

    render() {
        const {container, profileView, viewProfileView, viewProfileText, headerView} = styles;
        const {header, subText} = style;
        const {safeArea, navigation} = this.props;
        const {postText} = this.state;
        const profileDetail = navigation.state && navigation.state.params && navigation.state.params.profileDetail;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <AppNavigator/>
                {
                    (profileDetail)
                    &&
                    <View style={{flexDirection: 'row'}}>
                        <View style={profileView}>
                            <Image source={{uri: 'progress_screen_profile_image_placeholder'}}
                                   style={{height: hp('8%'), width: hp('8%'),
                                       borderRadius: hp('4%'),}}
                                   resizeMode={'contain'}/>
                            <ProfileText
                                title={profileDetail.name}
                                subTitle={profileDetail.email}
                                containerStyle={{marginTop: wp('2%'), alignItems:'center'}}
                            />
                        </View>
                        <View style={[viewProfileView,{paddingVertical:hp('1%')}]}>
                            <TouchableOpacity style={{alignItems:'center', justifyContent: 'center',flex:1}}>
                                <Image source={{uri: 'social_add_contact_icon'}}
                                       style={{height: hp('3%'), width: hp('3%')}}
                                       resizeMode={'contain'}/>
                                <Text style={{
                                    color: Constant.color.white,
                                    fontFamily: Constant.font.robotoBold,
                                    textAlign: 'center',
                                    fontSize: Constant.fontSize.xmini}}>
                                    {'ADD CONTACT'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems:'center',justifyContent: 'center', flex:1}}>
                                <Image source={{uri: 'social_send_message_icon'}}
                                       style={{height: hp('3%'), width: hp('3%')}}
                                       resizeMode={'contain'}/>
                                <Text style={{
                                    color: Constant.color.white,
                                    fontFamily: Constant.font.robotoBold,
                                    textAlign: 'center',
                                    fontSize: Constant.fontSize.xmini
                                }}>
                                    {'SEND MESSAGE'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    ||
                    <View style={{flexDirection: 'row'}}>
                        <View style={profileView}>
                            <View style={{height: hp('6%'), width: hp('6%'),
                                borderRadius: hp('6%'), overflow:'hidden'}}>
                            <Image source={{uri: 'progress_screen_profile_image_placeholder'}}
                                   style={{height: '100%', width:'100%'}}
                                   resizeMode={'contain'}/>
                            </View>
                            <ProfileText
                                title={'MIGUEL ANGEL'}
                                subTitle={'miguel.angel@website.com'}
                                containerStyle={{marginLeft: wp('2%')}}
                            />
                        </View>
                        <TouchableOpacity style={viewProfileView} onPress={() => {
                            navigation.navigate('Profile');
                        }}>
                            <Text style={viewProfileText}>
                                {'View\nyour profile'}</Text>
                        </TouchableOpacity>
                    </View>
                }
                <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
                    <View style={headerView}>
                        <Text style={header}>{'SOCIAL'}</Text>
                        <Text style={subText}>
                            {'Here you can interact with your friends and share you personal interests.'}
                        </Text>
                        <View style={{paddingHorizontal: wp('8%'), paddingTop: hp('2%')}}>
                            <PostMessageBox
                                onChangeText={(postText) => this.setState({postText})}
                                postText={postText}
                                onPost={this.onPost}
                            />
                            <PostCard
                                // type={'image'}
                                postImage={'post_image_1'}
                                title={'VALERIA SAMANTHA'}
                                subTitle={'Today at 16:34'}
                                profilePhoto={'progress_screen_profile_image_placeholder'}
                                postData={'Cheesy Bacon Ranch Chicken'}
                                likeCount={0}
                                shareCount={21}
                                // goToProfile={() => {
                                //     this.onProfileScreen({name:'VALERIA SAMANTHA',email:'valria.samantha@website.com'})}
                                // }
                            />
                            <PostCard
                                // type={'video'}
                                postImage={'post_image_2'}
                                title={'MELISSA MARIA CAMILA'}
                                subTitle={'Today at 16:34'}
                                profilePhoto={'progress_screen_profile_image_placeholder'}
                                postData={'No-Equipment Home Workout'}
                                likeCount={25}
                                shareCount={2}
                                isVideo={true}
                                // goToProfile={() => {
                                //     this.onProfileScreen({name:'MELISSA MARIA CAMILA',email:'melissamaria@website.com'})}
                                // }
                            />
                            {
                                this.state.postImage &&
                                <PostCard
                                    // type={'video'}
                                    postMessage={this.state.postMessage}
                                    postImage={this.state.postImage || ' '}
                                    title={this.state.title || ' '}
                                    subTitle={'Today at 16:34'}
                                    profilePhoto={'progress_screen_profile_image_placeholder'}
                                    postData={this.state.postData || ' '}
                                    likeCount={25}
                                    shareCount={2}
                                    isVideo={false}
                                    // goToProfile={() => {
                                    //     this.onProfileScreen({name:'MELISSA MARIA CAMILA',email:'melissamaria@website.com'})}
                                    // }
                                /> || <View/>
                            }
                        </View>
                    </View>
                </ScrollView>
                <BottomTab tabData={tabBarAfterLogin} navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue,
    },
    profileView: {
        backgroundColor: Constant.color.lightSky, flexDirection:'row', alignItems: 'center',
        padding: hp('2%'), flex: 0.7
    },
    viewProfileView: {
        backgroundColor: Constant.color.lightblue,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.3
    },
    viewProfileText: {
        color: Constant.color.white,
        fontFamily: Constant.font.robotoBold,
        textAlign: 'center',
        fontSize: Constant.fontSize.xsmall
    },
    headerView: {
        paddingTop: hp('3%')
    }
});

export {Social};
