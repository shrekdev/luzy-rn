import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import Constant from '../../../helper/themeHelper';
import { ingredientsList } from '../../../helper/appConstant'
import ModalDropdown from 'react-native-modal-dropdown'
import {  AppButton } from "../../common";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helper/responsiveScreen';

const dd_IngredientsArray = ['Ingredients you don\'t want', 'Ingredients you want',];

class IngredientsCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderIngredientListItem = (data, index) => {
        const { navigation, safeArea } = this.props;
        const { filterSubtitleText, rowCenter } = styles;
        return this.props.ingredienType === 'Ingredients you want' &&
            <TouchableOpacity style={rowCenter} onPress={() => this.props.onIngredientsSelect(data, index)}>
                {
                    this.props.ingredientsWantArrayTemp.includes(data) &&
                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%'), marginLeft: index % 2 != 0 && wp('6%') || 0 }} resizeMode='contain' />
                    || <Image source={{ uri: 'unchecked_white' }} style={{ height: hp('6%'), width: wp('6%'), marginLeft: index % 2 != 0 && wp('6%') || 0 }} resizeMode='contain' />
                }
                <Text style={[filterSubtitleText, { marginLeft: wp('2%'), width: wp('28%') }]}>{data}</Text>
            </TouchableOpacity>
            ||
            <TouchableOpacity style={rowCenter} onPress={() => this.props.onIngredientsSelect(data, index)}>
                {
                    this.props.ingredientsDontWantArrayTemp.includes(data) &&
                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%'), marginLeft: index % 2 != 0 && wp('6%') || 0 }} resizeMode='contain' />
                    || <Image source={{ uri: 'unchecked_white' }} style={{ height: hp('6%'), width: wp('6%'), marginLeft: index % 2 != 0 && wp('6%') || 0 }} resizeMode='contain' />
                }
                <Text style={[filterSubtitleText, { marginLeft: wp('2%'), width: wp('28%') }]}>{data}</Text>
            </TouchableOpacity>

    };

    render() {
        const {  onIngredientTypeSelect,onClearClick, onOkClick, onCloseClick, onLowCostCheck, onMediumCostCheck, onHighCostCheck } = this.props;
        const { center, rowCenter, clearText, dd_options, dd_text, dd_btn, dd_arrow, dd_icon, filterTitleText, filterSubtitleText, filterTopView, modalView, filterView, rowSpace } = styles;
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
                        <Text style={filterTitleText}>{this.props.filterText}</Text>
                    </View>
                </View>
                <View>
                <View style={[rowCenter, { paddingHorizontal: wp('4%') }]}>
                    <Image resizeMode='contain'
                        style={{ ...dd_icon }}
                        source={{ uri: this.props.ingredienTypeImage }} />
                    <ModalDropdown
                        options={dd_IngredientsArray}
                        defaultValue={this.props.ingredienType}
                        onSelect={(index, ingredienType) => onIngredientTypeSelect(index, ingredienType)}
                        style={[dd_btn]}
                        textStyle={[dd_text, { height: hp('6%') }]}
                        dropdownStyle={dd_options} />
                    <Image resizeMode='contain'
                        style={{ ...dd_arrow }}
                        source={{ uri: 'drop_down_dark_arrow' }}
                        pointerEvents={'none'}
                    />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: hp('2%'), height: hp('20%'), backgroundColor: Constant.color.lightSky }}
                    contentContainerStyle={{
                        paddingHorizontal: wp('3%'),
                        paddingVertical: ('2%'),
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignSelf: 'center'
                    }}>
                    {
                        ingredientsList.map((data, index) => this.renderIngredientListItem(data, index))
                    }
                    <View style={{ width: 1, backgroundColor: Constant.color.white, position: 'absolute', top: 15, bottom: 15, left: wp('45%') }}/>
                </ScrollView>
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
    dd_btn: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
        height: hp('6.5%'),
        borderRadius: 8
    },
    dd_image: {
        width: 40,
        height: 40,
        left: wp('3%'),
        top: hp('0.5%'),
        position: 'absolute'
    },
    dd_text: {
        // paddingVertical: hp('2.3%'),
        marginTop: hp('2.3%'),
        paddingHorizontal: wp('15%'),
        fontSize: Constant.fontSize.xSmall,
        color: Constant.color.navyblue,
    },
    dd_options: {
        width: wp('82%'),
        height: hp('12%'),
        borderColor: Constant.color.lightSky,
        borderWidth: 2,
        borderRadius: 3,
    },
    dd_icon: {
        position: 'absolute',
        left: wp('7.8%'),
        zIndex: 10,
        height: hp('5%'),
        width: wp('8%'),
        top: hp('0.7%')
    },
    dd_arrow: {
        position: 'absolute',
        right: wp('7%'),
        zIndex: 10,
        height: hp('5%'),
        width: wp('6%'),
        top: hp('0.8%')
    },

});

export { IngredientsCard }