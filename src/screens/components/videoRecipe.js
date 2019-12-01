import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    Text,
    View,
    Image,
    Modal,
    ScrollView,
    Animated,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Constant, { normalize } from '../../helper/themeHelper';
import { HideNavigationBar } from 'react-native-navigation-bar-color';
import { RecipeCard, AppButton, BottomTab } from "../common";
import { tabBarWithBack, videoRecipeCardData } from '../../helper/appConstant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/responsiveScreen';
import { TypeOfFoodCard, FoodCostCard, IngredientsCard } from "./prepareYourFoodComponent"
import { style } from "../common/style";

let { width } = Dimensions.get('window');

const cards = [{
    title: 'Type of food',
    imageActive: 'type_of_food_active',
    imageInactive: 'type_of_food_inactive'
}, {
    title: 'Food cost',
    imageActive: 'food_cost_active',
    imageInactive: 'food_cost_inactive'
}, {
    title: 'Ingredients',
    imageActive: 'ingredients_active',
    imageInactive: 'ingredients_inactive'
}];

class VideoRecipe extends Component {
    scrollX = new Animated.Value(0);
    selectedCard = 0;

    typeOfFoodArrayTemp = [];
    foodCostArrayTemp = [];
    ingredientsWantArrayTemp = [];
    ingredientsDontWantArrayTemp = [];

