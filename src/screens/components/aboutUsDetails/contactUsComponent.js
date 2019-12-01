import React, {Component} from "react";
import {
    StyleSheet,
    View,
    ScrollView, Text, Image, TextInput
} from "react-native";
import {AboutUsCardComponent, DetailComponent} from './index'
import Constant from '../../../helper/themeHelper';
import {TextInputComponent} from './index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';
import {AppButton} from "../../common";
import {FoodListSearchHeader} from "../calorieTableComponent";


class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phNo: '',
            email: '',
            message: ''
        }
    }

    onSubmitInputText = (mainKey,subKey) => {
        if(this.refs && this.refs[mainKey] && this.refs[mainKey].refs[subKey]){
            this.refs[mainKey].refs[subKey].focus();
        }
    };

    render() {
        const {containerView} = styles;
        const {name, phNo, email, message} = this.state;
        const {data,safeArea} = this.props;
        return (
            <View style={{flex: 1}}>
                <AboutUsCardComponent
                    data={data}
                />
                <View style={containerView}>
                    <View style={{paddingTop: hp('3%'), paddingHorizontal: wp('5%')}}>
                        <View>
                            <TextInputComponent
                                refName={'txtName'}
                                title={'NAME:'}
                                placeholder={'Your name'}
                                imageData={'about_us_user_icon'}
                                numOfLines={1}
                                value={name}
                                returnKeyType={'next'}
                                onSubmitEditing={()=>this.onSubmitInputText('mainTxtPhone','txtPhone')}
                                onChange={(value) => this.setState({name: value})}
                            />
                            <TextInputComponent
                                ref={'mainTxtPhone'}
                                refName={'txtPhone'}
                                title={'PHONE:'}
                                placeholder={'Your phone number'}
                                imageData={'about_us_phone_icon'}
                                numOfLines={1}
                                maxLength={11}
                                value={phNo}
                                returnKeyType={'next'}
                                onSubmitEditing={()=>this.onSubmitInputText('mainTxtEmail','txtEmail')}
                                onChange={(value) => this.setState({phNo: value})}
                            />
                            <TextInputComponent
                                ref={'mainTxtEmail'}
                                refName={'txtEmail'}
                                title={'EMAIL:'}
                                placeholder={'Your email address'}
                                imageData={'about_us_email_icon'}
                                numOfLines={1}
                                value={email}
                                returnKeyType={'next'}
                                onSubmitEditing={()=>this.onSubmitInputText('mainTxtMessage','txtMessage')}
                                onChange={(value) => this.setState({email: value})}
                            />
                            <TextInputComponent
                                ref={'mainTxtMessage'}
                                refName={'txtMessage'}
                                title={'MESSAGE:'}
                                placeholder={'Your message'}
                                imageData={'about_us_message_icon'}
                                numOfLines={5}
                                multiline={true}
                                value={message}
                                returnKeyType={'next'}
                                onChange={(value) => this.setState({message: value})}
                                multilineStyle={{height: hp('15%'),maxHeight: hp('15%')}}
                            />
                            <AppButton
                                containerStyle={{backgroundColor: Constant.color.lightblue, marginVertical: hp('2%')}}
                                textStyle={{color: Constant.color.white}}
                                title={'SEND MESSAGE'}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: Constant.color.black,
        marginTop: hp('1%'),
        paddingBottom: hp('2%')
    }
});

export {ContactUs};