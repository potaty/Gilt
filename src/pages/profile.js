import React, { Component } from 'react'
import { Alert, AppRegistry, Button, Image, StyleSheet, Text, TextInput, ToolbarAndroid, View } from 'react-native'

export default class Profile extends Component {
  onActionSelected(position) {
    if (position === 0) { // index of 'Settings'
      showSettings()
    }
  }
  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar}
          title="Profile"
          actions={[{title: '', show: 'always'}]}
          onActionSelected={this.onActionSelected}
          titleColor="#ffffff"
        />
        <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              style={styles.head}
              source={require('../images/head.png')}
            />
            <View style={styles.contact}>
              <Text style={styles.username}>{'Hanzhao Lin'}</Text>
              <Text style={styles.nickname}>{'magicae'}</Text>
              <View style={styles.mail}>
                <Image
                  style={styles.mailbox}
                  source={require('../images/mail.png')}
                />
                <Text style={styles.mailtext}>
                  {'readme@gmail.com'}
                </Text>
              </View>
              <View style={styles.link}>
                <Image
                  style={styles.linklogo}
                  source={require('../images/link.png')}
                />
                <Text style={styles.linkto}>
                  {'magicae.github.io'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.detail}>
            <View style={styles.stars}>
              <Text style={styles.number}>12</Text>
              <Text>Repositories</Text>
            </View>
            <View style={styles.stars}>
              <Text style={styles.number}>12</Text>
              <Text>Stars</Text>
            </View>
            <View style={styles.stars}>
              <Text style={styles.number}>12</Text>
              <Text>Followers</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  head: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 20,
  },
  contact: {
    marginLeft: 20,
    marginTop: 20,
  },
  username: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  nickname: {
    fontSize: 15,
  },
  mail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  mailtext: {
    color: '#4078c0',
    marginLeft: 5,
    fontSize: 14,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkto: {
    color: '#4078c0',
    marginLeft: 5,
    fontSize: 14,
  },
  detail: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  stars: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
    flex: 1,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
