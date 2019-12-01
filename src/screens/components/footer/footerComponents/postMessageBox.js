import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text, Image, TextInput, TouchableOpacity, ScrollView
} from "react-native";
import Constant from '../../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../../helper/responsiveScreen';
import {AppButton} from "../../../common";
import ImagePicker from 'react-native-image-picker';
import Video from "react-native-video";
import {HideNavigationBar} from "react-native-navigation-bar-color";

/*const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};*/

class PostMessageBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mediaUri: null,
            fileName: '',
            type: '',
            uploadMediaHeight: 0,
            isImage: false
        }
    }

    uploadMediaForAndroid = () => {
        const options = {
            title: 'Select the perfect view',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            customButtons: [
                {name: 'video', title: 'Take Video...'},
                {name: 'video_library', title: 'Choose Video from library...'},
            ],
            maxWidth: 1920,
            maxHeight: 1080,
            noData: true
        };

        const optionsVideo = {
            storageOptions: {
                skipBackup: true,
                path: 'movies'
            },
            noData: true,
            mediaType: 'video'
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton === 'video') {
                ImagePicker.launchCamera(optionsVideo, (response)  => {
                    this.setState({
                        mediaUri: {uri: response.uri},
                        fileName: response.fileName,
                        type: response.type,
                        uploadMediaHeight: hp('15%'),
                        isImage: (response.height && response.width) && true || false
                    });

                });
            } else if (response.customButton === 'video_library') {
                ImagePicker.launchImageLibrary(optionsVideo, (response)  => {
                    this.setState({
                        mediaUri: {uri: response.uri},
                        fileName: response.fileName,
                        type: response.type,
                        uploadMediaHeight: hp('15%'),
                        isImage: (response.height && response.width) && true || false
                    });
                });
            } else {
                this.setState({
                    mediaUri: {uri: response.uri},
                    fileName: response.fileName,
                    type: response.type,
                    uploadMediaHeight: hp('15%'),
                    isImage: (response.height && response.width) && true || false
                });
            }
        });
    };

    uploadMedia = () => {
        console.log('in function')
        ImagePicker.showImagePicker({
            mediaType: 'mixed'
        }, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    mediaUri: {uri: response.uri},
                    fileName: response.fileName,
                    type: response.type,
                    uploadMediaHeight: hp('15%'),
                    isImage: (response.height && response.width) && true || false
                });
            }
        });
    };


    render() {
        const {postText, onChangeText, onPost} = this.props;
        const {textInput, inputView, postButton, shareImageView} = styles;
        const {uploadMediaHeight, isImage} = this.state;
        return (
            <View style={inputView}>
                <View style={{
                    paddingHorizontal: wp('3%'),
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: hp('0.5%'),
                        paddingTop: hp('1.5%'),
                    }}>
                        <Image source={{uri: 'social_posting_icon'}}
                               style={{height: hp('5%'), width: wp('9%')}}
                               resizeMode={'contain'}/>
                        <TextInput placeholder={'Post something...'}
                                   multiline={true}
                                   placeholderTextColor={Constant.color.lightGray}
                                   style={textInput}
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   value={postText}
                                   onChangeText={(postText) => {
                                       onChangeText(postText)
                                   }}
                                   underlineColorAndroid={Constant.color.transparent}
                                   textAlignVertical={'top'}
                        />
                    </View>
                    <TouchableOpacity style={[shareImageView,
                        {backgroundColor: (uploadMediaHeight === 0) && Constant.color.lightGray || Constant.color.blue}]}
                                      onPress={Constant.isANDROID ? this.uploadMediaForAndroid : this.uploadMedia}>
                        <Image source={{uri: 'social_add_media_icon'}}
                               style={{height: hp('5%'), width: wp('9%')}}
                               resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <AppButton
                        containerStyle={postButton}
                        textStyle={{fontSize: Constant.fontSize.small}}
                        title={'POST'}
                        onPress={onPost}
                    />
                </View>
                <View style={{height: this.state.uploadMediaHeight, overflow: 'hidden',
                    marginTop: hp('1%'), flexDirection: 'row'}}>
                    <View style={{height: '100%', width: '85%'}}>
                    {(isImage) &&
                    <Image source={this.state.mediaUri}
                           style={{height: '100%', width: '100%'}}
                           resizeMode={'cover'}/>
                    ||
                    <Video
                        source={this.state.mediaUri} // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onLoadStart={() => Constant.isANDROID && HideNavigationBar()}
                        controls={false}
                        paused={true}
                        resizeMode="stretch"              // Callback when video cannot be loaded
                        style={{height: '100%', width: '100%'}}
                        onError={(err) => console.log(".......", err)}/>
                    }
                       {
                           (!isImage) &&
                           <View style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            alignItems: 'center',
                            justifyContent: 'center'}}>
                            <Image source={{uri: 'social_video_play_icon'}}
                                   style={{height: wp('12%'), width: wp('12%')}}
                                   resizeMode={'contain'}/>
                        </View>
                       }
                    </View>
                    <TouchableOpacity style={{
                        height: '100%', width: '15%', backgroundColor: Constant.color.lightSky,
                        justifyContent: 'center', alignItems: 'center'
                    }} onPress={() => {
                        this.setState({
                            mediaUri: null,
                            fileName: '',
                            type: '',
                            uploadMediaHeight: 0
                        })
                    }}>
                        <Image source={{uri: 'social_close_pop_up'}}
                               style={{height: '40%', width: '40%'}}
                               resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        padding: wp('2%'),
                        borderBottomLeftRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                        <Image source={{uri: (isImage) && 'social_add_media_icon' || 'social_video_icon'}}
                               style={{height: wp('8%'), width: wp('8%')}}
                               resizeMode={'contain'}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: Constant.fontSize.mini,
        fontFamily: Constant.font.robotoRegular,
        padding: hp('1%'),
        color: Constant.color.blue,
        flex: 1,
        marginLeft: wp('1%'),
        marginRight: wp('10%'),
        height: hp('8%'),
        maxHeight: hp('8%')
    },
    inputView: {
        backgroundColor: Constant.color.white,
        marginVertical: hp('1%'),
        borderRadius: 15,
        overflow: 'hidden'
    },
    postButton: {
        backgroundColor: Constant.color.lightblue,
        marginTop: hp('1%'),
        paddingTop: hp('1.5%'),
        paddingVertical: hp('1%')
    },
    shareImageView: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: wp('2%'),
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export {PostMessageBox};
