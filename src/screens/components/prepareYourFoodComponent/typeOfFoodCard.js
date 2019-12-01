import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import Constant from '../../../helper/themeHelper';
import {  AppButton } from "../../common";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helper/responsiveScreen';

class TypeOfFoodCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { onClearClick, onOkClick, onCloseClick, onBreakfastCheck, onLunchCheck, onDinnerCheck, onVegCheck, onDiabeticsCheck } = this.props;
        const { center, rowCenter, clearText, foodingView, filterTitleText, filterSubtitleText, filterTopView, modalView, filterView, rowSpace } = styles;
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
                        <Image source={{ uri: this.props.filterImage}} style={{ height: hp('9%'), width: wp('23%') }} resizeMode='contain' />
                        <Text style={filterTitleText}>{this.props.filterText}</Text>
                    </View>
                </View>
                <View style={filterTopView}>
                    <View style={foodingView}>
                        <View style={center}>
                            <Text style={filterSubtitleText}>{this.props.titleBreakFast}</Text>
                            <TouchableOpacity onPress={onBreakfastCheck}>
                                {
                                    this.props.typeOfFoodArrayTemp.includes('Breakfast') &&
                                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                    || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 1, backgroundColor: Constant.color.lightSky }}/>
                        <View style={center}>
                            <Text style={filterSubtitleText}>{this.props.titleLunch}</Text>
                            <TouchableOpacity onPress={onLunchCheck}>
                                {
                                    this.props.typeOfFoodArrayTemp.includes('Lunch') &&
                                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                    || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 1, backgroundColor: Constant.color.lightSky }}/>
                        <View style={center}>
                            <Text style={filterSubtitleText}>{this.props.titleDinner}</Text>
                            <TouchableOpacity onPress={onDinnerCheck}>
                                {
                                    this.props.typeOfFoodArrayTemp.includes('Dinner') &&
                                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                    || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: Constant.color.lightSky, marginTop: hp('1%'),
                        marginHorizontal: wp('2%') }}/>
                    <View style={foodingView}>
                        <View style={[center, { paddingVertical: hp('1%') }]}>
                            <Image source={{ uri: 'vegetarian_food' }} style={{ height: hp('8%'), width: wp('12%') }} resizeMode='contain' />
                            <Text style={filterSubtitleText}>{this.props.titleVegetarian}</Text>
                            <TouchableOpacity onPress={onVegCheck}>
                                {
                                    this.props.typeOfFoodArrayTemp.includes('Vegetarian') &&
                                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                    || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 1, backgroundColor: Constant.color.lightSky }}/>
                        <View style={center}>
                            <Image source={{ uri: 'food_for_diabetics' }} style={{ height: hp('8%'), width: wp('12%') }} resizeMode='contain' />
                            <Text style={filterSubtitleText}>{this.props.titleDiabetics}</Text>
                            <TouchableOpacity onPress={onDiabeticsCheck}>
                                {
                                    this.props.typeOfFoodArrayTemp.includes('Diabetics') &&
                                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                    || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%') }} resizeMode='contain' />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
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

export { TypeOfFoodCard }