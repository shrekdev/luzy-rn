import React, { Component } from "react";
import {
    Animated,
    StyleSheet,
    View,
} from "react-native";
import Constant from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
const progressWidth = parseInt(wp('75%'));

export class ProgressBar extends Component{

    constructor(props) {
        super(props);
        this.state={
            widthOffset:new Animated.Value(0)
        }
    }

    componentDidMount() {
        this.onProgress();
    }

    onProgress = () => {
        const {onProgressDone}=this.props;
        Animated.timing(this.state.widthOffset, {
            duration: 2000,
            toValue: progressWidth,
        }).start(()=>{
            setTimeout(()=>{
                onProgressDone();
            },100);
        });
    };
    render() {
        const {container,progressView,progressBar}=styles;
        const {progressBarColor}=this.props;
        const {widthOffset}=this.state;
        return(
            <View style={container}>
                <View style={progressView}>
                    <Animated.View style={[progressBar,{width:widthOffset,backgroundColor:progressBarColor}]}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent:'center',
        alignItems:'center'
    },
    progressView:{
        height:hp('1.5%'),
        maxHeight:9,
        width:progressWidth,
        borderWidth:1.5,
        borderColor:'#fff',
        borderRadius:5,
        overflow:'hidden'
    },
    progressBar:{
        height:hp('1.5%'),
        maxHeight:9
    }
});

