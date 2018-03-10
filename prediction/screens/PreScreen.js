import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';

export default class PreScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Text> PreScreen </Text>
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