    constructor(props) {
        super(props);
        this.state = {
            filterType: '',
            ingredienType: 'Ingredients you want',
            ingredienTypeImage: 'ingredients_you_want',
            modalVisiblity: false,
            breakfast: false,
            lunch: false,
            dinner: false,
            veg: false,
            diabetics: false,
            lowCost: false,
            mediumCost: false,
            highCost: false,
            isTypeofFoodSelected: false,
            isFoodCostSelected: false,
            isIngredientsSelected: false,
            typeOfFoodArray: [],
            foodCostArray: [],
            ingredientsWantArray: [],
            ingredientsDontWantArray: []
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.onBreakfastCheck = this.onBreakfastCheck.bind(this);
        this.onLunchCheck = this.onLunchCheck.bind(this);
        this.onDinnerCheck = this.onDinnerCheck.bind(this);
        this.onVegCheck = this.onVegCheck.bind(this);
        this.onDiabeticsCheck = this.onDiabeticsCheck.bind(this);
        this.onLowCostCheck = this.onLowCostCheck.bind(this);
        this.onMediumCostCheck = this.onMediumCostCheck.bind(this);
        this.onHighCostCheck = this.onHighCostCheck.bind(this);
        this.onIngredientTypeSelect = this.onIngredientTypeSelect.bind(this);
        this.onOkClick = this.onOkClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
    }

    componentDidMount() {
    }

    onFilterClick(index) {
        if (index === 0) {
            this.typeOfFoodArrayTemp = [];
            this.typeOfFoodArrayTemp = this.state.typeOfFoodArray.slice(0)
            this.setState({ filterType: 'TYPE OF FOOD', modalVisiblity: true })
        } else if (index === 1) {
            this.foodCostArrayTemp = [];
            this.foodCostArrayTemp = this.state.foodCostArray.slice(0)
            this.setState({ filterType: 'FOOD COST', modalVisiblity: true })
        } else {
            this.ingredientsDontWantArrayTemp = [];
            this.ingredientsWantArrayTemp = [];
            this.ingredientsDontWantArrayTemp = this.state.ingredientsDontWantArray.slice(0)
            this.ingredientsWantArrayTemp = this.state.ingredientsWantArray.slice(0)
            this.setState({ filterType: 'INGREDIENTS', modalVisiblity: true })
        }
    }

    onBreakfastCheck = () => {
        if (this.typeOfFoodArrayTemp.includes('Breakfast')) {
            let position = this.typeOfFoodArrayTemp.indexOf('Breakfast')
            this.typeOfFoodArrayTemp.splice(position, 1)
        } else {
            this.typeOfFoodArrayTemp.push('Breakfast')
        }
        this.setState({
            breakfast: !this.state.breakfast
        });
    };

    onLunchCheck = () => {
        if (this.typeOfFoodArrayTemp.includes('Lunch')) {
            let position = this.typeOfFoodArrayTemp.indexOf('Lunch')
            this.typeOfFoodArrayTemp.splice(position, 1)
        } else {
            this.typeOfFoodArrayTemp.push('Lunch')
        }
        this.setState({
            lunch: !this.state.lunch
        });
    };

    onDinnerCheck = () => {
        if (this.typeOfFoodArrayTemp.includes('Dinner')) {
            let position = this.typeOfFoodArrayTemp.indexOf('Dinner')
            this.typeOfFoodArrayTemp.splice(position, 1)
        } else {
            this.typeOfFoodArrayTemp.push('Dinner')
        }
        this.setState({
            dinner: !this.state.dinner
        });
    };

    onVegCheck = () => {
        if (this.typeOfFoodArrayTemp.includes('Vegetarian')) {
            let position = this.typeOfFoodArrayTemp.indexOf('Vegetarian')
            this.typeOfFoodArrayTemp.splice(position, 1)
        } else {
            this.typeOfFoodArrayTemp.push('Vegetarian')
        }
        this.setState({
            veg: !this.state.veg
        });
    };

    onDiabeticsCheck = () => {
        if (this.typeOfFoodArrayTemp.includes('Diabetics')) {
            let position = this.typeOfFoodArrayTemp.indexOf('Diabetics')
            this.typeOfFoodArrayTemp.splice(position, 1)
        } else {
            this.typeOfFoodArrayTemp.push('Diabetics')
        }
        this.setState({
            diabetics: !this.state.diabetics
        });
    };

    onLowCostCheck = () => {
        if (this.foodCostArrayTemp.includes('Lowcost')) {
            let position = this.foodCostArrayTemp.indexOf('Lowcost')
            this.foodCostArrayTemp.splice(position, 1)
        } else {
            this.foodCostArrayTemp.push('Lowcost')
        }
        this.setState({
            lowCost: !this.state.lowCost
        });
    };

    onMediumCostCheck = () => {
        if (this.foodCostArrayTemp.includes('Mediumcost')) {
            let position = this.foodCostArrayTemp.indexOf('Mediumcost')
            this.foodCostArrayTemp.splice(position, 1)
        } else {
            this.foodCostArrayTemp.push('Mediumcost')
        }
        this.setState({
            mediumCost: !this.state.mediumCost
        });
    };

    onHighCostCheck = () => {
        if (this.foodCostArrayTemp.includes('Highcost')) {
            let position = this.foodCostArrayTemp.indexOf('Highcost')
            this.foodCostArrayTemp.splice(position, 1)
        } else {
            this.foodCostArrayTemp.push('Highcost')
        }
        this.setState({
            highCost: !this.state.highCost
        });
    };

    onIngredientTypeSelect = async (index, ingredienType) => {
        if (index === 0) {
            await this.setState({ ingredienType: ingredienType, ingredienTypeImage: 'ingredients_you_dont_want' });
        } else {
            await this.setState({ ingredienType: ingredienType, ingredienTypeImage: 'ingredients_you_want' });
        }
    };

    onIngredientsSelect = (data, index) => {
        if (this.state.ingredienType === 'Ingredients you want') {
            if (this.ingredientsWantArrayTemp.includes(data)) {
                let position = this.ingredientsWantArrayTemp.indexOf(data)
                this.ingredientsWantArrayTemp.splice(position, 1)
            } else {
                this.ingredientsWantArrayTemp.push(data)
            }
            this.forceUpdate()
        } else if (this.state.ingredienType === 'Ingredients you don\'t want') {
            if (this.ingredientsDontWantArrayTemp.includes(data)) {
                let position = this.ingredientsDontWantArrayTemp.indexOf(data)
                this.ingredientsDontWantArrayTemp.splice(position, 1)
            } else {
                this.ingredientsDontWantArrayTemp.push(data)
            }
            this.forceUpdate()
        }
    }

    onOkClick = () => {
        this.setState({ modalVisiblity: false })
        if (this.state.filterType === 'TYPE OF FOOD') {
            this.setState({
                typeOfFoodArray: this.typeOfFoodArrayTemp
            }, () => {
                this.typeOfFoodArrayTemp = [];
                if (this.state.typeOfFoodArray.length > 0) {
                    this.setState({ isTypeofFoodSelected: true })
                } else {
                    this.setState({ isTypeofFoodSelected: false })
                }
            });
        } else if (this.state.filterType === 'FOOD COST') {
            this.setState({
                foodCostArray: this.foodCostArrayTemp
            }, () => {
                this.foodCostArrayTemp = [];
                if (this.state.foodCostArray.length > 0) {
                    this.setState({ isFoodCostSelected: true })
                } else {
                    this.setState({ isFoodCostSelected: false })
                }
            });
        } else if (this.state.filterType === 'INGREDIENTS') {
            this.setState({
                ingredientsDontWantArray: this.ingredientsDontWantArrayTemp,
                ingredientsWantArray: this.ingredientsWantArrayTemp
            }, () => {
                this.ingredientsDontWantArrayTemp = [];
                this.ingredientsWantArrayTemp = [];
                if (this.state.ingredientsDontWantArray.length > 0 || this.state.ingredientsWantArray.length > 0) {
                    this.setState({ isIngredientsSelected: true })
                } else {
                    this.setState({ isIngredientsSelected: false })
                }
            });
        }
    };

    onClearClick = () => {
        if (this.state.filterType === 'TYPE OF FOOD') {
            this.typeOfFoodArrayTemp = [];
            this.forceUpdate();
        } else if (this.state.filterType === 'FOOD COST') {
            this.foodCostArrayTemp = [];
            this.forceUpdate();
        } else if (this.state.filterType === 'INGREDIENTS') {
            this.ingredientsDontWantArrayTemp = [];
            this.ingredientsWantArrayTemp = [];
            this.forceUpdate();
        }
    }

    onCloseClick = () => {
        this.setState({ modalVisiblity: false })
    }

    renderFilterCards = (data, index) => {
        const { cardView, cardText } = styles;
        const { isTypeofFoodSelected, isFoodCostSelected, isIngredientsSelected } = this.state;
        return (
            <TouchableOpacity key={index}
                style={[cardView, { backgroundColor: index === 0 && isTypeofFoodSelected === true && Constant.color.navyblue || (index === 1 && isFoodCostSelected === true && Constant.color.navyblue || (index === 2 && isIngredientsSelected === true && Constant.color.navyblue || Constant.color.white)) }]}
                onPress={() => this.onFilterClick(index)}>
                <Image
                    source={{ uri: index === 0 && isTypeofFoodSelected === true && data.imageActive || (index === 1 && isFoodCostSelected === true && data.imageActive || (index === 2 && isIngredientsSelected === true && data.imageActive || data.imageInactive)) }}
                    style={{ height: hp('5%'), width: wp('10%') }} resizeMode='contain' />
                <Text
                    style={[cardText, { color: index === 0 && isTypeofFoodSelected === true && Constant.color.white || (index === 1 && isFoodCostSelected === true && Constant.color.white || (index === 2 && isIngredientsSelected === true && Constant.color.white || Constant.color.lightGray)) }]}>{data.title}</Text>
                <Image
                    source={{ uri: index === 0 && isTypeofFoodSelected === true && 'filter_check' || (index === 1 && isFoodCostSelected === true && 'filter_check' || (index === 2 && isIngredientsSelected === true && 'filter_check' || 'grey_plus')) }}
                    style={{
                        height: index === 0 && isTypeofFoodSelected === true && hp('3.5%') || (index === 1 && isFoodCostSelected === true && hp('3.5%') || (index === 2 && isIngredientsSelected === true && hp('3.5%') || hp('2.5%'))),
                        width: wp('7%')
                    }} resizeMode='contain' />
            </TouchableOpacity>
        )
    };

    recipeDetail = (data) => {
        this.props.navigation.navigate('VideoRecipeDetail', { data });
    };

    renderCard = (data, index) => {
        const { navigation, safeArea } = this.props;
        return (
            <RecipeCard
                key={index}
                image={data.image}
                title={data.title}
                subtitle={data.subtitle}
                veg={data.veg}
                nonVeg={data.nonVeg}
                diet={data.diet}
                subtext={'Watch recipe'}
                onPress={() => this.recipeDetail(videoRecipeCardData[index])}
            />
        )
    };

    render() {
        Constant.isANDROID && HideNavigationBar();
        const { container, header, subText, bottomCardView, modalView } = styles;
        const { safeArea, navigation } = this.props;

        return (
            <View style={[container, { paddingBottom: hp('10%') + safeArea.bottom }]}>
                <ScrollView showsVerticalScrollIndicator={false} style={container}
                    contentContainerStyle={{ paddingBottom: 20 }}>
                    <Image source={{ uri: 'prepare_your_food_video_recipes_illustration' }}
                        style={{ height: hp('36%'), width: wp('100%') }} resizeMode={'stretch'} />
                    <View style={{ backgroundColor: Constant.color.lightSky }}>
                        <Text style={header}>VIDEO RECIPES</Text>
                        <View style={{ paddingHorizontal: wp('10%'), marginTop: hp('1%') }}>
                            <Text style={subText}>FILTERS: </Text>
                            {
                                cards.map((data, index) => this.renderFilterCards(data, index))
                            }
                        </View>
                        <View style={bottomCardView}>
                            {
                                videoRecipeCardData.map((data, index) => this.renderCard(data, index))
                            }
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisiblity}
                    onShow={() => {
                        Constant.isANDROID && HideNavigationBar()
                    }}
                    onDismiss={() => {
                        Constant.isANDROID && HideNavigationBar()
                    }}>
                    <View style={{...style.modalView}}>
                        {this.state.filterType === 'TYPE OF FOOD' &&
                            <TypeOfFoodCard
                                filterImage={'type_of_food_big'}
                                filterText={'TYPE OF FOOD'}
                                titleBreakFast={'Breakfast'}
                                titleLunch={'Lunch'}
                                titleDinner={'Dinner'}
                                titleVegetarian={'Vegetarian'}
                                titleDiabetics={'Diabetics'}
                                onBreakfastCheck={this.onBreakfastCheck}
                                onLunchCheck={this.onLunchCheck}
                                onDinnerCheck={this.onDinnerCheck}
                                onVegCheck={this.onVegCheck}
                                onDiabeticsCheck={this.onDiabeticsCheck}
                                typeOfFoodArrayTemp={this.typeOfFoodArrayTemp}
                                onClearClick={this.onClearClick}
                                onOkClick={this.onOkClick}
                                onCloseClick={this.onCloseClick}
                            />
                            || (this.state.filterType === 'FOOD COST' &&
                                <FoodCostCard
                                    filterImage={'food_cost_big'}
                                    filterText={'FOOD COST'}
                                    titleLowCost={'Low cost'}
                                    titleMediumCost={'Medium cost'}
                                    titleHighCost={'High cost'}
                                    onLowCostCheck={this.onLowCostCheck}
                                    onMediumCostCheck={this.onMediumCostCheck}
                                    onHighCostCheck={this.onHighCostCheck}
                                    foodCostArrayTemp={this.foodCostArrayTemp}
                                    onClearClick={this.onClearClick}
                                    onOkClick={this.onOkClick}
                                    onCloseClick={this.onCloseClick}
                                />
                                ||
                                <IngredientsCard
                                    filterImage={'ingredients_big'}
                                    filterText={'INGREDIENTS'}
                                    ingredienTypeImage={this.state.ingredienTypeImage}
                                    ingredienType={this.state.ingredienType}
                                    onIngredientTypeSelect={(index, ingredienType) => this.onIngredientTypeSelect(index, ingredienType)}
                                    onIngredientsSelect={(data, index) => this.onIngredientsSelect(data, index)}
                                    ingredientsDontWantArrayTemp={this.ingredientsDontWantArrayTemp}
                                    ingredientsWantArrayTemp={this.ingredientsWantArrayTemp}
                                    onClearClick={this.onClearClick}
                                    onOkClick={this.onOkClick}
                                    onCloseClick={this.onCloseClick}
                                />
                            )}
                    </View>
                </Modal>
                <BottomTab tabData={tabBarWithBack} navigation={navigation} />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky,
    },
    header: {
        textAlign: 'center',
        marginTop: hp('3%'),
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.xlarge,
        color: Constant.color.blue
    },
    subText: {
        fontFamily: Constant.font.linateBold,
        fontSize: Constant.fontSize.small,
        color: Constant.color.darkBlue
    },
    cardView: {
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        marginVertical: hp('0.5%'),
        shadowColor: Constant.color.lightGray,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        elevation: 2
    },
    cardText: {
        flex: 0.9,
        fontFamily: Constant.font.robotoBold,
        fontSize: Constant.fontSize.small,
    },
    bottomCardView: {
        width: wp('85%'),
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    modalView: {
        backgroundColor: 'rgba(2,21,42,0.9)',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        height: hp('75%'),
        justifyContent: 'center'
    },
});

export { VideoRecipe }