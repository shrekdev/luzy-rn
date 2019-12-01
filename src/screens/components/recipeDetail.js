import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppButton, AppNavigator, BottomTab} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {tabBarWithBack} from "../../helper/appConstant";

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

const forSauce = [{
    type: 'butter',
    quantity: '50 g'
}, {
    type: 'plain flour',
    quantity: '50 g'
}, {
    type: 'hot milk (see tip)',
    quantity: '750 ml'
}, {
    type: 'Dijon mustard',
    quantity: '1 tsp'
}, {
    type: 'Parmesan cheese, coarsely grated',
    quantity: '100 g'
}, {
    type: 'large tomatoes, deseeded and cut into small cubes',
    quantity: '2'
}];

const Method = 'Preheat the oven to 220C/200C Fan/Gas 7. Butter a shallow\n' +
    '1.75 litre/3 pint ovenproof dish.\n' +
    '\n' +
    'Cook the penne with the onion in boiling, salted water\n' +
    'according to the packet instructions. Drain, refresh in cold\n' +
    'water and leave to drain again in the colander.\n' +
    '\n' +
    'Put the chicken strips in a resealable freezer bag with the\n' +
    'paprika and a little salt and pepper, seal the bag and shake to\n' +
    'coat.\n' +
    '\n' +
    'Heat 1 tablespoon of the oil in a large frying pan and quickly\n' +
    'fry the chicken over a high heat for about 2 minutes until\n' +
    'golden-brown and just cooked through (you may need to do\n' +
    'this in batches). Using a slotted spoon, transfer the fried\n' +
    'chicken to a plate and set aside.\n' +
    '\n' +
    'To make the sauce, melt the butter in a large saucepan, add\n' +
    'the flour and whisk together to form a roux. Cook for 1\n' +
    'minute, then gradually add the hot milk, whisking over a high\n' +
    'heat until the sauce is smooth and thickened, and allow to\n' +
    'boil for 4 minutes. Stir in the mustard and half the cheese\n' +
    'and season with salt and pepper.\n' +
    '\n' +
    'Add the pasta and onion to the sauce in the pan and stir\n' +
    'together. Spoon half this mixture into the dish, arrange the\n' +
    'chicken strips over the top and spoon the remaining pasta\n' +
    'and sauce on top of the chicken. Scatter over the tomatoes\n' +
    'and then top with the remaining cheese. Bake in the oven for\n' +
    'about 20 minutes until piping hot and golden-brown on top.\n';

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

class RecipeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRate: 0
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

    render() {
        const {
            container, titleText, recipeOverview, recipeName, recipeType, overviewTitle, separator, ingredientView, ratingView, rateImage
        } = styles;
        const {safeArea, navigation} = this.props;
        const {userRate} = this.state;
        const data = (navigation.state && navigation.state.params) && navigation.state.params.data || null;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <ScrollView style={container}
                            contentContainerStyle={{paddingBottom: 20}}
                            showsVerticalScrollIndicator={false}
                >
                    <Image source={{uri: 'prepare_your_food_recipes_book_illustration_1'}}
                           style={{height: hp('36%'), width: wp('100%')}}
                           resizeMode={'stretch'}/>
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
                            <View>
                                <Text style={titleText}>For the sauce</Text>
                                {
                                    forSauce.map((data, index) =>
                                        <View style={ingredientView} key={index}>
                                            <Text
                                                style={[overviewTitle, {fontFamily: Constant.font.robotoBold}]}>{data.quantity}</Text>
                                            <Text style={overviewTitle}>{' ' + data.type}</Text>
                                        </View>
                                    )
                                }
                            </View>
                            <View>
                                <Text style={titleText}>Method</Text>
                                <Text style={[overviewTitle, {textAlign: 'left'}]}>{Method}</Text>
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

export {RecipeDetail}