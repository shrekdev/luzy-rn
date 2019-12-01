import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity, Animated, ScrollView} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {homeCardData, meditationAudioList, tabBarWithBack} from '../../helper/appConstant';
import {AppNavigator, BottomTab, BaseCard, VideoCard} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {HideNavigationBar} from 'react-native-navigation-bar-color';

class Meditation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            meditationRecordingList: props.meditationRecordingList || [],
        }
    }

    componentWillMount() {
        const {handleLocalAction, navigation, localActions} = this.props;
        handleLocalAction({type: localActions.ALL_RECORDING})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.meditationRecordingList !== this.state.meditationRecordingList) {
            this.setState({meditationRecordingList: nextProps.meditationRecordingList})
        }
    }

    showVideo = (index) => {
        this.props.navigation.navigate('MeditationVideo', {data: index})
    };

    render() {
        Constant.isANDROID && HideNavigationBar();

        const {container, header, subText} = styles;
        const {safeArea, navigation} = this.props;
        const {meditationRecordingList} = this.state;

        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
                    <BaseCard backgroundImage={'meditation_illustration'}/>
                    <View style={{
                        alignItems: 'center', paddingTop: hp('3%'),
                        paddingHorizontal: wp('10%'),
                    }}>
                        <Text style={header}>{'MEDITATION'}</Text>
                        <Text
                            style={subText}>{'Choose one of our meditation audio files from the library, relax and enjoy!'}
                        </Text>
                        {
                            meditationRecordingList.map((item, index) => {
                                return (
                                    <VideoCard
                                        key={index}
                                        item={item}
                                        isMeditationScreen={true}
                                        onPress={() => this.showVideo(index)}
                                    />
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
    },
    header: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        letterSpacing: 0,
        color: Constant.color.blue
    },
    subText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.blue,
        textAlign: 'center'
    },
});

export {Meditation};