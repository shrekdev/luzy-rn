import { createStackNavigator, createAppContainer } from 'react-navigation';
import {transitionConfig} from './subComponent/customTransition';
import Loading from './../screens/containers/loading';
import UserLogin from '../screens/containers/userLogin';
import AboutUs from './../screens/containers/aboutUs';
import Home from './../screens/containers/home';
import SignUp from '../screens/containers/signUp';
import AboutUsSlider from './../screens/containers/aboutUsSlider'
import HomeTabBar from './tabNavigation'
import HealthCalculator from '../screens/containers/healthCalculator'
import Progress from '../screens/containers/progress'
import Social from '../screens/containers/social'
import Profile from '../screens/containers/profile'
import Pedometer from '../screens/containers/pedometer'
import Message from '../screens/containers/message'
import SocialChat from '../screens/containers/socialChat'

const AppNavigator = createStackNavigator({
    Loading,
    UserLogin,
    SignUp,
    AboutUs,
    Home,
    HomeTabBar,
    HealthCalculator,
    AboutUsSlider,
    Progress,
    Social,
    Profile,
    Pedometer,
    Message,
    SocialChat
},{
    initialRouteName: 'Loading',
    headerMode:"none",
    transitionConfig,
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
