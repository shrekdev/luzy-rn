import {AppRegistry} from 'react-native';
import AppConfing from './src/store/storeConfig';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppConfing);
