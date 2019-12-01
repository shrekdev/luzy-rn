import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    KeyboardAvoidingView, Keyboard
} from 'react-native';
import Constant, {normalize} from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {RecommendedFoodList, tabBarWithBack} from '../../helper/appConstant';
import {FoodListCard, FoodListHeader, FoodListSearchHeader} from './calorieTableComponent';
import {BottomTab} from "../common";
import {HideNavigationBar} from "react-native-navigation-bar-color";

class RecommendedFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
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

    _keyboardDidShow = (e) => {

    };

    _keyboardDidHide = () => {
        Constant.isANDROID && HideNavigationBar();
    };

    renderRow = ({index, item}) => {
        return (
            <FoodListCard data={item}
                          key={index}
                          onPress={() => {
                              this.props.navigation.navigate('CalorieDetail', {
                                      data: RecommendedFoodList[index],
                                      foodSearchIcon: 'recommended_food_search_icon'
                                  }
                              )
                          }}/>
        )
    };

    onChangeText = (searchText) => {
        this.setState({searchText})
    };

    render() {
        const {safeArea, navigation} = this.props;
        const {searchText} = this.state;
        const {container} = styles;
        return (
            <View style={[container, {paddingBottom: hp('10%') + safeArea.bottom}]}>
                <KeyboardAvoidingView
                    enabled={Constant.isANDROID}
                    style={{flex: 1, justifyContent: 'space-between'}}
                    behavior='padding'
                    keyboardVerticalOffset = {hp('21%')}>
                <ScrollView style={{flex: 1}}
                            showsVerticalScrollIndicator={false}
                            stickyHeaderIndices={[1]}
                            scrollEventThrottle={16}
                            contentContainerStyle={{paddingBottom: 20}}
                >
                    <FoodListHeader
                        headerImage={'calorie_table_recommended_food_illustration'}
                        foodTypeText={'RECOMMENDED FOOD'}
                    />
                    <FoodListSearchHeader
                        foodSearchIcon={'recommended_food_search_icon'}
                        searchText={searchText}
                        onChangeText={(searchText) => this.onChangeText(searchText)}/>
                    <FlatList
                        data={RecommendedFoodList}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => {
                            return index + "";
                        }}
                    />
                </ScrollView>
                </KeyboardAvoidingView>
                <BottomTab tabData={tabBarWithBack} navigation={navigation}/>
            </View>

        )

    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.color.lightSky
    }
});

export {RecommendedFood}