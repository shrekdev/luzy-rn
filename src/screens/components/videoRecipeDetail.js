import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppButton, AppNavigator, BottomTab} from "../common";
import {HideNavigationBar} from 'react-native-navigation-bar-color';
import Video from 'react-native-video';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {tabBarWithBack} from "../../helper/appConstant";
import {AddtoCaloriesCalculator} from "./prepareYourFoodComponent";

const ingredients = [{
    type: 'butter, for greasing',
    quantity: '50 g'
}, {
    type: 'penne',
    quantity: '250g/9oz'
}, {
    type: 'onion, roughly chopped',
    quantity: '1'
}, {
    type: 'skinless, boneless chicken breasts, cut into thin strips' +
        '\nroughly the size of your little finger',
    quantity: '3'
}, {
    type: 'tbsp paprika',
    quantity: '1'
}, {
    type: 'tbsp olive oil',
    quantity: '2'
}, {
    type: 'salt and freshly ground black pepper',
    quantity: ''
}];

const nutritionValue = [{
    type: 'Calories',
    quantity: '568 kcal'
}, {
    type: 'Carbohydrates',
    quantity: '15,1 g'
}, {
    type: 'Proteins',
    quantity: '24,8 g'
}, {
    type: 'Lipids',
    quantity: '71,8 g'
}, {
    type: 'Dietary fiber',
    quantity: '4,8 g'
}, {
    type: 'Sugars',
    quantity: '3,2 g'
}, {
    type: 'Cholesterol',
    quantity: '48,8 g'
},];

const totalVotes = 13;
const totalRates = 3;
const rateArray = [1, 2, 3, 4, 5];

const overviewData = [{
    imageData: 'cooking_time_icon',
    title: 'Time',
    detail: '30 min'
}, {
    imageData: 'portions_icon',
    title: 'Portions',
    detail: '5'
}, {
    imageData: 'calories_icon',
    title: 'Calories',
    detail: '568 kcal'
},]

class VideoRecipeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRate: 0,
            addRecipe: false,
        }
    }

    rateRacipe = (rates) => {
        this.setState({userRate: rates});
    };

    renderOverview = (data) => {
        const {overviewTitle, overviewDetail} = styles;
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: data.imageData}}
                       style={{height: hp('5%'), width: wp('10%')}}
                       resizeMode='contain'/>
                <Text style={overviewTitle}>{data.title}</Text>
                <Text style={overviewDetail}>{data.detail}</Text>
            </View>
        )
    };

    onAddRecipe = () => {
        this.setState({addRecipe: !this.state.addRecipe});
    };

    render() {
        const {
            container, titleText, recipeOverview, recipeName, recipeType, overviewTitle, separator, ingredientView, ratingView,
            rateImage
        } = styles;
        const {safeArea, navigation} = this.props;
        const {userRate} = this.state;
        const data = (navigation.state && navigation.state.params) && navigation.state.params.data || null;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ScrollView style={container}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: hp('12%')}}
                >
                    <Video
                        source={{uri: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'}}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        // onError={this.videoError}
                        onLoadStart={() => Constant.isANDROID && HideNavigationBar()}
                        controls={true}
                        resizeMode="stretch"              // Callback when video cannot be loaded
                        style={{height: hp('36%'), width: wp('100%')}}
                        onError={(err) => console.log(".......", err)}/>
                    <View>
                        <Text style={recipeName}>{data.title}</Text>
                        <Text style={recipeType}>{data.subtitle}</Text>

                        <View style={recipeOverview}>
                            {this.renderOverview(overviewData[0])}
                            <View style={separator}/>
                            {this.renderOverview(overviewData[1])}
                            <View style={separator}/>
                            {this.renderOverview(overviewData[2])}
                        </View>
                        <View style={{paddingHorizontal: wp('2%'), alignItems: 'center'}}>
                            <View>
                                <Text style={titleText}>Ingredients</Text>
                                {
                                    ingredients.map((data, index) =>
                                        <View style={ingredientView} key={index}>
                                            <Text
                                                style={[overviewTitle, {
                                                    fontFamily: Constant.font.robotoBold,
                                                    alignSelf: 'flex-start'
                                                }]}>{data.quantity}</Text>
                                            <Text style={overviewTitle}>{' ' + data.type}</Text>
                                        </View>
                                    )
                                }
                            </View>
                            <View style={{width: wp('85%')}}>
                                <Text style={titleText}>Nutritional value</Text>
                                {
                                    nutritionValue.map((data, index) =>
                                        <View style={ingredientView} key={index}>
                                            <Text
                                                style={[overviewTitle, {fontFamily: Constant.font.robotoBold}]}>{data.type}</Text>
                                            <Text style={{flex: 1}}
                                                  numberOfLines={1}>{'...........................................................................'}</Text>
                                            <Text
                                                style={[overviewTitle, {fontFamily: Constant.font.robotoBold}]}>{data.quantity}</Text>
                                        </View>
                                    )
                                }
                            </View>
                            <View>
                                <Text style={titleText}>Recipe rating</Text>
                                <View style={ratingView}>
                                    {
                                        rateArray.map((data, index) =>
                                            <Image
                                                source={{uri: totalRates >= data && 'good_rating_star_icon' || 'bad_rating_star_icon'}}
                                                style={rateImage}
                                                resizeMode='contain'
                                                key={index}/>)
                                    }
                                </View>
                                <Text style={overviewTitle}>{totalVotes + ' votes'}</Text>
                            </View>
                            <View>
                                <Text style={titleText}>Rate this recipe</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    {
                                        rateArray.map((data, index) =>
                                            <TouchableOpacity onPress={() => this.rateRacipe(data)} key={index}>
                                                <Image
                                                    source={{uri: userRate >= data && 'good_rating_star_icon' || 'no_rating_star_icon'}}
                                                    style={rateImage}
                                                    resizeMode='contain'/>
                                            </TouchableOpacity>)
                                    }
                                </View>
                            </View>
                            <View style={{width: wp('85%'), marginVertical: hp('3%')}}>
                                <AppButton
                                    containerStyle={{backgroundColor: (userRate === 0) && Constant.color.lightGray || Constant.color.lightblue}}
                                    textStyle={{color: Constant.color.white}}
                                    title={'SEND YOUR RATING'}
                                    disabled={(userRate === 0)}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <AddtoCaloriesCalculator style={{bottom: safeArea.bottom + hp('10%')}} title={`Add this recipe to\ncalories calculator: `} isChecked={this.state.addRecipe} onPress={this.onAddRecipe}/>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
    },
    recipeOverview: {
        backgroundColor: Constant.color.white,
        marginVertical: hp('3%'),
        height: hp('12%'),
        paddingHorizontal: wp('15%'),
        paddingVertical: hp('2%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    recipeName: {
        textAlign: 'center',
        marginTop: hp('3%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.navyblue
    },
    recipeType: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.medium, textAlign: 'center',
        color: Constant.color.black
    },
    titleText: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.large,
        textAlign: 'center',
        color: Constant.color.black,
        marginTop: hp('2%'),
        marginBottom: hp('1%')
    },
    overviewTitle: {
        fontFamily: Constant.font.robotoRegular,
        fontSize: Constant.fontSize.mini, textAlign: 'center',
        color: Constant.color.black
    },
    overviewDetail: {
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.mini, textAlign: 'center',
        color: Constant.color.black
    },
    separator: {
        backgroundColor: Constant.color.lightSky,
        width: wp('0.3%')
    },
    ingredientView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: hp('0.5%')
    },
    ratingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    rateImage: {
        height: hp('5%'),
        width: wp('10%'),
        marginHorizontal: wp('1%')
    }
});

export {VideoRecipeDetail}