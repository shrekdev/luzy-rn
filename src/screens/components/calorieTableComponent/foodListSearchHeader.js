import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import Constant from '../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';

class FoodListSearchHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {searchIconView, searchTextInput, searchView, headerSearchText,mainView} = styles;
        const {onChangeText, foodSearchIcon, searchText} = this.props;
        return (
            <View style={mainView}>
                <Text style={headerSearchText}>{'SEARCH: '}</Text>
                <View style={{flexDirection: 'row',height:hp('7%')}}>
                    <View style={searchView}>
                        <Image source={{uri: foodSearchIcon}}
                               style={{height: hp('4%'), width: wp('8%')}}
                               resizeMode='contain'/>
                        <TextInput placeholder={'Search for a type of food'}
                                   numberOfLines={1}
                                   autoCorrect={false}
                                   keyboardType={'email-address'}
                                   placeholderTextColor={'#3b7bc2'}
                                   style={searchTextInput}
                                   value={searchText}
                                   onChangeText={(searchText) => onChangeText(searchText)}
                                   underlineColorAndroid={Constant.color.transparent}
                        />
                    </View>
                    <View style={searchIconView}>
                        <Image source={{uri: 'search_icon'}}
                               style={{height: hp('4%'), width: wp('8%')}}
                               resizeMode='contain'/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView:{
        paddingHorizontal: wp('10%'),
        backgroundColor: Constant.color.white,
        paddingTop: hp('1%'),
        height: hp('12%')
    },
    searchView: {
        backgroundColor: Constant.color.blue,
        borderRadius: 10,
        paddingVertical: hp('0.5%'),
        paddingHorizontal: wp('2%'),
        flex: 1,
        flexDirection: 'row',
        alignItems:'center'
    },
    searchIconView: {
        backgroundColor: Constant.color.lightblue,
        borderRadius: 10,
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        marginLeft: wp('2%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchTextInput: {
        fontSize: Constant.fontSize.xsmall,
        fontFamily: Constant.font.robotoRegular,
        color: Constant.color.white,
        flex: 1,
        marginLeft: wp('2%')
    },
    headerSearchText: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.mini,
        color: Constant.color.black
    },

});

export {FoodListSearchHeader}