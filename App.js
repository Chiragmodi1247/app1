/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import DeckScreen from './Screens/DeckScreen';
import MapScreen from './Screens/MapScreen';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene 
            key="Map"
            component={MapScreen}
            title="Map"
            initial
          />
          <Scene
            key="Deck"
            component={DeckScreen}
            title="Jobs"
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
