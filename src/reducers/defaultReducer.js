import {userDefault} from './default/user';
import {meditationDefault} from './default/meditation';
import {glucoseDefault} from './default/glucose';
import {appDefault} from './default/appDefault';
import {glucoseLevelForDayDefault} from './default/glucose';
import {glucoseLevelForWeekDefault} from './default/glucose';
import {glucoseLevelForMonthDefault} from './default/glucose';
import {BMIDefault} from './default/BMI';
import {bloodPressureDefault} from './default/bloodPressure';
import {RemainderDefault} from './default/addRemainder';

export const appDefaultReducer = {
    user: userDefault,
    meditation: meditationDefault,
    glucose : glucoseDefault,
    levelforday: glucoseLevelForDayDefault,
    levelforWeek: glucoseLevelForWeekDefault,
    levelforMonth: glucoseLevelForMonthDefault,
    appReducer: appDefault, 
    BMI : BMIDefault,
    addRemainder: RemainderDefault,
    bloodPressure : bloodPressureDefault,

};