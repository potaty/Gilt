import React from 'react'
import { Image, ListView, StyleSheet, Text, ToolbarAndroid, TouchableHighlight, View } from 'react-native'

import http from '../http'
import routes from '../routes'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  head: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#111111',
    marginLeft: 10,
    marginRight: 10,
  },
  list: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  login: {
    lineHeight: 35,
    marginLeft: 10,
  },
})

export default class UserList extends React.Component {
  state = {}
  componentDidMount = async () => {
    const users = await (
      await http.get(this.props.route.api)
    ).json()
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.setState({
      dataSource: dataSource.cloneWithRows(users),
    })
  }
  handleShowProfile = login => {
    this.props.navigator.push(Object.assign({}, routes[5], { login }))
  }
  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar} title={this.props.route.title}
          titleColor="#ffffff" />
        { this.state.dataSource &&
          <ListView dataSource={this.state.dataSource}
            renderRow={user => (
              <TouchableHighlight onPress={this.handleShowProfile.bind(this, user.login)}
                underlayColor="#e0e0e0" >
                <View style={styles.list}>
                  <Image style={styles.head} source={{ uri: user.avatar_url }} />
                  <Text style={styles.login}>{user.login}</Text>
                </View>
              </TouchableHighlight>
            )}
            renderSeparator={(sectionId, rowId) => (
              <View key={rowId} style={styles.separator} />
            )}
          /> }
      </View>
    )
  }
}
