import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {tabBarWithBack, meditationAudioList} from '../../helper/appConstant';
import {BaseCard, BottomTab} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {Player} from 'react-native-audio-toolkit';
import {Slider} from "react-native-elements";

const progressWidth = parseInt(hp('25%'));
/*https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3*/

let filename = 'test_audio.mp3';

class MeditationVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlay: false,
            progress: 0,
            volume: 0,
            repeatAudio: false,
            heightOffset: new Animated.Value(0),
            selectedIndex: props.navigation.state.params.data,
            meditationData: props.meditationRecordingList[props.navigation.state.params.data]
        };
        this.player = null;
        this.equilizerViewArray = new Array(50).fill(0)
    }

    componentWillMount() {
        this._playerInitialize()
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.visibleTab !== 'Free Time' && this.props.visibleTab !== nextProps.visibleTab) {
            this._onStop();
        }
    }

    componentWillUnmount() {
        clearInterval(this._progressInterval);
        this._onStop();
    }

    _playerInitialize = () => {
        const {meditationData} = this.state;

        this.player = new Player(meditationData.AudioLink, {autoDestroy: false})
            .prepare(error =>{})
            .on('ended', () => {
                clearInterval(this._progressInterval);
                this.setState({isPlay: false});
                if (this.state.repeatAudio) {
                    this._onPlayPause();
                }
            });
        this.lastSeek = 0;
    }

    _shouldUpdateProgressBar() {
        return Date.now() - this.lastSeek > 200;
    }

    _onStart = () => {
        this._progressInterval = setInterval(() => {
            console.log('In setInterval');
            if (this.player && this._shouldUpdateProgressBar()) {
                this.setState({progress: Math.max(0, this.player.currentTime) / this.player.duration});
            }
        }, 100);
    };


    _onPlayPause = () => {
        this.setVolume('close');
        if (!this.player) return;
        const {isPlay} = this.state;
        if (isPlay) {
            this.player.pause(() => {
                this.setState({
                    isPlay: false
                });
                clearInterval(this._progressInterval);
            });
        } else {
            this.player.play(() => {
                this.setState({isPlay: true})
            });
            this._onStart();
        }
    };

    _onRepeat = () => {
        this.setVolume('close');
        this.setState({repeatAudio: !this.state.repeatAudio})
    };

    _onStop = () => {
        if (!this.player) return;
        this.player.stop(() => {
            this.setState({
                progress: 0,
                isPlay: false
            });
            clearInterval(this._progressInterval);
        });
    };

    _seek(percentage) {
        this.setVolume('close');
        if (!this.player) return;
        this.lastSeek = Date.now();
        let position = percentage * this.player.duration;
        this.player.seek(position);
        this.setState({progress: percentage})
    }

    _forward = () => {
        this.setVolume('close')
        if (this.state.selectedIndex < meditationAudioList.length - 1) {
            this.setState({selectedIndex: this.state.selectedIndex + 1});
            this._onStop();
            this._playerInitialize();
        }
    };

    _backward = () => {
        this.setVolume('close')
        if (this.state.selectedIndex > 0) {
            this.setState({selectedIndex: this.state.selectedIndex - 1});
            this._onStop();
            this._playerInitialize();
        }
    };

    setVolume = (type) => {
        if (type === 'open') {
            Animated.timing(this.state.heightOffset, {
                duration: 300,
                toValue: progressWidth,
            }).start();
        } else if (type === 'close') {
            Animated.timing(this.state.heightOffset, {
                duration: 0,
                toValue: 0,
            }).start();
        }
    };

    renderEquilizerView = (data, index) => {
        const {progress} = this.state;
        let barHeight = JSON.stringify(Math.floor(Math.random() * 80) + 10) + '%';
        return (
            <View style={{
                backgroundColor: (index < progress * 50) && Constant.color.lightblue || Constant.color.white,
                height: barHeight, ...styles.equilizerBar
            }}
                  key={index}/>
        )
    }

    changeVolume = (percentage) => {
        this.player.volume = 1 - percentage;
    };

    render() {
        const {isPlay, heightOffset, selectedIndex, meditationData} = this.state;
        const { container, header, subText, audioTrackView, audioTrackStyle, audioTrackThumbStyle,
            playListButtonView, volumeTrackStyle, volumeTrackView, equilizerView, headerTextView} = styles;
        const {safeArea, navigation, data} = this.props;


        let seconds = parseInt(this.player.duration / 1000);
        let minutes = (seconds > 60) && Math.floor(seconds / 60) || 0;
        seconds = seconds % 60;
        if (minutes < 10) minutes = '0' + JSON.stringify(minutes);
        if (seconds < 10) seconds = '0' + JSON.stringify(seconds);

        let currentSeconds = parseInt(this.player.currentTime / 1000);
        let currentMinutes = (currentSeconds > 60) && Math.floor(currentSeconds / 60) || 0;
        currentSeconds = currentSeconds % 60;
        if (currentMinutes < 10) currentMinutes = '0' + JSON.stringify(currentMinutes);
        if (currentSeconds < 10) currentSeconds = '0' + JSON.stringify(currentSeconds);

        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <BaseCard backgroundImage={meditationData.PictureLink} containerStyle={{height: hp('30%')}}/>
                <View style={headerTextView}>
                    <Text style={{...header, fontSize: meditationData.Name && meditationData.Name.length >= 10 ? normalize(22) : normalize(32),}}>
                        {meditationData.Name}
                    </Text>
                    <Text style={subText}>{'A ' + meditationData.Duration + ' audio for meditation and relaxation.'}</Text>
                </View>

                <View style={equilizerView}>
                    {
                        this.equilizerViewArray.map((data, index) => {
                            return this.renderEquilizerView(data, index);
                        })
                    }
                </View>
                <View style={{flex: 1}}>
                    <View style={audioTrackView}>
                        <Text style={subText}>{currentMinutes + ':' + currentSeconds}</Text>
                        <View style={{width: wp('70%')}}>
                            <Slider
                                step={0.01}
                                onValueChange={(percentage) => this._seek(percentage)}
                                value={this.state.progress}
                                maximumTrackTintColor={Constant.color.white}
                                minimumTrackTintColor={Constant.color.lightblue}
                                thumbTintColor={Constant.color.lightblue}
                                trackStyle={audioTrackStyle}
                                thumbStyle={audioTrackThumbStyle}
                            />
                        </View>
                        <Text style={subText}>{minutes + ':' + seconds}</Text>
                    </View>
                    <View style={playListButtonView}>
                        <TouchableOpacity onPress={this._onRepeat}>
                            <Image style={{height: wp('10%'), width: wp('10%')}}
                                   resizeMode='contain'
                                   source={{uri: this.state.repeatAudio && 'player_repeat_active_icon' || 'player_repeat_icon'}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._backward}>
                            <Image style={{height: wp('10%'), width: wp('10%')}}
                                   resizeMode='contain'
                                   source={{uri: 'player_rewind_icon'}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onPlayPause}>
                            <Image style={{height: wp('15%'), width: wp('15%')}}
                                   resizeMode='contain'
                                   source={{uri: isPlay && 'player_pause_icon' || 'player_play_icon'}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._forward}>
                            <Image style={{height: wp('10%'), width: wp('10%')}}
                                   resizeMode='contain'
                                   source={{uri: 'player_forward_icon'}}
                            />
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity onPress={() => this.setVolume('open')}>
                                <Image style={{height: wp('10%'), width: wp('10%')}}
                                       resizeMode='contain'
                                       source={{uri: 'player_volume_icon'}}
                                />
                            </TouchableOpacity>
                            <Animated.View style={{height: heightOffset, ...volumeTrackView }}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <Slider
                                        step={0.1}
                                        onValueChange={(percentage) => this.changeVolume(percentage)}
                                        value={this.state.volume}
                                        maximumTrackTintColor={Constant.color.green}
                                        minimumTrackTintColor={Constant.color.white}
                                        thumbTintColor={Constant.color.green}
                                        trackStyle={volumeTrackStyle}
                                        thumbStyle={audioTrackThumbStyle}
                                        style={{height: hp('15%')}}
                                        orientation={'vertical'}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => this.setVolume('close')}>
                                    <Image style={{height: wp('10%'), width: wp('10%')}}
                                           resizeMode='contain'
                                           source={{uri: 'player_volume_icon_on'}}
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue,
    },
    headerTextView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('3%')
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(32),
        letterSpacing: 0,
        color: Constant.color.white
    },
    subText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: normalize(13),
        color: Constant.color.white,
        textAlign: 'center'
    },
    volumeTrackView: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)', borderBottomRightRadius: hp('2.5%'),
        borderTopLeftRadius: hp('1%'), borderTopRightRadius: hp('1%'),
        borderBottomLeftRadius: hp('2.5%'), overflow: 'hidden',
    },
    audioTrackView: {
        marginTop: hp('1%'),
        marginHorizontal: wp('5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    volumeTrackStyle: {
        width: hp('1%'),
        borderWidth: 1.5,
        borderColor: Constant.color.white,
        borderRadius: 5
    },
    audioTrackStyle: {
        height: hp('1%'),
        borderWidth: 1.5,
        borderColor: Constant.color.white,
        borderRadius: 5
    },
    audioTrackThumbStyle: {
        borderWidth: 1.5,
        borderColor: Constant.color.white,
        height: hp('2%'),
        width: hp('2%')
    },
    playListButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('10%'),
    },
    equilizerView: {
        height: hp('10%'), flexDirection: 'row',
        alignItems: 'flex-end', marginHorizontal: wp('10%')
    },
    equilizerBar: {
        marginHorizontal: '0.5%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '1%',
    }
});

export {MeditationVideo};