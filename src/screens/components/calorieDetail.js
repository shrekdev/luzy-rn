import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {FoodListSearchHeader} from './calorieTableComponent';
import {BottomTab} from "../common";
import {tabBarWithBack} from "../../helper/appConstant";


class CalorieDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
        }
    }

    onChangeText = (searchText) => {
        this.setState({searchText})
    };

    render() {
        const {safeArea, navigation} = this.props;
        const {searchText} = this.state;
        const {container,listName, listData, listContainerView,foodTypeText,foodTypeImage,foodTypeHeader, dataCardView,
            dataCardMainView} = styles;
        const data = (navigation.state && navigation.state.params) && navigation.state.params.data || null;
        const foodSearchIcon = (navigation.state && navigation.state.params) && navigation.state.params.foodSearchIcon || null;
        return (
            <View style={[container,{paddingBottom: hp('10%') + safeArea.bottom}]}>
                <FoodListSearchHeader
                    foodSearchIcon={foodSearchIcon}
                    searchText={searchText}
                    onChangeText={(searchText) => this.onChangeText(searchText)}/>
                <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
                    <View style={dataCardMainView}>
                        <View style={dataCardView}>
                            <View style={foodTypeHeader}>
                                <Image source={{uri: data.imageBig}}
                                       style={foodTypeImage}
                                       resizeMode='contain'/>
                                <Text style={foodTypeText}>{data.type.toUpperCase()}</Text>
                            </View>
                            {
                                data.detail.map((data, index) => {
                                    return (
                                        <View style={[listContainerView,{
                                            backgroundColor: index % 2 === 0 && Constant.color.lightSky || Constant.color.white,
                                        }]} key={index}>
                                            <Text style={listName}>{data.name}</Text>
                                            <Text style={listData}>{data.quantity}</Text>
                                            <Text style={[listData,{fontFamily:Constant.font.robotoBold}]}>{data.calorie}</Text>
                                            <Text style={listData}>{data.price}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
        paddingBottom: hp('3%')
    },
    dataCardMainView: {
        marginTop: hp('3%'),
        shadowColor: '#D0E0F0',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
        marginHorizontal: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constant.color.white,
        borderRadius: 10,
    },
    dataCardView:{
        backgroundColor: Constant.color.white,
        paddingTop: hp('1%'),
        borderRadius: 10,
        overflow: 'hidden',
    },
    foodTypeImage :{
        height: hp('12%'),
        width: wp('20%'),
        marginVertical: hp('1%')
    },
    foodTypeHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('2%')
    },
    foodTypeText: {
        fontFamily: Constant.font.linateBold,
        fontSize: normalize(24),
        textAlign: 'center',
        color: Constant.color.navyblue,
        marginHorizontal: wp('2%')
    },
    listContainerView:{
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: wp('3%'),
        alignItems:'center',
        paddingVertical: hp('2%'),
    },
  listName: {
      fontFamily: Constant.font.robotoRegular,
      width: '40%',
      fontSize: Constant.fontSize.mini,
      textAlign: 'left',
      color: Constant.color.black,
  },
    listData: {
        fontFamily: Constant.font.robotoRegular,
        width: '20%',
        fontSize: Constant.fontSize.mini,
        textAlign: 'center',
        color: Constant.color.black
    }
});

export {CalorieDetail}