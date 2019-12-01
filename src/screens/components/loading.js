import React, {Component} from 'react';
import {
    StyleSheet, View, Image,
    ImageBackground, Animated, Text, StatusBar, SafeAreaView
} from 'react-native';
import Constant from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {ProgressBar} from '../common'
import {NavigationActions, StackActions} from "react-navigation";
import SafeArea, {  SafeAreaInsets } from 'react-native-safe-area';
import {getAsyncStorage} from "../../helper/appHelper";
import {tabBarAfterLogin, tabBarBeforeLogin} from "../../helper/appConstant";

class AppLoading extends Component{

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setSafeArea();
        this.setInitialData();
    }

    setInitialData = () => {
        const {handleLocalAction,localActions} = this.props;
        handleLocalAction({type: localActions.SET_INITIAL_DATA});
    }

    setSafeArea = () => {
        SafeArea.getSafeAreaInsetsForRootView()
            .then((result) => {
                const safeArea = {
                    top:result.safeAreaInsets.top,
                    bottom:result.safeAreaInsets.bottom,
                    left:result.safeAreaInsets.left,
                    right:result.safeAreaInsets.right
                };
                const {handleLocalAction,localActions} = this.props;
                handleLocalAction({type: localActions.SET_SAFE_AREA, data:safeArea});
                SafeArea.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsForRootViewChange);
            })
    };

    onProgressDone = () => {
        const {navigation} = this.props;
        getAsyncStorage('User')
            .then(res=>{
                if(res){
                    navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: 'Home',
                        })],
                    }));
                }else{
                    navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: 'UserLogin',
                        })],
                    }));
                }
            }).catch(err=>{

        });

    };

    render() {
        const { container, logoOuter, bottomText } = styles;
        return (
            <ImageBackground style={container} source={{uri:'background'}}>
                <StatusBar backgroundColor={Constant.color.blue} barStyle="light-content"/>
                <ProgressBar progressBarColor={Constant.color.green}
                             onProgressDone={this.onProgressDone}
                />
                <View style={logoOuter}>
                    <Image source={{uri:'logo'}}
                           style={{height: hp('8%'), width: wp('50%') }}
                           resizeMode={'contain'}
                    />
                </View>
                <Text style={bottomText}>
                    {'Vestibulum et metus egestas, fermentum libero'}
                </Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoOuter:{
        position:'absolute',
        top:0,
        bottom:hp('25%'),left:0,
        right:0,
        justifyContent:'center',
        alignItems:'center'
    },
    bottomText:{
        color:"#fff",
        position:'absolute',
        bottom:hp('10%'),
        left:0,right:0,textAlign:'center',
        fontSize:Constant.fontSize.small
    }
});

export {AppLoading};

