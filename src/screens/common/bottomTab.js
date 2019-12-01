import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    View, Text, TouchableOpacity, Keyboard
} from "react-native";
import Constant from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {connect} from "react-redux";
import {setBottomTab} from "../../actions/appAction";


class BottomTabComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isKeyboard: false
        }
    }

    componentWillUnmount() {
        if (Constant.isANDROID) {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }

    componentDidMount() {
        if (Constant.isANDROID) {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        }
    }

    _keyboardDidShow = () => {
        this.setState({isKeyboard: true});
    };

    _keyboardDidHide = () => {
        this.setState({isKeyboard: false});
    };

    onPress = (screen, index) => {
        const {navigation, onBackPress, handleLocalAction, localActions} = this.props;

        if (screen) {
            if (screen === 'Back') {
                onBackPress ? onBackPress() : navigation.goBack();
            } else {
                navigation.navigate(screen);
                handleLocalAction({
                    type: localActions.BOTTOM_TAB,
                    data: index
                });
            }
        }
    };

    tabIcon = (value, index) => {
        let imageURI = (index === this.props.bottomTab) && value.activeImageData || value.imageData;
        const isHome = this.props.isHome && this.props.isHome || false;
        if(!isHome && index === 0 && this.props.bottomTab === 0 && value.title === 'Home'){
            imageURI = value.imageData;
        }
        return (
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} activeOpacity={0.5} key={index}
                              onPress={() => this.onPress(value.screen, index)}>
                <Image source={{uri: imageURI}}
                       style={{height: hp('4%'), width: wp('8%'), marginTop: hp('1%')}}
                       resizeMode={'contain'}
                />
                <Text style={{
                    fontSize: Constant.fontSize.mini,
                    color: Constant.color.lightGray,
                    textAlign: 'center',
                    marginTop: 2,
                    fontFamily: Constant.font.robotoBold
                }}>{value.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const {container} = styles;
        const {tabData, safeArea} = this.props;
        const {isKeyboard} = this.state;
        if (isKeyboard === true) {
            return null
        } else {
            return (
                <View style={[container, {height: hp('10%') + safeArea.bottom}]}>
                    {tabData.map((value, index) => {
                        return this.tabIcon(value, index)
                    })}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: hp('10%'),
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
});

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.BOTTOM_TAB:
            return dispatch(setBottomTab(action.data));
    }
};

export const localActions = {
    BOTTOM_TAB: 'BOTTOM_TAB'
};

const mapStateToProps = (state) => {
    const {userDetail} = state.user;
    const {safeArea, bottomTab} = state.appReducer
    return {
        localActions,
        safeArea,
        bottomTab,
        userDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

const BottomTab = connect(mapStateToProps, mapDispatchToProps)(BottomTabComponent);

export {BottomTab}
