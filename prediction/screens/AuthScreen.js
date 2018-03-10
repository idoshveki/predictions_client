import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { Constants, Facebook, Google } from 'expo';
import { SocialIcon, Button } from 'react-native-elements';

export default class AuthScreen extends React.Component {
  _handleFacebookLogin = async () => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '1201211719949057', // Replace with your own app id in standalone app
      { permissions: ['public_profile'] }
    );

    switch (type) {
      case 'success': {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const profile = await response.json();
        Alert.alert(
          'Logged in!',
          `Hi ${profile.name}!`,
        );
        break;
      }
      case 'cancel': {
        Alert.alert(
          'Cancelled!',
          'Login was cancelled!',
        );
        break;
      }
      default: {
        Alert.alert(
          'Oops!',
          'Login failed!',
        );
      }
    }
  } catch (e) {
    Alert.alert(
      'Oops!',
      'Login failed!',
    );
  }
};

_handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });
      switch (type) {
        case 'success': {
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View style={{flex:1}}>
        <View style = {{justifyContent:'center',alignItems:'center', flex: 1}}>
            <Text style={{fontSize: 40, fontStyle:'italic'}}> Time To Predict! </Text>
        </View>

        <View style={styles.container}>
          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
            onPress={this._handleFacebookLogin}
          />

          <SocialIcon
            title='Sign In With Google'
            button
            type='google-plus-official'
            onPress={this._handleFacebookLogin}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
