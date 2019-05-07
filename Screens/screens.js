import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Login', () => require('../Login/login').default);
  Navigation.registerComponent('Home', () => require('../Application/main'))
}
