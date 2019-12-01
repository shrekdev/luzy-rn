import React, {Component} from "react";
import {
    StyleSheet,
    View,
    ScrollView, Text, Image, TextInput
} from "react-native";
import {DetailComponent} from './index'
import Constant from '../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';


class TextInputComponent extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {title, imageData, numOfLines, maxLength, value, placeholder, multiline, multilineStyle,
            onSubmitEditing, refName, returnKeyType, viewStyle, textInputStyle} = this.props;
        const {titleText, inputView} = styles;
        return (
            <View >
                <Text style={titleText}>{title}</Text>
                <View style={[viewStyle || null,inputView,{alignItems: !multiline && 'center' || null}]}>
                    <Image source={{uri: imageData}}
                           style={{height: hp('4%'), width: wp('7%')}}
                           resizeMode={'contain'}/>
                    <TextInput placeholder={placeholder}
                               numberOfLines={numOfLines}
                               maxLength={maxLength}
                               multiline={multiline || false}
                               placeholderTextColor={Constant.color.blue}
                               style={[ textInputStyle || null ,styles.textInput, multilineStyle || null]}
                               autoCapitalize="none"
                               autoCorrect={false}
                               value={value}
                               returnKeyType={returnKeyType}
                               onChangeText={(text) => this.props.onChange(text)}
                               underlineColorAndroid={Constant.color.transparent}
                               textAlignVertical={multiline && 'top' || null}
                               onSubmitEditing={onSubmitEditing}
                               ref={refName}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: Constant.fontSize.small,
        color: Constant.color.white,
        fontFamily: Constant.font.linateHeavy
    },
    textInput: {
        fontSize: Constant.fontSize.mini,
        fontFamily: Constant.font.robotoRegular,
        padding: hp('1%'),
        color: Constant.color.white,
        flex: 1,
        marginHorizontal: wp('2%')
    },
    inputView: {
        backgroundColor: Constant.color.textInput,
        flexDirection: 'row',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        marginVertical: hp('1%'),
        borderRadius: 10,
    }
});

export {TextInputComponent};
