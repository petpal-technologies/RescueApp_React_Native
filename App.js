import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Login/login.js'
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './Screens/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});

export default class App extends React.Component {
  render() {
    return (
      <LoginScreen />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
