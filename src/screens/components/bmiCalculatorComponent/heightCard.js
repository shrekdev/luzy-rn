import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, Platform, ScrollView
} from "react-native";
import Constant, {normalize} from '../../../helper/themeHelper';
import {AppButton, ScrollPicker} from "../../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';

class HeightCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onMomentumScrollEnd = () => {
    }

    onScrollEndDrag = () => {
    }

    onTouchStart = () => {
    }

    render() {
        const {onValueChange, onOkClick, onCloseClick,} = this.props;
        const {center, detailView, cardTitleText, cardSubtitleText, unitText, cardTopView, cardView, rowSpace, wheelView, wheelSeprator, wheelText} = styles;
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
                        <Text style={cardSubtitleText}>{'SELECT HEIGHT:'}</Text>
                    </View>
                </View>
                <View style={cardTopView}>
                    <View style={detailView}>
                        <ScrollPicker
                            dataSource={this.props.dataSource}
                            selectedIndex={this.props.selectedIndex}
                            onValueChange={(data, selectedIndex) => {
                                onValueChange(data, selectedIndex)
                            }}
                            panResponder={this.props.panResponder}
                            containerStyle={wheelView}
                            sepratorStyle={wheelSeprator}
                            textStyle={wheelText}
                            onMomentumScrollEnd={this.onMomentumScrollEnd}
                            onScrollEndDrag={this.onScrollEndDrag}
                            onTouchStart={this.onTouchStart}
                            wrapperHeight={hp('22%')}
                            itemHeight={hp('7%')}
                        />
                        <Text style={unitText}>{'cm'}</Text>
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
        paddingVertical: hp('3%'),
    },
    cardSubtitleText: {
        fontFamily: Constant.font.linateBold,
        color: Constant.color.darkBlue,
        fontSize: normalize(14),
    },
    unitText: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 85 : 92,
        right: 100,
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.darkBlue,
    },
    wheelView: {
        height: hp('22%'),
        backgroundColor: Constant.color.white,
        flex: 1,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    wheelSeprator: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? (hp('22%') - hp('9%')) / 2 : (hp('22%') - hp('7%')) / 2,
        height: hp('7%'),
        width: wp('15%'),
        borderTopColor: '#e5f2ff',
        borderTopWidth: 1,
        borderBottomColor: '#e5f2ff',
        borderBottomWidth: 1,
        alignSelf: 'center'
    },
    wheelText: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(25),
        textAlign: 'center'
    }

});

export {HeightCard}