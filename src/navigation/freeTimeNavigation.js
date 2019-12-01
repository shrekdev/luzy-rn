import {createAppContainer, createStackNavigator} from 'react-navigation';
import {transitionConfig} from './subComponent/customTransition';

import FreeTime from '../screens/containers/freeTime';
import Meditation from '../screens/containers/meditation';
import Pedometer from '../screens/containers/pedometer';
import MeditationVideo from '../screens/containers/meditationVideo';


const FreeTimeNavigator = createStackNavigator({
    FreeTime,
    Meditation,
    Pedometer,
    MeditationVideo
}, {
    headerMode: "none",
    transitionConfig,
});

export default createAppContainer(FreeTimeNavigator);