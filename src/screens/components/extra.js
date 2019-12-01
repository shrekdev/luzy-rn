import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppButton, DayTab} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';

const {font, fontSize, color} = Constant;

class Extra extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {container, label, cardTitle, centerIt} = styles;
        const {safeArea, navigation} = this.props;

        return (
            <View style={container}>
                <View>
                    <TouchableOpacity>
                        <Image source={{uri: 'close'}} style={{height: hp('5%'), width: wp('8%')}}
                               resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
                <View style={centerIt}>
                    <Image source={{uri: 'total_calories_day_big_icon'}} style={{height: hp('17%'), width: wp('17%')}}
                           resizeMode='contain'/>
                    <Text style={cardTitle}>{'TOTAL CALORIES\nPER DAY'}</Text>
                </View>
                <Text style={label}>{'TOTAL NUMBER OF CALORIES:'}</Text>
                <AppButton
                    containerStyle={{
                        backgroundColor: Constant.color.lightblue,
                        marginTop: hp('3%'),
                        marginHorizontal: wp('4%')
                    }}
                    title={'OK'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        marginTop: 100,
        paddingHorizontal: wp('4%'),
    },
    centerIt: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardTitle: {
        // marginVertical: hp('1%'),
        fontFamily: font.linateBold,
        fontSize: fontSize.xlarge,
        color: Constant.color.blue,
        textAlign: 'center'
    },
    label: {
        fontFamily: font.linateBold,
        fontSize: fontSize.xsmall,
        marginTop: hp('15%')
    }
});

export {Extra};
