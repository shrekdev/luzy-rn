import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, Image, PanResponder, Platform, TouchableOpacity} from 'react-native';
import {AppButton, AppNavigator, BottomTab, style} from "../common";
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {tabBarWithBack} from "../../helper/appConstant";

const medicalData = [{
    name:'Juan Miguel Angel',
    type:'Nutriologist Doctor',
    time:'On January 12,2019 at 12:00'
},{
    name:'Maya Sacannah Sofia',
    type:'Gernalist Doctor',
    time:'On January 12,2019 at 12:00'
},{
    name:'Juan Miguel Angel',
    type:'Nutriologist Doctor',
    time:'On January 12,2019 at 12:00'
},{
    name:'Juan Miguel Angel',
    type:'Nutriologist Doctor',
    time:'On January 12,2019 at 12:00'
},{
    name:'Maya Sacannah Sofia',
    type:'Gernalist Doctor',
    time:'On January 12,2019 at 12:00'
},]

class MedicalNotes extends Component {

    constructor(props) {
        super(props);
    }

    generalInformation = (data) => {
        this.props.navigation.navigate('GeneralInformations',{detail: data})
    }

    renderMedicalNotesList = (data, index) => {
        return (
            <TouchableOpacity style={{
                backgroundColor: (index % 2) === 0 && Constant.color.darkBlue || Constant.color.blue,
                flexDirection: 'row',
                paddingHorizontal: wp('10%'),
                paddingVertical: hp('3%')
            }} key={index} onPress={() => this.generalInformation(data)}>
                <View style={{flex: 1}}>
                    <Text style={{
                        fontFamily: Constant.font.robotoBold,
                        fontSize: Constant.fontSize.medium,
                        color: Constant.color.white,
                    }}>{data.name}</Text>
                    <Text style={{
                        fontFamily: Constant.font.robotoRegular,
                        fontSize: Constant.fontSize.mini,
                        color: Constant.color.white,
                    }}>{data.type}</Text>
                    <Text style={{
                        marginTop: hp('1%'),
                        fontFamily: Constant.font.robotoRegular,
                        fontSize: Constant.fontSize.mini,
                        color: Constant.color.black,
                    }}>{data.time}</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{uri: 'right_dark_arrow'}}
                           style={{height: wp('8%'), width: wp('8%'), tintColor: 'white'}}
                           resizeMode={'contain'}/>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {container} = styles;
        const {safeArea, navigation} = this.props;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ScrollView
                    contentContainerStyle={{paddingBottom: 20}}
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical: hp('3%')}}>
                        <Text style={style.header}>{'MEDICAL NOTES'}</Text>
                        <Text
                            style={style.subText}>{'Here you can find medical notes accordingly with your appointments the medical exams.'}</Text>
                    </View>
                    {
                        medicalData.map((data, index) => {
                            return this.renderMedicalNotesList(data, index);
                        })
                    }
                </ScrollView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.blue,
    }
});

export {MedicalNotes};


