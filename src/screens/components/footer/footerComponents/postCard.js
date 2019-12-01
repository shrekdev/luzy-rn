import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity, ImageBackground
} from "react-native";
import Constant from '../../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../../helper/responsiveScreen';
import {AppButton} from "../../../common";
import {ProfileText} from "./profileText";

class PostCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            shared: false,
            favorite: false
        }
    }

    onLike = () => {
        this.setState({liked: !this.state.liked})
    };

    onShare = () => {
        this.setState({shared: !this.state.shared})
    };

    onFavorite = () => {
        this.setState({favorite: !this.state.favorite})
    };

    render() {
        const {
            inputView, container, profieImageView, postText, bottomView, socialView, socialText,
            profileLeftView, editIconView, postImageStyle, postMessageText
        } = styles;
        const {
            type, postImage, title, subTitle, profilePhoto, postData, likeCount, shareCount, isEdit, postMessage,isProgress,
            goToProfile, isVideo
        } = this.props;

        const {liked, shared, favorite} = this.state;
        const likeIcon = (liked) && 'social_liked_icon' || 'social_like_icon';
        const shareIcon = (shared) && 'social_shared_icon' || 'social_share_icon';
        const favoriteIcon = (favorite) && 'social_added_to_favorite' || 'social_add_to_favorite';

        return (
            <View style={inputView}>
                <View style={container}>
                    <TouchableOpacity style={{...container, paddingHorizontal: 0}}
                    onPress={goToProfile && goToProfile}>
                        <View style={profieImageView}>
                            <Image source={{uri: profilePhoto}}
                                   style={{height: hp('6%'), width: hp('6%')}}
                                   resizeMode={'contain'}/>
                        </View>
                        <ProfileText
                            title={title}
                            subTitle={subTitle}
                            containerStyle={{marginLeft: wp('2%')}}
                        />
                    </TouchableOpacity>
                    {
                        (isEdit) &&
                        <View style={profileLeftView}>
                            <TouchableOpacity
                                style={editIconView}>
                                <Image source={{uri: 'social_edit_blue_icon'}}
                                       style={{height: '100%', width: '100%'}}
                                       resizeMode='contain'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={editIconView}>
                                <Image source={{uri: 'social_delete_post_dark_grey_icon'}}
                                       style={{height: '100%', width: '100%'}}
                                       resizeMode='contain'/>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <View style={{marginVertical: hp('1%')}}>
                        <View>
                            {
                                (postMessage) &&  <Text style={postMessageText}>{postMessage}</Text> || null
                            }

                               {(postImage) &&
                                   <ImageBackground source={{uri: postImage}}
                                                 style={postImageStyle}
                                                 resizeMode={'cover'}>
                                    <Image source={{uri: 'social_video_play_icon'}}
                                           style={{
                                               height: wp('12%'), width: wp('12%'),
                                               opacity: (isVideo) && 1 || 0
                                           }}
                                           resizeMode='contain'/>
                                </ImageBackground>
                               }
                                {
                                    (postData) && <Text style={postText}>{postData}</Text>
                                }
                            {
                                (isProgress) && <View style={{height: hp('20%'), backgroundColor: Constant.color.lightSky}}/>
                            }
                        </View>

                </View>
                <View style={bottomView}>
                    <TouchableOpacity style={socialView} onPress={this.onLike}>
                        <Image source={{uri: likeIcon}}
                               style={{height: wp('5%'), width: wp('5%')}}
                               resizeMode={'contain'}/>
                        <Text style={[socialText,
                            {color: (liked) && Constant.color.darkBlue || Constant.color.lightGray}]}>
                            {'Like '}{(likeCount > 0) && ('(' + likeCount + ')')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={socialView} onPress={this.onShare}>
                        <Image source={{uri: shareIcon}}
                               style={{height: wp('5%'), width: wp('5%')}}
                               resizeMode={'contain'}/>
                        <Text style={[socialText,
                            {color: (shared) && Constant.color.darkBlue || Constant.color.lightGray}]}>
                            {'Share'}{(shareCount > 0) && ('(' + shareCount + ')')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={socialView} onPress={this.onFavorite}>
                        <Image source={{uri: favoriteIcon}}
                               style={{height: wp('5%'), width: wp('5%')}}
                               resizeMode={'contain'}/>
                        <Text style={[socialText,
                            {color: (favorite) && Constant.color.darkBlue || Constant.color.lightGray}]}>
                            {'Favorite'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('3%')
    },
    inputView: {
        backgroundColor: Constant.color.white,
        paddingVertical: hp('1.5%'),
        marginVertical: hp('1%'),
        borderRadius: 15,
        overflow: 'hidden'
    },
    profieImageView: {
        borderRadius: hp('6%'), overflow: 'hidden'
    },
    postText: {
        marginVertical: hp('1%'),
        paddingHorizontal: wp('5%'),
        fontFamily: Constant.font.linateBold,
        color: Constant.color.darkBlue,
        fontSize: Constant.fontSize.small
    },
    bottomView: {
        paddingVertical: hp('0.5%'),
        flexDirection: 'row',
        paddingHorizontal: wp('5%'),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    socialView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%'
    },
    socialText: {
        fontFamily: Constant.font.robotoRegular,
        color: Constant.color.lightGray,
        fontSize: Constant.fontSize.xmini,
        marginLeft: '5%',
    },
    profileLeftView: {
        flex: 1, height: '100%', justifyContent: 'flex-end',
        alignItems: 'center', flexDirection: 'row'
    },
    editIconView: {
        height: wp('7%'), width: wp('7%'),
        borderRadius: wp('3.5%'), marginHorizontal: wp('1%'),
        backgroundColor: Constant.color.lightSky, padding: wp('1.5%')
    },
    postImageStyle: {
        height: hp('15%'), width: '100%', alignItems: 'center',
        justifyContent: 'center', marginVertical: hp('1%')
    },
    postMessageText: {
        marginVertical: hp('1%'),
        paddingHorizontal: wp('5%'),
        fontFamily: Constant.font.robotoRegular,
        color: Constant.color.black,
        fontSize: Constant.fontSize.xsmall
    }
});

export {PostCard};
