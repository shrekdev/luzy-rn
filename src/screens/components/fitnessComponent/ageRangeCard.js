import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import Constant from '../../../helper/themeHelper';
import { ageRangeList } from '../../../helper/appConstant'
import { AppButton } from "../../common";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helper/responsiveScreen';

class AgeRangeCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderListItem = (data, index) => {
        const { navigation, safeArea } = this.props;
        const { filterSubtitleText, rowCenter } = styles;
        return <View key={index}>
            <TouchableOpacity style={rowCenter} onPress={() => this.props.onAgeRangeSelect(data, index)}>
                {
                    this.props.ageRangeArrayTemp.includes(data) &&
                    <Image source={{ uri: 'checked' }} style={{ height: hp('6%'), width: wp('6%'), marginLeft: index % 2 != 0 && wp('6%') || 0 }} resizeMode='contain' />
                    || <Image source={{ uri: 'unchecked' }} style={{ height: hp('6%'), width: wp('6%'), marginLeft: index % 2 != 0 && wp('6%') || 0 }} resizeMode='contain' />
                }
                <Text style={[filterSubtitleText, { marginLeft: wp('2%'), width: wp('25%') }]}>{data}</Text>
            </TouchableOpacity>
            <View style={{ height: 1, width: wp('33%'), alignSelf: 'flex-end', backgroundColor: Constant.color.lightSky, flexDirection: "row", marginVertical: hp('1%') }}></View>
        </View>
    };

    render() {
        const { onClearClick, onOkClick, onCloseClick, } = this.props;
        const { center, rowCenter, clearText, filterTitleText, scrollviewContainer, filterTopView, modalView, filterView, rowSpace } = styles;
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
                        <Text style={filterTitleText}>{(this.props.filterText).toUpperCase()}</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: hp('31%'), backgroundColor: Constant.color.white }}
                    contentContainerStyle={scrollviewContainer}>
                    {
                        ageRangeList.map((data, index) => this.renderListItem(data, index))
                    }
                    <View style={{ width: 1, backgroundColor: Constant.color.lightSky, position: 'absolute', top: 15, bottom: 15, left: wp('42%') }}></View>
                </ScrollView>
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
        marginTop: hp('1%'),
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
    scrollviewContainer: {
        paddingHorizontal: wp('6%'),
        paddingVertical : hp('2%'),
        marginLeft:wp('3%'),
        // justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center'
    }
});

export { AgeRangeCard }