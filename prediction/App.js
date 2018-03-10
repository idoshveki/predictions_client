import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import PreScreen from './screens/PreScreen';
import AfterScreen from './screens/AfterScreen';


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
    const MainNavigator = TabNavigator({
    auth: {screen: AuthScreen},
    main: {screen: TabNavigator({
          pre: {screen: PreScreen },
          after: {screen: AfterScreen},
      },{
          swipeEnabled: false,
          animationEnabled: false,
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12},
            backBehavior: 'none',
          }
      })
    }
 },
 {      navigationOptions:{
          tabBarVisible: false,
      },
      lazy: true,
      swipeEnabled: false,
      animationEnabled: false,
  }
 );

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
