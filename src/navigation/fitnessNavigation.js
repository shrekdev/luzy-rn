import {createAppContainer, createStackNavigator} from 'react-navigation';
import { transitionConfig } from './subComponent/customTransition';

import Fitness from '../screens/containers/fitnessHome';
import ExerciseDetail from '../screens/containers/exerciseDetail';


const FitnessNavigator = createStackNavigator({
    Fitness,
    ExerciseDetail
}, {
    initialRouteName: 'Fitness',
    headerMode: "none",
    transitionConfig,
});

export default createAppContainer(FitnessNavigator);