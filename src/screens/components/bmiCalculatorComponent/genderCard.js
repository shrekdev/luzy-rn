import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import Constant from '../../../helper/themeHelper';
import {AppButton} from "../../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';

class GenderCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(".....", this.props.gender)
        const {onGenderClick, onOkClick, onCloseClick,} = this.props;
        const {center, detailView, cardTitleText, cardSubtitleText, cardTopView, cardView, rowSpace} = styles;
        return (
            <View style={cardView}>
                <View style={cardTopView}>
                    <View style={rowSpace}>
                        <TouchableOpacity onPress={onCloseClick}>
                            <Image source={{uri: 'close'}} style={{height: hp('5%'), width: wp('8%')}}
                                   resizeMode='contain'/>
                        </TouchableOpacity>
                    </View>
                    <View style={center}>
                        <Image source={{uri: this.props.cardImage}} style={{height: hp('9%'), width: wp('23%')}}
                               resizeMode='contain'/>
                        <Text style={cardTitleText}>{this.props.cardText}</Text>
                    </View>
                </View>
                <View style={cardTopView}>
                    <View style={detailView}>
                        <View style={[center, {paddingVertical: hp('1%')}]}>
                            <Image source={{uri: 'male'}} style={{height: hp('7%'), width: wp('10%')}}
                                   resizeMode='contain'/>
                            <Text style={cardSubtitleText}>{this.props.titleMale}</Text>
                            <TouchableOpacity onPress={() => onGenderClick("Male")}>
                                {
                                    this.props.gender === "Male" &&
                                    <View style={{
                                        borderRadius: 12,
                                        backgroundColor: Constant.color.blue,
                                        height: 24,
                                        width: 24
                                    }}/>
                                    || <View style={{
                                        borderRadius: 12,
                                        borderColor: Constant.color.blue,
                                        borderWidth: 6,
                                        backgroundColor: Constant.color.white,
                                        height: 24,
                                        width: 24
                                    }}/>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 1, backgroundColor: Constant.color.lightSky}}/>
                        <View style={center}>
                            <Image source={{uri: 'female'}} style={{height: hp('7%'), width: wp('10%')}}
                                   resizeMode='contain'/>
                            <Text style={cardSubtitleText}>{this.props.titleFemale}</Text>
                            <TouchableOpacity onPress={() => onGenderClick("Female")}>
                                {
                                    this.props.gender === "Female" &&
                                    <View style={{
                                        borderRadius: 12,
                                        backgroundColor: Constant.color.blue,
                                        height: 24,
                                        width: 24
                                    }}/>
                                    || <View style={{
                                        borderRadius: 12, borderColor: Constant.color.blue, borderWidth: 6,
                                        backgroundColor: Constant.color.white, height: 24, width: 24
                                    }}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <AppButton
                    containerStyle={{
                        backgroundColor: Constant.color.lightblue,
                        marginTop: hp('3%'),
                        marginHorizontal: wp('4%'),
                    }}
                    title={'OK'}
                    onPress={onOkClick}/>
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
    cardTitleText: {
        marginVertical: hp('1%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.blue
    },
    cardView: {
        backgroundColor: Constant.color.white,
        borderRadius: 18,
        paddingVertical: hp('2.5%'),
    },
    cardTopView: {
        paddingHorizontal: wp('4%'),
    },
    detailView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('1%'),
        paddingHorizontal: wp('10%'),
        paddingVertical: hp('5%')
    },
    cardSubtitleText: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.darkBlue,
        marginVertical: hp('1%')
    },

});

export {GenderCard}