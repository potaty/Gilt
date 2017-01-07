import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Image, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import Qingzhen from '../images/head2.jpeg'

const styles = StyleSheet.create({
  author: {
    flexDirection: 'row',
    padding: 20,
    height: 50,
    alignItems: 'center',
  },
  authorFont: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  head: {
    marginTop: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 3,
    backgroundColor: '#f2f8fa',
  },
  comment: {
    backgroundColor: '#eeeeee',
    marginHorizontal: 10,
    padding: 20,
  },
})
export default class Comment extends React.Component {
  render() {
    return (<View style={styles.container}>
        <View style={styles.row}>
          <Image source={this.props.pic} style={styles.head} />
          <View style={styles.author}>
            <Text style={styles.authorFont}>{this.props.author}</Text>
            <Text>{'commented ' + this.props.time}</Text>
          </View>
        </View>
        <Text style={styles.comment}>{this.props.comment}</Text>
      </View>)
  }
}
