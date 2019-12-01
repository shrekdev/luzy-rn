import React, {Component} from "react";
import {View} from 'react-native';
import {createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';
import {AppNavigator} from "../../src/screens/common";
import HomeTabBar from "../screens/containers/homeTabBar";
import {transitionConfig} from './subComponent/customTransition';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../helper/responsiveScreen';
import Monitoring from './monitoringNavigation';
import Foods from './foodsNavigation';
import Fitness from './fitnessNavigation';
import FreeTime from './freeTimeNavigation';
import Health from './healthNavigation';
import Constant from '../helper/themeHelper';
// import SideMenu from "../screens/components/home";
import SideMenu from 'react-native-side-menu';
import {Menu} from "../screens/common/menu";

const topbar = createMaterialTopTabNavigator({
    Monitoring,
    Foods,
    Fitness,
    Health,
    FreeTime
}, {
    mode: 'model',
    swipeEnabled: false,
    lazy: true,
    tabBarComponent: props => {
        return (
            <HomeTabBar currentTab={props.navigation.state.index} navigation={props.navigation}/>
        )
    },
    transitionConfig,
});

const Container = createAppContainer(topbar);

export default class initialNavigator extends Component {
    static router = topbar.router;

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    onPressMenu = (isOpen) => {
        this.setState({isOpen: !isOpen})
    };

    onMenuClose = (isOpen) => {
        this.setState({isOpen});
    };

    render() {
        const menu = <Menu navigation={this.props.navigation} />;
        return (
            <View style={{flex: 1}}>
                <AppNavigator onPressMenu={() => this.onPressMenu(this.state.isOpen)} isMenuOpen={this.state.isOpen} />
                <View style={{flex: 1}}>
                    <SideMenu
                        menu={menu}
                        isOpen={this.state.isOpen}
                        menuPosition={'right'}
                        onChange={(isOpen)=>this.onMenuClose(isOpen)}
                    >
                        <Container navigation={this.props.navigation}/>
                    </SideMenu>
                </View>
            </View>
        )
    }

};