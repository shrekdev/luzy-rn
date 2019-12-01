import React, {Component} from "react";
import {View} from "react-native";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {transitionConfig} from "./subComponent/customTransition";

import GlucoseHome from './../screens/containers/glucoseHome';
import BloodPressure from '../screens/containers/bloodPressure';
import BMICalculator from './../screens/containers/bmiCalculator';
import Appointment from './../screens/containers/appointment';
import Monitoring from '../screens/containers/monitoring';
import MorningFastingHome from './../screens/containers/morningFastingHome';
import MorningFastingActivity from './../screens/containers/morningFastingActivity';
import TwoHoursAfterFoodHome from '../screens/containers/twoHrsAfterFoodHome'
import TwoHoursAfterFoodActivity from '../screens/containers/twoHoursAfterFoodActivity'
import BloodPressureMonitoring from '../screens/containers/bloodPressureMonitoring'
import BMICalculation from '../screens/containers/bmiCalculation';
import BMIWeightMonitoring from '../screens/containers/bmiWeightMonitoring';
import CalorieCalculator from '../screens/containers/caloriesCalculator';
import Extra from '../screens/containers/extra';
import Reminders from '../screens/containers/reminders';

const monitoringNavigation = createStackNavigator({
    Monitoring,
    GlucoseHome,
    BloodPressure,
    BMICalculator,
    Appointment,
    MorningFastingHome,
    MorningFastingActivity,
    TwoHoursAfterFoodHome,
    TwoHoursAfterFoodActivity,
    BloodPressureMonitoring,
    BMICalculation,
    BMIWeightMonitoring,
    CalorieCalculator,
    Extra,
    Reminders
}, {
    initialRouteName: 'Monitoring',
    headerMode: "none",
    transitionConfig
});

export default createAppContainer(monitoringNavigation);

