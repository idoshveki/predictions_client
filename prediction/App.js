import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

export default class App extends React.Component {
  componentDidMount() {
  const config = {
    apiKey: "AIzaSyBWcmGSK0NoszHLIJIitL3WWCBkBNHFJns",
    authDomain: "prediction-39c2c.firebaseapp.com",
    databaseURL: "https://prediction-39c2c.firebaseio.com",
    projectId: "prediction-39c2c",
    storageBucket: "prediction-39c2c.appspot.com",
    messagingSenderId: "1073719092846"
};
firebase.initializeApp(config);
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
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
