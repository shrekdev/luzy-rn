import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Keyboard
} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {NotRecommendedFoodList, RecommendedFoodList, tabBarWithBack} from '../../helper/appConstant';
import {FoodListCard, FoodListHeader, FoodListSearchHeader} from './calorieTableComponent';
import CalorieDetail from '../containers/calorieDetail'
import {BottomTab} from "../common";
import {HideNavigationBar} from "react-native-navigation-bar-color";

class NotRecommendedFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            heightOffset: 0,
        };
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

    _keyboardDidShow = (e) => {
        this.setState({heightOffset: e.endCoordinates.height +hp('8%')});
    };

    _keyboardDidHide = () => {
        Constant.isANDROID && HideNavigationBar();
        this.setState({heightOffset: 0})
    };

    renderRow = ({index, item}) => {
        return (
            <FoodListCard
                data={item}
                key={index}
                onPress={() => {
                    this.props.navigation.navigate('CalorieDetail', {
                            data: NotRecommendedFoodList[index],
                            foodSearchIcon: 'not_recommended_food_search_icon'
                        }
                    )
                }}
            />
        )
    };

    onChangeText = (searchText) => {
        this.setState({searchText})
    };

    render() {
        const {safeArea, navigation} = this.props;
        const {searchText, heightOffset} = this.state;
        const {container} = styles;
        return (
            <View style={[container, {paddingBottom: heightOffset }]}>
                <ScrollView style={{flex: 1}}
                            showsVerticalScrollIndicator={false}
                            stickyHeaderIndices={[1]}
                            contentContainerStyle={{paddingBottom: hp('10%') + safeArea.bottom}}
                >
                    <FoodListHeader
                        headerImage={'calorie_table_not_recommended_food_illustration'}
                        foodTypeText={'NOT RECOMMENDED FOOD'}
                    />
                    <FoodListSearchHeader
                        foodSearchIcon={'not_recommended_food_search_icon'}
                        searchText={searchText}
                        onChangeText={(searchText) => this.onChangeText(searchText)}
                    />
                    <FlatList
                        data={NotRecommendedFoodList}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => {
                            return index + "";
                        }}
                    />
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
        overflow: 'hidden',
    }
});

export {NotRecommendedFood}