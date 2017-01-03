import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View
} from 'react-native';
import Profile from './src/pages/profile.js';

export default class GithubClient extends Component {
  constructor(props) {
    super(props);
    this.state = { username: 'username', password: 'password'};
  }

  render() {
    return (
      <Profile/>
    );
  }
}

AppRegistry.registerComponent('GithubClient', () => GithubClient);
