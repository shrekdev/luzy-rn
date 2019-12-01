import {createAppContainer, createStackNavigator} from 'react-navigation';
import {transitionConfig} from './subComponent/customTransition';

import Health from '../screens/containers/health';
import HealthMakeAppointment from '../screens/containers/healthMakeAppointment';
import AppointmentHistory from '../screens/containers/appointmentHistory';
import HealthCalculator from '../screens/containers/healthCalculator';
import MedicalNotes from '../screens/containers/medicalNotes';
import AppointmentHome from '../screens/containers/appointmentHome';


const HealthNavigator = createStackNavigator({
    Health,
    HealthMakeAppointment,
    AppointmentHistory,
    MedicalNotes,
    HealthCalculator,
    AppointmentHome
}, {
    headerMode: "none",
    transitionConfig,
});

export default createAppContainer(HealthNavigator);