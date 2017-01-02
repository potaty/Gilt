/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View
} from 'react-native';


const loginHandler = () => {
  var myHeaders = new Headers();

  var myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };

  fetch('https://api.github.com/authorizations',myInit)
  .then(function(response) {
    console.warn(response)
  })
  .then(function(myBlob) {
    var objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
  return 'fetch'
};


export default class GithubClient extends Component {
  constructor(props) {
    super(props);
    this.state = { username: 'username', password: 'password'};
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 30, marginHorizontal: 10, marginVertical: 10, borderColor: 'gray', textAlign: 'center'}}
          value={"username"}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          autoFocus={true}
        />
        <TextInput
          style={{height: 30, marginHorizontal: 10, marginVertical: 10  , borderColor: 'gray', textAlign: 'center'}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          autoFocus={false}
        />
        <Button title="Login"
                onPress={loginHandler}/>
        <Button title="Regist"/>
      </View>
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

AppRegistry.registerComponent('GithubClient', () => GithubClient);
