import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image, ScrollView, Animated, TextInput, Linking} from 'react-native';
import Constant from '../../../helper/themeHelper';
import {AppNavigator, BottomTab, style} from "../../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {tabBarWithBack} from '../../../helper/appConstant'

class GeneralInformations extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {container} = styles;
        const {safeArea, navigation} = this.props;
        const detail = (navigation.state && navigation.state.params) && navigation.state.params.detail || null
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ScrollView
                    contentContainerStyle={{paddingBottom: 20}}
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical: hp('3%')}}>
                        <Text style={style.header}>{'GENERAL INFORMATIONS'}</Text>
                        <Text style={{...style.subText, fontFamily: Constant.font.robotoBold, fontSize: Constant.fontSize.medium}}>
                            {'User informations'}
                        </Text>
                        <View style={{backgroundColor: Constant.color.darkBlue, flexDirection:'row', paddingHorizontal: wp('10%'),
                        paddingVertical: hp('1%')}}>
                            <View style={{flex: 1}}>
                            <Text style={{
                                fontFamily: Constant.font.robotoRegular,
                                fontSize: Constant.fontSize.xsmall,
                                color: Constant.color.white,
                            }}>
                                {'Name: '}
                            </Text>
                            </View>
                            <View style={{flex: 1}}>
                            <Text style={{
                                fontFamily: Constant.font.robotoRegular,
                                fontSize: Constant.fontSize.xsmall,
                                color: Constant.color.white,
                            }}>
                                {'Gender: '}
                            </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue,
    },
});

export {GeneralInformations};
