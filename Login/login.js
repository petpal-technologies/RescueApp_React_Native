import React, { Component } from "react";

import styles from "../Styles/style.js";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {username:"", password:""}
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Petpalscouts</Text>
            <TextInput placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={username => this.setState({username})}
            />

            <TextInput placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
            />

            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
            <Button
              buttonStyle={styles.signUpButton}
              onPress={() => this.onLoginPress()}
              title="Sign Up"
            />

            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Login with Facebook"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onLoginPress() {
    // Send request to login path: petpal.world/auth/login
    if (this.textInputIsNotEmpty()) {
      navigate('Main')

      let formdata = new FormData();
      formdata.append("username", this.state.username);
      formdata.append("password", this.state.password);
      fetch('http://petpal.world/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      })
      .then((response) => {
        console.log(response)
        // return response.text();
      })
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        console.error(error);
      });
    };


  }

  textInputIsNotEmpty = () => {

    const { username }  = this.state ;
    const { password }  = this.state ;

    if(username == "" || password == "") {
      Alert.alert("Please fill all fields.");
      return false;
    } else {
      return true;
    }
  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

}
