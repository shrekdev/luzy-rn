import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView, StatusBar
} from "react-native";
import {connect} from "react-redux";
import Constant from '../../helper/themeHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/responsiveScreen';

class AppNavigatorComponent extends Component {

    onPressMenu = () => {
        alert('Menu');
    };

    render () {
        const {mainIcon, navIcon, navIconMenu} = styles;
        const {isMenuOpen} = this.props;
        const paddingTopOffset =(Constant.isANDROID) && 25 || 10;
        return (
            <View style={{backgroundColor: Constant.color.blue, paddingTop: this.props.safeArea.top + paddingTopOffset}}>
                <StatusBar backgroundColor={Constant.color.blue} barStyle="light-content"/>
                <View style={{
                    ...Constant.style.container, flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                    paddingTop: hp('0.5%'), paddingBottom: hp('2.3%')
                }}>
                    <Image source={{uri: 'app_logo'}}
                           style={mainIcon}
                           resizeMode={'contain'}/>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri: 'app_no_notifications'}}
                               style={navIcon}
                               resizeMode={'contain'}/>
                        <TouchableOpacity onPress={this.props.onPressMenu}>
                            <Image source={{uri: isMenuOpen ? 'main_menu_close_menu_button' : 'app_menu_icon'}}
                                   style={navIconMenu} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainIcon: {
        height: hp('5%'),
        width: wp('30%'),
    },
    navIcon: {
        height: hp('5%'),
        width: wp('8%'),
        marginLeft:wp('5%')
    },
    navIconMenu: {
        height: hp('4.5%'),
        width: wp('7%'),
        marginLeft:wp('5%'),
        marginTop:wp('0.5%')
    }
});

const mapStateToProps = (state) => {
    const {userDetail} = state.user;
    const {safeArea} = state.appReducer;
    return {
        safeArea,
        userDetail
    };
};
const AppNavigator = connect(mapStateToProps, null)(AppNavigatorComponent);

export {AppNavigator}
