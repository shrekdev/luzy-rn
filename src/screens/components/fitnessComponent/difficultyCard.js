import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import Constant from '../../../helper/themeHelper';
import {  AppButton } from "../../common";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helper/responsiveScreen';

class DifficultyCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {  onClearClick, onOkClick, onCloseClick, onBeginnerCheck, onIntermediateCheck, onAdvancedCheck } = this.props;
        const { center, rowCenter, clearText, filterTitleText, filterSubtitleText, filterTopView, filterView, rowSpace } = styles;
        return (
            <View style={filterView}>
                <View style={filterTopView}>
                    <View style={rowSpace}>
                        <TouchableOpacity onPress={onCloseClick}>
                            <Image source={{ uri: 'close' }} style={{ height: hp('5%'), width: wp('8%') }} resizeMode='contain' />
                        </TouchableOpacity>
                        <TouchableOpacity style={rowCenter} onPress={onClearClick}>
                            <Text style={clearText}>Clear selection</Text>
                            <Image source={{ uri: 'clear_filters' }} style={{ height: hp('5%'), width: wp('5%'), }} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                    <View style={center}>
                        <Image source={{ uri: this.props.filterImage }} style={{ height: hp('9%'), width: wp('23%') }} resizeMode='contain' />
                        <Text style={filterTitleText}>{this.props.filterText.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: wp('19%'), paddingVertical: hp('4%') }}>
                    <TouchableOpacity onPress={onBeginnerCheck} style={[rowCenter, { marginLeft: wp('10%') }]}>
                        {
                            this.props.difficultyArrayTemp.includes('Beginner') &&
                            <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                            || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                        }
                        <Text style={[filterSubtitleText, { marginLeft: wp('3%') }]}>{this.props.titleBeginner}</Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Constant.color.lightSky, marginVertical: hp('1%') }}/>

                    <TouchableOpacity onPress={onIntermediateCheck} style={[rowCenter, { marginLeft: wp('10%') }]}>
                        {
                            this.props.difficultyArrayTemp.includes('Intermediate') &&
                            <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                            || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                        }
                        <Text style={[filterSubtitleText, { marginLeft: wp('3%') }]}>{this.props.titleIntermediate}</Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Constant.color.lightSky, marginVertical: hp('1%') }}/>

                    <TouchableOpacity onPress={onAdvancedCheck} style={[rowCenter, { marginLeft: wp('10%') }]}>
                        {
                            this.props.difficultyArrayTemp.includes('Advanced') &&
                            <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                            || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                        }
                        <Text style={[filterSubtitleText, { marginLeft: wp('3%') }]}>{this.props.titleAdvanced}</Text>
                    </TouchableOpacity>
                </View>
                <AppButton
                    containerStyle={{ backgroundColor: Constant.color.lightblue, marginTop: hp('3%'), marginHorizontal: wp('4%'), }}
                    title={'OK'}
                    onPress={onOkClick} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.xmini,
        color: Constant.color.lightGray,
        marginRight: wp('1%')
    },
    modalView: {
        backgroundColor: 'rgba(2,21,42,0.9)',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        height: hp('75%'),
        justifyContent: 'center'
    },
    filterTitleText: {
        marginVertical: hp('1%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.blue
    },
    filterView: {
        backgroundColor: Constant.color.white,
        borderRadius: 18,
        paddingVertical: hp('2.5%'),
    },
    filterTopView: {
        paddingHorizontal: wp('4%'),
    },
    foodingView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('1%'),
        paddingHorizontal: wp('8%')
    },
    filterSubtitleText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.small,
        color: Constant.color.darkBlue
    },

});

export { DifficultyCard }